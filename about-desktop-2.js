document.addEventListener("DOMContentLoaded", () => {
  // Tabs: Why choose SwifterX
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((btn) => {
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
