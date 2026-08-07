import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Generic elements whose implicit role is `generic` or `presentation`. ARIA
// prohibits aria-label on these, and assistive technology silently ignores it.
const GENERIC_TAGS = [
  "div", "span", "p", "pre", "b", "i", "small", "strong", "em", "code", "blockquote", "figcaption",
];
const genericSelector = GENERIC_TAGS.map((tag) => `[name.name="${tag}"]`).join(",");

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "e2e/**",
  ]),
  {
    name: "middleleap/a11y",
    files: ["**/*.{ts,tsx}"],
    rules: {
      // eslint-config-next registers the jsx-a11y plugin but leaves these either
      // off or at warn. They are the rules that map to defects this codebase has
      // actually shipped, so they are errors here.
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/lang": "error",
      // Must name its handlers explicitly: the default handler list includes
      // onMouseLeave, which fires on legitimately labelled diagram wrappers.
      "jsx-a11y/no-noninteractive-element-interactions": ["error", {
        handlers: ["onClick", "onKeyDown", "onKeyPress", "onKeyUp"],
      }],

      "no-restricted-syntax": ["error",
        {
          selector: `JSXOpeningElement:matches(${genericSelector}):has(JSXAttribute[name.name="aria-label"]):not(:has(JSXAttribute[name.name="role"]))`,
          message:
            'aria-label is prohibited on elements with a generic role — assistive tech ignores it. Use a landmark element, add an explicit role (e.g. role="group"), or point aria-labelledby at a real heading.',
        },
        {
          selector: 'JSXAttribute[name.name="role"][value.value="img"]',
          message:
            'role="img" hides all descendant text from assistive technology. Use <img alt> for real images, or let the text be text.',
        },
      ],
    },
  },
]);

export default eslintConfig;
