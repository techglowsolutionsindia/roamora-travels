/* ==================================================
   CUSTOM TRIP PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-custom-trip-form]");

  const successMessage = document.querySelector("[data-trip-success]");
  const closeSuccessButton = document.querySelector(
    "[data-close-trip-success]",
  );

  /* ==================================================
     PAGE 1 HIDDEN FIELDS STARTED
  ================================================== */

  const destinationInput = document.querySelector("#trip-destination");
  const travellersInput = document.querySelector("#trip-travellers");
  const travelMonthInput = document.querySelector("#trip-travel-month");
  const travelWithInput = document.querySelector("#trip-travel-with");
  const startingCityInput = document.querySelector("#trip-starting-city");
  const travelStyleInput = document.querySelector("#trip-travel-style");
  const tripWishesInput = document.querySelector("#trip-wishes");

  /* ==================================================
     PAGE 1 HIDDEN FIELDS ENDED
  ================================================== */

  /* ==================================================
     TRIP PREFERENCES SUMMARY STARTED
  ================================================== */

  const summaryDestination = document.querySelector(
    "[data-summary-destination]",
  );

  const summaryTravellers = document.querySelector("[data-summary-travellers]");

  const summaryTravelWith = document.querySelector(
    "[data-summary-travel-with]",
  );

  const summaryStyle = document.querySelector("[data-summary-style]");

  const summaryWishes = document.querySelector("[data-summary-wishes]");

  /* ==================================================
     TRIP PREFERENCES SUMMARY ENDED
  ================================================== */

  /* ==================================================
     READ PAGE 1 DETAILS FROM URL STARTED
  ================================================== */

  const urlParams = new URLSearchParams(window.location.search);

  const urlDestination = urlParams.get("destination") || "";
  const urlTravellers = urlParams.get("travellers") || "";
  const urlTravelMonth = urlParams.get("travelMonth") || "";
  const urlStartingCity = urlParams.get("startingCity") || "";

  const urlTravelWith =
    urlParams.get("travelWith") || urlParams.get("travel-with") || "";

  const urlStyle =
    urlParams.get("style") || urlParams.get("travel-style") || "";

  const urlWishes =
    urlParams.get("wishes") || urlParams.get("trip-wishes") || "";

  /* ==================================================
     READ PAGE 1 DETAILS FROM URL ENDED
  ================================================== */

  /* ==================================================
     DISPLAY VALUE MAPPING STARTED
  ================================================== */

  const destinationMap = {
    kashmir: "Kashmir",
    ladakh: "Ladakh",
    uttarakhand: "Uttarakhand",
    sikkim: "Sikkim",
    meghalaya: "Meghalaya",
    andaman: "Andaman",
    "andaman-nicobar": "Andaman & Nicobar",
    kerala: "Kerala",
    rajasthan: "Rajasthan",
    varanasi: "Varanasi",
    "tamil-nadu": "Tamil Nadu",
    goa: "Goa",
    "himachal-pradesh": "Himachal Pradesh",
    "not-sure": "Not Sure Yet",
  };

  const travellersMap = {
    1: "1 Traveller",
    2: "2 Travellers",
    "3-4": "3–4 Travellers",
    "5-8": "5–8 Travellers",
    group: "9+ Travellers",
  };

  const travelWithMap = {
    couple: "Couple",
    family: "Family",
    friends: "Friends",
    solo: "Solo",
  };

  const styleMap = {
    relaxing: "Relaxing",
    adventure: "Adventure",
    culture: "Culture",
    luxury: "Luxury",
    mixed: "A Little of Everything",
    "a little of everything": "A Little of Everything",
  };

  const getMappedValue = (value, map) => {
    if (!value) return "";

    const normalisedValue = value.toLowerCase();

    return map[normalisedValue] || value;
  };

  /* ==================================================
     DISPLAY VALUE MAPPING ENDED
  ================================================== */

  /* ==================================================
     STORE PAGE 1 DETAILS STARTED
  ================================================== */

  if (destinationInput) {
    destinationInput.value = urlDestination;
  }

  if (travellersInput) {
    travellersInput.value = urlTravellers;
  }

  if (travelMonthInput) {
    travelMonthInput.value = urlTravelMonth;
  }

  if (startingCityInput) {
    startingCityInput.value = urlStartingCity;
  }

  if (travelWithInput) {
    travelWithInput.value = urlTravelWith;
  }

  if (travelStyleInput) {
    travelStyleInput.value = urlStyle;
  }

  if (tripWishesInput) {
    tripWishesInput.value = urlWishes;
  }

  /* ==================================================
     STORE PAGE 1 DETAILS ENDED
  ================================================== */

  /* ==================================================
     UPDATE TRIP PREFERENCES SUMMARY STARTED
  ================================================== */

  if (summaryDestination) {
    summaryDestination.textContent =
      getMappedValue(urlDestination, destinationMap) || "Not selected";
  }

  if (summaryTravellers) {
    summaryTravellers.textContent =
      getMappedValue(urlTravellers, travellersMap) || "Not selected";
  }

  if (summaryTravelWith) {
    summaryTravelWith.textContent =
      getMappedValue(urlTravelWith, travelWithMap) || "Not selected";
  }

  if (summaryStyle) {
    summaryStyle.textContent =
      getMappedValue(urlStyle, styleMap) || "Not selected";
  }

  if (summaryWishes) {
    summaryWishes.textContent =
      urlWishes.trim() || "No additional details shared.";
  }

  /* ==================================================
     UPDATE TRIP PREFERENCES SUMMARY ENDED
  ================================================== */

  /* ==================================================
     FORM SUBMISSION STARTED
  ================================================== */

  const ENQUIRY_API_URL =
    "https://script.google.com/macros/s/AKfycbwh_VLudhUytDs6MUa_PpDfNWVMytA-wvuRMaZlnnJ5XcHJ1k-YgOoiM6EdJUn8md3X/exec";

  if (form && successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const phoneInput = form.querySelector("#trip-phone");

    /* International Phone Validation Started */

    const validatePhone = () => {
      if (!phoneInput) return true;

      const phone = phoneInput.value.trim();
      const match = phone.match(/^\+([1-9]\d{0,2}) ([0-9]{4,14})$/);

      let message = "";

      if (!match) {
        message =
          "Enter a valid phone number with country code, for example +91 9876543210.";
      } else {
        const countryCode = match[1];
        const number = match[2];
        const totalDigits = countryCode.length + number.length;

        if (countryCode === "91" && !/^[6-9]\d{9}$/.test(number)) {
          message = "Enter exactly 10 valid Indian mobile digits after +91.";
        } else if (countryCode === "1" && !/^[2-9]\d{9}$/.test(number)) {
          message = "Enter a valid 10-digit number after +1.";
        } else if (countryCode === "44" && !/^\d{9,10}$/.test(number)) {
          message = "Enter a valid UK phone number after +44.";
        } else if (countryCode === "971" && !/^\d{8,9}$/.test(number)) {
          message = "Enter a valid UAE phone number after +971.";
        } else if (totalDigits < 8 || totalDigits > 15) {
          message = "Enter a valid international phone number.";
        }
      }

      phoneInput.setCustomValidity(message);
      return !message;
    };

    if (phoneInput) {
      if (!phoneInput.value.trim()) {
        phoneInput.value = "+91 ";
      }

      phoneInput.addEventListener("focus", () => {
        if (phoneInput.value === "+91 ") {
          phoneInput.setSelectionRange(4, 4);
        }
      });

      phoneInput.addEventListener("click", () => {
        if (phoneInput.value === "+91 ") {
          phoneInput.setSelectionRange(4, 4);
        }
      });

      phoneInput.addEventListener("input", () => {
        phoneInput.setCustomValidity("");
      });

      phoneInput.addEventListener("blur", validatePhone);
    }

    /* International Phone Validation Ended */

    const submissionMessage = document.createElement("p");
    submissionMessage.setAttribute("role", "status");
    submissionMessage.setAttribute("aria-live", "polite");
    submissionMessage.style.gridColumn = "1 / -1";
    submissionMessage.style.marginTop = "10px";

    submitButton.insertAdjacentElement("afterend", submissionMessage);

    let isSubmitting = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (isSubmitting) return;

      validatePhone();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new URLSearchParams(new FormData(form));

      isSubmitting = true;
      submitButton.disabled = true;

      submissionMessage.textContent = "Submitting your enquiry, please wait...";
      submissionMessage.style.color = "";

      try {
        const response = await fetch(ENQUIRY_API_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Unable to submit your enquiry.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Unable to submit your enquiry.");
        }

        submissionMessage.textContent =
          "Your trip request has been submitted successfully.";
        submissionMessage.style.color = "#16a34a";

        await new Promise((resolve) => setTimeout(resolve, 3000));

        submissionMessage.textContent = "";

        form.hidden = false;
        successMessage.hidden = false;

        document.body.style.overflow = "hidden";
      } catch (error) {
        submissionMessage.textContent =
          error.message || "Submission failed. Please try again.";
        submissionMessage.style.color = "#dc2626";
      } finally {
        isSubmitting = false;
        submitButton.disabled = false;
      }
    });
  }

  /* ==================================================
     FORM SUBMISSION ENDED
  ================================================== */

  /* ==================================================
     SUCCESS POPUP CLOSE BUTTON STARTED
  ================================================== */

  if (closeSuccessButton && successMessage) {
    closeSuccessButton.addEventListener("click", () => {
      /* Close Success Popup */
      successMessage.hidden = true;
      document.body.style.overflow = "";

      /* Reset Form Fields */
      if (form) {
        form.reset();

        if (phoneInput) {
          phoneInput.value = "+91 ";
          phoneInput.setCustomValidity("");
        }

        form.querySelectorAll('input[type="hidden"]').forEach((input) => {
          input.value = "";
        });

        const submissionStatus = form.querySelector('[role="status"]');

        if (submissionStatus) {
          submissionStatus.textContent = "";
        }
      }

      /* Reset Trip Preferences Summary */
      if (summaryDestination) {
        summaryDestination.textContent = "Not selected";
      }

      if (summaryTravellers) {
        summaryTravellers.textContent = "Not selected";
      }

      if (summaryTravelWith) {
        summaryTravelWith.textContent = "Not selected";
      }

      if (summaryStyle) {
        summaryStyle.textContent = "Not selected";
      }

      if (summaryWishes) {
        summaryWishes.textContent = "No additional details shared.";
      }

      /* Remove Previous Trip Preferences From URL */
      window.history.replaceState({}, "", window.location.pathname);
    });
  }

  /* ==================================================
     SUCCESS POPUP CLOSE BUTTON ENDED
  ================================================== */
});

/* ==================================================
   CUSTOM TRIP PAGE ENDED
================================================== */
