async function buildServicesCarousel() {
  const inner = document.querySelector("[data-services-inner]");
  const indicators = document.querySelector("[data-services-indicators]");
  if (!inner || !indicators) return;

  const res = await fetch("js/services-data.json");
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];

  const iconMap = {
    plus: "bi-plus-lg",
    cart: "bi bi-cart",
    home: "bi-house",
    shield: "bi-shield-check",
    warning: "bi-exclamation-triangle",
    cycle: "bi-bicycle",
    briefcase: "bi-briefcase",
    heart: "bi-heart",
    spark: "bi-stars",
    doc: "bi-file-earmark-text",
    lock: "bi-lock",
    pageLock: "bi bi-file-earmark-lock2",
    tools: "bi-tools",
    boat: "bi-water",
    fire: "bi-fire",
    balance: "bi-balance-scale",
    gear: "bi-gear",
    truck: "bi-truck",
    globe: "bi-globe-americas",
    build: "bi-hammer",
    users: "bi-people",
    car: "bi-car-front",
    credit: "bi-credit-card",
    warranty: "bi-patch-check",
    plane: "bi-airplane",
    building: "bi-building",
    stethoscope: "bi-heart-pulse",
    umbrella: "bi-umbrella",
    helmet: "bi-shield-shaded",
    hospital: "bi-hospital",
    phone: "bi-phone",
    bolt: "bi-lightning-charge",
    cash: "bi-cash-stack",
    map: "bi-map",
    person: "bi bi-person",
    leaf: "bi bi-leaf",
    flower: "bi bi-flower1",
    building: "bi bi-buildings",
    shop: "bi bi-shop",
    carFill: "bi bi-car-front-fill",
    toggle: "bi bi-toggle-on",
    luggage: "bi bi-luggage-fill",
    laptop: "bi bi-laptop",
    personDash: "bi bi-person-dash",
    backpack: "bi bi-backpack3-fill",
    scooter: "bi bi-scooter",
    personLock: "bi bi-person-fill-lock",
    shield: "bi bi-shield-fill-check"
    };

  function renderCard(item, index) {
    const title = item.title || "Servicio";
    const subtitle = item.subtitle || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const hoverText =
      item.hoverText ||
      item.description ||
      `Te asesoramos en ${title.toLowerCase()} con opciones claras, comparativas reales y acompanamiento en todo el proceso.`;
    const color = item.color || "#0b5ed7";
    const bg = item.bg || "#e8f0ff";
    const iconKey = item.icon || "plus";
    const iconClass = iconMap[iconKey] || iconMap.plus;
    const iconMarkup = `<i class="bi ${iconClass}" aria-hidden="true"></i>`;
    return `
      <div class="col-md-4">
        <article class="service-card h-100">
          <div class="service-card-inner">
            <div class="service-card-face service-card-front p-4">
              <div class="service-icon mb-3" style="background:${bg};color:${color};">
                ${iconMarkup}
              </div>
              <h5 class="fw-bold">${title}</h5>
              <p class="text-muted small mb-0">${subtitle}</p>
            </div>
            <div class="service-card-face service-card-back p-4">
              <h5 class="fw-bold">${title}</h5>
              <p class="mb-0">${hoverText}</p>
            </div>
          </div>
        </article>
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
