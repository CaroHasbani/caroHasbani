async function loadComponent(targetId, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(targetId).insertAdjacentHTML("beforeend", html);
}

(async () => {
  await loadComponent("app", "components/header.html");
  await loadComponent("app", "components/hero.html");
  await loadComponent("app", "components/services.html");
  await loadComponent("app", "components/why-us.html");
  await loadComponent("app", "components/faq.html");
  // await loadComponent("app", "components/testimonials.html");
  await loadComponent("app", "components/partners.html");
  await loadComponent("app", "components/contact-form.html");
  await loadComponent("app", "components/footer.html");

  document.dispatchEvent(new Event("components:loaded"));
})();
