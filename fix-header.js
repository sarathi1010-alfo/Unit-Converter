const fs = require('fs');

function processFile(filename, replacements) {
  let content = fs.readFileSync(filename, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.search, r.replace);
  }
  fs.writeFileSync(filename, content);
}

processFile('src/components/layout/Header.tsx', [
  { search: /          <Link href="\/category\/length-converter" className="hover:text-primary transition-colors">Length<\/Link>\n          <Link href="\/category\/weight-converter" className="hover:text-primary transition-colors">Weight<\/Link>\n          <Link href="\/category\/temperature-converter" className="hover:text-primary transition-colors">Temperature<\/Link>\n/g, replace: "" }
]);

processFile('src/components/layout/Footer.tsx', [
  { search: /            <li><Link href="\/category\/length-converter" className="hover:text-primary">Length<\/Link><\/li>\n            <li><Link href="\/category\/weight-converter" className="hover:text-primary">Weight & Mass<\/Link><\/li>\n            <li><Link href="\/category\/temperature-converter" className="hover:text-primary">Temperature<\/Link><\/li>\n/g, replace: "" },
  { search: /            <li><Link href="\/guides\/cm-to-inches" className="hover:text-primary">CM to Inches<\/Link><\/li>\n            <li><Link href="\/convert\/kg-to-lb" className="hover:text-primary">KG to LBS<\/Link><\/li>\n            <li><Link href="\/convert\/c-to-f" className="hover:text-primary">Celsius to Fahrenheit<\/Link><\/li>\n/g, replace: "" }
]);
