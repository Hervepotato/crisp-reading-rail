export function createSettingGroup(
  container: HTMLElement,
  title: string,
  description: string,
  openByDefault: boolean,
): HTMLElement {
  const document = container.ownerDocument;
  const card = document.createElement("details");
  card.className = "crisp-rr-setting-card";
  card.open = openByDefault;

  const header = document.createElement("summary");
  header.className = "crisp-rr-setting-card__header";
  const info = document.createElement("span");
  info.className = "crisp-rr-setting-card__info";
  const titleElement = document.createElement("span");
  titleElement.className = "crisp-rr-setting-card__title";
  titleElement.textContent = title;
  info.append(titleElement);
  if (description.length > 0) {
    const descriptionElement = document.createElement("span");
    descriptionElement.className = "crisp-rr-setting-card__description";
    descriptionElement.textContent = description;
    info.append(descriptionElement);
  }
  const chevron = document.createElement("span");
  chevron.className = "crisp-rr-setting-card__chevron";
  chevron.setAttribute("aria-hidden", "true");
  header.append(info, chevron);

  const content = document.createElement("div");
  content.className = "crisp-rr-setting-card__content";
  card.append(header, content);
  container.append(card);
  return content;
}

export function createAboutCard(
  container: HTMLElement,
  pluginName: string,
  description: string,
): void {
  const document = container.ownerDocument;
  const card = document.createElement("section");
  card.className = "crisp-rr-about";

  const title = document.createElement("h3");
  title.className = "crisp-rr-about__title";
  title.textContent = `关于 ${pluginName}`;

  const copy = document.createElement("p");
  copy.className = "crisp-rr-about__description";
  copy.textContent = description;

  const byline = document.createElement("p");
  byline.className = "crisp-rr-about__author";
  const label = document.createElement("span");
  label.textContent = "作者：";
  const author = document.createElement("a");
  author.className = "crisp-rr-about__author-link";
  author.textContent = "小红书 letschips";
  author.href = "https://xhslink.cn/m/3MwtKu4822b";
  author.target = "_blank";
  author.rel = "noopener noreferrer";
  byline.append(label, author);

  card.append(title, copy, byline);
  container.append(card);
}
