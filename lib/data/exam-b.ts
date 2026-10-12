import type { ExamQ } from "../types";

/** Units 4-5 */
export const examB: ExamQ[] = [
  /* ===================== UNIT 4 · Golden Crust Biscuits ===================== */
  {
    id: "u4-e2",
    unit: "u4",
    topic: "u4-scale",
    marks: 2,
    command: "Define",
    question: "Define the term 'capacity utilisation'.",
    indicative: [
      "1 mark: the proportion/percentage of maximum possible output that is actually being produced.",
      "1 mark: development, e.g. (actual output ÷ maximum output) × 100 or an example (60,000 of 100,000 = 60%).",
    ],
    model:
      "Capacity utilisation is the proportion of a firm's maximum possible output that it is actually producing [AO1]. It is calculated as (actual output ÷ maximum output) × 100, so 60,000 units out of 100,000 would be 60% [AO1].",
    traps: ["Writing 'how much a factory can make'. That is capacity, not utilisation."],
  },
  {
    id: "u4-e3",
    unit: "u4",
    topic: "u4-supply",
    marks: 3,
    command: "Explain",
    stimulus:
      "Golden Crust uses flour, sugar and packaging film. The factory has storage space for six weeks of stock, and flour deliveries take two weeks.",
    question: "Explain one benefit to Golden Crust of using just-in-time (JIT) stock control.",
    indicative: [
      "AO1: JIT means materials arrive only when needed; stock is kept very low.",
      "AO3 (in context): flour, sugar, packaging; six weeks' storage currently used.",
      "AO3: development, e.g. lower storage costs and less cash tied up in stock, improving cash flow.",
    ],
    model:
      "JIT means materials such as flour and packaging film arrive only as they are needed, so very little stock is held [AO1]. Golden Crust currently stores up to six weeks of stock, which costs space and ties up cash [AO3]. With JIT, storage costs fall and the money saved can be used elsewhere, which improves cash flow [AO3].",
    traps: [
      "Giving a benefit of 'stock control' in general rather than JIT specifically.",
      "Explaining a drawback instead (late deliveries stopping production).",
    ],
  },
  {
    id: "u4-e6",
    unit: "u4",
    topic: "u4-production",
    marks: 6,
    command: "Analyse",
    stimulus:
      "Golden Crust wants to automate its biscuit packing line. The machine costs $400,000 but would replace 12 of the 20 workers on the line. Current packing errors cause 3% of biscuit packs to be rejected.",
    question: "Analyse how automating the packing line could affect Golden Crust's costs and the quality of its products.",
    indicative: [
      "AO1: automation = machines doing tasks with little human input; effects on costs and quality.",
      "AO2: $400,000 cost; 12 of 20 workers replaced; 3% rejects.",
      "AO3 costs: high capital cost and redundancy costs now, but lower wage bill and lower unit cost in the long run.",
      "AO3 quality: machine is consistent so fewer rejects, so less waste and a better reputation; breakdowns can halt the line.",
    ],
    model:
      "Automation means machines carry out tasks with little human input [AO1]. The $400,000 packing machine would replace 12 of the 20 line workers [AO3]. In the short run this increases costs because of the purchase price and redundancy payments, but in the long run the lower wage bill reduces the cost of packing each pack, improving profit if output is high enough [AO3].\n\nQuality should also improve. A machine packs consistently, so the 3% of packs currently rejected through human error should fall, cutting waste and protecting the brand's reputation for reliable products [AO3]. However, if the machine breaks down, the whole line could stop, and Golden Crust will need to train remaining staff to maintain it [AO3].",
    traps: [
      "Discussing only the benefits. Analysis should include the up-front cost.",
      "Confusing automation with mechanisation.",
    ],
  },
  {
    id: "u4-e9",
    unit: "u4",
    topic: "u4-production",
    marks: 9,
    command: "Evaluate",
    stimulus:
      "Golden Crust currently makes its best-selling digestive biscuit in batches of 50,000 packs, switching between four products on one line. Demand for the digestive is stable at 8 million packs a year. A flow-production line would cost $2.5m and cut the cost per pack from $0.50 to $0.35.",
    question: "Evaluate whether Golden Crust should switch from batch production to flow production for its best-selling digestive.",
    indicative: [
      "AO1: batch = groups of identical items; flow = continuous standardised production.",
      "AO2: 8m packs a year stable; $2.5m cost; $0.50 to $0.35 saving per pack ($0.15 × 8m = $1.2m a year).",
      "AO3 benefits: lower unit cost, no changeover downtime, payback about two years.",
      "AO3 costs: $2.5m finance, inflexible, risky if demand falls, redundancies.",
      "AO4: reasoned judgement: yes given stable demand and quick payback, with conditions.",
    ],
    model:
      "Batch production makes groups of identical products before switching, while flow production is a continuous, standardised process [AO1]. Demand for the digestive is stable at 8 million packs a year, and flow production would cut the cost from $0.50 to $0.35 per pack [AO3].\n\nThe saving is $0.15 × 8 million = $1.2m a year, so the $2.5m investment would pay back in about two years. Flow production also removes downtime from switching products and gives consistent quality [AO3].\n\nThe drawbacks are the large finance needed, which could strain cash flow or require a loan with interest, and inflexibility: the line cannot easily make other products, so if demand for the digestive falls, the machine would be under-used. Workers may also be made redundant, harming morale [AO3].\n\nOverall, Golden Crust should switch. Demand is stable and large, so the line would be well used, and a payback of around two years is quick. To reduce the risk it should keep the old line running for the other three products and check how flexible the supplier can make the new line [AO4].",
    traps: [
      "Not calculating the annual saving and payback. Numbers make AO2/AO3 explicit.",
      "Recommending flow production for all products. The case concerns only the best-seller.",
    ],
  },
  {
    id: "u4-e12",
    unit: "u4",
    topic: "u1-location",
    marks: 12,
    command: "Justify",
    stimulus:
      "Golden Crust plans a second factory. Site A is near the capital city's port: rent $200,000 a year, skilled labour available, and good road links to 60% of customers. Site B is in a rural region: rent $60,000 a year, limited local skilled workers, and 3 hours from the nearest port. Government grants of $300,000 are offered for Site B.",
    question: "Justify which site Golden Crust should choose for its second factory.",
    indicative: [
      "AO1: location factors: costs, labour, transport links, proximity to market, incentives.",
      "AO2: $200,000 vs $60,000 rent; 60% of customers near A; 3 hours from port; $300,000 grant.",
      "AO3 A: lower transport costs and faster deliveries; skilled labour; but higher rent, possibly higher wages.",
      "AO3 B: cheap rent and grant improve cash flow; but training needed, long transport routes raise delivery costs.",
      "AO4: weighed judgement and rejection of the other site with reasons.",
    ],
    model:
      "Location depends on factors such as costs, labour supply, transport and closeness to customers [AO1]. Site A has rent of $200,000 a year and links to 60% of customers, while Site B has rent of $60,000, a $300,000 government grant and limited skilled labour [AO3].\n\nSite A would reduce delivery times and transport costs because most customers are nearby, and it has a skilled workforce who need little training. The downside is $140,000 more rent each year and potentially higher wages in a city [AO3].\n\nSite B offers a $300,000 grant and cheap rent, which would improve cash flow in the early years. But the lack of skilled workers means extra recruitment and training, and being three hours from the port raises the cost and time of imports and deliveries, which could harm a food business needing to supply fresh stock [AO3].\n\nI recommend Site A. A biscuit manufacturer's biggest ongoing costs are ingredients and distribution, and Site A is close to both the port and most customers. The extra rent is likely to be offset by lower transport costs and productive staff. The grant at Site B is one-off and would not cover the long-term transport and training costs. If budget is very tight, a smaller distribution depot at Site A could be considered while production starts at Site B [AO4].",
    traps: [
      "Choosing the cheaper site without weighing long-term costs such as transport and training.",
      "Treating the one-off grant as a permanent saving.",
      "Not stating which site is rejected and why.",
    ],
  },

  /* ===================== UNIT 5 · Daily Basket ===================== */
  {
    id: "u5-e2",
    unit: "u5",
    topic: "u5-sources",
    marks: 2,
    command: "State",
    question: "State two internal sources of finance for a business.",
    indicative: [
      "1 mark each: retained profit; owner's savings/capital; sale of assets; (reducing stock / collecting debts also accepted).",
    ],
    model:
      "Retained profit is one internal source of finance [AO1]. Another is the sale of assets that the business no longer needs [AO1].",
    traps: ["Giving external sources such as a bank loan or overdraft."],
  },
  {
    id: "u5-e3",
    unit: "u5",
    topic: "u5-cashflow",
    marks: 3,
    command: "Explain",
    stimulus:
      "Daily Basket's owner is planning a second shop. The owner must buy $20,000 of stock before opening and will not receive sales income for the first month.",
    question: "Explain one way a cash flow forecast could help Daily Basket's owner.",
    indicative: [
      "AO1: a cash flow forecast shows expected cash in and out each month.",
      "AO3 (in context): $20,000 stock bought before opening; no sales in month one.",
      "AO3: development, e.g. identifies a shortfall in advance, so the owner can arrange an overdraft or delay payments.",
    ],
    model:
      "A cash flow forecast shows the cash expected to flow in and out of the business each month [AO1]. Because the owner must pay $20,000 for stock before the new shop earns any income, the forecast would show a negative balance in month one [AO3]. Knowing this in advance lets the owner arrange an overdraft or negotiate trade credit before the shortfall occurs, avoiding an inability to pay suppliers [AO3].",
    traps: ["Saying it 'shows profit'. A cash flow forecast shows cash, not profit."],
  },
  {
    id: "u5-e6",
    unit: "u5",
    topic: "u5-breakeven",
    marks: 6,
    command: "Analyse",
    stimulus:
      "The second Daily Basket shop would have fixed costs of $6,000 a month. The average item sells for $2.50 and costs $1.50 to buy in. The owner forecasts monthly sales of 8,500 items.",
    question: "Using the data, analyse whether the second shop is likely to be financially viable.",
    indicative: [
      "AO1: contribution per unit; break-even = fixed costs ÷ contribution; margin of safety.",
      "AO2: contribution $1.00; break-even 6,000 items; forecast 8,500.",
      "AO3: margin of safety 2,500 items (about 29% of forecast); profit = 2,500 × $1 = $2,500 a month.",
      "AO3: but forecast sales are uncertain; a fall of over 29% would make losses.",
    ],
    model:
      "Contribution per item is selling price minus variable cost: $2.50 − $1.50 = $1.00, and break-even output is fixed costs ÷ contribution [AO1]. So the shop must sell $6,000 ÷ $1.00 = 6,000 items a month to break even [AO3].\n\nThe owner forecasts 8,500 items, which gives a margin of safety of 8,500 − 6,000 = 2,500 items, or about 29% of forecast sales [AO3]. At that level the shop would make a monthly profit of 2,500 × $1.00 = $2,500, suggesting it is financially viable [AO3].\n\nHowever, the forecast is only an estimate. If sales turn out more than 29% lower, for example because a rival opens nearby, the shop would make a loss [AO3].",
    traps: [
      "Writing break-even in dollars when the question works in items (and vice versa).",
      "Dividing fixed costs by selling price rather than by contribution.",
      "Calculating without commenting on viability. 'Analyse' needs interpretation.",
    ],
  },
  {
    id: "u5-e9",
    unit: "u5",
    topic: "u5-sources",
    marks: 9,
    command: "Evaluate",
    stimulus:
      "Daily Basket's owner needs $60,000 to open the second shop. The owner has $15,000 in retained profit. The bank has offered a $60,000 loan at 9% interest over five years. The owner's savings are $20,000, which also provide a personal safety net.",
    question: "Evaluate whether the owner should use a bank loan or retained profit and savings to finance the second shop.",
    indicative: [
      "AO1: loan = borrowed money repaid with interest; retained profit = profit kept in the business.",
      "AO2: $60,000 needed; $15,000 retained profit; $20,000 savings; 9% interest over 5 years.",
      "AO3 loan: provides the full amount quickly; interest of around $5,400 a year at 9% (before repayments) and fixed repayments strain cash; owner keeps full control.",
      "AO3 internal: no interest, no debt; but only $35,000 available, so cannot fund the full amount; savings are a safety net.",
      "AO4: judgement, e.g. combine part loan with internal funds; justify.",
    ],
    model:
      "A bank loan is borrowed money that must be repaid with interest, while retained profit is profit kept in the business instead of being paid to the owner [AO1]. Daily Basket needs $60,000, but the owner has only $15,000 of retained profit and $20,000 of savings [AO3].\n\nThe loan would provide the full $60,000 immediately and the owner keeps full control. But 9% interest costs about $5,400 a year at the start, and fixed monthly repayments could strain cash flow in the early months when the new shop is not yet earning much [AO3].\n\nUsing retained profit and savings avoids interest and debt. However, only $35,000 is available, so the owner could not open the shop fully stocked, and spending all savings removes a personal safety net if the shop struggles [AO3].\n\nOverall, I recommend a combination: use the $15,000 retained profit and borrow $45,000. This lowers interest costs compared with borrowing the full $60,000, keeps the savings as a safety net and still completes the funding. Borrowing the whole amount is unnecessary, and relying only on internal funds is not enough [AO4].",
    traps: [
      "Not noticing internal funds cannot cover the full $60,000.",
      "Calling the loan 'cheap' or 'free'. It involves interest and repayments.",
      "Choosing one source with no comment on the owner's personal risk.",
    ],
  },
  {
    id: "u5-e12",
    unit: "u5",
    topic: "u5-invest",
    marks: 12,
    command: "Justify",
    stimulus:
      "The second Daily Basket shop requires an investment of $60,000. The shop is forecast to bring in extra net cash returns of $12,000 a year for ten years. Cash flow is forecast to be negative for the first three months while the shop builds its customer base. The existing shop earns a gross profit margin of 30% and a net profit margin of 8%. Bank savings pay 4% interest. Another convenience store has recently opened 300 metres from the proposed site.",
    question: "Justify whether Daily Basket's owner should open the second shop.",
    indicative: [
      "AO1: ARR, payback, ROCE/profit margins, cash flow, risk.",
      "AO2: total returns $120,000; ARR = (($120,000 − $60,000) ÷ 10) ÷ $60,000 × 100 = 10%; payback = $60,000 ÷ $12,000 = 5 years; bank rate 4%; negative cash flow for three months; competitor 300 m away.",
      "AO3: 10% beats 4% savings; $60,000 total gain over ten years; but payback takes half the project's life; negative early cash flow needs finance; competition could reduce returns.",
      "AO3: existing margins (30% gross, 8% net) show a viable business model.",
      "AO4: reasoned decision with conditions; evaluate quantitative and qualitative factors.",
    ],
    model:
      "Investment appraisal compares the return from a project with its cost. The average rate of return (ARR) shows average annual profit as a percentage of the investment, and payback shows how long it takes to recover the cost [AO1]. The shop costs $60,000 and is forecast to return $12,000 a year for ten years [AO3].  Total returns are $120,000, so the gain is $60,000, or $6,000 a year on average. ARR is therefore $6,000 ÷ $60,000 × 100 = 10%, which is two and a half times the 4% the owner could earn by leaving the money in the bank. The existing shop's 30% gross margin and 8% net margin also suggest the business model works [AO3].  However, payback is $60,000 ÷ $12,000 = 5 years, half the forecast life of the project, and a lot can change in that time. A rival store opening 300 metres away could take sales and reduce the forecast returns. The negative cash flow in the first three months also means the owner would need an overdraft or extra finance, adding interest costs [AO3].  On balance, I recommend that the owner opens the shop but takes precautions. The 10% ARR is attractive compared with the bank's rate, but the five-year payback and nearby competitor make the project riskier than the headline figure suggests. The owner should arrange an overdraft to cover the first three months, check likely customer numbers through a short survey outside the site, and reconsider if forecast returns fall by around a third or more, since the ARR would then be close to the bank rate. If the survey suggests the rival would take most trade, a different location would be wiser [AO4].",
    traps: [
      "Calculating ARR/payback and stopping. 'Justify' needs a decision based on them AND on risk.",
      "Ignoring qualitative information (the competitor, the cash flow dip).",
      "Using total profit rather than average annual profit, or forgetting to compare with the 4% bank rate.",
    ],
  },
];
