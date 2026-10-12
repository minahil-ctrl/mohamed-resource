import type { Topic } from "../types";

export const topicsU3: Topic[] = [
  {
    id: "u3-research",
    code: "3.1",
    title: "Market Research & Segmentation",
    blurb: "Finding out what customers want before spending money.",
    points: [
      "Purpose: reduce risk, identify customer needs, estimate market size, test products and prices before launch.",
      "Primary (field) research: surveys, questionnaires, interviews, focus groups, observation, test marketing. Up to date and specific, but slow and costly.",
      "Secondary (desk) research: internet, government statistics, trade reports, competitor accounts. Cheap and quick, but may be outdated or not specific.",
      "Quantitative data is numerical (how many?); qualitative data is opinions and reasons (why?).",
      "Sampling: a small group represents the target market. Bigger and better-chosen samples are more reliable. Bias reduces accuracy.",
      "Segmentation splits a market by age, gender, income, location or lifestyle so the mix can be targeted.",
      "Niche market = small specialised segment. Mass market = large general market.",
      "Market size, market share and market growth help firms judge where they stand.",
      "Limitations of research: biased questions, small samples, customers say one thing and do another.",
    ],
    terms: [
      { term: "Primary research", def: "New data collected first-hand for a specific purpose, e.g. surveys and focus groups." },
      { term: "Secondary research", def: "Using data that already exists, collected by someone else for another purpose." },
      { term: "Qualitative data", def: "Non-numerical data about opinions, feelings and reasons." },
      { term: "Quantitative data", def: "Numerical data that can be counted and statistically analysed." },
      { term: "Sample", def: "A smaller group chosen to represent the whole target population." },
      { term: "Market segment", def: "A group of customers with shared characteristics, e.g. age, income or lifestyle." },
      { term: "Market share", def: "A firm's sales as a percentage of total sales in the market." },
      { term: "Niche market", def: "A small, specialised part of a larger market." },
    ],
    formulas: [
      { name: "Market share (%)", expr: "(Firm's sales ÷ total market sales) × 100" },
      { name: "Market growth (%)", expr: "(Change in market size ÷ original market size) × 100" },
    ],
    redFlags: [
      "Saying primary research is 'always better'. Secondary may be perfectly adequate for a low-budget local business.",
      "Swapping primary and secondary. Secondary = data that ALREADY exists and was gathered by others.",
      "Forgetting to link the sample to the target market (e.g. surveying adults for a teen energy drink).",
    ],
    applications: [
      {
        title: "In-store taste test",
        concept: "Primary, qualitative research",
        scenario:
          "Zing Drinks hands out 300 samples of Zing Zero in supermarkets and records opinions. The feedback is detailed but the sample is small.",
        tip: "Spell out both sides: 'Taste tests give rich qualitative feedback, but 300 people may not represent the full market.'",
      },
      {
        title: "Loyalty-card data",
        concept: "Secondary data, segmentation",
        scenario:
          "A supermarket analyses loyalty-card receipts and sees young families buy 6-packs while students buy single cans, so it targets each group separately.",
        tip: "Mention segmentation: 'Spending data lets the firm segment by household type and target offers.'",
      },
    ],
  },
  {
    id: "u3-product",
    code: "3.2",
    title: "Product: Life Cycle & Portfolio",
    blurb: "Design, brand, the product life cycle and the Boston Matrix.",
    points: [
      "A product combines features: design, quality, brand, packaging and a unique selling point (USP).",
      "Branding builds recognition and loyalty and lets a firm charge a premium price.",
      "Product life cycle (PLC) stages: development, introduction, growth, maturity, decline.",
      "Introduction: low sales, high promotion costs, losses. Growth: sales and profits rise fast. Maturity: sales peak and flatten. Decline: sales fall.",
      "Extension strategies slow decline: new packaging, new flavours, new markets, new uses, price cuts or promotion.",
      "Boston Matrix classifies products by market growth and relative market share: Stars, Cash Cows, Question Marks, Dogs.",
      "Strategy: invest in Stars, 'milk' Cash Cows to fund Question Marks, decide on Question Marks, consider selling or dropping Dogs.",
      "Product portfolio balance matters: today's cash cows pay for tomorrow's stars.",
      "New product development: idea, research, design/prototype, test marketing, launch. Many ideas fail.",
      "Differentiation (USP) helps a product stand out and avoid pure price competition.",
    ],
    terms: [
      { term: "USP", def: "Unique Selling Point: a feature that makes a product different from competitors' products." },
      { term: "Brand", def: "A name, symbol or design that identifies a product and distinguishes it from rivals." },
      { term: "Product life cycle", def: "The stages a product goes through from development to decline." },
      { term: "Extension strategy", def: "Action taken to lengthen the life of a product and avoid decline." },
      { term: "Product portfolio", def: "The range of products a business sells." },
      { term: "Boston Matrix", def: "A model that analyses a product portfolio by market growth and relative market share." },
      { term: "Cash cow", def: "A product with high market share in a low-growth market; earns more cash than it needs." },
      { term: "Star", def: "A product with high share in a fast-growing market; needs investment but promises future profit." },
      { term: "Question mark", def: "A product with low share in a fast-growing market; may become a star or a dog." },
    ],
    redFlags: [
      "Assuming every product follows the same PLC length. Fashion items rise and fall in months; staples last decades.",
      "Claiming 'Dogs must always be dropped'. A dog may support other products or still earn small profit.",
      "Saying cash cows have 'low profit'. They have HIGH profit and LOW growth.",
      "Mislabelling PLC axes (sales vs time) or showing profit peaking in decline.",
    ],
    applications: [
      {
        title: "Instant noodles in maturity",
        concept: "Extension strategy",
        scenario:
          "A leading noodle brand has flat sales. It launches a spicy masala flavour and a cup-pack version to refresh interest, extending the life cycle.",
        tip: "Name the stage: 'The product is in maturity, so a new flavour acts as an extension strategy to avoid decline.'",
      },
      {
        title: "Classic Cola funds Zing Zero",
        concept: "Boston Matrix",
        scenario:
          "A cola leader in a slow market is a cash cow. Its profit pays for advertising Zing Zero, a question mark in the fast-growing sugar-free market.",
        tip: "Show the flow: 'Cash from the cash cow funds the question mark, which may become a star.'",
      },
    ],
    graphs: ["plc", "boston"],
  },
  {
    id: "u3-price",
    code: "3.3",
    title: "Price",
    blurb: "Choosing a pricing strategy that fits the product and the market.",
    points: [
      "Factors affecting price: costs, competitors' prices, demand, brand image, target market and business objectives.",
      "Cost-plus pricing: unit cost plus a percentage mark-up. Simple and covers costs, but ignores competitors and demand.",
      "Penetration pricing: low price at launch to win market share. Good for new FMCG; risks low profit and hard to raise later.",
      "Price skimming: high price at launch for early adopters, then lowered. Good for new or premium products; risks attracting competitors.",
      "Competitive pricing: matching rivals' prices. Safe, but leaves little room to differentiate.",
      "Psychological pricing: e.g. $9.99 appears cheaper than $10. Promotional pricing: temporary discounts, BOGOF.",
      "Loss leader: a product sold below cost to draw customers into the shop who then buy other items.",
      "Price must cover variable costs at least in the short run, and all costs in the long run.",
      "Price and other mix elements must be consistent. A luxury brand cannot compete only on low price.",
    ],
    terms: [
      { term: "Cost-plus pricing", def: "Setting price by adding a fixed percentage mark-up to the unit cost." },
      { term: "Penetration pricing", def: "Setting a low initial price to gain market share quickly." },
      { term: "Price skimming", def: "Charging a high initial price for a new product, then lowering it over time." },
      { term: "Competitive pricing", def: "Setting prices at or near those of competitors." },
      { term: "Psychological pricing", def: "Pricing just below a round number, e.g. $4.99, to make it seem cheaper." },
      { term: "Loss leader", def: "A product sold below cost to attract customers who buy other products." },
      { term: "Mark-up", def: "The amount or percentage added to the cost of a product to give the selling price." },
      { term: "Promotional pricing", def: "Temporary price reductions or deals used to boost sales." },
    ],
    formulas: [
      { name: "Selling price (cost-plus)", expr: "Unit cost + mark-up" },
      { name: "Mark-up (%)", expr: "(Profit per unit ÷ cost per unit) × 100" },
      { name: "Profit margin (%)", expr: "(Profit per unit ÷ selling price) × 100", note: "Different denominator from mark-up: do not mix them up." },
    ],
    redFlags: [
      "Confusing mark-up (profit ÷ COST) with profit margin (profit ÷ SELLING PRICE).",
      "Recommending penetration pricing without mentioning lower profit and the difficulty of raising prices later.",
      "Forgetting that price must at least cover variable cost. Selling below it increases losses on every unit.",
    ],
    applications: [
      {
        title: "Cooking oil loss leader",
        concept: "Loss leader",
        scenario:
          "A supermarket sells 1-litre cooking oil below cost on a weekend to draw crowds, hoping shoppers also buy rice, flour and drinks at normal margins.",
        tip: "Always justify: 'The loss on oil is outweighed by profit on the extra items customers buy.'",
      },
      {
        title: "Zing Zero launch",
        concept: "Penetration pricing",
        scenario:
          "Zing Drinks launches its sugar-free can at a price below premium rivals to win trial among 16-25 year olds, planning a price rise once loyalty is built.",
        tip: "Two-sided: 'Penetration builds share fast, but profit per can is low, and customers may resist later price rises.'",
      },
    ],
  },
  {
    id: "u3-promotion",
    code: "3.4",
    title: "Promotion",
    blurb: "Informing, persuading and reminding customers.",
    points: [
      "Aims: inform, persuade and remind; raise brand awareness; increase sales and market share.",
      "Advertising: TV, radio, print, online, social media, billboards. Wide reach but costly; some forms are easily ignored.",
      "Sales promotion: BOGOF, discounts, coupons, free samples, loyalty cards, competitions. Quick sales boost, but profit per unit drops.",
      "Public relations: press releases, events, sponsorship. Credible and cheap, but outside the firm's full control.",
      "Direct marketing and personal selling: tailored messages to individuals. Effective for high-value or complex sales, but labour-intensive.",
      "Social media and influencers: targeted, cheap and shareable, but can attract negative viral comments.",
      "Above-the-line = paid mass media. Below-the-line = promotions the firm controls directly.",
      "Choose methods by budget, target market, product, competitors and objectives.",
      "Legal and ethical limits: truthful ads, protections for children, advertising codes.",
    ],
    terms: [
      { term: "Advertising", def: "Paid communication through media to inform or persuade customers." },
      { term: "Sales promotion", def: "Short-term incentives, such as discounts or free gifts, used to boost sales." },
      { term: "Public relations", def: "Building a positive image through press coverage and events without directly paying for ads." },
      { term: "Sponsorship", def: "Paying to have a brand associated with an event, team or person." },
      { term: "Loyalty scheme", def: "A reward programme encouraging customers to keep buying from one business." },
      { term: "Brand awareness", def: "How well customers recognise and recall a brand." },
      { term: "Direct marketing", def: "Communicating directly with individual customers, e.g. email or text offers." },
    ],
    redFlags: [
      "Naming promotion methods without matching them to the target market, product or budget.",
      "Saying 'social media is free'. It costs staff time and often paid advertising to reach people.",
      "Ignoring legal and ethical issues, especially when marketing sugary products to children.",
    ],
    applications: [
      {
        title: "Free samples for a snack launch",
        concept: "Sales promotion",
        scenario:
          "Staff in the aisle hand out free tasters of a new spicy crisp. Trial rises sharply, though wastage and wages cut profit.",
        tip: "Link goal to method: 'Free samples encourage first purchase, essential for a brand with no awareness.'",
      },
      {
        title: "Influencer unboxing for Zing Zero",
        concept: "Social media marketing",
        scenario:
          "A 20-year-old creator unboxes Zing Zero to a million followers, matching the 16-25 target market at lower cost per view than TV.",
        tip: "Match to target market: 'Influencers reach teens where they already spend time, at a lower cost than TV.'",
      },
    ],
  },
  {
    id: "u3-place",
    code: "3.5",
    title: "Place & the Marketing Mix",
    blurb: "Getting products to customers, and making the 4Ps work together.",
    points: [
      "Place = how and where a product reaches the customer.",
      "Direct channel: producer sells directly to consumer (own shop, website). Retailer channel: producer sells via retailers. Wholesaler channel: producer to wholesaler to retailer to consumer.",
      "Wholesalers break bulk, store goods and supply many small retailers. Useful when thousands of small shops sell the product.",
      "Choose channel by product type (perishable needs short channel), customers, cost and control.",
      "E-commerce widens reach and cuts overheads, but adds delivery costs, security risks and removes personal service.",
      "The marketing mix: Product, Price, Promotion, Place (the 4Ps). They must fit the target market and each other.",
      "Marketing mix changes through the product life cycle: heavy promotion at launch, price competition at maturity.",
      "A marketing strategy combines objectives, segmentation and the mix to reach target customers.",
      "Integrated marketing means all four Ps send one consistent message.",
    ],
    terms: [
      { term: "Distribution channel", def: "The route a product takes from the producer to the final customer." },
      { term: "Wholesaler", def: "A business that buys in bulk from producers and sells smaller quantities to retailers." },
      { term: "Retailer", def: "A business that sells goods directly to the final consumer." },
      { term: "E-commerce", def: "Buying and selling goods and services online." },
      { term: "Marketing mix", def: "The combination of Product, Price, Promotion and Place used to market a product." },
      { term: "Break bulk", def: "Dividing large quantities of goods into smaller packs for retailers." },
      { term: "Integrated marketing", def: "Ensuring all elements of the mix work together to deliver a consistent message." },
    ],
    redFlags: [
      "Listing the 4Ps with no link to the case. Every P must be applied to the business in the question.",
      "Pairing mismatched mix elements, e.g. a luxury chocolate sold in discount stores with deep price cuts.",
      "Ignoring perishability. Fresh products need short, fast channels.",
    ],
    applications: [
      {
        title: "Fresh bread, short channel",
        concept: "Distribution channel",
        scenario:
          "A bakery delivers daily to 60 shops itself. A wholesaler would add days, and bread would go stale.",
        tip: "Tie channel to product: 'Because bread is perishable, a short channel delivers it fresh.'",
      },
      {
        title: "Tea and the small-shop network",
        concept: "Wholesaler",
        scenario:
          "A tea brand sells to thousands of tiny neighbourhood shops. Using wholesalers means the producer deals with 50 customers instead of 5,000.",
        tip: "Explain the role: 'Wholesalers break bulk and reach small retailers that the producer could not serve cost-effectively.'",
      },
    ],
  },
];
