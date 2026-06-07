import fs from 'fs';
import path from 'path';

// Parse actual HTML build outputs from the "out" directory.
// We check that the HTML title and meta description exist and match our constraints.
// This is more robust than re-deriving titles and descriptions.

function validateSEO() {
  console.log("=== SEO Quality Gate ===");

  const outDir = path.join(process.cwd(), 'out', 'convert');
  if (!fs.existsSync(outDir)) {
    console.warn("⚠️ 'out/convert' directory not found. Please build the project (npm run build) before running the validation gate.");
    process.exit(1);
  }

  const dirs = fs.readdirSync(outDir).filter(f => {
    return fs.statSync(path.join(outDir, f)).isDirectory();
  });

  if (dirs.length === 0) {
    console.warn("⚠️ No convert directories found in 'out/convert'. Nothing to test.");
    // don't fail, just no-op
    return;
  }

  let totalPairsTested = 0;
  let issuesFound = 0;

  for (const slug of dirs) {
    const htmlFile = path.join(outDir, slug, 'index.html');
    if (!fs.existsSync(htmlFile)) {
       const htmlFileAlt = path.join(outDir, `${slug}.html`);
       if (!fs.existsSync(htmlFileAlt)) continue;
    }

    const fileToRead = fs.existsSync(htmlFile) ? htmlFile : path.join(outDir, `${slug}.html`);

    try {
      const htmlContent = fs.readFileSync(fileToRead, 'utf8');

      // Check title length
      const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';
      if (!title) {
        console.error(`❌ Missing <title> tag for ${slug}`);
        issuesFound++;
      } else if (title.length > 60) {
        console.warn(`⚠️ Title too long (>60 chars) for ${slug}: "${title}"`);
        issuesFound++;
      }

      // Check description length
      const descMatch = htmlContent.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"[^>]*>/i) ||
                        htmlContent.match(/<meta[^>]*content="([^"]+)"[^>]*name="description"[^>]*>/i);
      const description = descMatch ? descMatch[1] : '';

      if (!description) {
        console.error(`❌ Missing description for ${slug}`);
        issuesFound++;
      } else if (description.length > 160) {
        console.warn(`⚠️ Description too long (>160 chars) for ${slug}: "${description}"`);
        issuesFound++;
      } else if (description.length < 50) {
        console.warn(`⚠️ Description too short (<50 chars, thin content risk) for ${slug}: "${description}"`);
        issuesFound++;
      }

      totalPairsTested++;
    } catch (e) {
      console.error(`Failed to read or parse HTML for slug ${slug}: ${e}`);
    }
  }

  console.log(`\nTested ${totalPairsTested} generated routes.`);

  if (issuesFound > 0) {
    console.error(`❌ SEO Quality Gate failed with ${issuesFound} issues.`);
    process.exit(1);
  } else {
    console.log("✅ All SEO Quality Gate checks passed.");
  }
}

validateSEO();
