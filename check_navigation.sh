#!/bin/bash

echo "Перевірка навігації у HTML файлах..."
echo "======================================"
echo ""

# Перевірка основних файлів
echo "Перевірка основних сторінок:"
for file in index.html about.html publications.html blog.html heat-pumps.html efficiency.html business.html contact.html; do
    if [ -f "$file" ]; then
        # Перевірка чи є правильні посилання
        correct_links=$(grep -o 'href="[^"]*\.html"' "$file" | wc -l)
        anchor_links=$(grep -o 'href="#[^"]*"' "$file" | grep -E 'href="#(about|publications|blog|heat-pumps|efficiency|business|contact)"' | wc -l)

        echo "  $file:"
        echo "    ✓ Правильних посилань (.html): $correct_links"
        if [ $anchor_links -gt 0 ]; then
            echo "    ✗ Старих якірних посилань (#): $anchor_links"
        else
            echo "    ✓ Старих якірних посилань (#): $anchor_links"
        fi
    fi
done

echo ""
echo "Перевірка файлів блогу:"
blog_count=$(ls blog-article-*.html 2>/dev/null | wc -l)
echo "  Знайдено файлів блогу: $blog_count"

# Перевірка кількох файлів блогу
for file in $(ls blog-article-*.html 2>/dev/null | head -3); do
    correct_links=$(grep -o 'href="[^"]*\.html"' "$file" | wc -l)
    echo "  $file: $correct_links посилань"
done

echo ""
echo "======================================"
echo "Перевірка завершена!"
