/* ==================================================
   ROAMORA DYNAMIC PACKAGE DETAILS STARTED
================================================== */

(() => {
  "use strict";

  /* ==================================================
     ALL 12 INDIA TOUR PACKAGES STARTED
  ================================================== */

  const packages = {
    "kashmir-paradise-escape": {
      title: "Kashmir Paradise Escape",
      image: "assets/images/packages/kashmir-paradise-escape.webp",
      duration: "6 Days / 5 Nights",
      destination: "Kashmir",
      route: "Srinagar • Gulmarg • Pahalgam",
      description:
        "Serene lakes, Himalayan valleys and beautiful mountain landscapes on a thoughtfully planned Kashmir holiday.",
      style: "Mountain Escape",
      price: "₹32,999",
    },

    "ladakh-adventure-escape": {
      title: "Ladakh Adventure Escape",
      image: "assets/images/packages/ladakh-adventure-escape.webp",
      duration: "7 Days / 6 Nights",
      destination: "Ladakh",
      route: "Leh • Nubra Valley • Pangong Lake",
      description:
        "High-altitude roads, dramatic Himalayan landscapes and unforgettable adventures across Ladakh.",
      style: "Adventure",
      price: "₹38,999",
    },

    "uttarakhand-himalayan-retreat": {
      title: "Uttarakhand Himalayan Retreat",
      image: "assets/images/packages/uttarakhand-himalayan-retreat.webp",
      duration: "6 Days / 5 Nights",
      destination: "Uttarakhand",
      route: "Rishikesh • Mussoorie • Dhanaulti",
      description:
        "Refreshing mountain towns, peaceful rivers and scenic Himalayan experiences designed for a relaxing getaway.",
      style: "Himalayan Retreat",
      price: "₹27,999",
    },

    "sikkim-mountain-discovery": {
      title: "Sikkim Mountain Discovery",
      image: "assets/images/packages/sikkim-mountain-discovery.webp",
      duration: "7 Days / 6 Nights",
      destination: "Sikkim",
      route: "Gangtok • Tsomgo Lake • Pelling",
      description:
        "Discover dramatic Himalayan views, peaceful monasteries and beautiful mountain towns across Sikkim.",
      style: "Mountain Discovery",
      price: "₹34,999",
    },

    "meghalaya-nature-escape": {
      title: "Meghalaya Nature Escape",
      image: "assets/images/packages/meghalaya-nature-escape.webp",
      duration: "6 Days / 5 Nights",
      destination: "Meghalaya",
      route: "Shillong • Cherrapunji • Dawki",
      description:
        "Waterfalls, emerald landscapes, living root bridges and peaceful nature experiences across Meghalaya.",
      style: "Nature Escape",
      price: "₹29,999",
    },

    "andaman-island-getaway": {
      title: "Andaman Island Getaway",
      image: "assets/images/packages/andaman-island-getaway.webp",
      duration: "6 Days / 5 Nights",
      destination: "Andaman",
      route: "Port Blair • Havelock • Neil Island",
      description:
        "Tropical beaches, crystal-clear waters and relaxing island experiences surrounded by the beauty of the Andamans.",
      style: "Island Holiday",
      price: "₹36,999",
    },

    "kerala-backwater-retreat": {
      title: "Kerala Backwater Retreat",
      image: "assets/images/packages/kerala-backwater-retreat.webp",
      duration: "6 Days / 5 Nights",
      destination: "Kerala",
      route: "Kochi • Munnar • Alleppey",
      description:
        "Tea-covered hills, tropical scenery and peaceful backwater experiences on a relaxing Kerala journey.",
      style: "Relaxing Escape",
      price: "₹31,999",
    },

    "royal-rajasthan-journey": {
      title: "Royal Rajasthan Journey",
      image: "assets/images/packages/royal-rajasthan-journey.webp",
      duration: "7 Days / 6 Nights",
      destination: "Rajasthan",
      route: "Jaipur • Jodhpur • Udaipur",
      description:
        "Magnificent forts, royal palaces and vibrant cultural experiences across Rajasthan's historic cities.",
      style: "Royal Heritage",
      price: "₹35,999",
    },

    "varanasi-spiritual-journey": {
      title: "Varanasi Spiritual Journey",
      image: "assets/images/packages/varanasi-spiritual-journey.webp",
      duration: "4 Days / 3 Nights",
      destination: "Varanasi",
      route: "Varanasi • Sarnath • River Ganges",
      description:
        "Sacred ghats, timeless temples and meaningful cultural experiences along the spiritual heart of India.",
      style: "Spiritual Journey",
      price: "₹19,999",
    },

    "tamil-nadu-heritage-trail": {
      title: "Tamil Nadu Heritage Trail",
      image: "assets/images/packages/tamil-nadu-heritage-trail.webp",
      duration: "7 Days / 6 Nights",
      destination: "Tamil Nadu",
      route: "Chennai • Mahabalipuram • Madurai",
      description:
        "Ancient temples, architectural treasures and rich South Indian heritage across Tamil Nadu's historic cities.",
      style: "Heritage Trail",
      price: "₹30,999",
    },

    "goa-coastal-escape": {
      title: "Goa Coastal Escape",
      image: "assets/images/packages/goa-coastal-escape.webp",
      duration: "5 Days / 4 Nights",
      destination: "Goa",
      route: "North Goa • South Goa • Panjim",
      description:
        "Golden beaches, vibrant coastal towns and relaxing seaside experiences designed for an easy-going Goa holiday.",
      style: "Coastal Escape",
      price: "₹24,999",
    },

    "himachal-scenic-retreat": {
      title: "Himachal Scenic Retreat",
      image: "assets/images/packages/himachal-scenic-retreat.webp",
      duration: "6 Days / 5 Nights",
      destination: "Himachal Pradesh",
      route: "Shimla • Manali • Solang Valley",
      description:
        "Pine-covered valleys, charming hill towns and spectacular Himalayan landscapes combined into a refreshing Himachal getaway.",
      style: "Scenic Retreat",
      price: "₹28,999",
    },
  };

  /* ==================================================
     ALL 12 INDIA TOUR PACKAGES ENDED
  ================================================== */

  /* ==================================================
     DYNAMIC PACKAGE RENDERING STARTED
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("package") || "kashmir-paradise-escape";

    const pkg = Object.prototype.hasOwnProperty.call(packages, slug)
      ? packages[slug]
      : null;

    const setText = (attribute, value) => {
      document.querySelectorAll(`[${attribute}]`).forEach((element) => {
        element.textContent = value;
      });
    };

    const setImage = (attribute, source, alt) => {
      document.querySelectorAll(`[${attribute}]`).forEach((element) => {
        element.src = source;
        element.alt = alt;
      });
    };

    if (!pkg) {
      document.title = "Package Not Found | Roamora Travels";

      setText("data-package-title-main", "Package Not");
      setText("data-package-title-accent", "Found");
      setText(
        "data-package-description",
        "This package is unavailable. Please explore our current India tour packages.",
      );

      document
        .querySelectorAll("[data-package-booking-link]")
        .forEach((link) => {
          link.href = "packages.html#all-packages";
          link.textContent = "Explore All Packages →";
        });

      return;
    }

    const stops = pkg.route
      .split("•")
      .map((stop) => stop.trim())
      .filter(Boolean);

    const days = Number.parseInt(pkg.duration, 10) || 1;

    const plural = (number, word) =>
      `${number} ${word}${number === 1 ? "" : "s"}`;

    const escapeHtml = (value) =>
      String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });

    /* ==================================================
       PAGE TITLE, HERO AND META STARTED
    ================================================== */

    document.title = `${pkg.title} | Roamora Travels`;

    const meta = document.querySelector('meta[name="description"]');

    if (meta) {
      meta.content = pkg.description;
    }

    const titleParts = pkg.title.split(" ");

    setText(
      "data-package-title-main",
      titleParts.slice(0, -1).join(" ") || pkg.title,
    );

    setText(
      "data-package-title-accent",
      titleParts.length > 1 ? titleParts[titleParts.length - 1] : "",
    );

    setText("data-package-description", pkg.description);
    setText("data-package-duration", pkg.duration);
    setText("data-package-destination", pkg.destination);
    setText("data-package-travel-style", pkg.style);
    setText("data-package-price", pkg.price);
    setText("data-package-route", stops.join(" → "));

    setImage("data-package-hero-image", pkg.image, pkg.title);
    setImage("data-package-overview-image", pkg.image, pkg.title);

    /* ==================================================
       PAGE TITLE, HERO AND META ENDED
    ================================================== */

    /* ==================================================
       PACKAGE BOOKING LINKS STARTED
    ================================================== */

    const bookingUrl = "custom-trip.html?package=" + encodeURIComponent(slug);

    document.querySelectorAll("[data-package-booking-link]").forEach((link) => {
      link.href = bookingUrl;
    });

    /* ==================================================
       PACKAGE BOOKING LINKS ENDED
    ================================================== */

    /* ==================================================
       QUICK TRIP OVERVIEW STARTED
    ================================================== */

    setText("data-package-overview-route", pkg.route);

    setText("data-package-overview-duration", pkg.duration);

    setText(
      "data-package-overview-duration-description",
      `Enjoy a ${days}-day journey through ${pkg.destination}, with time for the destinations and experiences along your route.`,
    );

    setText("data-package-overview-travel-pace", "Customisable");

    setText("data-package-overview-travel-pace-status", "Flexible");

    setText(
      "data-package-overview-stops",
      plural(stops.length, "Planned Stop"),
    );

    setText(
      "data-package-overview-stops-description",
      `Explore ${stops.join(", ")} as part of your ${pkg.destination} holiday.`,
    );

    setText("data-package-overview-route-style", pkg.style);

    setText("data-package-overview-stops-status", plural(stops.length, "Stop"));

    setText("data-package-overview-best-for", `${pkg.destination} Explorers`);

    setText("data-package-overview-best-for-description", pkg.description);

    setText("data-package-overview-travel-match", pkg.style);

    setText("data-package-overview-best-for-status", "Tailored");

    setText("data-package-overview-package-type", "Personalised Journey");

    setText(
      "data-package-overview-package-type-description",
      "Ask Roamora to personalise stays, transfers and experiences to suit your travel preferences.",
    );

    setText("data-package-overview-planning-style", "Flexible");

    setText("data-package-overview-package-type-status", "Personalised");

    /* ==================================================
       QUICK TRIP OVERVIEW ENDED
    ================================================== */

    /* ==================================================
       DYNAMIC ITINERARY STARTED
    ================================================== */

    const heading = document.querySelector("[data-package-itinerary-heading]");

    if (heading) {
      const title = heading.querySelector("h2");
      const description = heading.querySelector("p");

      if (title) {
        title.innerHTML =
          `${escapeHtml(plural(days, "Memorable Day"))}, ` +
          `<span>Exploring ${escapeHtml(pkg.destination)}.</span>`;
      }

      if (description) {
        description.textContent =
          "Suggested journey outline based on the featured route. Your final day-by-day plan will be confirmed when you enquire.";
      }
    }

    const timeline = document.querySelector(
      "[data-package-itinerary-timeline]",
    );

    if (timeline) {
      const entries = Array.from({ length: days }, (_, index) => {
        const day = index + 1;

        const location =
          day === 1
            ? stops[0]
            : day === days
              ? stops[stops.length - 1]
              : stops[
                  Math.min(
                    stops.length - 1,
                    Math.floor(
                      ((day - 1) * stops.length) / Math.max(days - 1, 1),
                    ),
                  )
                ];

        const title =
          day === 1
            ? "Arrival & Welcome"
            : day === days
              ? "Departure & Farewell"
              : `Explore ${location}`;

        const description =
          day === 1
            ? `Arrive in ${location} and begin your ${pkg.destination} journey. Transfers and activities will be planned to suit your arrival.`
            : day === days
              ? "Enjoy your final moments before your onward journey. Departure arrangements are tailored to your travel plans."
              : `Discover ${location} and enjoy experiences suited to your interests. Your exact sightseeing and transfers will be confirmed in your personalised itinerary.`;

        const number = String(day).padStart(2, "0");

        return `
            <article class="package-itinerary-day">
              <div class="package-itinerary-marker">
                <span>${number}</span>
              </div>

              <div class="package-itinerary-card">
                <div class="package-itinerary-card-top">
                  <div>
                    <span class="package-itinerary-label">
                      DAY ${number}
                    </span>
                    <h3>${escapeHtml(title)}</h3>
                  </div>

                  <span class="package-itinerary-location">
                    ${escapeHtml(location)}
                  </span>
                </div>

                <p>${escapeHtml(description)}</p>

                <div class="package-itinerary-highlights">
                  <span>Suggested Plan</span>
                  <span>Customisable</span>
                  <span>Subject to Confirmation</span>
                </div>
              </div>
            </article>
          `;
      });

      timeline.innerHTML = entries.join("\n");
    }

    /* ==================================================
       DYNAMIC ITINERARY ENDED
    ================================================== */

    /* ==================================================
       PACKAGE CTA STARTED
    ================================================== */

    const cta = document.querySelector("[data-package-cta-copy]");

    if (cta) {
      const eyebrow = cta.querySelector(".package-details-cta-eyebrow");
      const title = cta.querySelector("h2");
      const paragraph = cta.querySelector("p");

      if (eyebrow) {
        eyebrow.textContent = `✦ YOUR ${pkg.destination.toUpperCase()} JOURNEY AWAITS`;
      }

      if (title) {
        title.innerHTML =
          `Inspired by ${escapeHtml(pkg.destination)}? ` +
          "<span>Let's Plan Your Journey.</span>";
      }

      if (paragraph) {
        paragraph.textContent = `${pkg.description} Contact Roamora to personalise your plans.`;
      }
    }

    const trust = document.querySelector("[data-package-cta-trust]");

    if (trust) {
      trust.innerHTML = `
        <span>
          <b>✦</b>
          Personalised ${escapeHtml(pkg.destination)} Journeys
        </span>
        <span>
          <b>◇</b>
          Thoughtful Local Experiences
        </span>
        <span>
          <b>✓</b>
          Expert Travel Guidance
        </span>
      `;
    }

    const ctaButton = document.querySelector(".package-details-cta-button");

    if (ctaButton) {
      ctaButton.href = bookingUrl;
    }

    /* ==================================================
       PACKAGE CTA ENDED
    ================================================== */
  });

  /* ==================================================
     DYNAMIC PACKAGE RENDERING ENDED
  ================================================== */
})();

/* ==================================================
   ROAMORA DYNAMIC PACKAGE DETAILS ENDED
================================================== */
