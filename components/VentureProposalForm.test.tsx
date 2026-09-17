// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { legalTermsEffectiveDate } from "@/lib/legal";
import { VentureProposalForm } from "./VentureProposalForm";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function stubEndpointDown() {
  const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function stubEndpointUp(receivedAt = "2026-09-17T12:00:00.000Z") {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ ok: true, id: "email_123", receivedAt }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillRequiredFields(problemText = "Parking is fragmented.") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Working title"), "Test venture");
  await user.type(screen.getByLabelText("What problem needs solving?"), problemText);
  await user.type(screen.getByLabelText("Who experiences it?"), "Employers");
  await user.type(screen.getByLabelText("What evidence already exists?"), "Waitlists");
  await user.type(screen.getByLabelText("Your connection to the problem"), "Operator");
  await user.selectOptions(screen.getByLabelText("How would you like to participate?"), "Venture lead or operator");
  await user.type(screen.getByLabelText("Your name"), "Test Person");
  await user.type(screen.getByLabelText("Your email"), "test@example.com");
  await user.click(screen.getByRole("checkbox"));
  return user;
}

describe("VentureProposalForm", () => {
  it("posts the proposal to the endpoint and confirms receipt", async () => {
    const fetchMock = stubEndpointUp();
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /send proposal/i }));

    const heading = await screen.findByRole("heading", { name: /has been sent/i });
    expect(heading).toBeDefined();
    expect(document.activeElement).toBe(document.querySelector('[aria-labelledby="proposal-result-heading"]'));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/propose");
    expect(init.method).toBe("POST");
    const payload = JSON.parse(String(init.body));
    expect(payload.title).toBe("Test venture");
    expect(payload.email).toBe("test@example.com");
    expect(payload.terms).toBe(true);
    expect(payload.website).toBe("");

    // The form clears after a successful send so it cannot be re-sent by accident.
    expect((screen.getByLabelText("Working title") as HTMLInputElement).value).toBe("");
  });

  it("falls back to a locally prepared proposal when the endpoint is unavailable", async () => {
    stubEndpointDown();
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /send proposal/i }));

    const heading = await screen.findByRole("heading", { name: /prepared locally/i });
    expect(heading).toBeDefined();
    expect(screen.getByText(/prepared on your device instead/i)).toBeDefined();

    const section = document.querySelector('[aria-labelledby="proposal-result-heading"]');
    expect(section).not.toBeNull();
    expect(document.activeElement).toBe(section);
  });

  it("stamps the prepared proposal with the current terms version", async () => {
    stubEndpointDown();
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /send proposal/i }));

    const prepared = (await screen.findByLabelText("Prepared proposal text")) as HTMLTextAreaElement;
    expect(prepared.value).toContain(`Yes — version ${legalTermsEffectiveDate}`);
    expect(prepared.value).toContain("Test venture");
    expect(prepared.value).toContain("test@example.com");
  });

  it("links a mailto URL with the encoded subject and body", async () => {
    stubEndpointDown();
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /send proposal/i }));

    const mailtoLink = (await screen.findByRole("link", { name: /open email application/i })) as HTMLAnchorElement;
    expect(mailtoLink.href).toMatch(/^mailto:contact@middleleap\.com\?subject=/);
    expect(mailtoLink.href).toContain(encodeURIComponent("Venture proposal: Test venture"));
  });

  it("warns when the proposal is long enough to exceed mailto limits", async () => {
    stubEndpointDown();
    render(<VentureProposalForm />);
    const user = await fillRequiredFields("x".repeat(700));
    await user.type(screen.getByLabelText("What market or customer access do you have?"), "y".repeat(350));
    await user.type(screen.getByLabelText("What evidence already exists?"), "z".repeat(500));
    await user.type(screen.getByLabelText("Your connection to the problem"), "w".repeat(380));
    await user.click(screen.getByRole("button", { name: /send proposal/i }));

    await screen.findByRole("heading", { name: /prepared locally/i });
    expect(screen.getByText(/may truncate it/i)).toBeDefined();
  });
});
