class SearchUI {
  constructor() {
    this.searchButton = null;
    this.searchOverlay = null;
    this.searchModal = null;
    this.searchInput = null;
    this.searchResults = null;
    this.isOpen = false;

    this.init();
  }

  init() {
    this.createSearchButton();
    this.createSearchModal();
    this.attachEventListeners();
  }

  createSearchButton() {
    const header = document.querySelector('.header-content nav');
    if (!header) return;

    if (this.searchButton) {
      this.searchButton.remove();
    }

    this.searchButton = document.createElement('button');
    this.searchButton.className = 'search-button';
    this.searchButton.setAttribute('aria-label', 'Пошук');
    this.searchButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <span>Пошук</span>
    `;

    this.searchButton.addEventListener('click', () => this.open());

    header.appendChild(this.searchButton);
  }

  createSearchModal() {
    this.searchOverlay = document.createElement('div');
    this.searchOverlay.className = 'search-overlay';

    this.searchModal = document.createElement('div');
    this.searchModal.className = 'search-modal';
    this.searchModal.innerHTML = `
      <div class="search-header">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="search-input"
            placeholder="Пошук по сайту..."
            autocomplete="off"
            spellcheck="false"
          />
          <button class="search-close" aria-label="Закрити">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="search-hint">
          <kbd>Esc</kbd> для закриття
        </div>
      </div>
      <div class="search-results"></div>
    `;

    this.searchOverlay.appendChild(this.searchModal);
    document.body.appendChild(this.searchOverlay);

    this.searchInput = this.searchModal.querySelector('.search-input');
    this.searchResults = this.searchModal.querySelector('.search-results');
  }

  attachEventListeners() {
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) this.close();
    });

    const closeButton = this.searchModal.querySelector('.search-close');
    closeButton.addEventListener('click', () => this.close());

    this.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });

    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }

      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    this.searchResults.addEventListener('click', (e) => {
      const resultItem = e.target.closest('.search-result-item');
      if (resultItem) {
        const url = resultItem.dataset.url;
        if (url) {
          window.location.href = url;
        }
      }
    });
  }

  open() {
    this.isOpen = true;
    this.searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.searchInput.focus();
    }, 100);

    this.showInitialMessage();
  }

  close() {
    this.isOpen = false;
    this.searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
  }

  showInitialMessage() {
    this.searchResults.innerHTML = `
      <div class="search-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <p>Почніть вводити запит для пошуку</p>
      </div>
    `;
  }

  performSearch(query) {
    if (!query || query.length < 2) {
      this.showInitialMessage();
      return;
    }

    const results = searchContent(query);

    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>Нічого не знайдено за запитом "<strong>${this.escapeHtml(query)}</strong>"</p>
          <p class="search-hint-text">Спробуйте інші ключові слова</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(result => `
      <a href="${result.url}" class="search-result-item" data-url="${result.url}">
        <div class="search-result-title">${highlightMatch(this.escapeHtml(result.title), query)}</div>
        <div class="search-result-description">${highlightMatch(this.escapeHtml(result.description), query)}</div>
        <div class="search-result-url">${result.url}</div>
      </a>
    `).join('');

    this.searchResults.innerHTML = `
      <div class="search-results-header">
        Знайдено результатів: ${results.length}
      </div>
      ${resultsHTML}
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchUI();
});
