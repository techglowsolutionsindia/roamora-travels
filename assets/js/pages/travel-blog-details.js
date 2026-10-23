"use strict";

// ==================================================
// DYNAMIC TRAVEL BLOG DETAILS SCRIPT STARTED
// ==================================================

// ==================================================
// 1. BLOG CONFIGURATION STARTED
// ==================================================

const BLOG_DATA_URL = "data/blogs.json";

function getBlogSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || "kashmir-spring";
}

function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

function getElements(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function setText(selector, value, parent = document) {
  const element = getElement(selector, parent);
  if (element && value !== undefined && value !== null) {
    element.textContent = value;
  }
}

function setImage(element, image) {
  if (!element || !image) return;

  if (image.src) element.src = image.src;
  element.alt = image.alt || "";

  // ==================================================
  // DYNAMIC IMAGE PERFORMANCE STARTED
  // ==================================================
  element.decoding = "async";

  if (element.classList.contains("hero-background-image")) {
    element.loading = "eager";
    element.setAttribute("fetchpriority", "high");
  } else if (!element.closest(".header-logo")) {
    element.loading = "lazy";
    element.removeAttribute("fetchpriority");
  }
  // ==================================================
  // DYNAMIC IMAGE PERFORMANCE ENDED
  // ==================================================
}

function setLink(element, href, text) {
  if (!element) return;
  if (href) element.href = href;
  if (text !== undefined && text !== null) {
    element.textContent = text;
  }
}

function setEyebrow(selector, value, parent = document) {
  const element = getElement(selector, parent);
  if (!element || !value) return;

  const mark = element.querySelector(
    ".section-eyebrow-mark, " +
      ".hero-eyebrow-mark, " +
      ".kashmir-journey-cta-eyebrow-mark",
  );

  if (mark) {
    Array.from(element.childNodes).forEach((node) => {
      if (node !== mark) node.remove();
    });
    element.appendChild(document.createTextNode(" " + value));
  } else {
    element.textContent = value;
  }
}

function setSectionTitle(
  selector,
  main,
  accent,
  parent = document,
  suffix = "",
) {
  const title = getElement(selector, parent);
  if (!title) return;

  title.replaceChildren();
  title.appendChild(document.createTextNode(main || ""));

  if (accent) {
    title.appendChild(document.createElement("br"));
    const span = document.createElement("span");
    span.textContent = accent;
    title.appendChild(span);
  }

  if (suffix) {
    title.appendChild(document.createTextNode(" " + suffix));
  }
}

// ==================================================
// 1. BLOG CONFIGURATION ENDED
// ==================================================

// ==================================================
// 2. PAGE META & NAVIGATION STARTED
// ==================================================

// ==================================================
// DYNAMIC JOURNAL SEO METADATA STARTED
// ==================================================

function setMetaContent(selector, value) {
  if (!value) return;
  const meta = getElement(selector);
  if (meta) meta.setAttribute("content", value);
}

function renderPageMeta(blog) {
  const title =
    blog.pageTitle || blog.title || "Travel Journal | Roamora Travels";

  const description =
    blog.metaDescription || (blog.hero && blog.hero.description) || "";

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);

  const values = [
    ["property", "og:type", "article"],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ];

  values.forEach(([attribute, key, content]) => {
    if (!content) return;

    let meta = getElement(`meta[${attribute}="${key}"]`);

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, key);
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
  });

  // Do not invent canonical URLs, og:url, or social image URLs.
  // Reliable per-journal social previews require HTML metadata
  // available before client-side JavaScript runs.
}

// ==================================================
// DYNAMIC JOURNAL SEO METADATA ENDED
// ==================================================

function renderNavigation(blog) {
  const navigation = getElement(
    ".navbar-list .has-dropdown:last-child .dropdown-menu",
  );

  if (!navigation || !blog.navigation) return;

  const links = getElements("a", navigation);

  const heroLink = links.find(
    (link) => link.getAttribute("href") === "#blog-hero",
  );

  const introductionLink = links.find(
    (link) => link.getAttribute("href") === "#introduction",
  );

  if (heroLink && blog.navigation.firstLabel) {
    heroLink.textContent = blog.navigation.firstLabel;
  }

  if (introductionLink && blog.navigation.introductionLabel) {
    introductionLink.textContent = blog.navigation.introductionLabel;
  }
}

// ==================================================
// 2. PAGE META & NAVIGATION ENDED
// ==================================================

// ==================================================
// 3. HERO SECTION STARTED
// ==================================================

function renderHero(blog) {
  const data = blog.hero;
  const section = getElement("#blog-hero");

  if (!section || !data) return;

  setImage(getElement(".hero-background-image", section), data.image);

  setEyebrow(".hero-eyebrow", data.eyebrow, section);

  const title = getElement(".hero-title", section);

  if (title) {
    title.replaceChildren();

    title.appendChild(document.createTextNode(data.titleMain || ""));

    if (data.titleAccent) {
      title.appendChild(document.createTextNode(" "));

      const accent = document.createElement("span");
      accent.textContent = data.titleAccent;
      title.appendChild(accent);
    }
  }

  setText(".hero-description", data.description, section);

  const button = getElement(".hero-content > a.btn", section);

  if (button) {
    if (data.buttonLink) {
      button.href = data.buttonLink;
    }

    const buttonText = (data.buttonText || "").replace(/\s*→\s*$/, "");

    const arrow = button.querySelector('span[aria-hidden="true"]');

    button.replaceChildren(document.createTextNode(buttonText + " "));

    if (arrow) {
      arrow.textContent = "→";
      button.appendChild(arrow);
    }
  }

  const trustLabels = getElements(
    ".hero-trust-item > span:last-child",
    section,
  );

  (data.trustItems || []).forEach((item, index) => {
    if (trustLabels[index]) {
      trustLabels[index].textContent = item;
    }
  });
}

// ==================================================
// 3. HERO SECTION ENDED
// ==================================================

// ==================================================
// 4. INTRODUCTION SECTION STARTED
// ==================================================

function renderIntroduction(blog) {
  const data = blog.introduction;
  const section = getElement("#introduction");

  if (!section || !data) return;

  setImage(getElement(".intro-image img", section), data.image);

  setText(".intro-location", data.location, section);

  setEyebrow(".intro-content .section-eyebrow", data.eyebrow, section);

  setSectionTitle(
    ".intro-content .section-title",
    data.titleMain,
    data.titleAccent,
    section,
  );

  setText(".intro-content .section-description", data.description, section);

  const featureContainer = getElement(".intro-features", section);

  if (!featureContainer) return;

  featureContainer.replaceChildren();

  (data.features || []).forEach((feature) => {
    const item = document.createElement("div");
    item.className = "feature-item";

    const icon = document.createElement("div");
    icon.className = "feature-icon";
    icon.textContent = feature.icon || "";

    const content = document.createElement("div");

    const heading = document.createElement("h4");
    heading.textContent = feature.title || "";

    const description = document.createElement("p");
    description.textContent = feature.description || "";

    content.append(heading, description);
    item.append(icon, content);

    featureContainer.appendChild(item);
  });
}

// ==================================================
// 4. INTRODUCTION SECTION ENDED
// ==================================================

// ==================================================
// 5. MAIN ARTICLE SECTION STARTED
// ==================================================

function renderMainArticle(blog) {
  const data = blog.mainArticle;
  const section = getElement("#main-article");

  if (!section || !data) return;

  setEyebrow(".main-article-content .section-eyebrow", data.eyebrow, section);

  setSectionTitle(
    ".main-article-content .section-title",
    data.titleMain,
    data.titleAccent,
    section,
  );

  setText(".main-article-content .hero-description", data.description, section);

  const pointsContainer = getElement(".main-article-points", section);

  if (pointsContainer) {
    pointsContainer.replaceChildren();

    (data.points || []).forEach((point, index) => {
      const article = document.createElement("article");
      article.className = "article-point";

      const number = document.createElement("div");
      number.className = "article-number";
      number.textContent = point.number || String(index + 1).padStart(2, "0");

      const content = document.createElement("div");
      content.className = "article-point-content";

      const heading = document.createElement("h3");
      heading.textContent = point.title || "";

      const description = document.createElement("p");
      description.textContent = point.description || "";

      content.append(heading, description);
      article.append(number, content);

      pointsContainer.appendChild(article);
    });
  }

  const gallery = getElement(".main-article-gallery", section);

  if (!gallery) return;

  gallery.replaceChildren();

  (data.images || []).forEach((image, index) => {
    const wrapper = document.createElement("div");

    wrapper.className =
      index === 0 ? "article-gallery-large" : "article-gallery-small";

    const img = document.createElement("img");
    setImage(img, image);

    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  });
}

// ==================================================
// 5. MAIN ARTICLE SECTION ENDED
// ==================================================

// ==================================================
// 6. PHOTO GALLERY SECTION STARTED
// ==================================================

function renderPhotoGallery(blog) {
  const data = blog.photoGallery;
  const section = getElement("#photo-gallery");

  if (!section || !data) return;

  setEyebrow(".gallery-content .section-eyebrow", data.eyebrow, section);

  setSectionTitle(
    ".gallery-content .section-title",
    data.titleMain,
    data.titleAccent,
    section,
  );

  setText(".gallery-content .section-description", data.description, section);

  const images = data.images || [];

  setImage(getElement(".gallery-main img", section), images[0]);

  setText(".gallery-badge", data.badge, section);

  const stackImages = getElements(".gallery-stack img", section);

  stackImages.forEach((img, index) => {
    setImage(img, images[index + 1]);
  });

  const bottomImages = getElements(".gallery-bottom img", section);

  bottomImages.forEach((img, index) => {
    setImage(img, images[index + 4]);
  });

  const featureContainer = getElement(".gallery-features", section);

  if (!featureContainer) return;

  featureContainer.replaceChildren();

  (data.features || []).forEach((feature) => {
    const box = document.createElement("div");
    box.className = "feature-box";

    const icon = document.createElement("div");
    icon.className = "feature-icon";
    icon.textContent = feature.icon || "";

    const heading = document.createElement("h4");
    heading.textContent = feature.title || "";

    const description = document.createElement("p");
    description.textContent = feature.description || "";

    box.append(icon, heading, description);
    featureContainer.appendChild(box);
  });
}

// ==================================================
// 6. PHOTO GALLERY SECTION ENDED
// ==================================================

// ==================================================
// 7. JOURNEY CTA BANNER SECTION STARTED
// ==================================================

function renderJourneyBanner(blog) {
  const data = blog.banner;
  const section = getElement(".kashmir-journey-cta");

  if (!section || !data) return;

  setEyebrow(".kashmir-journey-cta-eyebrow", data.eyebrow, section);

  const title = getElement(".kashmir-journey-cta-content h2", section);

  if (title) {
    title.replaceChildren();

    title.appendChild(document.createTextNode(data.titleMain || ""));

    if (data.titleAccent) {
      title.appendChild(document.createTextNode(" "));

      const span = document.createElement("span");
      span.textContent = data.titleAccent;
      title.appendChild(span);
    }
  }

  setText(".kashmir-journey-cta-content > p", data.description, section);

  const highlights = getElement(".kashmir-journey-cta-highlights", section);

  if (highlights) {
    highlights.replaceChildren();

    (data.highlights || []).forEach((highlight) => {
      const item = document.createElement("span");
      const match = String(highlight).match(/^([✦◇✓])\s*(.*)$/);

      if (match) {
        const icon = document.createElement("span");
        icon.className = "kashmir-journey-cta-highlight-icon";
        icon.textContent = match[1];

        item.append(icon, document.createTextNode(" " + match[2]));
      } else {
        item.textContent = highlight;
      }

      highlights.appendChild(item);
    });
  }

  const button = getElement(".kashmir-journey-cta-actions a", section);

  setLink(button, data.buttonLink, data.buttonText);
}

// ==================================================
// 7. JOURNEY CTA BANNER SECTION ENDED
// ==================================================

// ==================================================
// 8. TRAVEL TIPS SECTION STARTED
// ==================================================

function renderTravelTips(blog) {
  const data = blog.travelTips;
  const section = getElement("#travel-tips");

  if (!section || !data) return;

  setEyebrow(".tips-content .section-eyebrow", data.eyebrow, section);

  setSectionTitle(
    ".tips-content .section-title",
    data.titleMain,
    data.titleAccent,
    section,
  );

  setText(".tips-content .section-description", data.description, section);

  const content = getElement(".tips-content", section);

  if (content) {
    getElements(".tips-card", content).forEach((card) => {
      card.remove();
    });

    (data.cards || []).forEach((cardData) => {
      const card = document.createElement("div");
      card.className = "tips-card";

      const icon = document.createElement("div");
      icon.className = "tips-icon";
      icon.textContent = cardData.icon || "";

      const details = document.createElement("div");

      const heading = document.createElement("h4");
      heading.textContent = cardData.title || "";

      const description = document.createElement("p");
      description.textContent = cardData.description || "";

      const list = document.createElement("ul");

      (cardData.items || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });

      details.append(heading, description, list);
      card.append(icon, details);

      content.appendChild(card);
    });
  }

  const imageContainer = getElement(".tips-images", section);

  if (imageContainer) {
    imageContainer.replaceChildren();

    (data.images || []).forEach((image) => {
      const img = document.createElement("img");
      setImage(img, image);
      imageContainer.appendChild(img);
    });
  }
}

// ==================================================
// 8. TRAVEL TIPS SECTION ENDED
// ==================================================

// ==================================================
// 9. FINAL CALL TO ACTION SECTION STARTED
// ==================================================

function renderFinalCTA(blog) {
  const data = blog.finalCTA;
  const section = getElement("#plan-your-journey");

  if (!section || !data) return;

  setImage(getElement(".cta-image img", section), data.image);

  setEyebrow(".cta-content .section-eyebrow", data.eyebrow, section);

  const title = getElement(".cta-content .section-title", section);

  if (title) {
    title.replaceChildren();

    title.appendChild(document.createTextNode(data.titleMain || ""));

    title.appendChild(document.createElement("br"));

    const accent = document.createElement("span");
    accent.textContent = data.titleAccent || "";
    title.appendChild(accent);

    if (data.titleSuffix) {
      title.appendChild(document.createTextNode(" " + data.titleSuffix));
    }
  }

  setText(".cta-content .section-description", data.description, section);

  const featuresContainer = getElement(".cta-features", section);

  if (featuresContainer) {
    featuresContainer.replaceChildren();

    (data.features || []).forEach((feature) => {
      const item = document.createElement("div");
      item.className = "cta-feature";

      const icon = document.createElement("span");
      icon.textContent = feature.icon || "";

      const details = document.createElement("div");

      const heading = document.createElement("h4");
      heading.textContent = feature.title || "";

      const description = document.createElement("p");
      description.textContent = feature.description || "";

      details.append(heading, description);
      item.append(icon, details);

      featuresContainer.appendChild(item);
    });
  }

  const button = getElement(".cta-content .cta-btn", section);

  setLink(button, data.buttonLink, data.buttonText);
}

// ==================================================
// 9. FINAL CALL TO ACTION SECTION ENDED
// ==================================================

// ==================================================
// 10. RELATED JOURNALS SECTION STARTED
// ==================================================

function renderRelatedJournals(blog) {
  const data = blog.relatedJournals;
  const section = getElement("#related-journals");

  if (!section || !data) return;

  setEyebrow(
    ".related-journals-heading .section-eyebrow",
    data.eyebrow,
    section,
  );

  setSectionTitle(
    ".related-journals-heading .section-title",
    data.titleMain,
    data.titleAccent,
    section,
  );

  setText(
    ".related-journals-heading .section-description",
    data.description,
    section,
  );

  const grid = getElement(".related-journals-grid", section);

  if (!grid) return;

  grid.replaceChildren();

  (data.cards || []).forEach((cardData) => {
    const article = document.createElement("article");
    article.className = "related-journal-card";

    const href =
      "travel-blog-details.html?slug=" +
      encodeURIComponent(cardData.slug || "");

    // ==================================================
    // RELATED JOURNAL IMAGE STARTED
    // ==================================================

    const imageLink = document.createElement("a");
    imageLink.className = "related-journal-image";
    imageLink.href = href;

    const img = document.createElement("img");
    setImage(img, cardData.image);

    const category = document.createElement("span");
    category.className = "related-journal-category";
    category.textContent = cardData.category || "";

    imageLink.append(img, category);

    // ==================================================
    // RELATED JOURNAL IMAGE ENDED
    // ==================================================

    // ==================================================
    // RELATED JOURNAL CONTENT STARTED
    // ==================================================

    const content = document.createElement("div");
    content.className = "related-journal-content";

    const meta = document.createElement("div");
    meta.className = "related-journal-meta";

    const readTime = document.createElement("span");
    readTime.textContent = cardData.readTime || "";

    // ==================================================
    // RELATED JOURNAL READING TIME STARTED
    // ==================================================

    meta.appendChild(readTime);

    // ==================================================
    // RELATED JOURNAL READING TIME ENDED
    // ==================================================

    const heading = document.createElement("h3");
    heading.textContent = cardData.title || "";

    const description = document.createElement("p");
    description.textContent = cardData.description || "";

    const readLink = document.createElement("a");
    readLink.className = "related-journal-link";
    readLink.href = href;

    readLink.appendChild(document.createTextNode("Read Journal "));

    const arrow = document.createElement("span");
    arrow.textContent = "→";
    readLink.appendChild(arrow);

    // ==================================================
    // RELATED JOURNAL FOOTER STARTED
    // ==================================================

    const date = document.createElement("time");
    date.className = "related-journal-date";
    date.dateTime = cardData.date || "";
    date.textContent = cardData.dateLabel || cardData.date || "";

    const footer = document.createElement("div");
    footer.className = "related-journal-footer";
    footer.append(date, readLink);

    content.append(meta, heading, description, footer);

    // ==================================================
    // RELATED JOURNAL FOOTER ENDED
    // ==================================================

    // ==================================================
    // RELATED JOURNAL CONTENT ENDED
    // ==================================================

    article.append(imageLink, content);
    grid.appendChild(article);
  });
}

// ==================================================
// 10. RELATED JOURNALS SECTION ENDED
// ==================================================

// ==================================================
// 11. LOAD BLOG DATA STARTED
// ==================================================

async function loadTravelBlogDetails() {
  const slug = getBlogSlug();

  try {
    const response = await fetch(BLOG_DATA_URL, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Unable to load blog data. HTTP " + response.status);
    }

    const data = await response.json();

    const blogs = Array.isArray(data) ? data : data.blogs;

    if (!Array.isArray(blogs)) {
      throw new Error("Invalid blogs.json structure: blogs array missing.");
    }

    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
      console.error("Travel blog not found for slug:", slug);
      return;
    }

    renderPageMeta(blog);
    renderNavigation(blog);
    renderHero(blog);
    renderIntroduction(blog);
    renderMainArticle(blog);
    renderPhotoGallery(blog);
    renderJourneyBanner(blog);
    renderTravelTips(blog);
    renderFinalCTA(blog);
    renderRelatedJournals(blog);

    document.body.dataset.blogSlug = blog.slug;
  } catch (error) {
    console.error("Error loading travel blog details:", error);
  }
}

// ==================================================
// 11. LOAD BLOG DATA ENDED
// ==================================================

// ==================================================
// 12. INITIALIZE BLOG DETAILS STARTED
// ==================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadTravelBlogDetails);
} else {
  loadTravelBlogDetails();
}

// ==================================================
// 12. INITIALIZE BLOG DETAILS ENDED
// ==================================================

// ==================================================
// DYNAMIC TRAVEL BLOG DETAILS SCRIPT ENDED
// ==================================================
