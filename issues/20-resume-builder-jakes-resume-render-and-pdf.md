# 20: Resume Builder — Jake's-Resume-style rendering + ATS-friendly PDF export

**What to build:** Render the structured resume content from Ticket 19 in a layout matching Jake's Resume's structure (single column, no tables/graphics/text boxes, standard section headers, dense but scannable), and export it to PDF via a JS PDF library. This is an HTML/CSS replica of that structure — not a LaTeX compilation pipeline.

**Blocked by:** 19

**Status:** ready-for-agent

- [ ] Rendered resume follows Jake's Resume's structural conventions: single column, plain text hierarchy, no tables/images/multi-column layouts (these are exactly what breaks ATS parsers)
- [ ] Export produces a real, downloadable PDF that preserves text as selectable/copyable text, not a rasterized image of the layout (an ATS needs to parse the text)
- [ ] PDF output is a faithful rendering of the same data shown on-screen — no separate/divergent template logic between preview and export
- [ ] Empty/missing sections (e.g. no projects yet) don't break the layout or leave obvious blank gaps
- [ ] Chosen PDF library documented in code comments/README for future maintenance (e.g. why this one over alternatives)

## Implementation Decisions

- No LaTeX/WASM compilation — build the template directly in HTML/CSS and use a client-side (or edge-function-side) PDF export library. ATS-friendliness comes from the plain-structure convention, which this ticket enforces directly, not from any LaTeX-specific property.
