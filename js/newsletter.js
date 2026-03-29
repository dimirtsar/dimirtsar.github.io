class NewsletterSubscription {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.emailInput = this.form.querySelector('input[type="email"]');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.messageContainer = this.form.querySelector('.newsletter-message');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = this.emailInput.value.trim();

    if (!email) {
      this.showMessage('Будь ласка, введіть email адресу', 'error');
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Будь ласка, введіть коректну email адресу', 'error');
      return;
    }

    this.setLoading(true);

    try {
      const supabaseUrl = 'https://iediedshsblyuxcrmaai.supabase.co';
      const apiUrl = `${supabaseUrl}/functions/v1/newsletter-subscribe`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZGllZHNoc2JseXV4Y3JtYWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNjM2NTMsImV4cCI6MjA4MzYzOTY1M30.oiZF4RFUisJALJtvPDfq1Ygc-JUoIof1RE172wBD98A',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        this.showMessage('Дякуємо за підписку! Перевірте свою пошту.', 'success');
        this.emailInput.value = '';
      } else {
        this.showMessage(data.error || 'Помилка при підписці. Спробуйте пізніше.', 'error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      this.showMessage('Помилка з\'єднання. Перевірте інтернет та спробуйте знову.', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  showMessage(message, type) {
    if (!this.messageContainer) return;

    this.messageContainer.textContent = message;
    this.messageContainer.className = `newsletter-message ${type}`;
    this.messageContainer.style.display = 'block';

    setTimeout(() => {
      this.messageContainer.style.display = 'none';
    }, 5000);
  }

  setLoading(isLoading) {
    this.submitButton.disabled = isLoading;
    this.emailInput.disabled = isLoading;
    this.submitButton.textContent = isLoading ? 'Обробка...' : 'Підписатися';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NewsletterSubscription('newsletterForm');
});
