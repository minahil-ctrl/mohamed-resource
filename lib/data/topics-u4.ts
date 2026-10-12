import type { Topic } from "../types";

export const topicsU4: Topic[] = [
  {
    id: "u4-production",
    code: "4.1",
    title: "Production Methods",
    blurb: "Job, batch and flow production, plus automation and lean ideas.",
    points: [
      "Job production: one-off, made to order. Flexible and high quality, but slow, skilled and costly per unit.",
      "Batch production: groups of identical items, then switch. Flexible and some economies, but downtime between batches and stock builds up.",
      "Flow (mass) production: continuous, standardised output. Very low unit cost at high volume, but heavy setup cost and inflexible.",
      "Choice depends on demand level, product type, capital available, skills and variety needed.",
      "Labour-intensive methods use many workers; capital-intensive methods rely on machines.",
      "Mechanisation = machines assist workers. Automation = machines do the work with little human input.",
      "Automation benefits: consistency, speed, lower long-run unit cost. Drawbacks: expensive, redundancies, breakdowns.",
      "Lean production cuts waste of time, space and stock (just-in-time, continuous improvement, cell production).",
      "Productivity measures efficiency: output per worker or per machine in a given period.",
    ],
    terms: [
      { term: "Job production", def: "Making a single, unique product to a customer's specification." },
      { term: "Batch production", def: "Making a limited number of identical products in groups before switching to another product." },
      { term: "Flow production", def: "Continuous production of standardised products on an assembly line." },
      { term: "Automation", def: "Using machines and technology to perform tasks with little human intervention." },
      { term: "Mechanisation", def: "Using machines to assist or replace manual tasks." },
      { term: "Lean production", def: "Production methods designed to minimise waste of time, resources and stock." },
      { term: "Capital-intensive", def: "Production that relies mainly on machinery and equipment rather than labour." },
      { term: "Labour-intensive", def: "Production that relies mainly on human labour rather than machinery." },
    ],
    formulas: [{ name: "Labour productivity", expr: "Output ÷ number of employees (per time period)" }],
    redFlags: [
      "Assuming flow production is always the best. Low demand or high variety makes it uneconomic.",
      "Mixing up automation (machine does it) with mechanisation (machine helps).",
      "Forgetting human costs: redundancy payments, retraining, and morale.",
    ],
    applications: [
      {
        title: "24/7 flow line for the core biscuit",
        concept: "Flow production",
        scenario:
          "Golden Crust runs its best-selling digestive on a continuous line, making millions per week at tiny unit cost. Switching to a new recipe means stopping the line.",
        tip: "Use volume: 'High, steady demand justifies flow production's setup cost because unit costs fall.'",
      },
      {
        title: "Celebration cake orders",
        concept: "Job production",
        scenario:
          "A bakery makes a three-tier wedding cake to a customer's design. It is unique, premium priced and labour-intensive.",
        tip: "Justify choice: 'Each cake is different, so job production delivers customisation that justifies a high price.'",
      },
    ],
  },
  {
    id: "u4-scale",
    code: "4.2",
    title: "Costs, Scale & Efficiency",
    blurb: "Fixed and variable costs, economies of scale and capacity.",
    points: [
      "Fixed costs do not change with output (rent, salaries, insurance). Variable costs rise with output (materials, packaging).",
      "Total costs = fixed costs + variable costs. Average cost per unit = total costs ÷ output.",
      "Economies of scale: lower average cost as output increases.",
      "Types: purchasing (bulk discounts), technical (bigger, efficient machines), financial (cheaper loans), managerial (specialists), marketing (spreading ad costs).",
      "Diseconomies of scale: average costs rise when a firm gets too big, due to poor communication, low morale and slow decisions.",
      "Capacity utilisation = actual output ÷ maximum possible output. Low utilisation raises average cost per unit.",
      "Raise productivity through training, better technology, motivation and better layout.",
      "Outsourcing contracts out a function (e.g. delivery). It cuts cost and brings expertise but reduces control.",
      "Efficiency is about getting more output from the same inputs, or the same output from fewer inputs.",
    ],
    terms: [
      { term: "Fixed costs", def: "Costs that do not vary with the level of output in the short term." },
      { term: "Variable costs", def: "Costs that change directly with the level of output." },
      { term: "Average cost", def: "Total costs divided by the number of units produced." },
      { term: "Economies of scale", def: "Reductions in average cost as the scale of production increases." },
      { term: "Diseconomies of scale", def: "Increases in average cost when a firm becomes too large." },
      { term: "Capacity utilisation", def: "The proportion of maximum potential output that is actually being produced." },
      { term: "Outsourcing", def: "Contracting an external firm to carry out part of the business's operations." },
    ],
    formulas: [
      { name: "Total costs", expr: "Fixed costs + variable costs" },
      { name: "Average cost", expr: "Total costs ÷ output" },
      { name: "Capacity utilisation (%)", expr: "(Actual output ÷ maximum possible output) × 100" },
    ],
    redFlags: [
      "Calling a bulk-buy discount a 'fixed cost saving'. It is a purchasing economy lowering variable cost per unit.",
      "Saying 'costs rise because output rises' without separating total cost (rises) from average cost (may fall).",
      "Dropping units in calculations: always show $ per unit, or % where asked.",
    ],
    applications: [
      {
        title: "A million-carton order",
        concept: "Purchasing economies",
        scenario:
          "A supermarket negotiates a 20% discount by ordering 1m cartons, lowering cost per carton and widening profit margin.",
        tip: "Specify the economy type: 'Bulk-buying lowers the cost of each carton, which is a purchasing economy of scale.'",
      },
      {
        title: "Half-empty factory",
        concept: "Capacity utilisation",
        scenario:
          "A plant able to make 100,000 packs/month makes only 55,000. Rent and machine costs are spread over fewer packs, so average cost is high.",
        tip: "Calculate: 'Capacity utilisation = 55%, so fixed costs per pack are almost twice what they could be.'",
      },
    ],
  },
  {
    id: "u4-quality",
    code: "4.3",
    title: "Quality & Customer Service",
    blurb: "Getting it right first time and keeping customers happy.",
    points: [
      "Quality means a product is fit for purpose and meets (or exceeds) customer expectations.",
      "Quality control: inspecting products during or after production to find defects. Catches errors but wastes materials.",
      "Quality assurance: preventing defects by building quality into every stage (standards, training, supplier checks).",
      "Total Quality Management (TQM): every employee is responsible for quality at every stage.",
      "Quality circles: small groups of workers who meet to suggest improvements. Benchmarking compares against the best.",
      "Benefits of high quality: stronger brand, fewer returns, premium prices, loyal customers, fewer legal claims.",
      "Costs of quality: training, inspection, better materials and slower production.",
      "Customer service: before-sale advice, during-sale friendliness, after-sale returns, warranties and helplines.",
      "Customer retention is cheaper than recruiting new customers; good service helps a retailer differentiate.",
      "Consumer law requires goods to be of satisfactory quality and as described.",
    ],
    terms: [
      { term: "Quality control", def: "Checking products against a standard to find and remove defects." },
      { term: "Quality assurance", def: "A system of preventing defects by controlling all stages of production." },
      { term: "TQM", def: "Total Quality Management: a culture where every employee takes responsibility for quality." },
      { term: "Benchmarking", def: "Comparing performance against the best in the industry to find improvements." },
      { term: "Quality circle", def: "A group of employees who meet regularly to discuss ways to improve quality." },
      { term: "After-sales service", def: "Support provided after purchase, e.g. returns, repairs or warranties." },
      { term: "Customer retention", def: "Keeping existing customers buying from the business." },
      { term: "Fit for purpose", def: "A product does the job it was designed to do." },
    ],
    redFlags: [
      "Treating quality control and quality assurance as the same. Control = checking AFTER; assurance = preventing BEFORE.",
      "Saying 'quality is expensive' without weighing the cost of failure: recalls, returns, damaged reputation.",
      "Forgetting that customer service is a major point of difference for retailers.",
    ],
    applications: [
      {
        title: "Crisp bag weight checks",
        concept: "Quality control vs assurance",
        scenario:
          "Inspectors weigh a sample of bags each hour (control), while temperature logs and supplier audits prevent faults arising (assurance).",
        tip: "Contrast them: 'Inspection spots faults after they occur; assurance stops them happening.'",
      },
      {
        title: "Product recall",
        concept: "Cost of poor quality",
        scenario:
          "A contaminated batch of juice triggers a national recall. Refunds, disposal and lost trust cost far more than extra testing would have.",
        tip: "Use cost-benefit: 'The cost of testing is small compared with recall and reputational damage.'",
      },
    ],
  },
  {
    id: "u4-supply",
    code: "4.4",
    title: "Supply Chain & Stock Control",
    blurb: "Procurement, buffers, reorder levels and just-in-time.",
    points: [
      "Procurement: choosing suppliers by price, quality, reliability, delivery speed, payment terms and ethics.",
      "Supply chain: the sequence from raw materials through production and distribution to the customer.",
      "Stock types: raw materials, work-in-progress and finished goods.",
      "Buffer stock is a minimum safety stock kept to avoid running out. Reorder level triggers a new order. Lead time is the wait for delivery.",
      "Stock holding costs: storage, insurance, security, spoilage and cash tied up. Stock-outs mean lost sales and unhappy customers.",
      "Just-in-time (JIT): materials arrive exactly when needed. Cuts holding costs and waste but needs reliable suppliers; a delay stops production.",
      "Just-in-case: hold large stock to guard against disruption. Safe but costly.",
      "Perishable goods (dairy, bread) need small, frequent deliveries.",
      "Bulk-buying earns discounts but increases storage cost and cash outflow up front.",
      "Ethical sourcing and supplier relationships affect reputation and reliability.",
    ],
    terms: [
      { term: "Procurement", def: "The process of purchasing goods and services from suppliers." },
      { term: "Buffer stock", def: "The minimum stock kept to prevent production or sales stopping if deliveries are late." },
      { term: "Reorder level", def: "The stock level at which a new order is placed with the supplier." },
      { term: "Lead time", def: "The time between placing an order and receiving it." },
      { term: "Just-in-time (JIT)", def: "A system where stock arrives just as it is needed in production, keeping stock low." },
      { term: "Just-in-case", def: "Holding extra stock in case of delivery delays or demand surges." },
      { term: "Stock-out", def: "Running out of an item so customers cannot buy it." },
    ],
    formulas: [
      {
        name: "Reorder level (textbook form)",
        expr: "Usage per day × lead time (in days) + buffer stock",
        note: "Edexcel rarely asks you to calculate it; know what it means.",
      },
    ],
    redFlags: [
      "Recommending JIT for perishable or unreliable-supplier situations without discussing the risk.",
      "Not linking stock decisions to cash flow. Held stock is cash tied up.",
      "Confusing buffer stock (the safety minimum) with reorder level (the trigger for a new order).",
    ],
    applications: [
      {
        title: "Daily milk deliveries",
        concept: "Perishable stock",
        scenario:
          "A convenience store takes small daily deliveries of fresh milk. It never holds more than a day or two, avoiding waste even if delivery costs are higher.",
        tip: "Link product to method: 'Short shelf life makes frequent small deliveries the sensible approach.'",
      },
      {
        title: "Rice mill buffer",
        concept: "Buffer stock",
        scenario:
          "A rice mill keeps a buffer equal to three weeks' output so a poor harvest or flooded road does not stop production.",
        tip: "Quantify the risk: 'The buffer protects against supply delays but ties up cash and storage space.'",
      },
    ],
  },
  {
    id: "u4-location",
    code: "4.5",
    title: "Location, Technology & E-commerce",
    blurb: "Where to operate, and how technology changes operations.",
    points: [
      "Location factors: proximity to market, raw materials, labour skills and cost, transport links, rent/rates, incentives, competitors and room to expand.",
      "Retailers prioritise footfall, visibility and parking. Manufacturers prioritise costs, transport and labour.",
      "Offshoring moves operations abroad for cheaper labour or materials, but adds transport, communication and ethical risk.",
      "Technology: CAD/CAM, EPOS, barcodes/RFID, ERP and data analytics help control stock, quality and cost.",
      "E-commerce lets businesses sell 24/7 with lower premises costs, but needs delivery systems and strong IT security.",
      "Planning permission and environmental laws limit where and how firms can operate.",
      "Clusters of similar firms share suppliers, skilled labour and infrastructure.",
      "Sustainable operations: recycling, energy saving, and cutting transport miles reduce cost and improve image.",
      "A location decision is a long-term, expensive choice that is hard to reverse.",
    ],
    terms: [
      { term: "Footfall", def: "The number of people passing or entering a retail location." },
      { term: "Offshoring", def: "Moving business operations to another country, usually to cut costs." },
      { term: "EPOS", def: "Electronic Point of Sale: a till system that records sales and updates stock automatically." },
      { term: "CAD", def: "Computer-aided design: using software to design products." },
      { term: "E-commerce", def: "Selling goods and services over the internet." },
      { term: "Planning permission", def: "Official permission needed before building or changing the use of premises." },
      { term: "Infrastructure", def: "Roads, rail, ports, power and broadband that support business activity." },
      { term: "Cluster", def: "A geographic concentration of firms in the same industry." },
    ],
    redFlags: [
      "Listing location factors without ranking them or tying them to the case (retail vs manufacturing).",
      "Saying 'cheap labour' as the reason to locate a local retail outlet. It is relevant to manufacturing, not footfall.",
      "Claiming technology 'saves time' with no specific benefit (fewer stock-outs, fewer errors) or cost (set-up, training).",
    ],
    applications: [
      {
        title: "Store by the bus terminal",
        concept: "Retail location",
        scenario:
          "A convenience store opens beside a busy bus terminal. Rent is high, but constant footfall delivers daily sales.",
        tip: "Justify with the business type: 'For retail, footfall matters more than low rent.'",
      },
      {
        title: "EPOS-triggered restocking",
        concept: "Technology",
        scenario:
          "Each scanned item updates stock data and triggers orders automatically, cutting stock-outs and staff time in a supermarket chain.",
        tip: "Use cause and effect: 'EPOS gives real-time stock data, so shelves are refilled before they empty.'",
      },
    ],
  },
];
