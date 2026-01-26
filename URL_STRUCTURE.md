# Структура URL сайту

Сайт тепер використовує чисті URL без розширень `.html` для кращої SEO оптимізації та зручності користувачів.

## Структура файлів

### Головна сторінка
- URL: `/` або `/index.html`
- Файл: `/index.html`

### Основні розділи
Кожен розділ має власну папку з файлом `index.html`:

- `/about/` → `/about/index.html` (Про мене)
- `/blog/` → `/blog/index.html` (Блог)
- `/contact/` → `/contact/index.html` (Контакти)
- `/publications/` → `/publications/index.html` (Наукові публікації)
- `/heat-pumps/` → `/heat-pumps/index.html` (Теплові насоси)
- `/efficiency/` → `/efficiency/index.html` (Енергоефективність)
- `/business/` → `/business/index.html` (Бізнес)

### Статті блогу
Кожна стаття має власну папку всередині `/blog/`:

- `/blog/hp-flexibility/` → `/blog/hp-flexibility/index.html`
- `/blog/hp-owners-austria/` → `/blog/hp-owners-austria/index.html`
- `/blog/hp-diffusion-austria/` → `/blog/hp-diffusion-austria/index.html`
- і т.д.

## Переваги

1. **SEO**: Чисті URL краще індексуються пошуковими системами
2. **Зручність**: URL легше запам'ятовувати та ділитися ними
3. **Професійність**: Виглядає більш професійно без `.html`
4. **Гнучкість**: Легше змінювати технології в майбутньому

## Зворотна сумісність

Всі внутрішні посилання оновлені. Старі URL (з `.html`) все ще працюватимуть на GitHub Pages завдяки автоматичній обробці.

## Шляхи до зображень

- Для головної сторінки: `images/`
- Для основних розділів: `../images/`
- Для статей блогу: `../../images/`
