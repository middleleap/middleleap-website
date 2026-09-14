// Verified against AI-DLC origin/main on 2026-09-14. Availability is not operational evidence.
export const toolkitSource = {
  commit: "063b42029066db2c0b0f44cbd9aa057894d7151d",
  verifiedOn: "2026-09-14",
  loomVersion: "2.4.2",
  aiSdlcVersion: "1.0.0",
  openFinanceVersion: "2.3.0",
} as const;
export const sourceRoot = `https://github.com/middleleap/ai-dlc/tree/${toolkitSource.commit}/plugins/middleleap-loom/skills/loom-adopt/harness`;
export const installationCommands = `/plugin marketplace add middleleap/ai-dlc
/plugin install middleleap-loom@middleleap-ai-dlc
/plugin install middleleap-ai-sdlc@middleleap-ai-dlc`;
