export interface RailSoundProvider {
  tick(): void;
  settle(): void;
}

export interface ReadingRailAudioEnvironment {
  now(): number;
  createContext(): AudioContext | null;
  debug(message: string, error: unknown): void;
}

interface ToneOptions {
  type: OscillatorType;
  start: number;
  end: number;
  duration: number;
  release: number;
  volume: number;
}

const TICK_THROTTLE_MS = 90;
const MIN_GAIN = 0.0001;
const ATTACK_SECONDS = 0.004;

export function createReadingRailAudioEnvironment(
  window: Window,
): ReadingRailAudioEnvironment {
  return {
    now: () => window.performance.now(),
    createContext: () => {
      const WindowWithAudio = window as Window & {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Context = WindowWithAudio.AudioContext
        ?? WindowWithAudio.webkitAudioContext;
      return Context ? new Context() : null;
    },
    debug: (message, error) => console.debug(message, error),
  };
}

export class ReadingRailAudio implements RailSoundProvider {
  private readonly isEnabled: () => boolean;
  private readonly environment: ReadingRailAudioEnvironment;
  private context: AudioContext | null = null;
  private lastTickAt = Number.NEGATIVE_INFINITY;

  constructor(
    isEnabled: () => boolean,
    environment: ReadingRailAudioEnvironment,
  ) {
    this.isEnabled = isEnabled;
    this.environment = environment;
  }

  tick(): void {
    if (!this.isEnabled()) {
      return;
    }
    const now = this.environment.now();
    if (now - this.lastTickAt < TICK_THROTTLE_MS) {
      return;
    }
    this.lastTickAt = now;
    this.play({
      type: "triangle",
      start: 560,
      end: 480,
      duration: 0.025,
      release: 0.045,
      volume: 0.008,
    });
  }

  settle(): void {
    if (!this.isEnabled()) {
      return;
    }
    this.play({
      type: "sine",
      start: 440,
      end: 560,
      duration: 0.04,
      release: 0.06,
      volume: 0.01,
    });
  }

  async destroy(): Promise<void> {
    const context = this.context;
    this.context = null;
    if (context && context.state !== "closed") {
      await context.close();
    }
  }

  private ensureContext(): AudioContext | null {
    this.context ??= this.environment.createContext();
    if (this.context?.state === "suspended") {
      void this.context.resume().catch(() => undefined);
    }
    return this.context;
  }

  private play(options: ToneOptions): void {
    try {
      const context = this.ensureContext();
      if (!context) {
        return;
      }
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const releaseAt = now + options.duration + options.release;

      oscillator.type = options.type;
      oscillator.frequency.setValueAtTime(options.start, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        options.end,
        now + options.duration,
      );
      gain.gain.setValueAtTime(MIN_GAIN, now);
      gain.gain.exponentialRampToValueAtTime(
        options.volume,
        now + ATTACK_SECONDS,
      );
      gain.gain.exponentialRampToValueAtTime(MIN_GAIN, releaseAt);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(releaseAt + 0.01);
    } catch (error) {
      this.environment.debug("Crisp Reading Rail sound failed", error);
    }
  }
}
