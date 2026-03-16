const fs = require('fs');
const html = fs.readFileSync('c:/Users/syedm/OneDrive/Documents/projects/frontend/henceprove_landing/index.html', 'utf8');

const results = [];
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    const text = lines.slice(Math.max(0, i - 10), i + 2).join('\n');
    const line = lines[i];

    if (line.match(/height:\s*100vh/i) || line.match(/min-height:\s*100vh/i) || line.match(/overflow:\s*hidden/i)) {
        // Find the closest preceding class="something" or id="something" in the last 10 lines
        const match = text.match(/class="([^"]+)"/g);
        const idMatch = text.match(/id="([^"]+)"/g);

        let lastClass = match ? match[match.length - 1] : 'none';
        let lastId = idMatch ? idMatch[idMatch.length - 1] : 'none';

        results.push(`Line ${i + 1}: ${line.trim()} | Class: ${lastClass} | ID: ${lastId}`);
    }
}

fs.writeFileSync('c:/Users/syedm/OneDrive/Documents/projects/frontend/henceprove_landing/classes.txt', results.join('\n'));
console.log("Done");
