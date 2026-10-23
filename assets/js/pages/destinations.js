/* ==================================================
   INDIA DESTINATIONS PAGE JAVASCRIPT STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     POPULAR DESTINATIONS SLIDER STARTED
  ================================================== */

  const slider = document.querySelector("[data-destination-slider]");
  const track = document.querySelector("[data-destination-track]");
  const previousButton = document.querySelector("[data-destination-prev]");
  const nextButton = document.querySelector("[data-destination-next]");
  const dotsContainer = document.querySelector("[data-destination-dots]");

  if (slider && track && previousButton && nextButton && dotsContainer) {
    const cards = Array.from(
      track.querySelectorAll(".popular-destination-card"),
    );

    let currentIndex = 0;

    /* GET NUMBER OF VISIBLE CARDS */

    const getVisibleCards = () => {
      if (window.innerWidth <= 700) {
        return 1;
      }

      if (window.innerWidth <= 1050) {
        return 2;
      }

      return 3;
    };

    /* GET MAXIMUM SLIDER POSITION */

    const getMaximumIndex = () => {
      return Math.max(0, cards.length - getVisibleCards());
    };

    /* CREATE DOTS */

    const createDots = () => {
      dotsContainer.innerHTML = "";

      const totalPositions = getMaximumIndex() + 1;

      for (let index = 0; index < totalPositions; index += 1) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "popular-destinations-dot";
        dot.setAttribute(
          "aria-label",
          `Show destination position ${index + 1}`,
        );

        dot.addEventListener("click", () => {
          currentIndex = index;
          updateSlider();
        });

        dotsContainer.appendChild(dot);
      }
    };

    /* UPDATE SLIDER */

    const updateSlider = () => {
      const maximumIndex = getMaximumIndex();

      currentIndex = Math.min(Math.max(currentIndex, 0), maximumIndex);

      const firstCard = cards[0];

      if (!firstCard) {
        return;
      }

      const cardWidth = firstCard.getBoundingClientRect().width;

      const trackStyles = window.getComputedStyle(track);

      const gap =
        parseFloat(trackStyles.columnGap) || parseFloat(trackStyles.gap) || 0;

      const movement = currentIndex * (cardWidth + gap);

      track.style.transform = `translateX(-${movement}px)`;

      /* UPDATE ARROWS */

      previousButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === maximumIndex;

      /* UPDATE DOTS */

      const dots = dotsContainer.querySelectorAll(".popular-destinations-dot");

      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;

        dot.classList.toggle("is-active", isActive);

        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    /* PREVIOUS */

    previousButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= 1;

        updateSlider();
      }
    });

    /* NEXT */

    nextButton.addEventListener("click", () => {
      const maximumIndex = getMaximumIndex();

      if (currentIndex < maximumIndex) {
        currentIndex += 1;

        updateSlider();
      }
    });

    /* KEYBOARD ARROW SUPPORT */

    slider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex -= 1;
        updateSlider();
      }

      if (event.key === "ArrowRight" && currentIndex < getMaximumIndex()) {
        currentIndex += 1;
        updateSlider();
      }
    });

    /* WINDOW RESIZE */

    let resizeTimer;

    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        currentIndex = Math.min(currentIndex, getMaximumIndex());

        createDots();
        updateSlider();
      }, 120);
    });

    /* INITIALISE */

    createDots();
    updateSlider();
  }

  /* ==================================================
     POPULAR DESTINATIONS SLIDER ENDED
  ================================================== */
});

/* ==================================================
   INDIA DESTINATIONS PAGE JAVASCRIPT ENDED
================================================== */

/* ==================================================
   FEATURED INDIA JOURNEYS SLIDER STARTED
================================================== */

const featuredJourneysSlider = document.querySelector(
  "[data-featured-journeys-slider]",
);

if (featuredJourneysSlider) {
  const track = featuredJourneysSlider.querySelector(
    "[data-featured-journeys-track]",
  );

  const cards = Array.from(track.querySelectorAll(".featured-journey-card"));

  const previousButton = featuredJourneysSlider.querySelector(
    "[data-featured-journeys-prev]",
  );

  const nextButton = featuredJourneysSlider.querySelector(
    "[data-featured-journeys-next]",
  );

  const dotsContainer = featuredJourneysSlider.querySelector(
    "[data-featured-journeys-dots]",
  );

  let currentIndex = 0;

  let visibleCards = 4;

  let dots = [];

  /* ==================================================
     GET VISIBLE CARDS STARTED
  ================================================== */

  function getVisibleCards() {
    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1050) {
      return 2;
    }

    return 4;
  }

  /* ==================================================
     GET VISIBLE CARDS ENDED
  ================================================== */

  /* ==================================================
     GET MAX INDEX STARTED
  ================================================== */

  function getMaxIndex() {
    return Math.max(0, cards.length - visibleCards);
  }

  /* ==================================================
     GET MAX INDEX ENDED
  ================================================== */

  /* ==================================================
     CREATE DOTS STARTED
  ================================================== */

  function createDots() {
    dotsContainer.innerHTML = "";

    dots = [];

    const maxIndex = getMaxIndex();

    for (let index = 0; index <= maxIndex; index += 1) {
      const dot = document.createElement("button");

      dot.type = "button";

      dot.className = "featured-journeys-dot";

      dot.setAttribute("aria-label", `Show journey position ${index + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = index;

        updateSlider();
      });

      dotsContainer.appendChild(dot);

      dots.push(dot);
    }
  }

  /* ==================================================
     CREATE DOTS ENDED
  ================================================== */

  /* ==================================================
     UPDATE SLIDER STARTED
  ================================================== */

  function updateSlider() {
    if (!cards.length) {
      return;
    }

    const maxIndex = getMaxIndex();

    currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

    const firstCard = cards[0];

    const cardWidth = firstCard.getBoundingClientRect().width;

    const trackStyles = window.getComputedStyle(track);

    const gap =
      Number.parseFloat(trackStyles.columnGap) ||
      Number.parseFloat(trackStyles.gap) ||
      0;

    const movement = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${movement}px)`;

    previousButton.disabled = currentIndex === 0;

    nextButton.disabled = currentIndex === maxIndex;

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;

      dot.classList.toggle("is-active", isActive);

      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  /* ==================================================
     UPDATE SLIDER ENDED
  ================================================== */

  /* ==================================================
     PREVIOUS / NEXT STARTED
  ================================================== */

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;

      updateSlider();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex += 1;

      updateSlider();
    }
  });

  /* ==================================================
     PREVIOUS / NEXT ENDED
  ================================================== */

  /* ==================================================
     FAVOURITES STARTED
  ================================================== */

  const favouriteButtons = featuredJourneysSlider.querySelectorAll(
    ".featured-journey-favourite",
  );

  favouriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.toggle("is-active");

      button.textContent = isActive ? "♥" : "♡";

      button.setAttribute("aria-pressed", String(isActive));
    });
  });

  /* ==================================================
     FAVOURITES ENDED
  ================================================== */

  /* ==================================================
     RESPONSIVE UPDATE STARTED
  ================================================== */

  function refreshFeaturedJourneysSlider() {
    visibleCards = getVisibleCards();

    currentIndex = Math.min(currentIndex, getMaxIndex());

    createDots();

    updateSlider();
  }

  window.addEventListener("resize", refreshFeaturedJourneysSlider);

  refreshFeaturedJourneysSlider();

  /* ==================================================
     RESPONSIVE UPDATE ENDED
  ================================================== */
}

/* ==================================================
   FEATURED INDIA JOURNEYS SLIDER ENDED
================================================== */

/* ==================================================
   DESTINATION FAQ ACCORDION STARTED
================================================== */

const destinationFaqItems = document.querySelectorAll(".destination-faq-item");

destinationFaqItems.forEach((item) => {
  const trigger = item.querySelector(".destination-faq-trigger");

  const arrow = item.querySelector(".destination-faq-arrow");

  trigger.addEventListener("click", () => {
    const isCurrentlyOpen = item.classList.contains("is-open");

    /* Close all FAQ items */

    destinationFaqItems.forEach((faqItem) => {
      const faqTrigger = faqItem.querySelector(".destination-faq-trigger");

      const faqArrow = faqItem.querySelector(".destination-faq-arrow");

      faqItem.classList.remove("is-open");

      faqTrigger.setAttribute("aria-expanded", "false");

      faqArrow.textContent = "⌄";
    });

    /* Open selected FAQ if it was closed */

    if (!isCurrentlyOpen) {
      item.classList.add("is-open");

      trigger.setAttribute("aria-expanded", "true");

      arrow.textContent = "⌃";
    }
  });
});

/* ==================================================
   DESTINATION FAQ ACCORDION ENDED
================================================== */

/* ==================================================
   INDIA DESTINATIONS NAVBAR NAVIGATION STARTED
================================================== */

const destinationMenuLinks = document.querySelectorAll(
  "[data-destination-menu-target]",
);

const popularDestinationsSection = document.querySelector(
  "#popular-india-destinations",
);

const popularDestinationsViewport = document.querySelector(
  ".popular-destinations-slider-viewport",
);

if (
  destinationMenuLinks.length &&
  popularDestinationsSection &&
  popularDestinationsViewport
) {
  destinationMenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.dataset.destinationMenuTarget;

      /* Close Dropdown */

      const dropdown = link.closest(".has-dropdown");

      if (dropdown) {
        dropdown.classList.remove("is-open");

        const trigger = dropdown.querySelector(".dropdown-trigger");

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }
      }

      /* Get Header Height */

      const header = document.querySelector(".header");

      const headerHeight = header ? header.offsetHeight : 0;

      /* ==================================================
         KEEP ALL 6 OPTIONS AT EXACT SAME VERTICAL POSITION
      ================================================== */

      const targetTop = popularDestinationsSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      /* ==================================================
         ALL INDIA DESTINATIONS
      ================================================== */

      if (targetId === "all") {
        popularDestinationsViewport.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        history.replaceState(null, "", "#popular-india-destinations");

        return;
      }

      /* ==================================================
         INDIVIDUAL DESTINATION
      ================================================== */

      const targetCard = document.getElementById(targetId);

      if (!targetCard) return;

      popularDestinationsViewport.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });

      history.replaceState(null, "", `#${targetId}`);
    });
  });
}

/* ==================================================
   INDIA DESTINATIONS NAVBAR NAVIGATION ENDED
================================================== */

/* ==================================================
   SEARCH DESTINATION HASH SCROLL FIX STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const destinationSection = document.querySelector(
    "#popular-india-destinations",
  );

  const destinationTrack = document.querySelector("[data-destination-track]");

  if (!destinationSection || !destinationTrack) return;

  const destinationHashMap = {
    "#kashmir": "kashmir",
    "#kerala": "kerala",
    "#rajasthan": "rajasthan",
    "#goa": "goa",
    "#himachal-pradesh": "himachal-pradesh",
  };

  const handleDestinationHash = () => {
    const hash = window.location.hash.toLowerCase();

    const destinationId = destinationHashMap[hash];

    if (!destinationId) return;

    const destinationCard = document.getElementById(destinationId);

    if (!destinationCard) return;

    /*
     * First move the horizontal destination slider
     * so the requested destination is visible.
     */
    destinationCard.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "start",
    });

    /*
     * Then move the page itself to the TOP
     * of the complete Popular India Destinations section.
     */
    window.setTimeout(() => {
      const header = document.querySelector(".header");

      const headerHeight = header ? header.getBoundingClientRect().height : 0;

      const sectionTop =
        destinationSection.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "auto",
      });
    }, 80);
  };

  handleDestinationHash();

  window.addEventListener("hashchange", handleDestinationHash);
});

/* ==================================================
   SEARCH DESTINATION HASH SCROLL FIX ENDED
================================================== */
