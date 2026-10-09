// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader";

const navigationMock = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => navigationMock.pathname }));
vi.mock("./ThemeToggle", () => ({ ThemeToggle: () => null }));

beforeEach(() => {
  navigationMock.pathname = "/";
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
});

afterEach(cleanup);

describe("SiteHeader navigation disclosures", () => {
  it("exposes the complete How we work information architecture", async () => {
    const user = userEvent.setup();
    render(<SiteHeader home />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    const trigger = within(primaryNav).getByRole("button", { name: /how we work/i });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    await user.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById("nav-panel-method");
    expect(panel?.hidden).toBe(false);
    expect(within(panel!).getByRole("link", { name: /our approach/i }).getAttribute("href")).toBe("#method");
    expect(within(panel!).getByRole("link", { name: /engagement models/i }).getAttribute("href")).toBe("/how-we-engage");
    expect(within(panel!).getByRole("link", { name: /^the loomgoverned/i }).getAttribute("href")).toBe("/the-loom");
    expect(within(panel!).getByRole("link", { name: /the loom toolkit/i }).getAttribute("href")).toBe("/ai-dlc");
  });

  it("closes the disclosure with Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    const trigger = within(primaryNav).getByRole("button", { name: /how we work/i });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("closes the disclosure when focus or pointer leaves the navigation", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    const trigger = within(primaryNav).getByRole("button", { name: /ventures/i });
    await user.click(trigger);
    fireEvent.pointerDown(document.body);

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("marks How we work active across its child routes", () => {
    navigationMock.pathname = "/the-loom";
    render(<SiteHeader active="method" />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    const trigger = within(primaryNav).getByRole("button", { name: /how we work/i });
    expect(trigger.getAttribute("data-active")).toBe("true");

    const mobileNav = screen.getByRole("navigation", { name: "Mobile navigation" });
    const mobileTrigger = within(mobileNav).getByText("How we work").closest("summary");
    expect(mobileTrigger?.getAttribute("data-active")).toBe("true");

    const currentChildren = document.querySelectorAll<HTMLAnchorElement>('a[href="/the-loom"]');
    expect(currentChildren.length).toBe(2);
    for (const link of currentChildren) expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("marks Portfolio as the active ancestor on venture build records", () => {
    navigationMock.pathname = "/ventures/backoffice";
    render(<SiteHeader active="ventures" />);

    const portfolioLinks = document.querySelectorAll<HTMLAnchorElement>('a[href="/ventures#portfolio"]');
    expect(portfolioLinks.length).toBe(2);
    for (const link of portfolioLinks) {
      expect(link.getAttribute("data-active")).toBe("true");
      expect(link.hasAttribute("aria-current")).toBe(false);
    }
  });

  it("synchronizes homepage section visibility with the global parent and child", async () => {
    render(
      <>
        <SiteHeader home />
        <section id="expertise" />
        <section id="method" />
      </>,
    );

    const expertise = document.getElementById("expertise")!;
    const method = document.getElementById("method")!;
    expertise.getBoundingClientRect = () => ({ top: 100, bottom: 700 } as DOMRect);
    method.getBoundingClientRect = () => ({ top: 800, bottom: 1400 } as DOMRect);
    fireEvent.scroll(window);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    const whatTrigger = within(primaryNav).getByRole("button", { name: /what we do/i });
    await waitFor(() => expect(whatTrigger.getAttribute("data-active")).toBe("true"));

    const overview = document.querySelector<HTMLAnchorElement>('#nav-panel-what a[href="#expertise"]');
    expect(overview?.getAttribute("aria-current")).toBe("location");
  });

  it("does not render an empty contextual navigation landmark", () => {
    navigationMock.pathname = "/privacy";
    render(<SiteHeader breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "Privacy" }]} />);

    expect(screen.queryByRole("navigation", { name: "On this page" })).toBeNull();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeDefined();
  });
});
