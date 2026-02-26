function buildFaqUI() {
  const data = window.FAQ_DATA;
  const pillsContainer = document.querySelector("[data-faq-pills]");
  const accordionContainer = document.querySelector("[data-faq-accordion]");
  const pillsWrap = document.querySelector("[data-faq-pills-wrap]");

  if (!data || !pillsContainer || !accordionContainer || !pillsWrap) return;

  const categories = Object.keys(data);
  let activeCategory = categories[0];
  const scrollControls = setupFaqPillsScroll(pillsWrap, pillsContainer);

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

    scrollControls.update();
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

// Mobile-only horizontal scrolling with arrows and fades.
function setupFaqPillsScroll(pillsWrap, pillsContainer) {
  const leftButton = pillsWrap.querySelector("[data-faq-scroll='left']");
  const rightButton = pillsWrap.querySelector("[data-faq-scroll='right']");

  if (!leftButton || !rightButton) {
    return { update: () => {} };
  }

  const scrollAmount = () => Math.max(180, Math.round(pillsContainer.clientWidth * 0.7));

  // Updates arrow visibility + fade indicators based on current scroll state.
  const update = () => {
    const maxScroll = pillsContainer.scrollWidth - pillsContainer.clientWidth;
    const hasOverflow = maxScroll > 1;
    const canScrollLeft = pillsContainer.scrollLeft > 1;
    const canScrollRight = pillsContainer.scrollLeft < maxScroll - 1;

    pillsWrap.classList.toggle("can-scroll-left", hasOverflow && canScrollLeft);
    pillsWrap.classList.toggle("can-scroll-right", hasOverflow && canScrollRight);

    leftButton.classList.toggle("is-visible", hasOverflow && canScrollLeft);
    rightButton.classList.toggle("is-visible", hasOverflow && canScrollRight);
  };

  leftButton.addEventListener("click", () => {
    pillsContainer.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  rightButton.addEventListener("click", () => {
    pillsContainer.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  pillsContainer.addEventListener("scroll", () => {
    window.requestAnimationFrame(update);
  });

  window.addEventListener("resize", update);

  return { update };
}

document.addEventListener("components:loaded", buildFaqUI);
