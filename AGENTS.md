# Repository instructions for AI agents

## RULE 27 — Faithful, compact ChatGPT UI exports to GitHub Pages

**Scope:** Every new or updated ChatGPT visual lesson or interactive simulation published in this repository, including all files under `chat-exports/`.

**Required behavior before pushing:**

1. Treat the original ChatGPT lesson as the source of truth. Preserve the content, section order, diagrams, actual icons and logos, colors, tables, controls, calculations, quiz behavior, and reset actions. Do not redesign, omit content, or replace icons with letters or generic placeholders.
2. Keep diagrams compact, centered, and responsive. Do not stretch SVG illustrations to the full desktop content width. Default maximum widths: **380px for standalone diagrams, 190px for diagrams in two-column cards, and 125px for diagrams in three-column cards**. On narrow screens, shrink proportionally (standalone diagrams: 92% of available width, capped at 340px). Maintain the original SVG viewBox, aspect ratio, text legibility, and colors. Apply these defaults to dynamically rendered diagrams as well as static ones. Do not resize unrelated UI icons, tables, or controls. Allow a larger diagram only when needed for legibility or explicitly requested by the user.
3. Use actual inline SVG artwork or embedded image assets for icons wherever possible. Do not silently substitute initials. Preserve the existing responsive light/dark appearance.
4. Verify the exported HTML against the original chat: section count and order, icon rendering, diagram dimensions, interactive controls, calculations, and quiz scoring. Test desktop and mobile layouts in a browser when available. Disclose any unverified visual fidelity or deployment status instead of claiming exact parity.
5. Commit to the intended repository and branch without overwriting unrelated lessons. Verify the committed file, then provide the direct GitHub Pages URL and, when useful, the commit link.

### Approved compact diagram CSS

Use the equivalent of the following pattern, adapting selectors to the lesson's markup:

```css
.join-diagram {
  display: block;
  width: 100%;
  max-width: 380px;
  height: auto;
  margin: 0 auto;
}
.study-grid .join-diagram {
  max-width: 190px;
}
.study-grid[style*='--cols:3'] .join-diagram {
  max-width: 125px;
}
@media (max-width: 500px) {
  .study-card .join-diagram {
    width: 92%;
    max-width: 340px;
  }
  .study-grid .join-diagram {
    width: 100%;
  }
}
```

**Approved reference:** [SQL JOINs visual study](chat-exports/sql-joins/sql_joins_visual_study.html), compact-sizing commit `439666d2697e4c5795def82d5d92935c8b81cdd7`.


### Compact sliders and progress bars

For every exported lesson, avoid oversized sliders and progress indicators. Use these default dimensions:
- Slider visible track: **4px** high; circular thumb: **12px** diameter.
- Quiz/completion progress bars: **4px** high; comparison/result bars: **6px** high.
- Slider and progress-bar groups: **380px maximum width** on desktop, responsive to narrower containers, centered within larger cards. Keep the labels and values aligned with their bars.
- Keep actual slider interaction areas at least 24px high on desktop and 44px on coarse-pointer/touch devices; retain visible keyboard focus, native range semantics, live values and accurate fill proportions.
- Style both WebKit and Firefox range controls explicitly. Preserve original colors, minimum/maximum/step, event handlers, data, calculations, and quiz/reset behavior. Do not reduce other controls or text just to achieve a compact appearance.
- A visually larger chart or bar is allowed only if needed for legibility or explicitly requested.

Reference implementation: the SQL JOINs visual study linked above. Inspect both idle and active/dragged sliders and progress bars in light/dark and desktop/mobile layouts when browser QA is available.

**Acceptance criterion:** The hosted lesson retains the original ChatGPT learning experience without heavy, bulky, full-width diagrams, sliders, or progress bars on desktop.

### Shared repository implementation

Use `assets/rule-27.css` and `assets/rule-27.js` for new or revised HTML exports, loading them after the lesson's existing styles with the correct relative paths. They compact eligible SVG diagrams and sliders/progress bars, preserve existing artwork, and handle dynamically generated elements. The original SQL JOINs reference already implements the same dimensions locally and need not load these assets. Preserve original scripts and content; check responsive rendering and readable text, and add narrowly scoped exceptions if needed. Do not apply diagram sizing to small icons or logos.

## RULE 29 — Zero-omission ChatGPT-to-HTML export gate (mandatory)

**Scope:** Every AI agent creating, updating, repairing, or publishing any ChatGPT lesson, visual explanation, or interactive simulation in this repository, including every file under `chat-exports/`. Applies to new lessons, older lesson repairs, batch exports, and handovers. This rule is cumulative with RULE 27 and all other applicable instructions. Compact styling never authorizes deleting or simplifying a component.

**Non-negotiable:** Export the complete original assistant response, not a summary, approximation, redesign, or rewritten lesson. Every source component must have a corresponding working HTML component. If the exact source conversation or a component's implementation is unavailable, stop the affected export and report what is missing; never silently invent, omit, or substitute content, and never mark an incomplete export as finished.

### A. Inventory the source before writing HTML

1. Read the entire original response, including every partial response and final continuation. Do not rely on a handover summary, an earlier HTML export, or a count of only SVG tags.
2. Create a component manifest in original reading order, with a stable ID for each item and its expected content, state, and behavior. Include every heading, paragraph (including all Telugu/English explanations), table, list, code block, terminal preview, file tree, metric, badge, progress tracker, architecture diagram, flowchart, inline SVG, dynamically generated SVG, illustration, icon, link, and interactive control. Include the final recap and next-stage preview.
3. Count diagrams by actual visual component, including CSS/HTML diagrams, cards, nested and conditional diagrams, and dynamically rendered elements. Record sub-elements such as labels, legends, arrows, dotted/dashed connectors, boxes, colors, SVG viewBox and aspect ratio. Do not treat SVG count alone as proof of completeness.
4. Inventory every interactive input, slider, button, keyboard shortcut, toggle, animation, quiz, simulation step, state transition, validation rule, calculation, default value, output, reset behavior and boundary condition. Record expected behavior for each.

### B. Preserve every component

5. Reproduce every manifest item in the same order and with the same complete text, code, data, labels, values, layout relationships and functionality. Preserve original programming code exactly, including indentation, blank lines and syntax highlighting. Do not shorten explanations, combine distinct diagrams, replace visuals with prose, remove examples, or swap meaningful icons for generic letters or emoji.
6. Preserve SVG geometry, connectors (including dotted/dashed lines), arrowheads, labels, legend, grouping, colors, highlights and animation/state changes. Ensure all labels remain legible and inside their intended bounds. Use responsive scaling rather than deleting content.
7. All exported lessons must use **dark theme only**, including the background, diagrams, cards, controls, tables, code editor and terminal. Maintain meaningful syntax highlighting; do not render code in a single undifferentiated white color. Follow RULE 27 compact-sizing defaults where compatible; retain optimum reading width, vertical flow, natural card heights and mobile usability.
8. Reimplement interactive behavior in self-contained HTML/CSS/vanilla JavaScript when necessary; embed required assets and keep the lesson functional offline. Preserve keyboard navigation and focus handling. Do not use static screenshots as substitutes for working controls.
9. Exclude only unrelated user prompts or conversation metadata when requested; never remove educational assistant content or next-stage visuals. If a required change conflicts with preservation, document the exception and obtain explicit user approval before applying it.

### C. Mandatory pre-commit acceptance gate

10. Compare the completed HTML against the original source manifest, item by item, and confirm counts, reading order, complete text, code integrity and all visual sub-elements. Require **zero missing, zero unintentionally changed, and zero unimplemented components**. Inspect the full DOM and dynamically rendered states, not just the static HTML.
11. Test every interaction: initial state, representative inputs, all controls, step navigation, min/max or boundary values, keyboard actions, reset, expected outputs and error states as applicable. Check JavaScript syntax and runtime errors. Test actual browser rendering at desktop and mobile widths; inspect for clipping, overflow, overlap, hidden diagrams, illegible text, absent dashed connectors, incorrect theme or syntax colors. A mock-DOM test or source-code inspection is not a substitute for browser verification.
12. Save an export audit record alongside the lesson (for example, `<lesson-name>.audit.json`), recording source reference, source/export component counts by type, item-by-item manifest coverage, interaction test results, browser viewport checks, discrepancies, and any expressly approved exceptions. Never fabricate counts, tests, screenshots, or verification results.
13. **Do not publish an export as complete if any required component is missing, mismatched, or untested.** Fix and rerun the gate first. If browser or original-source access is unavailable, report the blocker and label the export status as unverified in the separate audit record and delivery message; do not claim faithful visual parity or complete publication.
14. After committing, reread the committed file and audit record, verify the intended branch and direct page URL, and check the live deployed lesson when accessible. Do not equate successful GitHub commit with successful Pages deployment. Report the exact checks performed and any unresolved limitation to the user.

### D. Regression prevention

15. When repairing an existing page, preserve all already-correct content and interactions. Compare the before/after manifest, confirm no unrelated files or lessons changed, and re-run the full gate. Do not fix one missing diagram by introducing another omission.
16. Treat this rule as a blocking acceptance criterion, not an optional preference. All future AI agents must read this file before exporting lessons and must explicitly report RULE 29 audit status. Never remove, weaken, bypass, or silently reinterpret RULE 29 without the repository owner's explicit approval.

**Incident reference:** Stage 014 — Source Citations initially lost three of four SVG diagrams and several non-SVG visual components and interactive controls. The repair restored the diagrams, dotted connections, complete tracker and validation controls while preserving the original code blocks: [repair commit](https://github.com/sabareeshrao/Testing-Ui-Simulations/commit/5667fad6e3d59f8801b43944d498a56a3227abb8). Do not repeat this failure. The repair's structural and mocked interaction checks did not establish pixel-perfect browser fidelity.

### E. Keep audit information out of the learning interface

17. **Never insert internal Rule 29 notices, draft or unverified banners, QA disclaimers, export-process commentary, or audit-status labels into the lesson HTML, its page title, or the lesson index.** Keep the educational interface clean and faithful to the source. Record verification status and limitations only in the separate audit record and the delivery message. This does not waive any testing, preservation, or acceptance requirement, and does not authorize a false completion claim. Preserve educational caveats that were part of the original lesson.
