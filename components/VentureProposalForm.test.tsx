// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { legalTermsEffectiveDate } from "@/lib/legal";
import { VentureProposalForm } from "./VentureProposalForm";

afterEach(cleanup);

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
  it("prepares a proposal locally and moves focus to the prepared section", async () => {
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /prepare proposal/i }));

    const heading = await screen.findByRole("heading", { name: /prepared locally/i });
    expect(heading).toBeDefined();

    const section = document.querySelector('[aria-labelledby="prepared-proposal-heading"]');
    expect(section).not.toBeNull();
    expect(document.activeElement).toBe(section);
  });

  it("stamps the prepared proposal with the current terms version", async () => {
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /prepare proposal/i }));

    const prepared = (await screen.findByLabelText("Prepared proposal text")) as HTMLTextAreaElement;
    expect(prepared.value).toContain(`Yes — version ${legalTermsEffectiveDate}`);
    expect(prepared.value).toContain("Test venture");
    expect(prepared.value).toContain("test@example.com");
  });

  it("links a mailto URL with the encoded subject and body", async () => {
    render(<VentureProposalForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /prepare proposal/i }));

    const mailtoLink = (await screen.findByRole("link", { name: /open email application/i })) as HTMLAnchorElement;
    expect(mailtoLink.href).toMatch(/^mailto:contact@middleleap\.com\?subject=/);
    expect(mailtoLink.href).toContain(encodeURIComponent("Venture proposal: Test venture"));
  });

  it("warns when the proposal is long enough to exceed mailto limits", async () => {
    render(<VentureProposalForm />);
    const user = await fillRequiredFields("x".repeat(700));
    await user.type(screen.getByLabelText("What market or customer access do you have?"), "y".repeat(350));
    await user.type(screen.getByLabelText("What evidence already exists?"), "z".repeat(500));
    await user.type(screen.getByLabelText("Your connection to the problem"), "w".repeat(380));
    await user.click(screen.getByRole("button", { name: /prepare proposal/i }));

    await screen.findByRole("heading", { name: /prepared locally/i });
    expect(screen.getByText(/may truncate it/i)).toBeDefined();
  });
});
