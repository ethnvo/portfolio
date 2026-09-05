import { toPng } from "html-to-image";
import download from "downloadjs";

// Hidden LinkedIn banner generator. Reachable at /#banner.
// Renders a 1584x396 (LinkedIn cover ratio) banner and exports it as a PNG.
// Bottom-left is intentionally left clear for the profile photo overlap.
const Banner = () => {
  const exportBanner = () => {
    const node = document.getElementById("banner");
    if (!node) return;

    toPng(node, { quality: 0.95, pixelRatio: 2 })
      .then((dataUrl) => {
        download(dataUrl, "ethanvo-banner.png");
      })
      .catch((err) => {
        console.error("Export failed", err);
      });
  };

  return (
    <div className="min-h-screen w-full bg-ground flex flex-col items-center justify-center gap-8 py-16 overflow-auto">
      <div className="w-full overflow-auto flex justify-center">
        <div
          id="banner"
          className="
            relative w-[1584px] h-[396px] shrink-0
            overflow-hidden text-white bg-ground
          "
        >
          {/* Dot grid — same language as the site */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none" />

          {/* Concentric ring outlines drifting off the right edge — calm, modern */}
          <div className="absolute right-[-260px] top-1/2 -translate-y-1/2 h-[760px] w-[760px] rounded-full border border-white/[0.10] pointer-events-none" />
          <div className="absolute right-[-160px] top-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full border border-white/[0.16] pointer-events-none" />
          <div className="absolute right-[-70px] top-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full border-2 border-brand/45 pointer-events-none" />

          {/* Wordmark block — right-weighted, left stays clear for the avatar */}
          <div className="absolute right-[110px] top-1/2 -translate-y-1/2 text-right">
            <h1 className="font-display text-[124px] leading-none font-medium tracking-tight text-ink">
              ethanvo.dev
            </h1>
            <p className="mt-5 text-[26px] font-light tracking-wide text-ink-soft lowercase">
              fullstack &amp; mobile engineer
            </p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportBanner}
        className="px-6 py-3 rounded-full bg-brand text-white font-semibold lowercase tracking-wide hover:bg-brand-dark transition-colors"
      >
        download as png
      </button>
    </div>
  );
};

export default Banner;
