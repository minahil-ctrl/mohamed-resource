import type { Topic } from "../types";

export const topicsU1: Topic[] = [
  {
    id: "u1-enterprise",
    code: "1.1",
    title: "Enterprise & Spotting an Opportunity",
    blurb: "Why businesses exist, who starts them, and how they create value.",
    points: [
      "Enterprise = identifying a business opportunity and taking the risk of setting up and running a business to meet customer needs.",
      "An entrepreneur takes the risk, organises the resources (land, labour, capital) and aims to make a profit.",
      "Entrepreneurial characteristics: risk-taker, creative, determined, hard-working, confident, resilient, good communicator.",
      "Opportunities come from changing customer needs, new technology, gaps in the market and solving a problem others have ignored.",
      "Needs are essential (food, water, shelter); wants are non-essential desires. Most profits come from selling wants.",
      "Added value = selling price minus the cost of bought-in inputs. Raised by branding, design, quality, convenience, service or a USP.",
      "Reasons to start up: be your own boss, make profit, use your skills, independence, or a social aim (social enterprise).",
      "Risk vs reward: risk of losing capital, stress and no steady income; reward of profit, independence and satisfaction.",
      "Common reasons for failure: poor cash flow, no planning, weak demand, strong competition, poor management, too little capital.",
      "A business plan sets aims, market research, forecasts, marketing and finance needs. It reduces risk and helps win loans.",
    ],
    terms: [
      { term: "Enterprise", def: "Spotting an opportunity and taking the risk to set up a business to meet customer needs." },
      { term: "Entrepreneur", def: "A risk-taker who organises resources to set up and run a business aiming for profit." },
      { term: "Added value", def: "The difference between the selling price of a product and the cost of the materials and inputs used to make it." },
      { term: "Opportunity cost", def: "The benefit of the next best alternative that is given up when a choice is made." },
      { term: "Business plan", def: "A document setting out a business's aims, strategy, market research and financial forecasts." },
      { term: "Social enterprise", def: "A business that trades to achieve social or environmental aims, reinvesting most of its profits." },
    ],
    formulas: [
      { name: "Added value", expr: "Selling price − cost of inputs", note: "Added value is NOT profit: overheads and wages are still to come out." },
    ],
    redFlags: [
      "Defining an entrepreneur as 'someone who owns a business'. The mark needs risk-taking and organising resources.",
      "Confusing added value with profit. Added value is before wages, rent and other overheads.",
      "Listing entrepreneurial characteristics with no link to the case (a bare list scores AO1 only).",
    ],
    applications: [
      {
        title: "Sachets for tight budgets",
        concept: "Spotting an opportunity",
        scenario:
          "Many low-income households cannot afford a full bottle of shampoo, so FMCG brands sell single-use sachets at very small price points. The gap in the market was affordability, not the product.",
        tip: "Write: 'The firm spotted a gap for customers who could not afford a full bottle, so a smaller pack at a lower price opens a new market.'",
      },
      {
        title: "Cold-pressed juice at the school gate",
        concept: "Added value",
        scenario:
          "Mangoes cost the juice firm a few cents each, yet a branded, chilled 330 ml bottle sells for several dollars. Brand, packaging and convenience create the added value.",
        tip: "Use: 'Branding and convenient packaging let Crescent Juices charge far more than the cost of the fruit, which increases added value.'",
      },
    ],
  },
  {
    id: "u1-ownership",
    code: "1.2",
    title: "Ownership, Aims & Stakeholders",
    blurb: "Legal structures, who bears the risk, and who cares about the business.",
    points: [
      "Sole trader: one owner, full control and all profit, but unlimited liability and difficulty raising finance.",
      "Partnership: 2 or more owners sharing skills and capital, but unlimited liability (except LLPs) and risk of disagreements.",
      "Private limited company (Ltd): shareholders have limited liability, separate legal entity, shares sold privately only (not on the stock exchange).",
      "Public limited company (plc): shares sold to the public on a stock exchange, raises large capital, but risks takeover and loss of control.",
      "Franchise: pay fees and royalties to use an established brand and system. Lower risk but less freedom and shared profit.",
      "Limited liability: owners can only lose the money they invested, not their personal assets.",
      "Business aims: survival, profit, growth, market share, customer satisfaction, social or ethical goals. Objectives should be SMART.",
      "Stakeholders: owners, employees, customers, suppliers, lenders, the local community and the government.",
      "Stakeholder conflict is common: owners want profit, employees want pay, customers want low prices, communities want less pollution.",
      "Aims change over time: new businesses focus on survival, established ones on growth, profit and market share.",
    ],
    terms: [
      { term: "Limited liability", def: "Owners' personal assets are protected; they can only lose the amount they invested in the business." },
      { term: "Unlimited liability", def: "Owners are personally responsible for all the business's debts, even beyond what they invested." },
      { term: "Shareholder", def: "A person or organisation that owns shares in a limited company and shares in its profits (dividends)." },
      { term: "Dividend", def: "The share of company profit paid out to shareholders." },
      { term: "Franchise", def: "A licence to trade using another firm's brand, products and business model in return for fees." },
      { term: "Stakeholder", def: "Any individual or group with an interest in, or affected by, the activities of a business." },
      { term: "SMART objective", def: "Specific, Measurable, Achievable, Realistic and Time-bound target." },
    ],
    redFlags: [
      "Saying a Ltd company can 'sell shares to the public'. Only a plc can. Ltd shares are sold privately.",
      "Writing that limited liability protects 'the business' from debts. It protects the owners' personal assets.",
      "Stakeholder answers that name groups but never explain their conflicting interests.",
    ],
    applications: [
      {
        title: "Family bakery to Ltd",
        concept: "Ownership change",
        scenario:
          "A sole-trader bakery wants a cousin to invest $50,000 for a second oven. Becoming a private limited company allows shares to be sold and protects the family home.",
        tip: "Link to context: 'As a Ltd the owner's house is protected if the new oven fails to pay back, which makes bringing in investors less risky.'",
      },
      {
        title: "Supermarket plc under dividend pressure",
        concept: "Stakeholder conflict",
        scenario:
          "A listed supermarket chain squeezes suppliers on price to protect shareholder dividends, while farmers (suppliers) and customers want fair prices.",
        tip: "Name the two stakeholders AND the opposing interest: 'Shareholders want higher dividends but suppliers want higher prices, so a conflict arises.'",
      },
    ],
  },
  {
    id: "u1-markets",
    code: "1.3",
    title: "Markets: Supply & Demand",
    blurb: "How prices are set and why they move.",
    points: [
      "A market is where buyers and sellers meet to exchange goods and services.",
      "Demand = quantity customers are willing AND able to buy at each price. The demand curve slopes downward.",
      "Supply = quantity producers are willing to sell at each price. The supply curve slopes upward.",
      "Equilibrium price is where demand equals supply: the market clears with no shortage or surplus.",
      "Price above equilibrium creates a surplus (excess supply) so price falls. Price below creates a shortage so price rises.",
      "A change in PRICE causes a movement ALONG a curve. A change in anything else SHIFTS the curve.",
      "Demand shifters: income, tastes and fashion, price of substitutes/complements, population, advertising, seasons.",
      "Supply shifters: raw material and wage costs, technology, taxes and subsidies, number of producers, weather.",
      "Rightward shift of demand: higher price and higher quantity. Leftward shift of supply: higher price but lower quantity.",
      "Stretch: price elasticity of demand (PED) = % change in quantity demanded ÷ % change in price. Elastic if above 1.",
    ],
    terms: [
      { term: "Demand", def: "The quantity of a product customers are willing and able to buy at a given price in a given period." },
      { term: "Supply", def: "The quantity of a product producers are willing and able to sell at a given price." },
      { term: "Equilibrium price", def: "The price at which quantity demanded equals quantity supplied." },
      { term: "Surplus", def: "Quantity supplied exceeds quantity demanded at the current price." },
      { term: "Shortage", def: "Quantity demanded exceeds quantity supplied at the current price." },
      { term: "Substitute", def: "A product that can replace another (e.g. tea and coffee); price rise of one raises demand for the other." },
      { term: "Complement", def: "A product bought together with another (e.g. biscuits and tea)." },
    ],
    formulas: [
      { name: "PED (stretch)", expr: "% change in quantity demanded ÷ % change in price", note: "Greater than 1 = elastic: a price cut raises total revenue." },
    ],
    redFlags: [
      "Drawing a shift when only price has changed. A price change is a movement along the curve.",
      "Writing 'demand increases because the price falls'. The correct phrase is 'quantity demanded extends'.",
      "Leaving off axis labels (Price on y, Quantity on x) and curve labels (D, S, D1, S1). Easy marks thrown away.",
    ],
    applications: [
      {
        title: "Sugar price shock",
        concept: "Supply shift",
        scenario:
          "A rise in world sugar prices raises the cost of making biscuits and soft drinks. Supply shifts left, so equilibrium price rises and quantity sold falls.",
        tip: "Chain it: 'Higher sugar costs shift supply left, creating a shortage at the old price, so price rises to a new equilibrium.'",
      },
      {
        title: "Heatwave and bottled water",
        concept: "Demand shift",
        scenario:
          "A hot week lifts demand for bottled water and soft drinks. Retailers raise shelf prices and stock up, as demand shifts right.",
        tip: "Mention the cause (heatwave), the shift (demand right) and the result (price and quantity both rise).",
      },
    ],
    graphs: ["supply-demand"],
  },
  {
    id: "u1-external",
    code: "1.4",
    title: "External Influences on Business",
    blurb: "The things a firm cannot control but must react to.",
    points: [
      "Interest rates: higher rates raise borrowing costs and reduce consumer spending; lower rates do the opposite.",
      "Exchange rates: a stronger home currency makes imports cheaper but exports more expensive (and vice versa).",
      "Inflation: rising prices push up input costs and wage demands. Unemployment reduces consumer demand.",
      "Taxation (VAT, corporation tax) raises prices or cuts profit. Economic growth lifts demand; recession cuts it.",
      "Legislation: consumer protection, health and safety, minimum wage, equal opportunities, competition law.",
      "Competition: price wars, new entrants and rivals' innovation force firms to differentiate or cut costs.",
      "Technology: e-commerce, automation and social media cut costs and reach customers, but require investment and training.",
      "Ethical and environmental pressures: sustainable sourcing, plastic reduction, fair pay. These cost money but protect reputation.",
      "Internal factors are controllable (prices, staff); external factors are not, so businesses must adapt or plan scenarios.",
      "Always weigh opportunity AND threat: an external change helps some firms and harms others.",
    ],
    terms: [
      { term: "Interest rate", def: "The cost of borrowing money (or reward for saving), shown as a percentage." },
      { term: "Exchange rate", def: "The price of one currency in terms of another." },
      { term: "Inflation", def: "A sustained rise in the general level of prices in the economy." },
      { term: "Recession", def: "A period of falling national output, rising unemployment and weak consumer spending." },
      { term: "Legislation", def: "Laws passed by government that businesses must follow." },
      { term: "Ethics", def: "Moral principles guiding what a business considers right and wrong." },
      { term: "Globalisation", def: "Growing integration of world markets so goods, firms and ideas cross borders easily." },
    ],
    redFlags: [
      "Saying 'interest rates rise so profit falls' with no chain. Show: higher borrowing cost, so less credit spending, so lower sales.",
      "Writing 'the exchange rate goes up' without direction or whether the firm is an importer or exporter.",
      "One-sided ethics answers. Always weigh higher costs against better reputation and loyalty.",
    ],
    applications: [
      {
        title: "Minimum wage rise",
        concept: "Legislation",
        scenario:
          "A supermarket chain with 240 low-paid staff sees its wage bill jump when the legal minimum wage rises, forcing price rises or fewer shifts.",
        tip: "Quantify if you can: 'With 240 staff on minimum wage, a 5% rise adds a large fixed cost that squeezes net profit.'",
      },
      {
        title: "Weaker currency, costlier flour",
        concept: "Exchange rates",
        scenario:
          "A biscuit maker importing wheat finds the local currency has weakened, so the same shipment costs more. Unit costs rise and margins shrink.",
        tip: "State importer vs exporter: 'As an importer of wheat, a weaker currency makes inputs dearer.'",
      },
    ],
  },
  {
    id: "u1-growth",
    code: "1.5",
    title: "Business Growth",
    blurb: "How firms get bigger, and what can go wrong.",
    points: [
      "Why grow: economies of scale, higher profit, greater market share, survival, spreading risk across products.",
      "Internal (organic) growth: new products, new markets, new outlets funded from within. Slower but lower risk and keeps control.",
      "External growth: merger (two firms agree to join as one) or takeover (one firm buys another).",
      "Horizontal integration: same industry, same stage. Backward vertical: buys a supplier. Forward vertical: buys a retailer/distributor.",
      "Conglomerate (diversification): joins unrelated industries to spread risk.",
      "Problems of growth: diseconomies of scale, cash-flow strain, loss of control, poor communication, culture clash.",
      "Franchising and licensing let a firm expand quickly with other people's capital.",
      "Globalisation and multinationals: bigger markets and cheaper labour, but exchange-rate risk, cultural differences and ethical scrutiny.",
      "Size can be measured by employees, revenue, market share or capital employed.",
      "Small firms survive through niche markets, personal service, flexibility and lower overheads.",
    ],
    terms: [
      { term: "Organic growth", def: "Growth from within the business, e.g. new products, new outlets or new markets." },
      { term: "Merger", def: "Two firms agree to join together to form a single new business." },
      { term: "Takeover", def: "One firm buys enough shares in another to gain control of it." },
      { term: "Horizontal integration", def: "Joining with a firm at the same stage of production in the same industry." },
      { term: "Vertical integration", def: "Joining with a firm at a different stage of the supply chain (backward = supplier, forward = customer)." },
      { term: "Diversification", def: "Moving into new products or markets to spread risk." },
      { term: "Multinational", def: "A business with operations in more than one country." },
    ],
    redFlags: [
      "Treating a merger and a takeover as the same thing. A merger is agreed; a takeover is a purchase.",
      "Assuming growth is always good. Evaluation needs risk, cash flow and loss of control.",
      "Naming 'vertical integration' without saying forwards or backwards, and with no case link.",
    ],
    applications: [
      {
        title: "Juice maker buys the bottle plant",
        concept: "Backward vertical integration",
        scenario:
          "A soft-drink producer buys its glass-bottle supplier to secure supply and cut costs. Control of an input is the gain; running an unfamiliar business is the risk.",
        tip: "Use: 'Buying its supplier is backward vertical integration, which secures supply and reduces costs, but the firm may lack skills in glass-making.'",
      },
      {
        title: "Supermarket takeover",
        concept: "Horizontal takeover",
        scenario:
          "A large chain buys a rival with 30 stores. Combined buying power wins bigger supplier discounts, yet merging store cultures and brands is difficult.",
        tip: "Quote the benefit AND the cost: 'Economies of scale through bulk buying, but culture clash could lower staff morale.'",
      },
    ],
  },
];
