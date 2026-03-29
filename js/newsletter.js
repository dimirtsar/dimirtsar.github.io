class NewsletterSubscription {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.emailInput = this.form.querySelector('input[type="email"]');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.messageContainer = this.form.querySelector('.newsletter-message');

    this.supabaseUrl = 'https://iediedshsblyuxcrmaai.supabase.co';
    this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZGllZHNoc2JseXV4Y3JtYWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNjM2NTMsImV4cCI6MjA4MzYzOTY1M30.oiZF4RFUisJALJtvPDfq1Ygc-JUoIof1RE172wBD98A';

    this.init();
  }

  init() {
    this.loadSupabaseClient();
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  loadSupabaseClient() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
      this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
    };
    script.onerror = () => {
      console.error('Failed to load Supabase client');
    };
    document.head.appendChild(script);
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

    if (!this.supabase) {
      this.showMessage('Завантаження... Спробуйте ще раз.', 'error');
      return;
    }

    this.setLoading(true);

    try {
      const { data, error } = await this.supabase
        .from('newsletter_subscriptions')
        .insert({ email: email.toLowerCase() });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });

        if (error.code === '23505') {
          this.showMessage('Ця email адреса вже підписана на розсилку', 'error');
        } else if (error.message && error.message.includes('permission')) {
          this.showMessage('Помилка доступу. Спробуйте оновити сторінку.', 'error');
        } else {
          this.showMessage('Помилка при підписці. Спробуйте пізніше.', 'error');
        }
      } else {
        this.showMessage('Дякуємо за підписку! Перевірте свою пошту.', 'success');
        this.emailInput.value = '';
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
