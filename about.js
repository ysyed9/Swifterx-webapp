document.addEventListener("DOMContentLoaded", () => {
  const roleToggle = document.querySelector(".role-toggle");
  if (roleToggle) {
    const buttons = roleToggle.querySelectorAll("button[data-role]");
    const customerBlocks = document.querySelectorAll(".why-card-desc-customer");
    const providerBlocks = document.querySelectorAll(".why-card-desc-provider");

    const setRole = (role) => {
      buttons.forEach((btn) => {
        const isOn = btn.getAttribute("data-role") === role;
        btn.classList.toggle("active", isOn);
        btn.setAttribute("aria-pressed", isOn ? "true" : "false");
      });
      customerBlocks.forEach((el) => el.classList.toggle("is-hidden", role !== "customer"));
      providerBlocks.forEach((el) => el.classList.toggle("is-hidden", role !== "provider"));
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => setRole(btn.getAttribute("data-role")));
    });

    setRole("customer");
  }

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        answer.hidden = true;
        item.classList.remove("open");
      } else {
        btn.setAttribute("aria-expanded", "true");
        answer.hidden = false;
        item.classList.add("open");
      }
    });
  });
});
