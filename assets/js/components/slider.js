/* ==================================================
   FEATURED TOUR PACKAGES SLIDER STARTED
================================================== */

/* Featured Tour Packages Slider */

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-package-slider]");
  const track = document.querySelector("[data-package-track]");
  const previousButton = document.querySelector("[data-package-prev]");
  const nextButton = document.querySelector("[data-package-next]");
  const dotsContainer = document.querySelector("[data-package-dots]");

  if (!slider || !track || !previousButton || !nextButton || !dotsContainer) {
    return;
  }

  const cards = Array.from(track.children);

  let currentIndex = 0;
  let visibleCards = 3;
  let maximumIndex = 0;

  /* Visible Cards */

  const getVisibleCards = () => {
    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1050) {
      return 2;
    }

    return 3;
  };

  /* Slider Step */

  const getSliderStep = () => {
    if (cards.length < 2) {
      return 0;
    }

    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  /* Slider Dots */

  const createDots = () => {
    dotsContainer.innerHTML = "";

    maximumIndex = Math.max(0, cards.length - visibleCards);

    for (let index = 0; index <= maximumIndex; index += 1) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "featured-package-dot";
      dot.setAttribute("aria-label", `Show tour package position ${index + 1}`);

      if (index === currentIndex) {
        dot.classList.add("is-active");
      }

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }
  };

  /* Slider State */

  const updateSlider = () => {
    const step = getSliderStep();

    track.style.transform = `translateX(-${currentIndex * step}px)`;

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maximumIndex;

    const dots = dotsContainer.querySelectorAll(".featured-package-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  /* Previous Package */

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateSlider();
    }
  });

  /* Next Package */

  nextButton.addEventListener("click", () => {
    if (currentIndex < maximumIndex) {
      currentIndex += 1;
      updateSlider();
    }
  });

  /* Slider Resize */

  const refreshSlider = () => {
    visibleCards = getVisibleCards();
    maximumIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maximumIndex) {
      currentIndex = maximumIndex;
    }

    createDots();
    updateSlider();
  };

  window.addEventListener("resize", refreshSlider);

  refreshSlider();
});

/* ==================================================
   FEATURED TOUR PACKAGES SLIDER ENDED
================================================== */
