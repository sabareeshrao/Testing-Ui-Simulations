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
