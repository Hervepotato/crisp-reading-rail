import { describe, expect, it, vi } from "vitest";
import {
  ReadingRailAudio,
  type ReadingRailAudioEnvironment,
} from "../src/audio-feedback";

interface FakeAudioFixture {
  context: AudioContext;
  oscillators: Array<{
    type: OscillatorType;
    frequency: {
      setValueAtTime: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
    };
    connect: ReturnType<typeof vi.fn>;
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
  }>;
  gains: Array<{
    gain: {
      setValueAtTime: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
    };
    connect: ReturnType<typeof vi.fn>;
  }>;
  resume: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
}

function makeAudioContext(state: AudioContextState = "running"): FakeAudioFixture {
  const oscillators: FakeAudioFixture["oscillators"] = [];
  const gains: FakeAudioFixture["gains"] = [];
  const resume = vi.fn(async () => undefined);
  const close = vi.fn(async () => undefined);
  const context = {
    state,
    currentTime: 2,
    destination: {},
    createOscillator: vi.fn(() => {
      const oscillator = {
        type: "sine" as OscillatorType,
        frequency: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      };
      oscillators.push(oscillator);
      return oscillator;
    }),
    createGain: vi.fn(() => {
      const gain = {
        gain: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
      };
      gains.push(gain);
      return gain;
    }),
    resume,
    close,
  } as unknown as AudioContext;
  return { context, oscillators, gains, resume, close };
}

function makeEnvironment(
  fixture: FakeAudioFixture,
  now: () => number,
): ReadingRailAudioEnvironment & {
  createContext: ReturnType<typeof vi.fn>;
  debug: ReturnType<typeof vi.fn>;
} {
  return {
    now,
    createContext: vi.fn(() => fixture.context),
    debug: vi.fn(),
  };
}

describe("ReadingRailAudio", () => {
  it("stays completely lazy while disabled and throttles dense drag ticks", () => {
    let enabled = false;
    let now = 0;
    const fixture = makeAudioContext();
    const environment = makeEnvironment(fixture, () => now);
    const audio = new ReadingRailAudio(() => enabled, environment);

    audio.tick();
    expect(environment.createContext).not.toHaveBeenCalled();

    enabled = true;
    audio.tick();
    expect(environment.createContext).toHaveBeenCalledOnce();
    expect(fixture.oscillators).toHaveLength(1);
    expect(fixture.oscillators[0].type).toBe("triangle");
    expect(fixture.gains[0].gain.exponentialRampToValueAtTime)
      .toHaveBeenCalledWith(0.008, 2.004);

    now = 40;
    audio.tick();
    expect(fixture.oscillators).toHaveLength(1);

    now = 90;
    audio.tick();
    expect(fixture.oscillators).toHaveLength(2);
  });

  it("plays a softer settle envelope and resumes a suspended context", () => {
    const fixture = makeAudioContext("suspended");
    const environment = makeEnvironment(fixture, () => 100);
    const audio = new ReadingRailAudio(() => true, environment);

    audio.settle();

    expect(fixture.resume).toHaveBeenCalledOnce();
    expect(fixture.oscillators).toHaveLength(1);
    expect(fixture.oscillators[0].type).toBe("sine");
    expect(fixture.oscillators[0].frequency.setValueAtTime)
      .toHaveBeenCalledWith(440, 2);
    expect(fixture.oscillators[0].frequency.exponentialRampToValueAtTime)
      .toHaveBeenCalledWith(560, 2.04);
    expect(fixture.gains[0].gain.exponentialRampToValueAtTime)
      .toHaveBeenLastCalledWith(0.0001, 2.1);
  });

  it("contains playback failures and closes an initialized context", async () => {
    const fixture = makeAudioContext();
    const environment = makeEnvironment(fixture, () => 100);
    environment.createContext.mockImplementationOnce(() => {
      throw new Error("audio unavailable");
    });
    const audio = new ReadingRailAudio(() => true, environment);

    expect(() => audio.settle()).not.toThrow();
    expect(environment.debug).toHaveBeenCalledOnce();

    audio.tick();
    await audio.destroy();
    await audio.destroy();

    expect(fixture.close).toHaveBeenCalledOnce();
  });
});
