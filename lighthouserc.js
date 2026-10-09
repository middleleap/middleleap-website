module.exports = {
  ci: {
    // No url list: LHCI discovers every exported HTML page in out/, so all
    // routes are held to the budgets below, not just the homepage.
    collect: {
      staticDistDir: "./out",
      numberOfRuns: 3,
      maxAutodiscoverUrls: 0,
      autodiscoverUrlBlocklist: ["/404.html", "/_not-found.html"],
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 3500 }],
        "first-contentful-paint": ["error", { maxNumericValue: 1800 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
  },
};
