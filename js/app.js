async function loadComponent(targetId, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(targetId).insertAdjacentHTML("beforeend", html);
}


function setupContactFormPhoneValidation() {
  const forms = document.querySelectorAll("#contactForm");

  forms.forEach((form) => {
    const phoneInput = form.querySelector("#telefono");
    if (!phoneInput) return;

    const sanitizePhone = () => {
      const normalized = phoneInput.value.replace(/\D/g, "").slice(0, 13);
      phoneInput.value = normalized;
      phoneInput.setCustomValidity("");
    };

    phoneInput.addEventListener("input", sanitizePhone);

    form.addEventListener("submit", (event) => {
      sanitizePhone();
      const validPhone = /^[0-9]{1,13}$/.test(phoneInput.value);

      if (!validPhone) {
        event.preventDefault();
        phoneInput.setCustomValidity("Ingresa solo numeros (hasta 13 digitos).");
        phoneInput.reportValidity();
      } else {
        phoneInput.setCustomValidity("");
      }
    });
  });
}


(async () => {
  await loadComponent("app", "components/header.html");
  await loadComponent("app", "components/hero.html");
  await loadComponent("app", "components/services.html");
  await loadComponent("app", "components/why-us.html");
  await loadComponent("app", "components/faq.html");
  // await loadComponent("app", "components/testimonials.html");
  await loadComponent("app", "components/partners.html");
  // await loadComponent("app", "components/contact-form.html");
  await loadComponent("app", "components/footer.html");
  setupContactFormPhoneValidation();
  document.dispatchEvent(new Event("components:loaded"));
})();
