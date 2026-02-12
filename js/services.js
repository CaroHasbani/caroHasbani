async function buildServicesCarousel() {
  const inner = document.querySelector("[data-services-inner]");
  const indicators = document.querySelector("[data-services-indicators]");
  if (!inner || !indicators) return;

  const res = await fetch("js/services-data.json");
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];

  const iconMap = {
    plus: '<path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"></path>',
    cart: '<path d="M7 17h10l2-6H5l2 6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>',
    home: '<path d="M3 11l9-7 9 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>',
    shield: '<path d="M12 3l7 4v5c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V7l7-4z" stroke-width="2"></path>',
    warning: '<path d="M12 8v5" stroke-width="2" stroke-linecap="round"></path><path d="M12 16h.01" stroke-width="2" stroke-linecap="round"></path>',
    cycle: '<circle cx="7" cy="17" r="2" stroke-width="2"></circle><circle cx="17" cy="17" r="2" stroke-width="2"></circle><path d="M7 17l4-7h4l2 3" stroke-width="2"></path>',
    briefcase: '<rect x="4" y="7" width="16" height="11" rx="2" stroke-width="2"></rect><path d="M9 7V5h6v2" stroke-width="2"></path>',
    heart: '<path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" stroke-width="2"></path>',
    spark: '<path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" stroke-width="2"></path>',
    doc: '<path d="M7 4h7l4 4v12H7z" stroke-width="2"></path><path d="M14 4v4h4" stroke-width="2"></path>',
    lock: '<rect x="6" y="10" width="12" height="10" rx="2" stroke-width="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke-width="2"></path>',
    tools: '<path d="M14 7l3 3-7 7-3-3 7-7z" stroke-width="2"></path>',
    boat: '<path d="M3 14l9 5 9-5" stroke-width="2"></path><path d="M5 10h14l2 4H3l2-4z" stroke-width="2"></path>',
    fire: '<path d="M12 3c2 3 4 4.5 4 7a4 4 0 0 1-8 0c0-2.5 2-4 4-7z" stroke-width="2"></path>',
    balance: '<path d="M12 3v18" stroke-width="2"></path><path d="M5 7h14" stroke-width="2"></path><path d="M7 7l-3 5h6l-3-5z" stroke-width="2"></path><path d="M17 7l-3 5h6l-3-5z" stroke-width="2"></path>',
    gear: '<circle cx="12" cy="12" r="3" stroke-width="2"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M19.2 4.8l-2.1 2.1M6.9 17.1l-2.1 2.1" stroke-width="2"></path>',
    truck: '<path d="M3 7h11v7H3z" stroke-width="2"></path><path d="M14 10h4l3 3v1h-7" stroke-width="2"></path>',
    globe: '<circle cx="12" cy="12" r="8" stroke-width="2"></circle><path d="M4 12h16M12 4a12 12 0 0 0 0 16M12 4a12 12 0 0 1 0 16" stroke-width="2"></path>',
    leaf: '<path d="M4 14c6-8 12-8 16-8-1 10-6 14-12 14-2 0-4-2-4-6z" stroke-width="2"></path>',
    build: '<path d="M3 19l8-8 2 2-8 8H3v-2z" stroke-width="2"></path><path d="M14 4l6 6-3 3-6-6 3-3z" stroke-width="2"></path>',
    users: '<path d="M7 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" stroke-width="2"></path><path d="M17 14a4 4 0 1 1 0-8" stroke-width="2"></path><path d="M3 20a4 4 0 0 1 8 0" stroke-width="2"></path><path d="M13 20a4 4 0 0 1 8 0" stroke-width="2"></path>',
    car: '<path d="M3 13l1-3h16l1 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="7" cy="17" r="2" stroke-width="2"></circle><circle cx="17" cy="17" r="2" stroke-width="2"></circle>',
    credit: '<rect x="3" y="6" width="18" height="12" rx="2" stroke-width="2"></rect><path d="M3 10h18" stroke-width="2"></path>',
    warranty: '<circle cx="12" cy="12" r="8" stroke-width="2"></circle><path d="M12 8v4l2 2" stroke-width="2"></path>',
    plane: '<path d="M2 12l20-8-6 8 6 8-20-8z" stroke-width="2" stroke-linejoin="round"></path>',
    building: '<rect x="4" y="3" width="10" height="18" rx="1" stroke-width="2"></rect><path d="M8 7h2M8 11h2M8 15h2M14 10h6v11h-6" stroke-width="2" stroke-linecap="round"></path>',
    stethoscope: '<path d="M6 4v4a4 4 0 0 0 8 0V4M10 16a4 4 0 1 0 8 0v-1" stroke-width="2" stroke-linecap="round"></path><circle cx="19" cy="13" r="2" stroke-width="2"></circle>',
    umbrella: '<path d="M3 12a9 9 0 0 1 18 0H3z" stroke-width="2"></path><path d="M12 12v6a2 2 0 0 0 4 0" stroke-width="2" stroke-linecap="round"></path>',
    helmet: '<path d="M4 13a8 8 0 0 1 16 0v3H4z" stroke-width="2"></path><path d="M9 16v2h6v-2" stroke-width="2"></path>',
    hospital: '<rect x="4" y="3" width="16" height="18" rx="2" stroke-width="2"></rect><path d="M12 7v6M9 10h6" stroke-width="2" stroke-linecap="round"></path>',
    phone: '<rect x="8" y="2" width="8" height="20" rx="2" stroke-width="2"></rect><path d="M11 18h2" stroke-width="2" stroke-linecap="round"></path>',
    bolt: '<path d="M13 2L6 13h5l-1 9 8-12h-5l0-8z" stroke-width="2" stroke-linejoin="round"></path>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2" stroke-width="2"></rect><circle cx="12" cy="12" r="3" stroke-width="2"></circle><path d="M3 10h3M18 14h3" stroke-width="2"></path>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" stroke-width="2" stroke-linejoin="round"></path><path d="M9 4v14M15 6v14" stroke-width="2"></path>'
  };

  function renderCard(item, index) {
    const title = item.title || "Servicio";
    const subtitle = item.subtitle || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const color = item.color || "#0b5ed7";
    const bg = item.bg || "#e8f0ff";
    const iconKey = item.icon || "plus";
    const iconPath = iconMap[iconKey] || iconMap.plus;
    const iconSvg =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">' +
      iconPath +
      "</svg>";
    return `
      <div class="col-md-4">
        <div class="card service-card h-100 p-4">
          <div class="service-icon mb-3" style="background:${bg};color:${color};">
            ${iconSvg}
          </div>
          <h5 class="fw-bold">${title}</h5>
          <p class="text-muted small mb-0">${subtitle}</p>
        </div>
      </div>
    `;
  }

  function renderSlide(chunk, slideIndex) {
    const firstRow = chunk.slice(0, 3).map(renderCard).join("");
    const secondRow = chunk.slice(3, 6).map(renderCard).join("");
    return `
      <div class="carousel-item ${slideIndex === 0 ? "active" : ""}">
        <div class="row g-4 services-row">
          ${firstRow}
        </div>
        <div class="row g-4 services-row services-row--secondary">
          ${secondRow}
        </div>
      </div>
    `;
  }

  const slides = [];
  for (let i = 0; i < items.length; i += 6) {
    slides.push(items.slice(i, i + 6));
  }

  inner.innerHTML = slides.map(renderSlide).join("");
  indicators.innerHTML = slides
    .map(
      (_, index) =>
        `<button type="button" data-bs-target="#servicesCarousel" data-bs-slide-to="${index}" ${
          index === 0 ? 'class="active" aria-current="true"' : ""
        } aria-label="Slide ${index + 1}"></button>`
    )
    .join("");
}

document.addEventListener("components:loaded", buildServicesCarousel);
