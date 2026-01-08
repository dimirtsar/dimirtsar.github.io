#!/usr/bin/env python3
import os
import re

# Old problematic code
old_code = '''    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          mobileMenuToggle.classList.remove('active');
          nav.classList.remove('active');
          menuOverlay.classList.remove('active');
          document.body.style.overflow = '';

          setTimeout(() => {
            const headerHeight = 88;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 300);
        }
      });
    });'''

# New correct code
new_code = '''    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Check if it's an anchor link (starts with #)
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';

            setTimeout(() => {
              const headerHeight = 88;
              const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }, 300);
          }
        } else {
          // For regular links (.html) - just close mobile menu
          if (mobileMenuToggle.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });'''

# Get all HTML files except index.html and index_old_backup.html
files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['index.html', 'index_old_backup.html']]

fixed_count = 0
for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_code in content:
        new_content = content.replace(old_code, new_code)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ Fixed: {filename}")
        fixed_count += 1
    else:
        print(f"✗ Skipped: {filename} (pattern not found)")

print(f"\nTotal files fixed: {fixed_count}/{len(files)}")
