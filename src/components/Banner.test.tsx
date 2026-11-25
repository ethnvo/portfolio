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

  it("exports itself at double size as ethanvo-banner.png", async () => {
    render(<Banner />);
    fireEvent.click(screen.getByRole("button", { name: "download as png" }));
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
    fireEvent.click(screen.getByRole("button", { name: "download as png" }));
    await waitFor(() =>
      expect(toPng).toHaveBeenCalledWith(
        document.getElementById("banner"),
        expect.objectContaining({ style: { margin: "0" } })
      )
    );
  });
});
