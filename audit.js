const fs = require('fs');
const file = 'c:/Users/syedm/OneDrive/Documents/projects/frontend/henceprove_landing/index.html';
const html = fs.readFileSync(file, 'utf8');
const lines = html.split('\n');

const report = {
    viewportHeight: [],
    overflow: [],
    scrollTrigger: [],
    zindex: [],
    layoutContainers: [],
    breakpoints: []
};

lines.forEach((line, i) => {
    const ln = i + 1;
    const l = line.trim();

    // 1. Viewport heights
    if (l.match(/100vh|100svh|h-screen/i)) report.viewportHeight.push(`${ln}: ${l}`);

    // 2. Overflow clipping
    if (l.match(/overflow:\s*hidden|overflow-x:\s*hidden/i)) report.overflow.push(`${ln}: ${l}`);

    // 3. ScrollTrigger
    if (l.match(/ScrollTrigger\.create|trigger\s*:|pin\s*:|end\s*:/i)) {
        // Broad capture around JS scroll trigger setup
        report.scrollTrigger.push(`${ln}: ${l.substring(0, 100)}`);
    }

    // 4. z-index / pointer-events
    if (l.match(/z-index:|pointer-events:/i)) report.zindex.push(`${ln}: ${l}`);

    // 5. Layout Containers
    if (l.match(/class="[^"]*hero[^"]*"|class="[^"]*innovation[^"]*"|class="[^"]*story[^"]*"/i)) {
        report.layoutContainers.push(`${ln}: ${l}`);
    }

    // 6. Mobile breakpoints
    if (l.match(/@media.*max-width|md:|sm:/i)) {
        if (!l.match(/https:/)) report.breakpoints.push(`${ln}: ${l.substring(0, 100)}`);
    }
});

fs.writeFileSync('audit_results.json', JSON.stringify(report, null, 2));
