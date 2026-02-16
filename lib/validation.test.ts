import { describe, it, expect } from "vitest";
import { validateEmail } from "./validation";

describe("validateEmail", () => {
  describe("valid emails", () => {
    it("accepts standard email", () => {
      expect(validateEmail("user@example.com")).toBe(true);
    });

    it("accepts subdomain email", () => {
      expect(validateEmail("user@mail.example.com")).toBe(true);
    });

    it("accepts plus-tag email", () => {
      expect(validateEmail("user+tag@example.com")).toBe(true);
    });

    it("accepts minimal email", () => {
      expect(validateEmail("a@b.c")).toBe(true);
    });
  });

  describe("invalid emails", () => {
    it("rejects empty string", () => {
      expect(validateEmail("")).toBe(false);
    });

    it("rejects email without @", () => {
      expect(validateEmail("userexample.com")).toBe(false);
    });

    it("rejects email without domain", () => {
      expect(validateEmail("user@")).toBe(false);
    });

    it("rejects email with spaces", () => {
      expect(validateEmail("user @example.com")).toBe(false);
    });

    it("rejects email without TLD", () => {
      expect(validateEmail("user@example")).toBe(false);
    });
  });
});
