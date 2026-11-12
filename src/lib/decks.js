// Slide decks: pairs each deck's text (src/data/decks/<slug>.js) with its
// slide images (src/assets/decks/<slug>/01.png, 02.png, …).
//
// Astro turns the PNGs into WebP at build time; nothing here runs in the browser.

const texts = import.meta.glob("../data/decks/*.js", { eager: true, import: "default" });
const images = import.meta.glob("../assets/decks/*/*.png", { eager: true, import: "default" });

const slugOf = (path) => path.split("/").at(-2);

// "<slug>" -> [ImageMetadata, …] sorted by file name (01.png, 02.png, …)
const imagesBySlug = {};
for (const [path, image] of Object.entries(images).sort(([a], [b]) => a.localeCompare(b))) {
  (imagesBySlug[slugOf(path)] ??= []).push(image);
}

export function getDeck(slug) {
  const text = texts[`../data/decks/${slug}.js`];
  const slideImages = imagesBySlug[slug] ?? [];
  if (!text) throw new Error(`Deck "${slug}": no src/data/decks/${slug}.js`);
  if (slideImages.length !== text.slides.length) {
    throw new Error(
      `Deck "${slug}": ${slideImages.length} images in src/assets/decks/${slug}/ but ${text.slides.length} slides in src/data/decks/${slug}.js`
    );
  }

  return {
    ...text,
    slides: text.slides.map((slide, i) => ({ ...slide, image: slideImages[i] })),
    cover: slideImages[0],
  };
}

// Cover image (slide 1) for a deck's card, or undefined
export const getDeckCover = (slug) => imagesBySlug[slug]?.[0];
