// ==================================================
// GET SLUG FROM URL
// ==================================================
function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

// ==================================================
// LOAD BLOG DATA
// ==================================================
async function loadBlog() {
  const slug = getSlug();

  if (!slug) return;

  try {
    const res = await fetch("assets/data/blogs.json");
    const blogs = await res.json();

    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) return;

    renderBlog(blog);
  } catch (err) {
    console.error("Error loading blog:", err);
  }
}

// ==================================================
// RENDER BLOG
// ==================================================
function renderBlog(blog) {
  // HERO
  document.querySelector(".blog-title").innerHTML = `
    ${blog.title.split(":")[0]}:
    <span>${blog.title.split(":")[1] || ""}</span>
  `;

  document.querySelector(".blog-meta").innerHTML = `
    <span>${blog.date}</span>
    <span>•</span>
    <span>${blog.readTime}</span>
  `;

  document.querySelector(".blog-category").textContent =
    blog.category.toUpperCase();

  document.querySelector(".blog-hero-img").src =
    `assets/images/blogs/${blog.images.hero}`;

  // INTRO
  document.querySelector(".blog-intro-text p").textContent = blog.introduction;

  document.querySelector(".blog-intro-image img").src =
    `assets/images/blogs/${blog.images.introduction}`;

  // ARTICLE IMAGES
  const articleGrid = document.querySelector(".blog-article-grid");
  articleGrid.innerHTML = blog.images.article
    .map((img) => `<img src="assets/images/blogs/${img}" alt="Article Image">`)
    .join("");

  // GALLERY
  const galleryGrid = document.querySelector(".gallery-grid");
  galleryGrid.innerHTML = blog.images.gallery
    .map((img) => `<img src="assets/images/blogs/${img}" alt="Gallery Image">`)
    .join("");

  // TIPS
  const tipsGrid = document.querySelector(".tips-grid");
  tipsGrid.innerHTML = blog.images.tips
    .map((img) => `<img src="assets/images/blogs/${img}" alt="Tips Image">`)
    .join("");

  // CTA IMAGE
  document.querySelector(".blog-cta-bg").src =
    `assets/images/blogs/${blog.images.cta}`;
}

// ==================================================
// INIT
// ==================================================
document.addEventListener("DOMContentLoaded", loadBlog);
