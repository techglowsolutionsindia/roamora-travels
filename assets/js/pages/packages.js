/* ==================================================
   ROAMORA PACKAGES FILTER + SLIDER STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-packages-slider]");
  if (!slider) return;

  const allCards = [...slider.querySelectorAll(".package-card")];
  const filterButtons = [...document.querySelectorAll("[data-filter]")];

  const prevButton = document.querySelector("[data-packages-prev]");
  const nextButton = document.querySelector("[data-packages-next]");
  const currentNumber = document.querySelector("[data-packages-current]");
  const totalNumber = document.querySelector("[data-packages-total]");
  const packageCount = document.querySelector("[data-package-count]");
  const packageCountLabel = document.querySelector(
    "[data-package-count-label]",
  );

  const params = new URLSearchParams(window.location.search);

  const destinationMap = {
    kashmir: "mountains",
    ladakh: "mountains",
    uttarakhand: "mountains",
    sikkim: "mountains",
    meghalaya: "nature",
    "andaman-nicobar": "islands",
    kerala: "nature",
    rajasthan: "heritage",
    varanasi: "spiritual",
    "tamil-nadu": "heritage",
    goa: "islands",
    "himachal-pradesh": "mountains",
  };

  const validFilters = [
    "all",
    "mountains",
    "nature",
    "heritage",
    "islands",
    "spiritual",
  ];

  let visibleCards = [...allCards];

  /* ==================================================
     NORMALIZE SEARCH VALUES STARTED
  ================================================== */

  const normalize = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const requestedDestination = normalize(params.get("destination"));

  const requestedFilter = normalize(params.get("filter"));
  const requestedMonth = params.get("month");
  const requestedTravellers = params.get("travellers");

  /* ==================================================
     NORMALIZE SEARCH VALUES ENDED
  ================================================== */

  /* ==================================================
     PRESERVE TRAVEL PREFERENCES STARTED
  ================================================== */

  allCards.forEach((card) => {
    const link = card.querySelector(".package-card-link");

    if (!link) return;

    const url = new URL(link.href, window.location.href);

    if (requestedMonth) {
      url.searchParams.set("month", requestedMonth);
    }

    if (requestedTravellers) {
      url.searchParams.set("travellers", requestedTravellers);
    }

    if (requestedMonth || requestedTravellers) {
      link.href = url.pathname.split("/").pop() + url.search + url.hash;
    }
  });

  /* ==================================================
     PRESERVE TRAVEL PREFERENCES ENDED
  ================================================== */

  /* ==================================================
     VISIBLE CARDS + SLIDER STEP STARTED
  ================================================== */

  const getVisibleCards = () => allCards.filter((card) => !card.hidden);

  const getCardStep = () => {
    const firstCard = visibleCards[0];

    if (!firstCard) return 0;

    const styles = window.getComputedStyle(slider);

    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  /* ==================================================
     VISIBLE CARDS + SLIDER STEP ENDED
  ================================================== */

  /* ==================================================
     UPDATE COUNTERS STARTED
  ================================================== */

  const updateCounters = () => {
    visibleCards = getVisibleCards();

    const total = visibleCards.length;

    if (packageCount) {
      packageCount.textContent = total;
    }

    if (packageCountLabel) {
      packageCountLabel.textContent = total === 1 ? "Journey" : "Journeys";
    }

    if (totalNumber) {
      totalNumber.textContent = String(total).padStart(2, "0");
    }
  };

  /* ==================================================
     UPDATE COUNTERS ENDED
  ================================================== */

  /* ==================================================
     UPDATE SLIDER STATUS STARTED
  ================================================== */

  const updateSliderStatus = () => {
    visibleCards = getVisibleCards();

    const total = visibleCards.length;
    const step = getCardStep();

    if (!total) {
      if (currentNumber) {
        currentNumber.textContent = "00";
      }

      if (prevButton) prevButton.disabled = true;
      if (nextButton) nextButton.disabled = true;

      return;
    }

    let activeIndex = step ? Math.round(slider.scrollLeft / step) : 0;

    activeIndex = Math.max(0, Math.min(activeIndex, total - 1));

    if (currentNumber) {
      currentNumber.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    const maxScrollLeft = Math.max(0, slider.scrollWidth - slider.clientWidth);

    if (prevButton) {
      prevButton.disabled = slider.scrollLeft <= 5;
    }

    if (nextButton) {
      nextButton.disabled =
        maxScrollLeft <= 5 || slider.scrollLeft >= maxScrollLeft - 5;
    }
  };

  /* ==================================================
     UPDATE SLIDER STATUS ENDED
  ================================================== */

  /* ==================================================
     UPDATE ACTIVE FILTER STARTED
  ================================================== */

  const updateActiveFilter = (filter) => {
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  /* ==================================================
     UPDATE ACTIVE FILTER ENDED
  ================================================== */

  /* ==================================================
     FILTER PACKAGE CARDS STARTED
  ================================================== */

  const filterPackages = (category = "all", destination = null) => {
    allCards.forEach((card) => {
      const cardCategory = normalize(card.dataset.category);
      const cardDestination = normalize(card.dataset.destination);

      const matches = destination
        ? cardDestination === destination
        : category === "all" || cardCategory === category;

      card.hidden = !matches;
    });

    visibleCards = getVisibleCards();
    slider.scrollLeft = 0;

    updateCounters();
    updateSliderStatus();
  };

  /* ==================================================
     FILTER PACKAGE CARDS ENDED
  ================================================== */

  /* ==================================================
     SCROLL TO RESULTS STARTED
  ================================================== */

  const scrollToResults = () => {
    const toolbar = document.querySelector(".package-toolbar");

    if (!toolbar) return;

    const header = document.querySelector(".header");

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const target =
      toolbar.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: "auto",
    });
  };

  /* ==================================================
     SCROLL TO RESULTS ENDED
  ================================================== */

  /* ==================================================
     INITIAL DESTINATION SEARCH STARTED
  ================================================== */

  let initialFilter = "all";
  let initialDestination = null;
  let shouldScroll = false;

  if (
    requestedDestination &&
    Object.prototype.hasOwnProperty.call(destinationMap, requestedDestination)
  ) {
    initialDestination = requestedDestination;
    initialFilter = destinationMap[requestedDestination];
    shouldScroll = true;
  } else if (validFilters.includes(requestedFilter)) {
    initialFilter = requestedFilter;
    shouldScroll = true;
  }

  updateActiveFilter(initialFilter);
  filterPackages(initialFilter, initialDestination);

  if (shouldScroll) {
    window.addEventListener(
      "load",
      () => {
        window.setTimeout(scrollToResults, 100);
      },
      { once: true },
    );
  }

  /* ==================================================
     INITIAL DESTINATION SEARCH ENDED
  ================================================== */

  /* ==================================================
     CATEGORY FILTER BUTTONS STARTED
  ================================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      updateActiveFilter(selectedFilter);
      filterPackages(selectedFilter);

      const url = new URL(window.location.href);

      url.searchParams.delete("destination");
      url.searchParams.set("filter", selectedFilter);

      window.history.replaceState(
        null,
        "",
        url.pathname + url.search + url.hash,
      );
    });
  });

  /* ==================================================
     CATEGORY FILTER BUTTONS ENDED
  ================================================== */

  /* ==================================================
     SLIDER NAVIGATION STARTED
  ================================================== */

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const step = getCardStep();

      if (!step) return;

      slider.scrollBy({
        left: step,
        behavior: "smooth",
      });
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const step = getCardStep();

      if (!step) return;

      slider.scrollBy({
        left: -step,
        behavior: "smooth",
      });
    });
  }

  slider.addEventListener("scroll", updateSliderStatus);
  window.addEventListener("resize", updateSliderStatus);

  /* ==================================================
     SLIDER NAVIGATION ENDED
  ================================================== */
});

/* ==================================================
   ROAMORA PACKAGES FILTER + SLIDER ENDED
================================================== */
