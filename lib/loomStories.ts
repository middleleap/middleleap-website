/*
  Stories told by the LoomMark animation. The drawing is fixed (a square leaps
  into two diamonds, threads run level, one ember thread returns); each story
  names its six beats and the sentence the output strip shows for each.
*/

export type LoomBeatSlot = "start" | "discovery" | "gate" | "delivery" | "run" | "feedback";

export type LoomBeat = {
  slot: LoomBeatSlot;
  number: string;
  title: string;
  detail: string;
};

export type LoomStory = {
  header: string;
  outputLabel: string;
  ariaLabel: string;
  beats: readonly LoomBeat[];
};

/* Homepage: the advisory proposition, mandate to market execution. */
export const advisoryStory: LoomStory = {
  header: "Strategic mandate → market execution",
  outputLabel: "Operating evidence",
  ariaLabel:
    "From strategic mandate to market execution: a mandate becomes a strategy, one investable decision, senior-led execution, a live market position, and operating evidence that informs the next mandate",
  beats: [
    { slot: "start", number: "01", title: "Mandate", detail: "A regulator, a board or a market shift sets the mandate." },
    { slot: "discovery", number: "02", title: "Strategy", detail: "Market position, platform model and ecosystem designed together." },
    { slot: "gate", number: "03", title: "Decision", detail: "One investable decision a board and a regulator can back." },
    { slot: "delivery", number: "04", title: "Execution", detail: "Senior-led delivery of platform, partners and operating model." },
    { slot: "run", number: "05", title: "Market", detail: "First bank certified under the UAE Open Finance framework, with the country's first live transactions with a licensed TPP." },
    { slot: "feedback", number: "06", title: "Evidence", detail: "Operating evidence returns to the next mandate: 250,000 SMEs, corporates and institutions migrated onto one platform." },
  ],
};

/* The Loom page: the governed delivery method itself. */
export const loomStory: LoomStory = {
  header: "The Loom / closed loop",
  outputLabel: "Closed loop",
  ariaLabel:
    "The Loom: a strategic mandate pivots into discovery, passes one gate into delivery, runs in operation, and returns signal to discovery",
  beats: [
    { slot: "start", number: "01", title: "Mandate", detail: "An ambiguous mandate arrives with the institution's constraints attached." },
    { slot: "discovery", number: "02", title: "Discovery", detail: "Diverge on evidence, converge on one problem." },
    { slot: "gate", number: "03", title: "Gate", detail: "One gate-green hand-off into delivery." },
    { slot: "delivery", number: "04", title: "Delivery", detail: "Develop solutions, deliver under control." },
    { slot: "run", number: "05", title: "Run", detail: "Deploy, observe, triage in operation." },
    { slot: "feedback", number: "06", title: "Feedback", detail: "Signal returns to discovery as evidence." },
  ],
};
