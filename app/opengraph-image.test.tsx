import { describe, it, expect } from "vitest";
import Image, { alt, size, contentType } from "./opengraph-image";

describe("opengraph-image", () => {
  it("exports correct metadata", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toContain("MiddleLeap");
  });

  it("renders a valid PNG via satori", async () => {
    const res = Image();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/png");
    const buf = await res.arrayBuffer();
    // PNG magic number: 89 50 4E 47
    const bytes = new Uint8Array(buf);
    expect(bytes[0]).toBe(0x89);
    expect(bytes[1]).toBe(0x50);
    expect(bytes[2]).toBe(0x4e);
    expect(bytes[3]).toBe(0x47);
    expect(buf.byteLength).toBeGreaterThan(1000);
  });
});
