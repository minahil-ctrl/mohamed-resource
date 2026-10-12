import type { MCQ, UnitId } from "../types";

export type Row = [topic: string, q: string, opts: [string, string, string, string], ans: 0 | 1 | 2 | 3, why: [string, string, string, string]];

/**
 * Builds MCQs and rotates the option order deterministically so that the correct
 * answer is spread evenly across A-D (avoids a predictable answer key).
 */
export function mk(unit: UnitId, rows: Row[]): MCQ[] {
  return rows.map((r, i) => {
    const k = (i * 3 + (i >> 2)) % 4;
    const rot = <T,>(arr: T[]): T[] => arr.map((_, j) => arr[(j - k + 4) % 4]);
    return {
      id: `${unit}-q${i + 1}`,
      unit,
      topic: r[0],
      q: r[1],
      options: rot([...r[2]]) as MCQ["options"],
      answer: ((r[3] + k) % 4) as MCQ["answer"],
      why: rot([...r[4]]) as MCQ["why"],
    };
  });
}

export const mcqU1: MCQ[] = mk("u1", [
  [
    "u1-enterprise",
    "Which statement best defines an entrepreneur?",
    ["Anyone who owns shares in a company", "A person who takes risks to set up and organise a business aiming for profit", "A manager employed by a large company", "A person who works for the government"],
    1,
    [
      "Wrong: owning shares makes someone a shareholder, not necessarily an entrepreneur.",
      "Correct: an entrepreneur takes a risk, organises resources and aims to make a profit.",
      "Wrong: employed managers do not take the financial risk of starting the business.",
      "Wrong: public-sector workers do not set up risk-bearing enterprises for profit.",
    ],
  ],
  [
    "u1-enterprise",
    "A bottle of juice costs $0.40 in ingredients and sells for $2.50. What is the added value?",
    ["$0.40", "$2.10", "$2.50", "$2.90"],
    1,
    [
      "Wrong: this is the cost of inputs, not the value added.",
      "Correct: added value = selling price − cost of inputs = $2.50 − $0.40 = $2.10.",
      "Wrong: this is the selling price only.",
      "Wrong: this adds the cost to the price, which makes no sense for added value.",
    ],
  ],
  [
    "u1-enterprise",
    "Which is the best example of a business spotting a gap in the market?",
    ["Copying a rival's product exactly", "Selling single-use shampoo sachets to customers who cannot afford a bottle", "Moving the head office to a larger building", "Paying staff a higher wage"],
    1,
    [
      "Wrong: copying a rival fills no new gap; it adds competition.",
      "Correct: it meets an unserved need (affordability), creating a new market.",
      "Wrong: this is an internal decision, not a market opportunity.",
      "Wrong: pay is an HR decision unrelated to identifying a market gap.",
    ],
  ],
  [
    "u1-enterprise",
    "The next best alternative given up when a choice is made is called:",
    ["Added value", "Sunk cost", "Opportunity cost", "Fixed cost"],
    2,
    [
      "Wrong: added value is selling price minus the cost of inputs.",
      "Wrong: sunk costs are costs already spent and cannot be recovered.",
      "Correct: opportunity cost is the value of the next best option forgone.",
      "Wrong: fixed costs do not vary with output.",
    ],
  ],
  [
    "u1-ownership",
    "Which business type has unlimited liability?",
    ["Public limited company", "Private limited company", "Sole trader", "Franchise company with limited status"],
    2,
    [
      "Wrong: plc shareholders have limited liability.",
      "Wrong: Ltd shareholders also have limited liability.",
      "Correct: a sole trader's personal assets can be used to pay business debts.",
      "Wrong: a franchisee that is a limited company has limited liability.",
    ],
  ],
  [
    "u1-ownership",
    "What is a key difference between a private limited company (Ltd) and a public limited company (plc)?",
    ["Only a plc has limited liability", "A plc can sell shares to the public on the stock exchange", "A Ltd must have more than 100 employees", "A Ltd cannot make a profit"],
    1,
    [
      "Wrong: both have limited liability.",
      "Correct: plc shares are traded publicly; Ltd shares are sold privately.",
      "Wrong: there is no minimum employee requirement for a Ltd.",
      "Wrong: a Ltd can and usually does make profit.",
    ],
  ],
  [
    "u1-ownership",
    "Which is an advantage of buying a franchise?",
    ["Complete freedom to change the product", "No fees to the franchisor", "An established brand and proven business model", "All profits go to the franchisee"],
    2,
    [
      "Wrong: franchisees must follow the franchisor's rules.",
      "Wrong: franchisees pay an upfront fee and royalties.",
      "Correct: brand recognition and a tested system lower risk.",
      "Wrong: a share of revenue or profit goes to the franchisor.",
    ],
  ],
  [
    "u1-ownership",
    "A group with an interest in a business but who does NOT own it, such as a local community, is called a:",
    ["Shareholder", "Stakeholder", "Franchisor", "Partner"],
    1,
    [
      "Wrong: shareholders own part of the company.",
      "Correct: stakeholders are anyone affected by or interested in the business.",
      "Wrong: a franchisor licenses its brand to others.",
      "Wrong: partners co-own an unincorporated business.",
    ],
  ],
  [
    "u1-ownership",
    "Which is a SMART objective?",
    ["Make more money", "Be the best", "Increase market share from 12% to 15% within 18 months", "Grow in the future"],
    2,
    [
      "Wrong: vague and unmeasurable.",
      "Wrong: not specific or measurable.",
      "Correct: it is specific, measurable, time-bound and realistic.",
      "Wrong: no measure and no time frame.",
    ],
  ],
  [
    "u1-markets",
    "What happens to the equilibrium price if demand rises and supply stays the same?",
    ["Price falls", "Price rises", "Price stays the same", "Quantity falls"],
    1,
    [
      "Wrong: higher demand creates a shortage at the old price, pushing price up.",
      "Correct: demand shifts right, so equilibrium price and quantity both rise.",
      "Wrong: a shift in demand moves the equilibrium.",
      "Wrong: the equilibrium quantity rises, not falls.",
    ],
  ],
  [
    "u1-markets",
    "Which factor would shift the SUPPLY curve of biscuits to the left?",
    ["A fall in the price of biscuits", "A rise in the price of sugar", "A successful advert", "Higher consumer income"],
    1,
    [
      "Wrong: a price change causes a movement along the curve, not a shift.",
      "Correct: higher input costs reduce supply at every price.",
      "Wrong: advertising shifts demand, not supply.",
      "Wrong: income shifts demand, not supply.",
    ],
  ],
  [
    "u1-markets",
    "At a price above equilibrium, there is a:",
    ["Shortage", "Surplus", "Monopoly", "Perfect balance"],
    1,
    [
      "Wrong: shortages occur below equilibrium.",
      "Correct: quantity supplied exceeds quantity demanded, so price tends to fall.",
      "Wrong: a monopoly is a market structure, not a price outcome.",
      "Wrong: balance occurs only at equilibrium.",
    ],
  ],
  [
    "u1-markets",
    "Tea and coffee are substitutes. If the price of coffee rises, demand for tea will most likely:",
    ["Fall", "Stay the same", "Rise", "Become zero"],
    2,
    [
      "Wrong: this would be true for complements, not substitutes.",
      "Wrong: customers switch when substitutes become more expensive.",
      "Correct: some coffee drinkers switch to the cheaper alternative, so demand for tea rises.",
      "Wrong: demand would not disappear.",
    ],
  ],
  [
    "u1-external",
    "A rise in interest rates is most likely to:",
    ["Reduce the cost of borrowing for firms", "Increase the cost of loans and reduce consumer spending on credit", "Make imports cheaper", "Increase exports"],
    1,
    [
      "Wrong: higher rates raise borrowing costs.",
      "Correct: loans and credit become dearer, so firms and customers spend less.",
      "Wrong: exchange rates affect import prices, not directly interest rates in this way.",
      "Wrong: no direct effect on exports is implied; a stronger currency may actually hurt exports.",
    ],
  ],
  [
    "u1-external",
    "A UK exporter sells goods abroad. If sterling becomes stronger, the exporter will most likely find that:",
    ["Its goods become cheaper abroad", "Its goods become more expensive abroad", "Its costs fall to zero", "Nothing changes"],
    1,
    [
      "Wrong: a stronger currency makes goods dearer for foreign buyers.",
      "Correct: foreign customers need more of their own currency to buy the goods.",
      "Wrong: costs do not fall to zero.",
      "Wrong: exchange rate changes affect competitiveness.",
    ],
  ],
  [
    "u1-external",
    "Which is an example of legislation affecting business?",
    ["A new competitor opening nearby", "A rise in the national minimum wage", "A customer complaint", "Bad weather"],
    1,
    [
      "Wrong: competition is a market force, not a law.",
      "Correct: minimum wage is set by law and employers must comply.",
      "Wrong: complaints are customer feedback, not legislation.",
      "Wrong: weather is an environmental event, not a law.",
    ],
  ],
  [
    "u1-external",
    "Which is a likely disadvantage of operating ethically (e.g. paying suppliers fairly)?",
    ["Damaged reputation", "Higher costs", "Lower customer loyalty", "More boycotts"],
    1,
    [
      "Wrong: ethical behaviour usually improves reputation.",
      "Correct: fair pay and ethical sourcing often cost more.",
      "Wrong: ethics typically builds loyalty.",
      "Wrong: unethical behaviour is more likely to trigger boycotts.",
    ],
  ],
  [
    "u1-growth",
    "A firm buys its main supplier. This is:",
    ["Horizontal integration", "Backward vertical integration", "Forward vertical integration", "Organic growth"],
    1,
    [
      "Wrong: horizontal means joining a firm at the same stage in the same industry.",
      "Correct: moving back to an earlier stage of the supply chain (supplier).",
      "Wrong: forward would mean buying a distributor or retailer.",
      "Wrong: organic growth comes from within, not by buying another firm.",
    ],
  ],
  [
    "u1-growth",
    "What is the difference between a merger and a takeover?",
    ["There is no difference", "A merger is agreed by both firms; a takeover is where one firm buys control of another", "A takeover always results in a new firm name", "Mergers only happen between plcs"],
    1,
    [
      "Wrong: they are distinct forms of external growth.",
      "Correct: mergers are mutually agreed; takeovers involve one firm acquiring another, sometimes against its wishes.",
      "Wrong: a new name may appear after a merger, not necessarily a takeover.",
      "Wrong: mergers may involve firms of various legal forms.",
    ],
  ],
  [
    "u1-growth",
    "Which is a likely PROBLEM of rapid business growth?",
    ["Lower costs per unit always", "Diseconomies of scale and cash-flow strain", "Guaranteed higher profit", "Less competition"],
    1,
    [
      "Wrong: costs may fall (economies of scale) but not always.",
      "Correct: poor communication, loss of control and funding growth can strain cash.",
      "Wrong: growth does not guarantee profit.",
      "Wrong: growth does not remove competitors.",
    ],
  ],
]);
