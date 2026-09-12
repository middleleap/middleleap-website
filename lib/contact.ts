// Single source of truth for the ways a prospective client can reach MiddleLeap.
//
// The booking link is a Google Calendar appointment schedule. It is linked
// directly rather than embedded through Google's `schedulingButton` snippet:
// the snippet injects its own script, stylesheet and a fixed-colour button
// from calendar.google.com, which would bypass the brand system, add
// third-party weight to every page (the CI Lighthouse budgets apply to all
// exported routes) and require a client-side script the static export does
// not otherwise need. A plain link keeps the CTA fully brand-styled and
// accessible, and opens Google's hosted booking page in a new tab.
export const contactEmail = "contact@middleleap.com";

export const bookingUrl =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3OtHFutywfM5Dh6k7_Vf7qEOpHDWmQSH5v51r2_PBI-qBgH7xDx5vrrQVXXXCplPmD3nPOsuN-";

// Props shared by every booking CTA so the external-link behaviour is
// consistent across pages.
export const bookingLinkProps = {
  href: bookingUrl,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function mailtoHref(subject?: string): string {
  return subject
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`
    : `mailto:${contactEmail}`;
}
