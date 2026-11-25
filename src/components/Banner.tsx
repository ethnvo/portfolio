import { toPng } from "html-to-image";
import download from "downloadjs";

// Hidden LinkedIn banner generator. Reachable at /#banner.
// Draws the 1584x396 cover in the onda teaser look (flat sky frame, a small
// "i'm" over one huge word) and exports it as a PNG at double size.
// The bottom-left stays clear: that is where the profile photo overlaps.
const Banner = () => {
  const exportBanner = async () => {
    const node = document.getElementById("banner");
    if (!node) return;

    try {
      // Wait for Allo, so the export never falls back to another typeface.
      await document.fonts?.ready;
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
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-calm py-16 text-on-calm">
      <div className="w-full overflow-x-auto">
        <div
          id="banner"
          className="relative mx-auto h-[396px] w-[1584px] shrink-0 overflow-hidden whitespace-nowrap bg-sky font-bold leading-none text-ink"
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
    </div>
  );
};

export default Banner;
