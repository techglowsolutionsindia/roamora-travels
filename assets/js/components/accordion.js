/* ==================================================
   PACKAGE DETAILS FAQ ACCORDION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".package-faq .package-faq-item");

  faqItems.forEach(function (item) {
    const button = item.querySelector(".package-faq-question");
    const answer = item.querySelector(".package-faq-answer");
    const icon = item.querySelector(".package-faq-icon");

    if (!button || !answer) return;

    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // Close all FAQ answers
      faqItems.forEach(function (otherItem) {
        const otherButton = otherItem.querySelector(".package-faq-question");
        const otherAnswer = otherItem.querySelector(".package-faq-answer");
        const otherIcon = otherItem.querySelector(".package-faq-icon");

        if (otherButton && otherAnswer) {
          otherButton.setAttribute("aria-expanded", "false");
          otherAnswer.hidden = true;

          if (otherIcon) {
            otherIcon.textContent = "+";
          }
        }
      });

      // Open the selected FAQ
      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        answer.hidden = false;

        if (icon) {
          icon.textContent = "−";
        }
      }
    });
  });
});

/* ==================================================
   PACKAGE DETAILS FAQ ACCORDION ENDED
================================================== */
