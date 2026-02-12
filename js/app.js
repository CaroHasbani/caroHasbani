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

function setupContactFormSubmission() {
  const forms = document.querySelectorAll("#contactForm");

  forms.forEach((form) => {
    if (form.dataset.submitBound === "true") return;
    form.dataset.submitBound = "true";

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const nombre = String(formData.get("nombre") || "").trim();
      const telefono = String(formData.get("telefono") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const mensaje = String(formData.get("mensaje") || "").trim();

      const validPhone = /^[0-9]{1,13}$/.test(telefono);
      if (!validPhone) {
        const phoneInput = form.querySelector("#telefono");
        if (phoneInput) {
          phoneInput.setCustomValidity("Ingresa solo numeros (hasta 13 digitos).");
          phoneInput.reportValidity();
        }
        return;
      }

      const whatsappText = [
        "Hola, quiero hacer una consulta.",
        "",
        `Nombre: ${nombre}`,
        // `Telefono: ${telefono}`,
        // `Email: ${email}`,
        `Mensaje: ${mensaje}`
      ].join("\n");

      const whatsappUrl = `https://api.whatsapp.com/send?phone=5491167840614&text=${encodeURIComponent(
        whatsappText
      )}`;

      const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

      fetch("https://formsubmit.co/ajax/hasbanicarolina@gmail.com", {
        method: "POST",
        keepalive: true,
        headers: {
          Accept: "application/json"
        },
        body: formData
      }).catch((error) => {
        console.error("Error enviando email:", error);
      });

      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        if (!popup) {
          window.location.href = whatsappUrl;
        }
      }

      form.reset();
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
  setupContactFormSubmission();
  document.dispatchEvent(new Event("components:loaded"));
})();
