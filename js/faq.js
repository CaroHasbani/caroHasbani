function buildFaqUI() {
  const data = window.FAQ_DATA;
  const pillsContainer = document.querySelector("[data-faq-pills]");
  const accordionContainer = document.querySelector("[data-faq-accordion]");

  if (!data || !pillsContainer || !accordionContainer) return;

  const categories = Object.keys(data);
  let activeCategory = categories[0];

  function renderPills() {
    pillsContainer.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn ${category === activeCategory ? "active" : ""}`;
      button.textContent = data[category].label;
      button.addEventListener("click", () => {
        activeCategory = category;
        renderPills();
        renderAccordion();
      });
      pillsContainer.appendChild(button);
    });
  }

  function renderAccordion() {
    const items = data[activeCategory].questions;
    accordionContainer.innerHTML = "";

    items.forEach((item, index) => {
      const itemId = `${activeCategory}-faq-${index}`;
      const headerId = `${itemId}-header`;

      const wrapper = document.createElement("div");
      wrapper.className = "accordion-item";
      wrapper.innerHTML = `
        <h2 class="accordion-header" id="${headerId}">
          <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target="#${itemId}" aria-expanded="false"
            aria-controls="${itemId}">
            ${item.q}
          </button>
        </h2>
        <div id="${itemId}" class="accordion-collapse collapse"
          aria-labelledby="${headerId}" data-bs-parent="#faq-accordion">
          <div class="accordion-body">${item.a}</div>
        </div>
      `;

      accordionContainer.appendChild(wrapper);
    });
  }

  renderPills();
  renderAccordion();
}

document.addEventListener("components:loaded", buildFaqUI);
