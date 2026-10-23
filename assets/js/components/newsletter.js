/* ==================================================
   GLOBAL NEWSLETTER SUBSCRIPTION STARTED
================================================== */

(() => {
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");
  const emailInput = document.getElementById("footer-email");

  if (!newsletterForm || !newsletterMessage || !emailInput) return;

  const NEWSLETTER_API_URL =
    "https://script.google.com/macros/s/AKfycbzlrvmffmAcuKWXuxhC-ggkhkGFWEQQshOK-MRxxQkoaykB6i4FEL99M5Iu6J64iCy5qg/exec";

  let resetTimer;

  newsletterForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      newsletterMessage.textContent = "Please enter your email address.";
      return;
    }

    clearTimeout(resetTimer);

    newsletterMessage.textContent = "Subscribing...";
    newsletterMessage.style.color = "";
    newsletterMessage.style.fontSize = "0.78rem";

    try {
      const response = await fetch(NEWSLETTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          source: document.title,
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter subscription failed.");
      }

      newsletterMessage.textContent =
        "Thank you! Travel inspiration is on its way.";
      newsletterMessage.style.color = "#22c55e";

      newsletterForm.reset();

      resetTimer = setTimeout(() => {
        newsletterMessage.textContent = "";
        newsletterMessage.style.color = "";
        newsletterMessage.style.fontSize = "";
      }, 3000);
    } catch (error) {
      newsletterMessage.textContent =
        "Unable to subscribe at the moment. Please try again.";
      newsletterMessage.style.color = "";
    }
  });
})();

/* ==================================================
   GLOBAL NEWSLETTER SUBSCRIPTION ENDED
================================================== */
