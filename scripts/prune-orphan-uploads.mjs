// Removes uploaded images that are no longer referenced by any portfolio entry.
//
// When a photo is deleted in Decap CMS, the entry JSON is removed but the
// uploaded image file is left behind in public/images/uploads/. This script
// finds those orphans and deletes them. Run by .github/workflows/prune-uploads.yml.

import fs from "node:fs";
import path from "node:path";

const ENTRIES_DIR = "content/portfolio";
const UPLOADS_DIR = "public/images/uploads";
const PUBLIC_PREFIX = "/images/uploads/";

// Collect the basenames of every uploaded image referenced by an entry.
function referencedUploads() {
    const refs = new Set();
    if (!fs.existsSync(ENTRIES_DIR)) return refs;
    for (const file of fs.readdirSync(ENTRIES_DIR)) {
        if (!file.endsWith(".json")) continue;
        try {
            const data = JSON.parse(fs.readFileSync(path.join(ENTRIES_DIR, file), "utf8"));
            if (typeof data.image === "string" && data.image.startsWith(PUBLIC_PREFIX)) {
                refs.add(path.basename(data.image));
            }
        } catch (err) {
            // Don't prune anything if an entry can't be parsed — fail safe.
            console.error(`Could not parse ${file}: ${err.message}`);
            throw err;
        }
    }
    return refs;
}

function main() {
    if (!fs.existsSync(UPLOADS_DIR)) {
        console.log("No uploads directory; nothing to prune.");
        return;
    }
    const referenced = referencedUploads();
    let removed = 0;
    for (const file of fs.readdirSync(UPLOADS_DIR)) {
        if (file === ".gitkeep") continue;
        const full = path.join(UPLOADS_DIR, file);
        if (!fs.statSync(full).isFile()) continue;
        if (!referenced.has(file)) {
            fs.rmSync(full);
            console.log(`Removed orphan: ${UPLOADS_DIR}/${file}`);
            removed++;
        }
    }
    console.log(removed ? `Pruned ${removed} orphan upload(s).` : "No orphan uploads found.");
}

main();
