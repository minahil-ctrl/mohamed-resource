import type { ExamQ } from "../types";

/** Units 1-3 */
export const examA: ExamQ[] = [
  /* ===================== UNIT 1 · Crescent Juices Ltd ===================== */
  {
    id: "u1-e2",
    unit: "u1",
    topic: "u1-enterprise",
    marks: 2,
    command: "Define",
    question: "Define the term 'added value'.",
    indicative: [
      "1 mark: the difference between the selling price and the cost of materials/inputs.",
      "1 mark: development, e.g. a worked example ($2.50 selling price − $0.40 ingredients = $2.10).",
    ],
    model:
      "Added value is the difference between the selling price of a product and the cost of the materials or inputs used to make it [AO1]. For example, if a bottle of juice sells for $2.50 and the ingredients cost $0.40, the added value is $2.10 [AO1].",
    traps: [
      "Writing 'profit'. Added value is before wages, rent and overheads are deducted.",
      "Giving only an example and no definition.",
    ],
  },
  {
    id: "u1-e3",
    unit: "u1",
    topic: "u1-ownership",
    marks: 3,
    command: "Explain",
    stimulus:
      "Crescent Juices Ltd is owned by the Hassan family. The company wants to buy a second bottling line costing $90,000.",
    question: "Explain one benefit to Crescent Juices of being a private limited company rather than a sole trader.",
    indicative: [
      "AO1: limited liability / separate legal entity / can sell shares privately to raise capital.",
      "AO3 (in context): applied to the Hassan family and the $90,000 bottling line.",
      "AO3: development, e.g. owners' personal assets protected, so they are more willing to take the risk of expanding.",
    ],
    model:
      "Being a private limited company gives the Hassan family limited liability [AO1]. This means that if the $90,000 bottling line fails to pay for itself and Crescent cannot repay its debts, the family can lose only the money they put into the company, not their homes or personal savings [AO3]. As a result, they are more willing to take the risk of investing in the new line, which could increase output and profit [AO3].",
    traps: [
      "'The business cannot go bankrupt'. The company can still fail; only the owners are protected.",
      "Stating 'limited liability' and stopping. Develop the consequence for the owners.",
    ],
  },
  {
    id: "u1-e6",
    unit: "u1",
    topic: "u1-markets",
    marks: 6,
    command: "Analyse",
    stimulus:
      "Crescent Juices makes sweetened fruit drinks that sell at $1.50 a bottle. World sugar prices have risen by 30% this year.",
    question: "Analyse how a rise in the price of sugar could affect the price and sales of Crescent Juices' sweetened drinks.",
    indicative: [
      "AO1: sugar is an input cost; higher costs shift supply left; equilibrium price rises.",
      "AO2: apply to sweetened drinks at $1.50 and the 30% rise; rivals face the same cost.",
      "AO3 chain 1: higher cost, so less supplied at each price, so supply shifts left, so shortage at $1.50, so price rises.",
      "AO3 chain 2: higher price, so quantity demanded falls (movement along demand curve), so sales fall; substitutes available.",
      "Credit a correctly labelled supply/demand diagram.",
    ],
    model:
      "Sugar is a raw material, so a 30% rise increases the variable cost of every bottle Crescent makes [AO1]. Because rivals who make sweetened drinks also face dearer sugar, supply across the market falls at every price [AO2]. This shifts the supply curve to the left, creating a shortage at the old $1.50 price, so the equilibrium price is pushed up [AO3].\n\nAs the price rises, customers buy fewer bottles. This is a movement up the demand curve, so the quantity sold falls, especially as customers can switch to substitutes such as water or unsweetened juice [AO3]. Crescent therefore faces higher costs and lower sales volume, which could squeeze profit unless it cuts other costs or switches to a cheaper sweetener [AO3].",
    traps: [
      "Saying 'demand falls'. The price change causes a fall in QUANTITY demanded (movement), not a shift.",
      "Describing only the cost increase and never reaching the effect on price and sales.",
    ],
  },
  {
    id: "u1-e9",
    unit: "u1",
    topic: "u1-growth",
    marks: 9,
    command: "Evaluate",
    stimulus:
      "Crescent Juices has revenue of $4m and annual profit of $300,000. A smaller local rival, Orchard Fresh, is for sale at $1.2m. Alternatively, Crescent could launch a new range of smoothies, funded from retained profit.",
    question: "Evaluate whether Crescent Juices should grow by taking over Orchard Fresh or by launching the new smoothie range (organic growth).",
    indicative: [
      "AO1: takeover = buying control of another firm; organic growth = growth from within, e.g. new products.",
      "AO2: $1.2m is four years of profit; same industry so horizontal; smoothies funded from retained profit.",
      "AO3 takeover: bigger market share, shared distribution and bulk-buying economies of scale, but needs large finance and integration.",
      "AO3 organic: slower, cheaper, lower risk, keeps control, builds on existing brand and skills.",
      "AO4: a reasoned judgement weighing risk, cost, speed and cash flow, with a justified recommendation.",
    ],
    model:
      "A takeover means Crescent buys control of Orchard Fresh, while organic growth means growing from within by launching new products [AO1]. Orchard Fresh would cost $1.2m, which equals four years of Crescent's $300,000 profit [AO2].\n\nA takeover would instantly increase Crescent's market share and, because both firms make juice, they could share distribution and buy fruit in bulk, lowering unit costs through economies of scale [AO3]. However, finding $1.2m probably needs a loan, and interest payments would strain cash flow. Merging two workforces could also reduce morale [AO3].\n\nLaunching smoothies from retained profit is cheaper and lower risk because Crescent already knows its customers and keeps full control, but growth would be slower and the new range could fail [AO3].\n\nOverall, I recommend organic growth. Crescent is a family-owned private company with modest profit, so a $1.2m purchase is a big financial risk. Smoothies can be tested in a few supermarkets first and expanded if successful. A takeover could be reconsidered later once profit has grown [AO4].",
    traps: [
      "A 'for and against' list with no recommendation. AO4 needs a judgement tied to the evidence.",
      "Confusing merger and takeover, or forgetting the $1.2m vs $300,000 comparison.",
      "Generic growth advice that could apply to any firm. Use the numbers and the family-owned context.",
    ],
  },
  {
    id: "u1-e12",
    unit: "u1",
    topic: "u1-external",
    marks: 12,
    command: "Justify",
    stimulus:
      "Crescent Juices is considering exporting to a neighbouring country where juice demand is growing by 8% a year. Sales would be paid in the foreign currency. Crescent's home currency has been weakening. The neighbouring country has strict food-labelling laws and two established brands holding 70% of the market between them.",
    question:
      "Justify whether Crescent Juices should start exporting its juice to the neighbouring country. In your answer, consider the external influences on this decision.",
    indicative: [
      "AO1: exchange rates, competition, legislation, market growth as external influences.",
      "AO2: 8% market growth, weakening home currency, 70% held by two brands, labelling laws.",
      "AO3: weaker currency makes exports cheaper abroad, so more competitive; but imported packaging dearer. Strict labelling law adds cost and delay. Two big brands can respond with price cuts or promotion.",
      "AO3: foreign-currency sales are volatile; the currency could strengthen and erode competitiveness.",
      "AO4: weigh opportunity vs threat; decision with conditions (e.g. start with a distributor, trial one product); explain why the alternative is rejected.",
    ],
    model:
      "External influences such as exchange rates, competition and legislation will all affect whether exporting succeeds [AO1].\n\nThe market offers real opportunity: demand is growing at 8% a year, and Crescent's weakening home currency makes its juice cheaper for foreign customers, which makes it more price-competitive against local brands [AO2]. More sales could also bring economies of scale at home [AO3].\n\nThere are significant threats. Two established brands hold 70% of the market and could respond with price cuts or heavy promotion, making it hard for a new entrant to win share [AO2, AO3]. The strict labelling laws mean Crescent must redesign packaging and be tested, adding cost and delaying launch [AO3]. Exchange rates are also unpredictable: if the home currency strengthens again, the price advantage disappears, and if Crescent imports packaging, a weaker currency raises its costs [AO3].\n\nOn balance, I recommend that Crescent should enter, but cautiously. It should appoint a local distributor, comply with the labelling rules and test one product in a single region first. This keeps the investment and risk small while taking advantage of the currently favourable exchange rate and market growth. A full launch with its own sales team would be too risky given the dominance of the two rivals [AO4]. If the first year shows less than a modest share, it should withdraw and concentrate on its home market [AO4].",
    traps: [
      "Describing the influences without reaching a decision. AO4 and 'Justify' demand a recommendation with reasons.",
      "Treating a weaker currency as bad for exporters. It makes exports cheaper abroad (but imports dearer).",
      "Ignoring the numbers: 8% growth and 70% share are there to be used.",
    ],
  },

  /* ===================== UNIT 2 · FreshMart ===================== */
  {
    id: "u2-e2",
    unit: "u2",
    topic: "u2-structure",
    marks: 2,
    command: "State",
    question: "State two characteristics of a flat organisational structure.",
    indicative: [
      "1 mark each: few layers of hierarchy; wide span of control; short chain of command; more delegation/empowerment.",
    ],
    model:
      "A flat structure has few layers of hierarchy between the top and the bottom [AO1]. It also has a wide span of control, so each manager supervises many employees [AO1].",
    traps: ["Giving advantages (e.g. 'faster communication') rather than characteristics of the structure."],
  },
  {
    id: "u2-e3",
    unit: "u2",
    topic: "u2-structure",
    marks: 3,
    command: "Explain",
    stimulus:
      "FreshMart has 12 stores. There are eight layers between a store assistant and the Chief Executive.",
    question: "Explain one disadvantage to FreshMart of having a tall organisational structure.",
    indicative: [
      "AO1: slow communication / higher management costs / remote senior managers.",
      "AO3 (in context): eight layers; 12 stores.",
      "AO3: development, e.g. slow decisions so late reaction to competitors' prices and lost sales.",
    ],
    model:
      "A tall structure slows communication [AO1]. With eight layers between a store assistant and the Chief Executive, a request to match a rival's price promotion must pass through many managers before it is approved [AO3]. This delay means FreshMart reacts slowly to competitors, so it may lose customers and sales [AO3].",
    traps: ["Stating 'it is expensive' with no explanation (more managers' salaries)."],
  },
  {
    id: "u2-e6",
    unit: "u2",
    topic: "u2-training",
    marks: 6,
    command: "Analyse",
    stimulus:
      "FreshMart is introducing self-service tills in all 12 stores. 150 checkout staff will need training. Training will take two days per person.",
    question: "Analyse two benefits to FreshMart of training its checkout staff to use the new tills.",
    indicative: [
      "AO1: training gives skills; benefits include productivity, fewer errors, confidence, retention.",
      "AO2: self-service tills, 150 checkout staff, 12 stores, queues.",
      "AO3 chain 1: skilled staff, so faster transactions, so shorter queues, so better service and more sales.",
      "AO3 chain 2: confident staff, so fewer errors and less stock loss, so lower costs.",
      "Credit retention/motivation as an alternative second benefit.",
    ],
    model:
      "Training gives staff the skills to use the new self-service tills [AO1]. One benefit is faster, smoother checkouts. If the 150 checkout staff can fix till problems and help customers quickly, queues are shorter [AO2], so customers have a better experience and are more likely to return to FreshMart, increasing sales [AO3].\n\nA second benefit is fewer mistakes. Trained staff are less likely to mis-scan items or process refunds incorrectly, which reduces stock loss and refunds across 12 stores [AO2], lowering costs and protecting profit [AO3]. Trained staff also feel more confident and valued, which may reduce the high staff turnover, saving recruitment costs [AO3].",
    traps: [
      "Listing benefits ('productivity, quality') without linking to tills and queues.",
      "Giving two benefits that are really the same point (e.g. 'faster' and 'more efficient').",
    ],
  },
  {
    id: "u2-e9",
    unit: "u2",
    topic: "u2-motivation",
    marks: 9,
    command: "Evaluate",
    stimulus:
      "FreshMart's staff turnover is 35% a year. Exit interviews show staff feel their work is repetitive and nobody notices their effort. Managers are considering either a 5% pay rise or an 'employee of the month' scheme with extra responsibility for high performers.",
    question: "Evaluate whether FreshMart should use financial or non-financial methods to motivate its staff.",
    indicative: [
      "AO1: financial (pay, bonus) vs non-financial (recognition, job enrichment); Herzberg/Maslow.",
      "AO2: 35% turnover; staff feel work is repetitive and unnoticed; 5% pay rise vs recognition scheme.",
      "AO3 financial: pay meets basic needs and is a hygiene factor; effect fades; increases wage bill.",
      "AO3 non-financial: recognition meets esteem needs; enrichment cuts repetition; low cost.",
      "AO4: judgement, probably a combination; justify with the evidence on why staff leave.",
    ],
    model:
      "Financial methods such as a pay rise reward employees with money, while non-financial methods such as recognition and job enrichment appeal to other needs [AO1]. FreshMart's turnover is 35% and staff say their work is repetitive and unnoticed [AO2].\n\nA 5% pay rise would help meet basic needs and, as a Herzberg hygiene factor, could reduce dissatisfaction. However, the motivation tends to fade quickly, and across 240 employees it would significantly raise the wage bill without tackling boredom [AO3].\n\nAn employee-of-the-month scheme with extra responsibility meets staff esteem needs and, by enriching jobs, reduces repetition. It is cheap, but only a few staff win each month and some could feel excluded [AO3].\n\nI recommend FreshMart focuses mainly on non-financial methods. The evidence shows staff are leaving because of repetition and lack of recognition, not mainly pay, so a pay rise would be an expensive way of treating the wrong problem. A small pay review could be added if exit interviews show pay is also a concern [AO4].",
    traps: [
      "Only discussing pay (or only recognition). Evaluation needs both sides.",
      "Ignoring the stimulus evidence about WHY staff leave.",
      "Mixing job enrichment and job enlargement.",
    ],
  },
  {
    id: "u2-e12",
    unit: "u2",
    topic: "u2-leadership",
    marks: 12,
    command: "Justify",
    stimulus:
      "FreshMart wants to cut its staff turnover of 35%. Three options are being considered: (A) remove two layers of management to create a flatter structure, (B) give all staff a 15% pay rise, (C) introduce a training and promotion programme so that staff can move up within the company.",
    question: "Justify which ONE of these options FreshMart should choose to reduce staff turnover.",
    indicative: [
      "AO1: flatter structure, pay, training and promotion as ways to improve retention.",
      "AO2: 35% turnover, 240 staff, eight layers, 15% pay rise cost.",
      "AO3 A: fewer layers speeds communication and empowers staff, but redundancies and larger spans, limited promotion.",
      "AO3 B: higher pay helps basic needs but costly (240 staff) and effect fades.",
      "AO3 C: training builds skills and a visible career; reduces recruitment cost; risk of staff leaving after training.",
      "AO4: choose one, reject the others with reasons, link to the evidence on turnover.",
    ],
    model:
      "Each option affects staff retention in a different way [AO1]. FreshMart has 240 staff, eight layers of management and 35% turnover [AO2].\n\nOption A would speed up communication and give staff more responsibility, but removing two layers means redundancies, which could harm morale among those who remain. Wider spans of control would overload managers and reduce chances for promotion, which is a reason staff might leave [AO3].\n\nOption B, a 15% pay rise, would raise a large wage bill across 240 staff. Pay is a hygiene factor, so it may reduce dissatisfaction briefly, but it does not solve boredom or lack of progression and its effect fades [AO3].\n\nOption C gives staff skills and a visible career path. Training makes workers feel valued and, with a tall eight-layer structure, there are many possible promotions. It also reduces the recruitment and induction cost of replacing leavers. The risk is that trained staff may be tempted to move to rivals, and training costs time and money [AO3].\n\nI recommend Option C. It addresses the cause of turnover (lack of progression) at a cost that is lower than a 15% pay rise across the whole workforce, and it uses the existing tall structure as an advantage. Option A would damage morale and reduce promotion chances, and Option B is expensive and short-lived. To reduce the risk of poaching, FreshMart could add a small loyalty bonus for those who complete the programme [AO4].",
    traps: [
      "Justifying with a list of benefits only. You must reject the other options with reasons.",
      "Not using the numbers (240 staff, 15% pay, eight layers).",
      "Choosing an option without linking back to the cause of turnover.",
    ],
  },

  /* ===================== UNIT 3 · Zing Drinks ===================== */
  {
    id: "u3-e2",
    unit: "u3",
    topic: "u3-research",
    marks: 2,
    command: "Define",
    question: "Define the term 'market segmentation'.",
    indicative: [
      "1 mark: dividing a market into groups of customers.",
      "1 mark: with shared characteristics, e.g. age, income, lifestyle.",
    ],
    model:
      "Market segmentation is dividing a market into distinct groups of customers [AO1] who share similar characteristics such as age, income or lifestyle [AO1].",
    traps: ["Confusing segmentation with market research or market share."],
  },
  {
    id: "u3-e3",
    unit: "u3",
    topic: "u3-research",
    marks: 3,
    command: "Explain",
    stimulus:
      "Zing Drinks plans to launch 'Zing Zero', a sugar-free energy drink aimed at 16-25 year olds. The launch will cost $500,000.",
    question: "Explain one reason why Zing Drinks might use primary research before launching Zing Zero.",
    indicative: [
      "AO1: primary research is first-hand and specific to the product/market.",
      "AO3 (in context): 16-25 year old target market; $500,000 launch.",
      "AO3: development, e.g. taste tests identify flavours that appeal, reducing the risk of a costly failed launch.",
    ],
    model:
      "Primary research collects new, first-hand information that is specific to Zing Zero [AO1]. By running taste tests and surveys with 16-25 year olds, Zing Drinks can find out which flavour and price appeal to its target market [AO3]. This reduces the risk of losing the $500,000 launch budget on a product customers do not want [AO3].",
    traps: [
      "Describing what primary research is but not why THIS firm would use it.",
      "Researching the wrong group (e.g. all adults) instead of 16-25 year olds.",
    ],
  },
  {
    id: "u3-e6",
    unit: "u3",
    topic: "u3-price",
    marks: 6,
    command: "Analyse",
    stimulus:
      "Zing Drinks plans to sell Zing Zero at $1.20 a can. Rival sugar-free energy drinks sell at $1.60. The variable cost of a can is $0.70.",
    question: "Analyse how penetration pricing might help Zing Zero to succeed.",
    indicative: [
      "AO1: penetration pricing = low initial price to gain share.",
      "AO2: $1.20 vs $1.60 rivals; $0.70 variable cost leaves $0.50 contribution; target market 16-25 year olds who are price-sensitive.",
      "AO3: lower price attracts trial, so builds awareness/market share, so repeat purchase and loyalty; economies of scale from higher volume.",
      "AO3: but lower margin than rivals, so profit per can is small; hard to raise price later.",
    ],
    model:
      "Penetration pricing means setting a low price at launch to win market share quickly [AO1]. At $1.20 per can, Zing Zero is $0.40 cheaper than rivals' $1.60 cans, which is attractive to price-sensitive 16-25 year olds [AO2]. This is likely to encourage trial, so more young customers try the drink and may become loyal, building market share [AO3].\n\nHigher sales volume could also lower average costs through bulk-buying of ingredients [AO3]. However, each can only contributes $0.50 ($1.20 − $0.70), so Zing Drinks needs high sales to recover its launch costs, and raising the price later could upset customers [AO3].",
    traps: [
      "Confusing penetration with skimming (high initial price).",
      "Forgetting that a low price still has to cover the $0.70 variable cost.",
    ],
  },
  {
    id: "u3-e9",
    unit: "u3",
    topic: "u3-promotion",
    marks: 9,
    command: "Evaluate",
    stimulus:
      "Zing Drinks has a promotion budget of $200,000 to launch Zing Zero to 16-25 year olds. Prime-time TV advertising would cost $150,000 for a two-week campaign. A social media and influencer campaign would cost $60,000 for three months.",
    question: "Evaluate whether social media or TV advertising is the better way to promote Zing Zero.",
    indicative: [
      "AO1: TV is paid mass media (above-the-line); social media uses online platforms and influencers.",
      "AO2: $150,000 for two weeks vs $60,000 for three months; 16-25 target market; $200,000 budget.",
      "AO3 TV: wide reach, builds brand awareness fast, but costly, short, not targeted at young viewers who stream.",
      "AO3 social: targeted, shareable, cheaper, longer, can measure response; but negative comments, depends on influencer credibility.",
      "AO4: justified conclusion, e.g. social media as main, TV not affordable alongside; consider a mix.",
    ],
    model:
      "TV is a paid mass-media method that reaches large audiences, while social media uses online platforms and influencers to target specific groups [AO1]. A two-week TV campaign costs $150,000 of the $200,000 budget, while three months of social media costs $60,000 [AO2].\n\nTV would build awareness quickly across the whole country. However, it would use three-quarters of the budget for just two weeks, and many 16-25 year olds now stream rather than watch TV, so much of the spend would reach the wrong people [AO3].\n\nSocial media can be targeted at the exact age group and shared by followers, and the cheaper cost allows a longer campaign that keeps the brand visible. Results can be measured through clicks and sales codes. The risks are negative comments spreading quickly and the influencer's credibility affecting the brand [AO3].\n\nOverall, social media is the better choice. It reaches the target market, costs less than half, and leaves $140,000 to spend on in-store promotions and sampling. TV is too expensive for such a short campaign for a young audience [AO4].",
    traps: [
      "Not using the cost and duration figures from the stimulus.",
      "Ignoring the target market (16-25 year olds) when comparing the methods.",
      "Ending with 'it depends' and no justified choice.",
    ],
  },
  {
    id: "u3-e12",
    unit: "u3",
    topic: "u3-place",
    marks: 12,
    command: "Justify",
    stimulus:
      "Zing Drinks has a $500,000 budget for launching Zing Zero. It could sell through (A) supermarkets only, (B) supermarkets and small neighbourhood shops via wholesalers, or (C) its own website only. Consumers are 16-25 years old; 60% buy drinks from small shops near school or college.",
    question:
      "Justify the distribution (place) strategy that Zing Drinks should use to launch Zing Zero, referring to the rest of the marketing mix where relevant.",
    indicative: [
      "AO1: distribution channels, wholesalers, retailers, e-commerce; the 4Ps.",
      "AO2: 60% buy from small shops; 16-25 target market; $500,000 budget.",
      "AO3 A: supermarkets give volume and visibility but fewer young impulse buys and strong negotiating power for lower prices.",
      "AO3 B: wholesalers break bulk to reach thousands of small shops, matching where target buys; costs a margin.",
      "AO3 C: direct sales keep full margin but poor reach and delivery costs for low-value cans.",
      "AO4: choose B with reasons; consistent promotion/price; reject A/C.",
    ],
    model:
      "Place involves the route a product takes to customers and must fit the other elements of the marketing mix [AO1]. 60% of Zing Zero's 16-25 year old customers buy drinks from small shops near school or college, and the launch budget is $500,000 [AO2].\n\nOption A, supermarkets only, offers high volume and shelf visibility, but supermarkets have strong buying power and demand low prices, which cuts margin. They also miss the impulse purchases young people make near school [AO3].\n\nOption C, a website only, would give Zing Drinks the full selling price but a can is low-value, so delivery costs would be disproportionate, and few teenagers would order energy drinks online [AO3].\n\nOption B uses wholesalers to break bulk and supply thousands of small shops that a producer could never serve directly. The wholesaler takes a share of the price, but the product is available exactly where the majority of customers shop [AO3].\n\nI recommend Option B, with supermarkets added later once the brand is known. It matches distribution to where the target market buys, and promotion can support it with point-of-sale displays and social media messages. The wholesaler's margin is a worthwhile cost for 60% of potential sales. Option A would reach the wrong shoppers and give away margin, and Option C would reach too few customers [AO4].",
    traps: [
      "Describing channels in general without linking to where the 16-25 year olds actually buy.",
      "Forgetting to reject the alternatives with reasons.",
      "Ignoring consistency with price and promotion.",
    ],
  },
];
