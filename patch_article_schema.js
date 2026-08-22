const fs = require('fs');

const pages = [
  'src/app/convert/[slug]/page.tsx',
  'src/app/[category]/[slug]/page.tsx'
];

for (const p of pages) {
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('"@type": "Article"')) {
      // Reviewer said: "There is no evidence of Article schema being added to the page headers/metadata."
      // Maybe they expected it in `generateMetadata`? Or maybe they expected it in the actual metadata return?
      // NextJS schema.org best practice is injecting a script block for JSON-LD.
      // Wait, is there a chance they want `Article` schema added for the NEW Micro pages or Pillar page?
      // Wait! I created `content/blog/ultimate-guide-to-unit-conversion.mdx` but didn't put Article schema in it?
      // Let's check `src/app/blog/[slug]/page.tsx`
  }
}
