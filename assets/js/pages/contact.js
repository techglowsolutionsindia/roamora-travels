/* ==================================================
   ROAMORA CONTACT FORM STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("[data-contact-form]");
  const formMessage = document.querySelector("[data-contact-form-message]");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".contact-submit");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending Enquiry...";
    }

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.classList.remove("is-success", "is-error");
    }

    /* ==================================================
   ROAMORA DYNAMIC EMAIL SUBJECT STARTED
================================================== */

    const formData = new FormData(contactForm);

    const travellerName = formData.get("Traveller Name");

    formData.set(
      "subject",
      travellerName
        ? `New Roamora Travels Enquiry — ${travellerName}`
        : "New Roamora Travels Enquiry",
    );

    /* ==================================================
   ROAMORA DYNAMIC EMAIL SUBJECT ENDED
================================================== */

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (formMessage) {
          formMessage.textContent =
            "✓ Thank you! Your enquiry has been sent successfully.";

          formMessage.classList.remove("is-error");
          formMessage.classList.add("is-success");

          // Hide success message automatically after 5 seconds
          setTimeout(() => {
            formMessage.textContent = "";
            formMessage.classList.remove("is-success");
          }, 5000);
        }

        contactForm.reset();
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (error) {
      if (formMessage) {
        formMessage.textContent =
          "Sorry, we couldn't send your enquiry. Please try again.";
        formMessage.classList.add("is-error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          'Send My Enquiry <span aria-hidden="true">→</span>';
      }
    }
  });
});

/* ==================================================
   ROAMORA CONTACT FORM ENDED
================================================== */

/* ==================================================
   ROAMORA CONTACT FAQ ACCORDION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".contact-faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      if (!answer) return;

      question.setAttribute("aria-expanded", String(!isExpanded));
      answer.hidden = isExpanded;

      const icon = question.querySelector(".contact-faq-icon");

      if (icon) {
        icon.textContent = isExpanded ? "+" : "−";
      }
    });
  });
});

/* ==================================================
   ROAMORA CONTACT FAQ ACCORDION ENDED
================================================== */
