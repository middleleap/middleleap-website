import { describe, expect, it } from "vitest";
import { bookingLinkProps, bookingUrl, contactEmail, mailtoHref } from "./contact";

describe("contact", () => {
  it("points the booking CTA at the Google Calendar appointment schedule", () => {
    expect(bookingUrl).toMatch(
      /^https:\/\/calendar\.google\.com\/calendar\/appointments\/schedules\/[A-Za-z0-9_-]+$/,
    );
    expect(bookingLinkProps.href).toBe(bookingUrl);
  });

  it("opens the hosted booking page safely in a new tab", () => {
    expect(bookingLinkProps.target).toBe("_blank");
    expect(bookingLinkProps.rel).toContain("noopener");
  });

  it("builds mailto links with an encoded subject", () => {
    expect(mailtoHref()).toBe(`mailto:${contactEmail}`);
    expect(mailtoHref("Strategic mandate")).toBe(
      "mailto:contact@middleleap.com?subject=Strategic%20mandate",
    );
  });
});
