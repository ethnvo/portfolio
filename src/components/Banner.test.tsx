import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getFontEmbedCSS, toPng } from "html-to-image";
import download from "downloadjs";
import Banner from "./Banner";

// jsdom cannot rasterise, so the image library and the file save are stubbed
// at their boundary. The real export is checked in a browser.
vi.mock("html-to-image", () => ({
  toPng: vi.fn(() => Promise.resolve("data:image/png;base64,AAAA")),
  getFontEmbedCSS: vi.fn(),
}));
vi.mock("downloadjs", () => ({ default: vi.fn() }));

// What the image library hands back for the typeface: the page's Allo rule
// with the font file folded into it. When it cannot fetch the file it leaves
// the address empty and carries on.
const FILE = "data:font/woff2;base64,d09GMgABAAAA";
const alloRule = (file: string) =>
  `@font-face { font-family: Allo; src: url("${file}") format("woff2"); font-weight: 400 700; font-style: normal; font-display: swap; }`;

// The browser's font decoder, which jsdom lacks. `sound` says whether the
// bytes it is given are a working font. Returns what it was asked to decode.
function decoder(sound: boolean) {
  const asked: string[] = [];
  vi.stubGlobal(
    "FontFace",
    class {
      constructor(_family: string, source: string) {
        asked.push(source);
      }
      load() {
        return sound
          ? Promise.resolve(this)
          : Promise.reject(new Error("not a font"));
      }
    }
  );
  return asked;
}

beforeEach(() => {
  vi.mocked(getFontEmbedCSS).mockResolvedValue(alloRule(FILE));
  decoder(true);
});

const press = () =>
  fireEvent.click(screen.getByRole("button", { name: "download as png" }));

describe("the banner", () => {
  it("carries the site, the role and the teaser line", () => {
    render(<Banner />);
    const banner = document.getElementById("banner");
    const lines = Array.from(banner?.children ?? [], (el) => el.textContent);
    expect(lines).toEqual([
      "ethanvo.dev",
      "fullstack & mobile engineer",
      "i'm",
      "ethan",
    ]);
  });

  // LinkedIn's cover size, and the same sky picture whichever theme the page is in.
  it("is always 1584 by 396, sky with ink type", () => {
    document.documentElement.dataset.theme = "dark";
    render(<Banner />);
    const banner = document.getElementById("banner") as HTMLElement;
    expect([banner.style.width, banner.style.height]).toEqual([
      "1584px",
      "396px",
    ]);
    expect(banner.style.backgroundColor).toBe("rgb(142, 224, 240)");
    expect(banner.style.color).toBe("rgb(8, 11, 9)");
  });

  it("exports itself at double size as ethanvo-banner.png", async () => {
    render(<Banner />);
    press();
    await waitFor(() =>
      expect(download).toHaveBeenCalledWith(
        "data:image/png;base64,AAAA",
        "ethanvo-banner.png"
      )
    );
    expect(toPng).toHaveBeenCalledWith(
      document.getElementById("banner"),
      expect.objectContaining({ pixelRatio: 2 })
    );
  });

  // The image library copies the banner's outer spacing into the picture, so
  // centring the banner on the page would push the artwork sideways.
  it("leaves the spacing around the banner out of the export", async () => {
    render(<Banner />);
    press();
    await waitFor(() =>
      expect(toPng).toHaveBeenCalledWith(
        document.getElementById("banner"),
        expect.objectContaining({ style: { margin: "0" } })
      )
    );
  });

  it("says so when the picture cannot be made, and recovers on the next try", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(toPng).mockRejectedValueOnce(new Error("canvas is tainted"));
    render(<Banner />);
    press();
    expect((await screen.findByRole("alert")).textContent).toMatch(
      /couldn't make the picture/
    );
    expect(download).not.toHaveBeenCalled();

    press();
    await waitFor(() => expect(download).toHaveBeenCalled());
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

// The picture is not drawn from the typeface the page is showing. The image
// library fetches its own copy at export time, and when that goes wrong it
// draws in a stand-in typeface without a word.
describe("the banner's typeface", () => {
  it("is checked, and the picture is drawn with the very copy that passed", async () => {
    const asked = decoder(true);
    render(<Banner />);
    press();
    await waitFor(() => expect(download).toHaveBeenCalled());

    const banner = document.getElementById("banner");
    expect(getFontEmbedCSS).toHaveBeenCalledWith(banner);
    expect(asked).toEqual([`url("${FILE}")`]);
    expect(toPng).toHaveBeenCalledWith(
      banner,
      expect.objectContaining({ fontEmbedCSS: alloRule(FILE) })
    );
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it.each([
    ["the typeface could not be fetched", alloRule("")],
    ["the picture would carry no typeface at all", ""],
    [
      "the only typeface it carries is another one",
      alloRule(FILE).replace("Allo", '"Allo Fallback"'),
    ],
  ])("stops the export when %s", async (_why, css) => {
    vi.mocked(getFontEmbedCSS).mockResolvedValue(css);
    render(<Banner />);
    press();
    expect((await screen.findByRole("alert")).textContent).toMatch(/typeface/);
    expect(toPng).not.toHaveBeenCalled();
    expect(download).not.toHaveBeenCalled();
  });

  // A server error page comes back as bytes too, and they are not a font.
  it("stops the export when what was fetched is not a working font", async () => {
    decoder(false);
    render(<Banner />);
    press();
    expect((await screen.findByRole("alert")).textContent).toMatch(/typeface/);
    expect(toPng).not.toHaveBeenCalled();
    expect(download).not.toHaveBeenCalled();
  });
});
