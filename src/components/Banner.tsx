import { toPng } from "html-to-image";
import download from "downloadjs";

// Hidden LinkedIn banner generator. Reachable at /#banner.
// Renders a 1584x500 banner and exports it as a PNG.
const Banner = () => {
  const exportBanner = () => {
    const node = document.getElementById("banner");
    if (!node) return;

    toPng(node, { quality: 0.95, pixelRatio: 1 })
      .then((dataUrl) => {
        download(dataUrl, "ethanvo-banner.png");
      })
      .catch((err) => {
        console.error("Export failed", err);
      });
  };

  return (
    <div className="min-h-screen w-full bg-[#080B09] flex flex-col items-center justify-center gap-8 py-16 overflow-auto">
      <div className="w-full overflow-auto flex justify-center">
        <div
          id="banner"
          className="
            w-[1584px] min-h-[500px] shrink-0
            flex flex-col items-start justify-center
            pr-10 text-white relative
            bg-ground
            overflow-visible
          "
        >
          {/* Faint matte texture — same as the site */}
          <div className="absolute inset-0 bg-[url('/clean-gray-paper.png')] bg-repeat opacity-[0.03] z-0 pointer-events-none" />

          {/* Content Block */}
          <div className="pl-[600px] pr-[50px] overflow-visible">
            {/* Wordmark */}
            <div className="relative w-fit mb-[10px]">
              <span
                className="
                  relative text-[180px] font-light tracking-tighter font-display
                  text-[#F9FAFB] z-10
                "
              >
                ethanvo.dev<span className="opacity-0">.</span>
              </span>
            </div>

            {/* Tagline */}
            <p
              className="
                font-display
                text-[2.4rem] font-medium
                text-right mr-[52px] mb-[30px]
                -mt-8
                text-brand tracking-tight
              "
            >
              let's get pumpin'
            </p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportBanner}
        className="px-6 py-3 rounded-full bg-[#F03E8C] text-white font-semibold lowercase tracking-wide hover:bg-[#C5286B] transition-colors"
      >
        download as png
      </button>
    </div>
  );
};

export default Banner;
