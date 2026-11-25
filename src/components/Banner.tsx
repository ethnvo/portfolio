import { useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";

// The typeface the banner is drawn in, at the size of its biggest word.
const TYPEFACE = '700 392px "Allo"';

// The picture itself never changes: LinkedIn's cover size, the teaser's sky
// and ink. These are set on the element, not through the theme, so the
// banner comes out the same from the light page and the dark one.
const ARTWORK = {
  width: 1584,
  height: 396,
  backgroundColor: "#8EE0F0",
  color: "#080B09",
};

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

    // Without Allo the picture would be drawn in a stand-in typeface, and
    // look fine at a glance. Ask for it, then make sure it really arrived.
    const fonts = document.fonts;
    if (fonts) {
      await fonts.load(TYPEFACE).catch(() => {});
      if (!fonts.check(TYPEFACE)) {
        setProblem(
          "the typeface didn't load, so the banner would come out wrong. reload the page and try again."
        );
        return;
      }
    }

    try {
      const dataUrl = await toPng(node, {
        quality: 0.95,
        pixelRatio: 2,
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-calm py-16 text-on-calm">
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
