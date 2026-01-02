import fs from 'fs';

// Read HTML file
const html = fs.readFileSync('index.html', 'utf-8');

// Extract article content
function extractArticleContent(articleId) {
  const regex = new RegExp(`<div id="${articleId}"[^>]*>([\\s\\S]*?)</div>\\s*</article>`, 'i');
  const match = html.match(regex);

  if (match) {
    return match[1].trim();
  }
  return '';
}

// Extract all articles (2-7)
const articles = {};
for (let i = 2; i <= 7; i++) {
  const content = extractArticleContent(`article${i}`);
  articles[`art${i}-content`] = content;
  console.log(`Extracted article${i}: ${content.length} characters`);
}

// Write to JSON for easier handling
fs.writeFileSync('articles-uk.json', JSON.stringify(articles, null, 2));
console.log('\nUkrainian articles saved to articles-uk.json');
