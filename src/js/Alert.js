export default class Alert {
  constructor(sourceUrl) {
    this.sourceUrl = sourceUrl;
  }

  async init() {
    const response = await fetch(this.sourceUrl);
    const alerts = await response.json();

    if (!alerts.length) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.background = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    document.querySelector("main").prepend(section);
  }
}
