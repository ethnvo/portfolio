import { useState } from "react";
import { getFontEmbedCSS, toPng } from "html-to-image";
import download from "downloadjs";

// The picture itself never changes: LinkedIn's cover size, the teaser's sky
// and ink. These are set on the element, not through the theme, so the
// banner comes out the same from the light page and the dark one.
const ARTWORK = {
  width: 1584,
  height: 396,
  backgroundColor: "#8EE0F0",
  color: "#080B09",
};

// The font file inside the Allo rule the image library is about to draw
// with. Null when the rule is missing, or when the library could not fetch
// the file: it leaves the address empty and carries on.
const alloFile = (embedCSS: string) =>
  embedCSS
    .split("@font-face")
    .find((rule) => /font-family:\s*["']?Allo["']?\s*;/.test(rule))
    ?.match(/url\(["']?(data:[^"')]+)/)?.[1] ?? null;

// Whether those bytes are a font the browser can draw with. A server's error
// page is fetched without complaint too.
const isWorkingFont = (file: string) =>
  new FontFace("Allo proof", `url("${file}")`).load().then(
    () => true,
    () => false
  );

// Hidden LinkedIn banner generator. Reachable at /#banner.
// Draws the cover in the onda teaser look (flat sky frame, a small "i'm"
// over one huge word) and exports it as a PNG at double size.
// The bottom-left stays clear: that is where the profile photo overlaps.
const Banner = () => {
  const [problem, setProblem] = useState<string | null>(null);

  const exportBanner = async () => {
    const node = document.getElementById("banner");
    if (!node) return;
    setProblem(null);

    try {
      // The picture is not drawn from the Allo this page is showing. The
      // image library fetches its own copy now, and when that fails it draws
      // in a stand-in typeface without a word, which looks fine at a glance.
      // So: take the copy first, make sure it is a working font, and have
      // the picture drawn with that very copy. The library remembers a
      // failed fetch until the page is reloaded, hence the advice.
      const fontEmbedCSS = await getFontEmbedCSS(node);
      const file = alloFile(fontEmbedCSS);
      if (!file || !(await isWorkingFont(file))) {
        setProblem(
          "the typeface didn't load, so the banner would come out wrong. reload the page and try again."
        );
        return;
      }

      const dataUrl = await toPng(node, {
        quality: 0.95,
        pixelRatio: 2,
        fontEmbedCSS,
        // The page centres the banner with a margin. Left in, the picture
        // would carry that margin and shift the artwork to the right.
        style: { margin: "0" },
      });
      download(dataUrl, "ethanvo-banner.png");
    } catch (err) {
      console.error("Export failed", err);
      setProblem("couldn't make the picture. try again, or reload the page.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-bench py-16 text-on-calm">
      <div className="w-full overflow-x-auto">
        <div
          id="banner"
          style={ARTWORK}
          className="relative mx-auto shrink-0 overflow-hidden whitespace-nowrap font-bold leading-none"
        >
          <span className="absolute left-[64px] top-[50px] text-[34px] tracking-[-0.02em]">
            ethanvo.dev
          </span>
          <span className="absolute left-[64px] top-[93px] text-[25px] tracking-[-0.01em] text-ink/[.66]">
            fullstack &amp; mobile engineer
          </span>
          <span className="absolute left-[604px] top-[66px] text-[50px] tracking-[-0.02em]">
            i&apos;m
          </span>
          <span className="absolute right-[70px] top-[-7px] text-[392px] tracking-[-0.05em]">
            ethan
          </span>
        </div>
      </div>

      <button type="button" onClick={exportBanner} className="btn btn-solid">
        download as png
      </button>

      {problem && (
        <p role="alert" className="max-w-[26rem] px-5 text-center font-bold">
          {problem}
        </p>
      )}
    </div>
  );
};

export default Banner;
