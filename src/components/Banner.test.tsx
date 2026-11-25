import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Banner from "./Banner";

// jsdom cannot rasterise, so the image library and the file save are stubbed
// at their boundary. The real export is checked in a browser.
vi.mock("html-to-image", () => ({
  toPng: vi.fn(() => Promise.resolve("data:image/png;base64,AAAA")),
}));
vi.mock("downloadjs", () => ({ default: vi.fn() }));

// The browser's font list. `loaded` says whether Allo made it.
function fonts(loaded: boolean) {
  const list = {
    load: vi.fn(() => Promise.resolve([])),
    check: vi.fn(() => loaded),
  };
  Object.defineProperty(document, "fonts", { configurable: true, value: list });
  return list;
}

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

  it("asks for the typeface before drawing", async () => {
    const list = fonts(true);
    render(<Banner />);
    press();
    await waitFor(() => expect(download).toHaveBeenCalled());
    expect(list.load).toHaveBeenCalledWith(expect.stringContaining("Allo"));
    expect(list.load.mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(toPng).mock.invocationCallOrder[0]
    );
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("refuses to hand over a banner in the wrong typeface", async () => {
    fonts(false);
    render(<Banner />);
    press();
    expect((await screen.findByRole("alert")).textContent).toMatch(/typeface/);
    expect(toPng).not.toHaveBeenCalled();
    expect(download).not.toHaveBeenCalled();
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
