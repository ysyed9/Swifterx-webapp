document.addEventListener("DOMContentLoaded", () => {
  const roleToggle = document.querySelector(".role-toggle");
  let setRole = () => {};

  const syncHeroButtons = (role) => {
    document.querySelectorAll(".hero-role-btn").forEach((a) => {
      const r = a.getAttribute("data-activate-role");
      a.classList.toggle("active", r === role);
    });
  };

  if (roleToggle) {
    const buttons = roleToggle.querySelectorAll("button[data-role]");
    const customerBlocks = document.querySelectorAll(".why-card-desc-customer");
    const providerBlocks = document.querySelectorAll(".why-card-desc-provider");
    const titleCustomer = document.querySelectorAll(".why-card-title-customer");
    const titleProvider = document.querySelectorAll(".why-card-title-provider");
    const blurbCustomer = document.querySelector(".why-role-blurb-customer");
    const blurbProvider = document.querySelector(".why-role-blurb-provider");

    setRole = (role) => {
      if (role !== "customer" && role !== "provider") return;
      buttons.forEach((btn) => {
        const isOn = btn.getAttribute("data-role") === role;
        btn.classList.toggle("active", isOn);
        btn.setAttribute("aria-pressed", isOn ? "true" : "false");
      });
      customerBlocks.forEach((el) => el.classList.toggle("is-hidden", role !== "customer"));
      providerBlocks.forEach((el) => el.classList.toggle("is-hidden", role !== "provider"));
      titleCustomer.forEach((el) => {
        el.classList.toggle("is-hidden", role !== "customer");
        el.setAttribute("aria-hidden", role !== "customer" ? "true" : "false");
      });
      titleProvider.forEach((el) => {
        el.classList.toggle("is-hidden", role !== "provider");
        el.setAttribute("aria-hidden", role !== "provider" ? "true" : "false");
      });
      if (blurbCustomer && blurbProvider) {
        blurbCustomer.classList.toggle("is-hidden", role !== "customer");
        blurbProvider.classList.toggle("is-hidden", role !== "provider");
        blurbCustomer.setAttribute("aria-hidden", role !== "customer" ? "true" : "false");
        blurbProvider.setAttribute("aria-hidden", role !== "provider" ? "true" : "false");
      }
      syncHeroButtons(role);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => setRole(btn.getAttribute("data-role")));
    });

    const initialRole = window.location.hash === "#provider" ? "provider" : "customer";
    setRole(initialRole);
    if (window.location.hash === "#provider") {
      document.getElementById("why-choose")?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#why-choose`);
    }

    document.querySelectorAll("a[data-activate-role]").forEach((el) => {
      el.addEventListener("click", () => {
        const r = el.getAttribute("data-activate-role");
        setRole(r);
      });
    });
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
