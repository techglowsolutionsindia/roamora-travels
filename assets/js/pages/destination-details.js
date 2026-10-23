"use strict";

/* ==================================================
   DYNAMIC DESTINATION DETAILS STARTED
================================================== */

/* ==================================================
   1. DESTINATION SEO HELPERS STARTED
================================================== */

function setDestinationMeta(attribute, key, value) {
  if (!value) return;

  let meta = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", value);
}

function updateDestinationSEO(data) {
  const title =
    data.pageTitle ||
    `${data.titleMain || "India Destination"} Travel Guide | Roamora Travels`;

  const description =
    data.metaDescription ||
    data.description ||
    "Explore beautiful destinations in India with Roamora Travels. Discover memorable experiences and personalised holiday packages.";

  // Update browser title
  document.title = title;

  // Update search engine description
  setDestinationMeta("name", "description", description);

  // Update Open Graph metadata
  setDestinationMeta("property", "og:type", "website");
  setDestinationMeta("property", "og:title", title);
  setDestinationMeta("property", "og:description", description);
  setDestinationMeta("property", "og:site_name", "Roamora Travels");

  // Update Twitter metadata
  setDestinationMeta("name", "twitter:card", "summary_large_image");
  setDestinationMeta("name", "twitter:title", title);
  setDestinationMeta("name", "twitter:description", description);

  // Canonical URLs, og:url and social image URLs
  // are intentionally not invented here.
  // They require the confirmed live website domain.
}

/* ==================================================
   1. DESTINATION SEO HELPERS ENDED
================================================== */

/* ==================================================
   2. DESTINATION IMAGE HELPERS STARTED
================================================== */

function updateDestinationImage(imageElement, imageSrc, imageAlt) {
  if (!imageElement) return;

  if (imageSrc) {
    imageElement.src = imageSrc;
  }

  if (imageAlt !== undefined && imageAlt !== null) {
    imageElement.alt = imageAlt;
  }

  imageElement.loading = "lazy";
  imageElement.decoding = "async";
}

/* ==================================================
   2. DESTINATION IMAGE HELPERS ENDED
================================================== */

/* ==================================================
   3. LOAD DESTINATION DATA STARTED
================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);

  const destination = params.get("destination") || "kashmir";

  const hero = document.querySelector(".destination-detail-hero");

  const overview = document.querySelector("#destination-overview");

  const experiences = document.querySelector("#best-experiences");

  const bestTime = document.querySelector("#best-time-to-visit");

  const destinationCTA = document.querySelector("#plan-your-journey");

  const packagesSection = document.querySelector("#recommended-packages");

  try {
    const response = await fetch("data/destinations.json", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        "Unable to load destination data. HTTP " + response.status,
      );
    }

    const destinations = await response.json();

    const data = destinations[destination];

    if (!data) {
      console.warn("Destination not found:", destination);
      return;
    }

    /* ==================================================
       UPDATE DESTINATION SEO STARTED
    ================================================== */

    updateDestinationSEO(data);

    document.body.dataset.destination = destination;

    /* ==================================================
       UPDATE DESTINATION SEO ENDED
    ================================================== */

    /* ==================================================
       SECTION 1 — DYNAMIC DESTINATION HERO STARTED
    ================================================== */

    if (hero) {
      // Update hero eyebrow
      const eyebrow = hero.querySelector(".destination-detail-eyebrow");

      if (eyebrow) {
        eyebrow.lastChild.textContent = ` ${data.eyebrow}`;
      }

      // Update hero title
      const titleMain = hero.querySelector(".destination-detail-title-main");

      const titleAccent = hero.querySelector(
        ".destination-detail-title-accent",
      );

      if (titleMain) {
        titleMain.textContent = data.titleMain;
      }

      if (titleAccent) {
        titleAccent.textContent = data.titleAccent;
      }

      // Update hero description
      const heroDescription = hero.querySelector(
        ".destination-detail-hero-content > p",
      );

      if (heroDescription) {
        heroDescription.textContent = data.description;
      }

      // Update hero background image
      if (data.heroImage) {
        hero.style.setProperty(
          "--destination-hero-image",
          `url("/${data.heroImage}")`,
        );
      }

      // Update hero highlights
      const highlights = hero.querySelectorAll(
        ".destination-detail-hero-highlight > span:last-child",
      );

      (data.highlights || []).forEach((highlight, index) => {
        if (highlights[index]) {
          highlights[index].textContent = highlight;
        }
      });
    }

    /* ==================================================
       SECTION 1 — DYNAMIC DESTINATION HERO ENDED
    ================================================== */

    /* ==================================================
       SECTION 2 — DYNAMIC DESTINATION OVERVIEW STARTED
    ================================================== */

    if (overview && data.overview) {
      const overviewData = data.overview;

      // Update overview image
      const overviewImage = overview.querySelector(
        ".destination-overview-image",
      );

      updateDestinationImage(
        overviewImage,
        overviewData.image,
        overviewData.imageAlt,
      );

      // Update overview title
      const overviewTitle = overview.querySelector(
        ".destination-overview-content h2",
      );

      if (overviewTitle) {
        overviewTitle.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = "";
          }
        });

        overviewTitle.insertBefore(
          document.createTextNode(overviewData.titleMain + " "),
          overviewTitle.firstChild,
        );

        const accent = overviewTitle.querySelector("span");

        if (accent) {
          accent.textContent = overviewData.titleAccent;
        }
      }

      // Update overview paragraphs
      const paragraphs = overview.querySelectorAll(
        ".destination-overview-content > p",
      );

      (overviewData.paragraphs || []).forEach((paragraph, index) => {
        if (paragraphs[index]) {
          paragraphs[index].textContent = paragraph;
        }
      });

      // Update overview facts
      const facts = overview.querySelectorAll(
        ".destination-overview-facts > div > span",
      );

      (overviewData.facts || []).forEach((fact, index) => {
        if (facts[index]) {
          facts[index].textContent = fact;
        }
      });
    }

    /* ==================================================
       SECTION 2 — DYNAMIC DESTINATION OVERVIEW ENDED
    ================================================== */

    /* ==================================================
       SECTION 3 — DYNAMIC BEST EXPERIENCES STARTED
    ================================================== */

    if (experiences && data.experiences) {
      const experiencesData = data.experiences;

      // Update experiences eyebrow
      const eyebrow = experiences.querySelector(
        ".destination-detail-section-heading " +
          ".destination-detail-section-eyebrow",
      );

      if (eyebrow) {
        eyebrow.lastChild.textContent = ` ${experiencesData.eyebrow}`;
      }

      // Update experiences title
      const experiencesTitle = experiences.querySelector(
        ".destination-detail-section-heading h2",
      );

      if (experiencesTitle) {
        experiencesTitle.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = "";
          }
        });

        experiencesTitle.insertBefore(
          document.createTextNode(experiencesData.titleMain + " "),
          experiencesTitle.firstChild,
        );

        const accent = experiencesTitle.querySelector("span");

        if (accent) {
          accent.textContent = experiencesData.titleAccent;
        }
      }

      // Update experiences description
      const experiencesDescription = experiences.querySelector(
        ".destination-detail-section-heading > p",
      );

      if (experiencesDescription) {
        experiencesDescription.textContent = experiencesData.description;
      }

      // Update experience cards
      const cards = experiences.querySelectorAll(
        ".destination-experience-card",
      );

      (experiencesData.cards || []).forEach((cardData, index) => {
        const card = cards[index];

        if (!card) return;

        // Update card image
        const image = card.querySelector("img");

        updateDestinationImage(image, cardData.image, cardData.imageAlt);

        // Update card title
        const title = card.querySelector(
          ".destination-experience-card-content h3",
        );

        if (title) {
          title.textContent = cardData.title;
        }

        // Update card description
        const description = card.querySelector(
          ".destination-experience-card-content p",
        );

        if (description) {
          description.textContent = cardData.description;
        }
      });
    }

    /* ==================================================
       SECTION 3 — DYNAMIC BEST EXPERIENCES ENDED
    ================================================== */

    /* ==================================================
       SECTION 4 — DYNAMIC BEST TIME TO VISIT STARTED
    ================================================== */

    if (bestTime && data.bestTime) {
      const bestTimeData = data.bestTime;

      // Update best time eyebrow
      const eyebrow = bestTime.querySelector(
        ".destination-detail-section-eyebrow",
      );

      if (eyebrow) {
        eyebrow.lastChild.textContent = ` ${bestTimeData.eyebrow}`;
      }

      // Update best time title
      const bestTimeTitle = bestTime.querySelector(
        ".destination-best-time-grid > div:first-child h2",
      );

      if (bestTimeTitle) {
        bestTimeTitle.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = "";
          }
        });

        bestTimeTitle.insertBefore(
          document.createTextNode(bestTimeData.titleMain + " "),
          bestTimeTitle.firstChild,
        );

        const accent = bestTimeTitle.querySelector("span");

        if (accent) {
          accent.textContent = bestTimeData.titleAccent;
        }
      }

      // Update best time description
      const bestTimeDescription = bestTime.querySelector(
        ".destination-best-time-grid > div:first-child > p",
      );

      if (bestTimeDescription) {
        bestTimeDescription.textContent = bestTimeData.description;
      }

      // Update seasonal entries
      const seasons = bestTime.querySelectorAll(
        ".destination-season-list > article",
      );

      (bestTimeData.seasons || []).forEach((seasonData, index) => {
        const season = seasons[index];

        if (!season) return;

        // Update months
        const months = season.querySelector(":scope > span");

        if (months) {
          months.textContent = seasonData.months;
        }

        // Update season title
        const title = season.querySelector("h3");

        if (title) {
          title.textContent = seasonData.title;
        }

        // Update season description
        const description = season.querySelector("p");

        if (description) {
          description.textContent = seasonData.description;
        }
      });
    }

    /* ==================================================
       SECTION 4 — DYNAMIC BEST TIME TO VISIT ENDED
    ================================================== */

    /* ==================================================
       SECTION 5 — DYNAMIC DESTINATION CTA STARTED
    ================================================== */

    if (destinationCTA && data.cta) {
      const ctaData = data.cta;

      // Update CTA eyebrow
      const eyebrow = destinationCTA.querySelector(
        ".destination-detail-section-eyebrow",
      );

      if (eyebrow) {
        eyebrow.lastChild.textContent = ` ${ctaData.eyebrow}`;
      }

      // Update CTA heading
      const ctaTitle = destinationCTA.querySelector(
        ".destination-detail-cta-inner > div:first-child h2",
      );

      if (ctaTitle) {
        ctaTitle.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = "";
          }
        });

        ctaTitle.insertBefore(
          document.createTextNode(ctaData.titleMain + " "),
          ctaTitle.firstChild,
        );

        const accent = ctaTitle.querySelector("span");

        if (accent) {
          accent.textContent = ctaData.titleAccent;
        }
      }

      // Update CTA description
      const ctaDescription = destinationCTA.querySelector(
        ".destination-detail-cta-inner > div:first-child > p",
      );

      if (ctaDescription) {
        ctaDescription.textContent = ctaData.description;
      }

      // Update CTA button
      const ctaButton = destinationCTA.querySelector(
        ".destination-detail-cta-actions a",
      );

      if (ctaButton) {
        ctaButton.textContent = ctaData.buttonText;

        ctaButton.href = ctaData.buttonLink;
      }
    }

    /* ==================================================
       SECTION 5 — DYNAMIC DESTINATION CTA ENDED
    ================================================== */

    /* ==================================================
       SECTION 6 — DYNAMIC RECOMMENDED PACKAGES STARTED
    ================================================== */

    if (packagesSection && data.recommendedPackages) {
      const packagesData = data.recommendedPackages;

      // Update section heading
      const heading = packagesSection.querySelector(
        ".destination-packages-header h2",
      );

      if (heading) {
        heading.replaceChildren(
          document.createTextNode(packagesData.titleMain + " "),
          Object.assign(document.createElement("span"), {
            textContent: packagesData.titleAccent,
          }),
        );
      }

      // Update View All Packages link
      const viewAllLink = packagesSection.querySelector(
        ".destination-detail-text-link",
      );

      if (viewAllLink) {
        viewAllLink.href = packagesData.viewAllLink;
      }

      // Update recommended package cards
      const cards = packagesSection.querySelectorAll(
        ".destination-package-card",
      );

      (packagesData.cards || []).forEach((packageData, index) => {
        const card = cards[index];

        if (!card) return;

        const label = card.querySelector(".destination-package-label");

        const title = card.querySelector("h3");

        const description = card.querySelector("p");

        const duration = card.querySelector(
          ".destination-package-bottom strong",
        );

        const button = card.querySelector(".destination-package-bottom a");

        if (label) {
          label.textContent = packageData.label;
        }

        if (title) {
          title.textContent = packageData.title;
        }

        if (description) {
          description.textContent = packageData.description;
        }

        if (duration) {
          duration.textContent = packageData.duration;
        }

        if (button) {
          button.textContent = packageData.buttonText;

          button.href = packageData.buttonLink;
        }
      });
    }

    /* ==================================================
       SECTION 6 — DYNAMIC RECOMMENDED PACKAGES ENDED
    ================================================== */
  } catch (error) {
    console.error("Destination details loading error:", error);
  }
});

/* ==================================================
   3. LOAD DESTINATION DATA ENDED
================================================== */

/* ==================================================
   DYNAMIC DESTINATION DETAILS ENDED
================================================== */
