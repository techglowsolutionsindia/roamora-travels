/* ==================================================
   MOBILE NAVIGATION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("[data-navbar]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  const dropdownItems = document.querySelectorAll(".navbar-item.has-dropdown");

  const navLinks = document.querySelectorAll(".navbar a");

  if (!navbar || !navToggle) return;

  /* ==================================================
     MOBILE MENU TOGGLE STARTED
  ================================================== */

  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");

    navToggle.classList.toggle("is-active", isOpen);

    navToggle.setAttribute("aria-expanded", String(isOpen));

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  /* ==================================================
     MOBILE MENU TOGGLE ENDED
  ================================================== */

  /* ==================================================
     MOBILE DROPDOWNS STARTED
  ================================================== */

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".dropdown-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      if (window.innerWidth > 1050) return;

      const isOpen = item.classList.toggle("is-open");

      trigger.setAttribute("aria-expanded", String(isOpen));

      /* Close Other Open Dropdowns */
      dropdownItems.forEach((otherItem) => {
        if (otherItem === item) return;

        otherItem.classList.remove("is-open");

        const otherTrigger = otherItem.querySelector(".dropdown-trigger");

        if (otherTrigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  /* ==================================================
     MOBILE DROPDOWNS ENDED
  ================================================== */

  /* ==================================================
     CLOSE MENU AFTER LINK CLICK STARTED
  ================================================== */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth > 1050) return;

      navbar.classList.remove("is-open");
      navToggle.classList.remove("is-active");

      navToggle.setAttribute("aria-expanded", "false");

      navToggle.setAttribute("aria-label", "Open navigation menu");

      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");

        const trigger = item.querySelector(".dropdown-trigger");

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  /* ==================================================
     CLOSE MENU AFTER LINK CLICK ENDED
  ================================================== */

  /* ==================================================
     CLOSE MOBILE MENU WITH ESCAPE KEY STARTED
  ================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    navbar.classList.remove("is-open");
    navToggle.classList.remove("is-active");

    navToggle.setAttribute("aria-expanded", "false");

    navToggle.setAttribute("aria-label", "Open navigation menu");

    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");

      const trigger = item.querySelector(".dropdown-trigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ==================================================
     CLOSE MOBILE MENU WITH ESCAPE KEY ENDED
  ================================================== */

  /* ==================================================
     RESET NAVBAR AFTER RESIZE STARTED
  ================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1050) return;

    navbar.classList.remove("is-open");
    navToggle.classList.remove("is-active");

    navToggle.setAttribute("aria-expanded", "false");

    navToggle.setAttribute("aria-label", "Open navigation menu");

    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");

      const trigger = item.querySelector(".dropdown-trigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ==================================================
     RESET NAVBAR AFTER RESIZE ENDED
  ================================================== */
});

/* ==================================================
   MOBILE NAVIGATION ENDED
================================================== */

/* ==================================================
   ROAMORA HEADER SEARCH STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const searchOpenButton = document.querySelector("[data-search-open]");
  const searchModal = document.querySelector("[data-search-modal]");
  const searchCloseButtons = document.querySelectorAll("[data-search-close]");
  const searchForm = document.querySelector("[data-search-form]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchMessage = document.querySelector("[data-search-message]");

  if (!searchOpenButton || !searchModal) return;

  /* ==================================================
   OPEN SEARCH
================================================== */

  const openSearch = () => {
    /* Always Start With Fresh Search */
    if (searchInput) {
      searchInput.value = "";
    }

    if (searchMessage) {
      searchMessage.textContent = "";
    }

    searchModal.classList.add("is-open");

    searchModal.setAttribute("aria-hidden", "false");
    searchOpenButton.setAttribute("aria-expanded", "true");

    document.body.classList.add("search-open");

    window.setTimeout(() => {
      searchInput?.focus();
    }, 150);
  };

  /* ==================================================
   CLOSE SEARCH
================================================== */

  const closeSearch = () => {
    searchModal.classList.remove("is-open");

    searchModal.setAttribute("aria-hidden", "true");
    searchOpenButton.setAttribute("aria-expanded", "false");

    document.body.classList.remove("search-open");

    window.setTimeout(() => {
      if (searchInput) {
        searchInput.value = "";
      }

      if (searchMessage) {
        searchMessage.textContent = "";
      }
    }, 180);
  };

  searchOpenButton.addEventListener("click", openSearch);

  searchCloseButtons.forEach((button) => {
    button.addEventListener("click", closeSearch);
  });

  /* ==================================================
   CLOSE SEARCH BEFORE POPULAR SEARCH NAVIGATION
================================================== */

  const searchPopularLinks = searchModal.querySelectorAll("a[href]");

  searchPopularLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const destination = link.getAttribute("href");

      if (!destination) return;

      event.preventDefault();

      closeSearch();

      window.setTimeout(() => {
        window.location.href = destination;
      }, 80);
    });
  });

  /* ==================================================
     SEARCH DESTINATIONS + PACKAGES
  ================================================== */

  const searchRoutes = [
    {
      keywords: ["kashmir", "srinagar", "gulmarg", "pahalgam"],
      url: "destinations.html#kashmir",
    },

    {
      keywords: ["kerala", "munnar", "alleppey", "backwater"],
      url: "destinations.html#kerala",
    },

    {
      keywords: ["rajasthan", "jaipur", "jodhpur", "udaipur"],
      url: "destinations.html#rajasthan",
    },

    {
      keywords: ["goa", "beach", "coastal"],
      url: "destinations.html#goa",
    },

    {
      keywords: ["himachal", "shimla", "manali"],
      url: "destinations.html#himachal-pradesh",
    },

    {
      keywords: [
        "mountain",
        "mountains",
        "ladakh",
        "uttarakhand",
        "sikkim",
        "himalaya",
        "himalayan",
      ],
      url: "packages.html?filter=mountains#all-packages",
    },

    {
      keywords: ["nature", "meghalaya", "waterfall"],
      url: "packages.html?filter=nature#all-packages",
    },

    {
      keywords: ["heritage", "tamil nadu", "culture", "palace", "fort"],
      url: "packages.html?filter=heritage#all-packages",
    },

    {
      keywords: ["island", "islands", "andaman"],
      url: "packages.html?filter=islands#all-packages",
    },

    {
      keywords: ["spiritual", "varanasi", "sarnath", "ganges"],
      url: "packages.html?filter=spiritual#all-packages",
    },

    {
      keywords: ["package", "packages", "tour", "tours", "holiday", "holidays"],
      url: "packages.html#all-packages",
    },

    {
      keywords: ["plan", "custom", "personalised", "personalized", "trip"],
      url: "custom-trip.html",
    },
  ];

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput?.value.trim().toLowerCase();

      if (!query) {
        if (searchMessage) {
          searchMessage.textContent =
            "Please enter a destination, package or travel experience.";
        }

        searchInput?.focus();

        return;
      }

      const match = searchRoutes.find((route) =>
        route.keywords.some(
          (keyword) => query.includes(keyword) || keyword.includes(query),
        ),
      );

      if (match) {
        closeSearch();

        window.setTimeout(() => {
          window.location.assign(match.url);
        }, 220);

        return;
      }

      if (searchMessage) {
        searchMessage.textContent =
          "We could not find that yet. Try Kashmir, Kerala, Mountains, Nature, Heritage, Islands or Spiritual.";
      }
    });
  }

  /* ==================================================
     ESCAPE KEY CLOSE
  ================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchModal.classList.contains("is-open")) {
      closeSearch();
    }
  });
});

/* ==================================================
   ROAMORA HEADER SEARCH ENDED
================================================== */
