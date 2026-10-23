/* ==================================================
   BLOG JOURNAL FILTERS STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-journal-filter]");

  const journalCards = document.querySelectorAll("[data-journal-card]");

  if (!filterButtons.length || !journalCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.journalFilter;

      // Update active filter button
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      // Show or hide matching journal cards
      journalCards.forEach((card) => {
        const matchesCategory =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.hidden = !matchesCategory;
        card.style.display = matchesCategory ? "" : "none";
      });
    });
  });

  // Set initial accessibility state
  filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("is-active")),
    );
  });
});

/* ==================================================
   BLOG JOURNAL FILTERS ENDED
================================================== */
