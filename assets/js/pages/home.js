/* ==================================================
   TRAVELLER TESTIMONIALS STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const testimonialShowcase = document.querySelector(
    "[data-testimonial-showcase]",
  );

  if (!testimonialShowcase) return;

  const testimonialImage = testimonialShowcase.querySelector(
    "[data-testimonial-image]",
  );

  const testimonialQuote = testimonialShowcase.querySelector(
    "[data-testimonial-quote]",
  );

  const testimonialName = testimonialShowcase.querySelector(
    "[data-testimonial-name]",
  );

  const testimonialTrip = testimonialShowcase.querySelector(
    "[data-testimonial-trip]",
  );

  const testimonialLocation = testimonialShowcase.querySelector(
    "[data-testimonial-location]",
  );

  const testimonialTabs = testimonialShowcase.querySelectorAll(
    "[data-testimonial-tab]",
  );

  testimonialTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("is-active")) return;

      testimonialTabs.forEach((item) => {
        item.classList.remove("is-active");
      });

      tab.classList.add("is-active");

      testimonialImage.classList.add("is-changing");
      testimonialQuote.classList.add("is-changing");

      window.setTimeout(() => {
        testimonialImage.src = tab.dataset.image;
        testimonialImage.alt = tab.dataset.alt;

        testimonialQuote.textContent = tab.dataset.quote;
        testimonialName.textContent = tab.dataset.name;
        testimonialTrip.textContent = tab.dataset.trip;
        testimonialLocation.textContent = tab.dataset.location;

        testimonialImage.classList.remove("is-changing");
        testimonialQuote.classList.remove("is-changing");
      }, 180);
    });
  });
});

/* ==================================================
   TRAVELLER TESTIMONIALS ENDED
================================================== */

/* ==================================================
   FAQ ACCORDION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.querySelector("[data-roamora-faq]");

  if (!faqContainer) return;

  const faqItems = faqContainer.querySelectorAll(".roamora-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".roamora-faq-question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("is-open");

        const faqButton = faqItem.querySelector(".roamora-faq-question");

        faqButton.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});

/* ==================================================
   FAQ ACCORDION ENDED
================================================== */

/* ==================================================
   TRAVEL BLOG INTERACTION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const blogTrack = document.querySelector("[data-blog-track]");

  if (!blogTrack) return;

  const blogCards = Array.from(blogTrack.querySelectorAll("[data-blog-card]"));

  const filterButtons = document.querySelectorAll("[data-blog-filter]");

  const previousButton = document.querySelector("[data-blog-prev]");

  const nextButton = document.querySelector("[data-blog-next]");

  const currentCounter = document.querySelector("[data-blog-current]");

  const totalCounter = document.querySelector("[data-blog-total]");

  const blogDots = Array.from(document.querySelectorAll("[data-blog-dot]"));

  let activeFilter = "all";
  let currentIndex = 0;

  const getVisibleCount = () => {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 768) return 2;

    return 3;
  };

  const getFilteredCards = () => {
    return blogCards.filter((card) => {
      return activeFilter === "all" || card.dataset.category === activeFilter;
    });
  };

  const updateBlogCarousel = () => {
    const filteredCards = getFilteredCards();
    const visibleCount = getVisibleCount();

    const maximumIndex = Math.max(0, filteredCards.length - visibleCount);

    currentIndex = Math.min(currentIndex, maximumIndex);

    blogCards.forEach((card) => {
      const matchesFilter =
        activeFilter === "all" || card.dataset.category === activeFilter;

      card.classList.toggle("is-hidden", !matchesFilter);
    });

    const firstVisibleCard = filteredCards[0];

    if (!firstVisibleCard) return;

    const cardWidth = firstVisibleCard.getBoundingClientRect().width;

    const trackStyles = window.getComputedStyle(blogTrack);

    const trackGap =
      parseFloat(trackStyles.columnGap) || parseFloat(trackStyles.gap) || 0;

    const translateAmount = currentIndex * (cardWidth + trackGap);

    blogTrack.style.transform = `translateX(-${translateAmount}px)`;

    if (currentCounter) {
      currentCounter.textContent = String(currentIndex + 1).padStart(2, "0");
    }

    if (totalCounter) {
      totalCounter.textContent = String(filteredCards.length).padStart(2, "0");
    }

    /* ==================================================
   TRAVEL BLOG PAGINATION DOTS STARTED
================================================== */
    blogDots.forEach((dot, dotIndex) => {
      const isAvailable = dotIndex <= maximumIndex;
      const isActive = dotIndex === currentIndex;

      dot.hidden = !isAvailable;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
    /* ==================================================
   TRAVEL BLOG PAGINATION DOTS ENDED
================================================== */

    if (previousButton) {
      previousButton.disabled = currentIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = currentIndex >= maximumIndex;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.blogFilter;
      currentIndex = 0;

      filterButtons.forEach((filterButton) => {
        filterButton.classList.remove("is-active");
      });

      button.classList.add("is-active");

      updateBlogCarousel();
    });
  });

  /* Travel Blog Pagination Dot Click */
  blogDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const requestedIndex = Number(dot.dataset.blogDot);

      const filteredCards = getFilteredCards();

      const maximumIndex = Math.max(
        0,
        filteredCards.length - getVisibleCount(),
      );

      currentIndex = Math.min(requestedIndex, maximumIndex);

      updateBlogCarousel();
    });
  });

  previousButton?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateBlogCarousel();
    }
  });

  nextButton?.addEventListener("click", () => {
    const filteredCards = getFilteredCards();

    const maximumIndex = Math.max(0, filteredCards.length - getVisibleCount());

    if (currentIndex < maximumIndex) {
      currentIndex += 1;
      updateBlogCarousel();
    }
  });

  window.addEventListener("resize", () => {
    updateBlogCarousel();
  });

  updateBlogCarousel();
});

/* ==================================================
   TRAVEL BLOG INTERACTION ENDED
================================================== */

/* ==================================================
   HERO HOLIDAY SEARCH FORM RESET STARTED
================================================== */

window.addEventListener("pageshow", () => {
  const holidayForm = document.querySelector(".hero-search-form");

  if (!holidayForm) return;

  holidayForm.reset();
});

/* ==================================================
   HERO HOLIDAY SEARCH FORM RESET ENDED
================================================== */

/* ==================================================
   CUSTOM TRIP PLANNER FORM STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const customTripForm = document.querySelector("#custom-trip-form");

  if (!customTripForm) return;

  customTripForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!customTripForm.checkValidity()) {
      customTripForm.reportValidity();
      return;
    }

    const formData = new FormData(customTripForm);
    const params = new URLSearchParams();

    /* ==================================================
       PAGE 1 TRIP PREFERENCES STARTED
    ================================================== */

    const destination = formData.get("destination");
    const travellers = formData.get("travellers");
    const travelWith = formData.get("travel-with");
    const style = formData.get("style");
    const wishes = formData.get("trip-wishes");

    /* ==================================================
       PAGE 1 TRIP PREFERENCES ENDED
    ================================================== */

    if (destination) {
      params.set("destination", destination);
    }

    if (travellers) {
      params.set("travellers", travellers);
    }

    if (travelWith) {
      params.set("travelWith", travelWith);
    }

    if (style) {
      params.set("style", style);
    }

    if (wishes && wishes.trim()) {
      params.set("wishes", wishes.trim());
    }

    /* ==================================================
       CONTINUE TO CUSTOM TRIP PAGE STARTED
    ================================================== */

    window.location.href = `custom-trip.html?${params.toString()}`;

    /* ==================================================
       CONTINUE TO CUSTOM TRIP PAGE ENDED
    ================================================== */
  });
});

/* ==================================================
   CUSTOM TRIP PLANNER FORM ENDED
================================================== */

/* ==================================================
   DYNAMIC CINEMATIC HERO SLIDER STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  /* ==================================================
     HERO SLIDER ELEMENTS STARTED
  ================================================== */

  const slideImages = Array.from(hero.querySelectorAll("[data-hero-slide]"));

  const destinationName = hero.querySelector("[data-hero-destination]");

  const titleMain = hero.querySelector("[data-hero-title-main]");

  const titleAccent = hero.querySelector("[data-hero-title-accent]");

  const description = hero.querySelector("[data-hero-description]");

  const destinationLink = hero.querySelector("[data-hero-destination-link]");

  const destinationLabel = hero.querySelector("[data-hero-destination-label]");

  const currentCounter = hero.querySelector("[data-hero-current]");

  const indicators = Array.from(hero.querySelectorAll("[data-hero-indicator]"));

  const previousButton = hero.querySelector("[data-hero-prev]");
  const nextButton = hero.querySelector("[data-hero-next]");

  if (
    !slideImages.length ||
    !destinationName ||
    !titleMain ||
    !titleAccent ||
    !description ||
    !destinationLink ||
    !destinationLabel ||
    !currentCounter ||
    indicators.length !== slideImages.length
  ) {
    return;
  }

  /* ==================================================
     HERO SLIDER ELEMENTS ENDED
  ================================================== */

  /* ==================================================
   HERO DESTINATION DATA STARTED
================================================== */

  const destinations = [
    {
      name: "SRINAGAR • KASHMIR",
      titleMain: "Where Mountains",
      titleAccent: "Tells a Story.",
      description:
        "Discover peaceful lakes, blooming valleys, charming gardens and breathtaking Himalayan landscapes.",
      button: "Explore Srinagar",
      url: "travel-blog-details.html?slug=kashmir-spring",
    },
    {
      name: "ALLEPPEY • KERALA",
      titleMain: "Find Your Peace in",
      titleAccent: "God's Own Country.",
      description:
        "Sail through serene backwaters and enjoy Kerala's lush tropical beauty and peaceful village life.",
      button: "Explore Alleppey",
      url: "travel-blog-details.html?slug=kerala-backwaters",
    },
    {
      name: "JAISALMER • RAJASTHAN",
      titleMain: "Golden Sands,",
      titleAccent: "Timeless Memories.",
      description:
        "Wander through majestic royal forts, lively traditional bazaars and beautiful golden desert landscapes.",
      button: "Explore Jaisalmer",
      url: "travel-blog-details.html?slug=jaisalmer-desert-journey",
    },
    {
      name: "MADURAI • TAMIL NADU",
      titleMain: "Ancient Traditions",
      titleAccent: "Come Alive.",
      description:
        "Discover Meenakshi Temple, colorful Dravidian architecture, rich traditions and timeless heritage.",
      button: "Explore Madurai",
      url: "travel-blog-details.html?slug=tamil-nadu-temple-trail",
    },
    {
      name: "VARANASI • UTTAR PRADESH",
      titleMain: "Sacred Ganga",
      titleAccent: "Meets Eternity.",
      description:
        "Experience beautiful sunrise views, sacred riverside ghats, ancient temples and rich spiritual traditions.",
      button: "Explore Varanasi",
      url: "travel-blog-details.html?slug=varanasi-sunrise",
    },
    {
      name: "RISHIKESH • UTTARAKHAND",
      titleMain: "Where Nature Meets",
      titleAccent: "Inner Peace.",
      description:
        "Experience the sacred Ganga, lush scenic Himalayan hills, ancient temples and peaceful riverside moments.",
      button: "Explore Rishikesh",
      url: "travel-blog-details.html?slug=uttarakhand-himalayan-retreat",
    },
  ];

  /* ==================================================
   HERO DESTINATION DATA ENDED
================================================== */

  /* ==================================================
     HERO SLIDER SETTINGS STARTED
  ================================================== */

  const slideDuration = 4000;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentIndex = 0;
  let autoplayTimer = null;
  let userHasInteracted = false;

  /* ==================================================
     HERO SLIDER SETTINGS ENDED
  ================================================== */

  /* ==================================================
     UPDATE ACTIVE HERO SLIDE STARTED
  ================================================== */

  const showSlide = (index) => {
    currentIndex = (index + destinations.length) % destinations.length;

    const destination = destinations[currentIndex];

    slideImages.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === currentIndex);
    });

    destinationName.textContent = destination.name;
    titleMain.textContent = destination.titleMain;
    titleAccent.textContent = destination.titleAccent;
    description.textContent = destination.description;

    destinationLabel.textContent = destination.button;
    destinationLink.href = destination.url;

    currentCounter.textContent = String(currentIndex + 1).padStart(2, "0");

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === currentIndex;

      indicator.classList.toggle("is-active", isActive);

      if (isActive) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
  };

  /* ==================================================
     UPDATE ACTIVE HERO SLIDE ENDED
  ================================================== */

  /* ==================================================
     HERO AUTOPLAY STARTED
  ================================================== */

  const stopAutoplay = () => {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();

    if (reducedMotion.matches || userHasInteracted || document.hidden) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideDuration);
  };

  /* ==================================================
     HERO AUTOPLAY ENDED
  ================================================== */

  /* ==================================================
   HERO NAVIGATION EVENTS STARTED
================================================== */

  /* PREVIOUS DESTINATION BUTTON STARTED */
  previousButton?.addEventListener("click", () => {
    stopAutoplay();

    showSlide(currentIndex - 1);

    startAutoplay();
  });
  /* PREVIOUS DESTINATION BUTTON ENDED */

  /* NEXT DESTINATION BUTTON STARTED */
  nextButton?.addEventListener("click", () => {
    stopAutoplay();

    showSlide(currentIndex + 1);

    startAutoplay();
  });
  /* NEXT DESTINATION BUTTON ENDED */

  /* DESTINATION INDICATOR BUTTONS STARTED */
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      stopAutoplay();

      const selectedIndex = Number(indicator.dataset.heroIndicator);

      showSlide(selectedIndex);

      startAutoplay();
    });
  });
  /* DESTINATION INDICATOR BUTTONS ENDED */

  /* ==================================================
   HERO NAVIGATION EVENTS ENDED
================================================== */

  /* ==================================================
     HERO ACCESSIBILITY EVENTS STARTED
  ================================================== */
  /* ==================================================
     HERO AUTOPLAY SCROLL BEHAVIOUR STARTED
  ================================================== */

  // Keep autoplay running when the mouse enters the hero.
  // Scrolling back to the hero will not pause the slider.

  /* ==================================================
     HERO AUTOPLAY SCROLL BEHAVIOUR ENDED
  ================================================== */

  hero.addEventListener("focusin", stopAutoplay);

  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  reducedMotion.addEventListener?.("change", () => {
    startAutoplay();
  });

  /* ==================================================
     HERO ACCESSIBILITY EVENTS ENDED
  ================================================== */

  /* ==================================================
     INITIALIZE HERO SLIDER STARTED
  ================================================== */

  showSlide(0);
  startAutoplay();

  /* ==================================================
     INITIALIZE HERO SLIDER ENDED
  ================================================== */
});

/* ==================================================
   DYNAMIC CINEMATIC HERO SLIDER ENDED
================================================== */
