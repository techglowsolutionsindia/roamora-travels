/* ==================================================
   EXPLORE OUR TRAVEL JOURNALS FILTER STARTED
================================================== */

const journalFilterButtons = document.querySelectorAll("[data-journal-filter]");

const journalCards = document.querySelectorAll("[data-journal-card]");

if (journalFilterButtons.length && journalCards.length) {
  journalFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.journalFilter;

      /* ==============================================
         UPDATE ACTIVE FILTER
      ============================================== */

      journalFilterButtons.forEach((filterButton) => {
        filterButton.classList.remove("is-active");
      });

      button.classList.add("is-active");

      /* ==============================================
         FILTER JOURNAL CARDS
      ============================================== */

      journalCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        const shouldShow =
          selectedCategory === "all" || cardCategory === selectedCategory;

        card.hidden = !shouldShow;
      });
    });
  });
}

/* ==================================================
   EXPLORE OUR TRAVEL JOURNALS FILTER ENDED
================================================== */
