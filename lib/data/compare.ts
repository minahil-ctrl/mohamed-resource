export interface Compare {
  title: string;
  adv: string[];
  dis: string[];
}

/** Advantages vs disadvantages tables, keyed by topic id. */
export const COMPARE: Record<string, Compare[]> = {
  "u1-enterprise": [
    {
      title: "Starting your own business",
      adv: ["Be your own boss", "Keep all the profit", "Use your own ideas and skills"],
      dis: ["Risk of losing your capital", "No guaranteed income", "Long hours and stress"],
    },
  ],
  "u1-growth": [
    {
      title: "Organic (internal) growth",
      adv: ["Lower risk", "Keeps control", "Funded from profit"],
      dis: ["Slow", "Limited by finance available"],
    },
    {
      title: "External growth (merger / takeover)",
      adv: ["Fast: instant size and market share", "Economies of scale", "Removes a competitor"],
      dis: ["Expensive", "Culture clash", "Risk of diseconomies of scale"],
    },
  ],
  "u1-ownership": [
    {
      title: "Sole trader",
      adv: ["Full control and all profit", "Simple and cheap to set up"],
      dis: ["Unlimited liability", "Hard to raise finance"],
    },
    {
      title: "Partnership",
      adv: ["Shared skills and capital", "Shared workload"],
      dis: ["Unlimited liability", "Disagreements between partners"],
    },
    {
      title: "Private limited company (Ltd)",
      adv: ["Limited liability", "Can sell shares privately to raise capital"],
      dis: ["Legal paperwork and accounts to file", "Owners share control"],
    },
    {
      title: "Public limited company (plc)",
      adv: ["Raises large capital on the stock exchange", "Limited liability"],
      dis: ["Risk of takeover", "Must publish accounts; pressure for dividends"],
    },
    {
      title: "Franchise",
      adv: ["Proven brand and system", "Lower risk"],
      dis: ["Pay fees and royalties", "Less freedom to change"],
    },
  ],
  "u1-location": [
    {
      title: "E-commerce",
      adv: ["24/7 sales and wider reach", "Lower premises costs"],
      dis: ["Delivery costs and IT security risks", "No personal service"],
    },
    {
      title: "Offshoring",
      adv: ["Cheaper labour", "Lower costs"],
      dis: ["Transport and communication problems", "Ethical and reputation risk"],
    },
  ],
  "u1-external": [
    {
      title: "Behaving ethically",
      adv: ["Better reputation and loyalty", "Attracts staff and customers"],
      dis: ["Higher costs (fair pay, sustainable materials)", "Lower short-term profit"],
    },
  ],
  "u2-structure": [
    {
      title: "Tall structure",
      adv: ["Close supervision", "Clear promotion path"],
      dis: ["Slow communication", "High management costs"],
    },
    {
      title: "Flat structure",
      adv: ["Fast communication and decisions", "Lower management cost"],
      dis: ["Managers overloaded (wide span)", "Few promotion steps"],
    },
  ],
  "u2-recruit": [
    {
      title: "Internal recruitment",
      adv: ["Cheaper and faster", "Staff already known; motivating"],
      dis: ["Limited choice", "Creates another vacancy"],
    },
    {
      title: "External recruitment",
      adv: ["Wider choice and fresh ideas", "New skills"],
      dis: ["Slower and costlier", "Riskier: unknown person"],
    },
  ],
  "u2-training": [
    {
      title: "On-the-job training",
      adv: ["Cheap and relevant", "Staff keep producing"],
      dis: ["Trainer's output falls", "May pass on bad habits"],
    },
    {
      title: "Off-the-job training",
      adv: ["Expert teaching", "New ideas from outside"],
      dis: ["Costly (fees)", "Lost output while away"],
    },
  ],
  "u2-motivation": [
    {
      title: "Financial methods (pay, bonus, commission)",
      adv: ["Strong short-term incentive", "Simple to understand"],
      dis: ["Effect fades", "Raises wage bill; may hurt quality"],
    },
    {
      title: "Non-financial methods (recognition, enrichment)",
      adv: ["Lower cost", "Lasting motivation"],
      dis: ["Slower to work", "Will not suit staff who need money"],
    },
  ],
  "u2-leadership": [
    {
      title: "Autocratic",
      adv: ["Fast decisions", "Clear direction in a crisis"],
      dis: ["Demotivating", "Ignores staff ideas"],
    },
    {
      title: "Democratic",
      adv: ["Better ideas; staff feel valued", "Higher motivation"],
      dis: ["Slow decisions", "Compromise can dilute decisions"],
    },
  ],
  "u3-research": [
    {
      title: "Primary research",
      adv: ["Up to date and specific", "You control the questions"],
      dis: ["Expensive and slow", "Sample may be small or biased"],
    },
    {
      title: "Secondary research",
      adv: ["Cheap and quick", "Large amounts of data"],
      dis: ["May be out of date", "Not tailored to your question"],
    },
  ],
  "u3-product": [
    {
      title: "Branding",
      adv: ["Customer loyalty and recognition", "Allows a premium price"],
      dis: ["Expensive to build", "Reputation can be damaged quickly"],
    },
  ],
  "u3-price": [
    {
      title: "Penetration pricing",
      adv: ["Wins market share fast", "Encourages trial"],
      dis: ["Low profit per unit", "Hard to raise prices later"],
    },
    {
      title: "Price skimming",
      adv: ["High profit per unit early", "Recovers development costs"],
      dis: ["Slow sales", "Attracts competitors"],
    },
  ],
  "u3-promotion": [
    {
      title: "TV advertising",
      adv: ["Mass reach and strong brand impact"],
      dis: ["Very expensive", "Not targeted"],
    },
    {
      title: "Social media marketing",
      adv: ["Targeted, cheap and shareable"],
      dis: ["Negative comments can spread", "Needs staff time"],
    },
  ],
  "u3-place": [
    {
      title: "Selling online (direct)",
      adv: ["Keeps the full margin", "Reaches customers anywhere"],
      dis: ["Delivery costs", "Hard to build trust and reach"],
    },
    {
      title: "Using wholesalers",
      adv: ["Break bulk and reach many small shops", "Wholesaler stores the stock"],
      dis: ["Wholesaler takes a margin", "Less control over the brand"],
    },
  ],
  "u4-production": [
    {
      title: "Job production",
      adv: ["Customised; high quality; premium price"],
      dis: ["Slow, skilled and costly per unit"],
    },
    {
      title: "Batch production",
      adv: ["Flexible; some economies of scale"],
      dis: ["Downtime between batches", "Stock builds up"],
    },
    {
      title: "Flow production",
      adv: ["Lowest unit cost at high volume", "Consistent quality"],
      dis: ["Huge set-up cost", "Inflexible"],
    },
  ],
  "u4-scale": [
    {
      title: "Outsourcing",
      adv: ["Lower cost; expert supplier", "Frees management time"],
      dis: ["Less control over quality", "Dependence on the supplier"],
    },
  ],
  "u4-quality": [
    {
      title: "Quality control (checking)",
      adv: ["Catches defects before customers do"],
      dis: ["Wastes materials; defects already made", "Inspection costs"],
    },
    {
      title: "Quality assurance (preventing)",
      adv: ["Fewer defects and less waste", "Stronger reputation"],
      dis: ["Training and set-up costs", "Takes time to introduce"],
    },
  ],
  "u4-supply": [
    {
      title: "Just-in-time (JIT)",
      adv: ["Low holding costs and less waste", "Frees cash"],
      dis: ["A late delivery stops production", "No bulk discounts"],
    },
    {
      title: "Just-in-case (buffer stock)",
      adv: ["Protects against delays and demand surges"],
      dis: ["Storage cost; cash tied up", "Risk of waste"],
    },
  ],
  "u5-sources": [
    {
      title: "Bank loan",
      adv: ["Large sum; fixed repayments", "Owner keeps control"],
      dis: ["Interest cost", "May need collateral"],
    },
    {
      title: "Overdraft",
      adv: ["Flexible; fast", "Pay interest only on what you use"],
      dis: ["High interest", "Can be withdrawn by the bank"],
    },
    {
      title: "Share issue",
      adv: ["No repayment", "Raises large sums"],
      dis: ["Dilutes ownership and control", "Limited companies only"],
    },
    {
      title: "Retained profit",
      adv: ["No interest; no loss of control"],
      dis: ["Limited amount; slow to build"],
    },
  ],
  "u5-cashflow": [
    {
      title: "Cash flow forecast",
      adv: ["Shows shortfalls in advance", "Helps win loans"],
      dis: ["Based on estimates", "Sales or costs may differ"],
    },
  ],
  "u5-breakeven": [
    {
      title: "Break-even analysis",
      adv: ["Shows risk and the safe sales level", "Helps pricing and loan applications"],
      dis: ["Assumes all output is sold", "Assumes constant price and costs per unit"],
    },
  ],
  "u5-ratios": [
    {
      title: "Ratio analysis",
      adv: ["Allows comparison across years and rivals", "Turns accounts into a few clear numbers"],
      dis: ["Uses past data", "Ignores non-financial factors"],
    },
  ],
  "u5-invest": [
    {
      title: "Payback period",
      adv: ["Simple and quick", "Good for risky projects"],
      dis: ["Ignores profit after payback"],
    },
    {
      title: "Average rate of return (ARR)",
      adv: ["Uses the whole life of the project", "Easy to compare with the interest rate"],
      dis: ["Ignores timing of returns", "Based on forecasts"],
    },
  ],
};
