export const STAGE_SAVINGS_HOURS = [8, 20, 40, 80];
export const STAGE_NAMES = ["AI-Assisted", "Templates & Scaffolds", "Knowledge Plane", "Agent Factory"];
export const STAGE_INVESTMENT = [5000, 25000, 80000, 200000];

export function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export interface ROIParams {
  teamSize: number;
  annualDevCost: number;
}

export interface ROIResult {
  stage: number;
  name: string;
  hoursSaved: number;
  annualSavings: number;
  paybackMonths: number;
}

export function calculateROIResults(params: ROIParams): ROIResult[] {
  const { teamSize, annualDevCost } = params;
  const hourlyRate = annualDevCost / 2080;
  return STAGE_SAVINGS_HOURS.map((stageSavings, i) => {
    const monthlyHoursSaved = teamSize * stageSavings;
    const annualCostSavings = monthlyHoursSaved * 12 * hourlyRate;
    const monthlySavings = annualCostSavings / 12;
    const paybackMonths = monthlySavings > 0 ? STAGE_INVESTMENT[i] / monthlySavings : Infinity;
    return {
      stage: i + 1,
      name: STAGE_NAMES[i],
      hoursSaved: monthlyHoursSaved,
      annualSavings: annualCostSavings,
      paybackMonths,
    };
  });
}
