/* ==================================================
   CUSTOM TRIP PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-custom-trip-form]");

  const successMessage = document.querySelector("[data-trip-success]");
  const editTripButton = document.querySelector("[data-edit-trip]");
  const closeSuccessButton = document.querySelector(
    "[data-close-trip-success]",
  );

  /* ==================================================
     PAGE 1 HIDDEN FIELDS STARTED
  ================================================== */

  const destinationInput = document.querySelector("#trip-destination");
  const travellersInput = document.querySelector("#trip-travellers");
  const travelWithInput = document.querySelector("#trip-travel-with");
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

  const summaryTravellers = document.querySelector(
    "[data-summary-travellers]",
  );

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

  const urlTravelWith =
    urlParams.get("travelWith") ||
    urlParams.get("travel-with") ||
    "";

  const urlStyle =
    urlParams.get("style") ||
    urlParams.get("travel-style") ||
    "";

  const urlWishes =
    urlParams.get("wishes") ||
    urlParams.get("trip-wishes") ||
    "";

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
    "1": "1 Traveller",
    "2": "2 Travellers",
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

  if (form && successMessage) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.hidden = true;
      successMessage.hidden = false;

      document.body.style.overflow = "hidden";
    });
  }

  /* ==================================================
     FORM SUBMISSION ENDED
  ================================================== */

  /* ==================================================
     EDIT PREFERENCES STARTED
  ================================================== */

  if (editTripButton && form && successMessage) {
    editTripButton.addEventListener("click", () => {
      successMessage.hidden = true;
      form.hidden = false;

      document.body.style.overflow = "";
    });
  }

  /* ==================================================
     EDIT PREFERENCES ENDED
  ================================================== */

  /* ==================================================
     SUCCESS POPUP CLOSE BUTTON STARTED
  ================================================== */

  if (closeSuccessButton && successMessage) {
    closeSuccessButton.addEventListener("click", () => {
      document.body.style.overflow = "";

      window.location.href = "packages.html?filter=all";
    });
  }

  /* ==================================================
     SUCCESS POPUP CLOSE BUTTON ENDED
  ================================================== */
});

/* ==================================================
   CUSTOM TRIP PAGE ENDED
================================================== */