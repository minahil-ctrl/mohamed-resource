import type { Topic } from "../types";

export const topicsU2: Topic[] = [
  {
    id: "u2-structure",
    code: "2.1",
    title: "Organisational Structures",
    blurb: "Tall vs flat, spans, chains of command and delegation.",
    points: [
      "An organisational structure shows roles, levels of authority and who reports to whom (the chain of command).",
      "Span of control = number of subordinates a manager directly supervises. Levels of hierarchy = number of layers.",
      "Tall structure: many layers, narrow span. Close supervision and clear promotion path, but slow communication and high management cost.",
      "Flat structure: few layers, wide span. Faster communication, cheaper, empowering, but managers are overloaded and promotion is limited.",
      "Delegation = passing authority for tasks down the hierarchy. It frees managers and motivates staff but risks errors.",
      "Centralised: key decisions made at the top (consistency, control). Decentralised: decisions made locally (faster, more motivating).",
      "Delayering removes layers of management to cut costs and speed communication, but can cause redundancies and overwork.",
      "Functional structures group staff by department: marketing, finance, operations, HR.",
      "The best structure depends on size, product, staff skill, and how quickly decisions must be taken.",
    ],
    terms: [
      { term: "Chain of command", def: "The line of authority through which instructions pass from top to bottom of the organisation." },
      { term: "Span of control", def: "The number of people directly managed by one manager." },
      { term: "Hierarchy", def: "The levels of authority in an organisation, from top management to operational staff." },
      { term: "Delegation", def: "Passing authority and responsibility for tasks to subordinates." },
      { term: "Delayering", def: "Removing one or more layers of management from the hierarchy." },
      { term: "Centralised", def: "Most decisions are taken by senior managers at the top of the business." },
      { term: "Decentralised", def: "Decision-making authority is spread to lower levels or local branches." },
    ],
    formulas: [{ name: "Span of control", expr: "Number of subordinates reporting directly to one manager" }],
    redFlags: [
      "Mixing up tall and flat. Tall = MANY layers and NARROW span; flat = FEW layers and WIDE span.",
      "Saying a flat structure is 'cheaper' without explaining why: fewer managers' salaries.",
      "Failing to recommend a structure suited to the size and skills in the case (evaluation).",
    ],
    applications: [
      {
        title: "FreshMart's slow price change",
        concept: "Tall hierarchy",
        scenario:
          "With eight layers between a shelf stacker and the CEO, a request to match a rival's price promotion takes three weeks to approve and the offer is missed.",
        tip: "Chain it: 'Eight layers slow communication, so FreshMart reacts late to competitors and loses sales.'",
      },
      {
        title: "Small café, flat structure",
        concept: "Wide span of control",
        scenario:
          "A café owner supervises six baristas directly. Decisions are instant and wages are low, but the owner cannot also run marketing.",
        tip: "Balance it: 'A wide span means quick decisions but a heavy workload for the owner.'",
      },
    ],
    graphs: ["org"],
  },
  {
    id: "u2-recruit",
    code: "2.2",
    title: "Recruitment & Selection",
    blurb: "Finding, choosing and hiring the right people.",
    points: [
      "Process: identify vacancy, job description, person specification, advertise, shortlist, interview/test, select, offer, induct.",
      "Job description = the job (title, duties, responsibilities). Person specification = the ideal person (skills, qualifications, experience).",
      "Internal recruitment: cheaper, quicker, known staff, motivating. But limited choice, no new ideas, and creates another vacancy.",
      "External recruitment: wider pool and fresh ideas. But slower, costlier and riskier.",
      "Advertising routes: online job boards, social media, newspapers, recruitment agencies, job centres, word of mouth.",
      "Selection tools: application form, CV, interview, aptitude/skills tests, references, assessment centres.",
      "Full-time vs part-time vs temporary: part-time gives flexibility at peak times; temporary suits seasonal demand.",
      "Poor recruitment causes wasted training, low motivation and high labour turnover.",
      "Employment law shapes hiring: contracts, equal opportunities and minimum wage.",
    ],
    terms: [
      { term: "Job description", def: "A document listing the title, duties and responsibilities of a particular job." },
      { term: "Person specification", def: "A profile of the skills, qualifications, experience and qualities needed for a job." },
      { term: "Internal recruitment", def: "Filling a vacancy with someone already working for the business." },
      { term: "External recruitment", def: "Filling a vacancy with someone from outside the business." },
      { term: "Labour turnover", def: "The rate at which employees leave a business, shown as a % of the average workforce." },
      { term: "Induction", def: "Introductory training that helps new employees settle into the organisation." },
      { term: "Shortlist", def: "A reduced list of the best applicants chosen to go forward to interview." },
    ],
    formulas: [
      { name: "Labour turnover (%)", expr: "(Number of leavers in year ÷ average number of employees) × 100" },
    ],
    redFlags: [
      "Confusing job description and person specification. JD = the job; PS = the person.",
      "Writing 'interviews are expensive' and stopping. Develop: management time and cost per candidate.",
      "Ignoring cost-benefit. Good answers weigh recruitment cost against the cost of a poor hire.",
    ],
    applications: [
      {
        title: "Festival-season staffing",
        concept: "Temporary contracts",
        scenario:
          "A supermarket hires 40 temporary shelf stackers for the busy festive weeks, avoiding year-round wage costs while meeting peak demand.",
        tip: "Link to demand: 'Temporary staff match seasonal peaks and keep fixed labour costs low.'",
      },
      {
        title: "Till operator promoted",
        concept: "Internal recruitment",
        scenario:
          "FreshMart promotes a reliable cashier to supervisor. No agency fees, no induction needed, and colleagues see a path to progress.",
        tip: "Always add the drawback: 'But this leaves a vacancy at the tills that must also be filled.'",
      },
    ],
  },
  {
    id: "u2-training",
    code: "2.3",
    title: "Training & Development",
    blurb: "Building skills, and what it costs the business.",
    points: [
      "Induction training introduces new staff to the business, safety rules and colleagues.",
      "On-the-job training: learning while working (shadowing, coaching, mentoring). Cheap and relevant but disrupts the trainer and may spread bad habits.",
      "Off-the-job training: courses, college, workshops away from the workplace. Expert teaching but costly and loses output.",
      "Benefits: higher productivity, fewer errors, better quality, more flexible staff, higher motivation and lower turnover.",
      "Costs: course fees, lost output during training, wages while training, and the risk that trained staff are poached.",
      "Development is longer-term career growth; training is job-specific skills.",
      "Appraisals review performance and identify training needs.",
      "Workforce planning matches the number and skills of staff to future business needs.",
      "Legally required training (health and safety, food hygiene) is a cost the firm must accept.",
    ],
    terms: [
      { term: "Induction training", def: "Initial training to introduce a new employee to the business, its procedures and people." },
      { term: "On-the-job training", def: "Training given at the place of work while the employee does the job." },
      { term: "Off-the-job training", def: "Training away from the normal workplace, e.g. a college course." },
      { term: "Appraisal", def: "A regular review of an employee's performance and development needs." },
      { term: "Workforce planning", def: "Forecasting the number and skills of staff needed in the future." },
      { term: "Productivity", def: "Output per worker, or per unit of input, in a given period." },
      { term: "Retention", def: "Keeping existing employees in the business rather than losing them." },
    ],
    redFlags: [
      "'Training improves performance' with no chain. Show: fewer errors, so less waste, so lower costs.",
      "Forgetting costs to the firm. Trained staff may leave and take their skills to competitors.",
      "Treating training as always worthwhile. Evaluate cost against benefit and the size of the firm.",
    ],
    applications: [
      {
        title: "New checkout scanners",
        concept: "On-the-job training",
        scenario:
          "FreshMart installs self-service and EPOS scanners. Staff shadow a super-user for a week, so queues shorten with little lost output.",
        tip: "Quote the benefit and trade-off: 'Shadowing is cheap and relevant, but the trainer's own work slows.'",
      },
      {
        title: "Food-hygiene certificates",
        concept: "Off-the-job, legally required",
        scenario:
          "Bakery staff attend a one-day food hygiene course. It costs fees and a day's output but is required by law and protects the brand.",
        tip: "Say it is both a cost and a necessity: 'Legal training reduces the risk of fines and food-poisoning claims.'",
      },
    ],
  },
  {
    id: "u2-motivation",
    code: "2.4",
    title: "Motivation",
    blurb: "Why people work hard, and how businesses keep them keen.",
    points: [
      "Motivated staff mean higher productivity, less absenteeism, lower turnover and better customer service.",
      "Taylor: money is the main motivator, so use piece rate and close supervision.",
      "Maslow's hierarchy: physiological, safety, social, esteem, self-actualisation. Higher needs only matter once lower ones are met.",
      "Herzberg: hygiene factors (pay, conditions, security) prevent dissatisfaction; motivators (achievement, recognition, responsibility) create motivation.",
      "Financial methods: salary, hourly wage, piece rate, commission, bonus, profit sharing, performance-related pay, fringe benefits.",
      "Non-financial methods: job rotation, job enrichment, job enlargement, empowerment, teamwork, recognition, flexible hours, training.",
      "Job enrichment = more challenge and responsibility. Job enlargement = more tasks at the same level. Job rotation = swapping tasks.",
      "Match the method to the role: commission for sales staff, piece rate for repetitive output, recognition for service staff.",
      "Money motivates in the short term but its effect fades; many staff value achievement, security and respect.",
    ],
    terms: [
      { term: "Motivation", def: "The desire and willingness of employees to work hard and do a good job." },
      { term: "Piece rate", def: "Payment based on the number of units a worker produces." },
      { term: "Commission", def: "Payment based on a percentage of the sales a worker makes." },
      { term: "Bonus", def: "An extra one-off payment for good performance or hitting targets." },
      { term: "Job enrichment", def: "Giving workers more challenging, responsible and interesting tasks." },
      { term: "Job rotation", def: "Moving employees between different tasks to reduce boredom." },
      { term: "Hygiene factor", def: "Herzberg's term for factors like pay and conditions that prevent dissatisfaction but do not motivate." },
      { term: "Fringe benefit", def: "A non-cash perk such as a staff discount, company car or private health care." },
    ],
    redFlags: [
      "'Pay them more' as the only answer. High-mark evaluation compares with a non-financial option.",
      "Mixing up job enrichment (more challenge) with job enlargement (more tasks, same level).",
      "Recommending piece rate without noticing the quality risk of rushed work.",
    ],
    applications: [
      {
        title: "Sales reps on commission",
        concept: "Financial motivation",
        scenario:
          "An FMCG distributor pays reps commission on shelf-space deals won with retailers. Sales rise, but reps may push volume over service.",
        tip: "Always give a drawback: 'Commission motivates, but staff may neglect after-sales service.'",
      },
      {
        title: "Employee of the month",
        concept: "Non-financial, Herzberg motivator",
        scenario:
          "A supermarket recognises one cashier a month with a reserved parking space and a thank-you note, raising esteem at a very low cost.",
        tip: "Link to theory: 'Recognition meets esteem needs (Maslow) and is a Herzberg motivator.'",
      },
    ],
    graphs: ["maslow"],
  },
  {
    id: "u2-leadership",
    code: "2.5",
    title: "Leadership, Communication & Employment",
    blurb: "Styles of management, getting messages across, and the law.",
    points: [
      "Autocratic: leader decides alone. Fast and clear, but demotivating. Suits emergencies and unskilled staff.",
      "Democratic: leader consults staff. Better ideas and motivation, but slower. Suits skilled teams.",
      "Laissez-faire: leader gives staff freedom. Suits creative, skilled and self-driven staff, but can lack direction.",
      "Paternalistic: leader acts in staff's interests, explaining decisions but still deciding. Builds loyalty.",
      "The best style depends on the task, urgency, staff skills and business culture.",
      "Communication methods: oral, written, visual, electronic. Choose by speed, record-keeping, cost and need for feedback.",
      "Barriers: jargon, information overload, wrong channel, language, long chains of command, lack of feedback.",
      "Trade unions bargain for pay and conditions on behalf of members; employer organisations represent firms.",
      "Employment law covers contracts, health and safety, minimum wage, equal opportunities, fair dismissal and redundancy.",
      "Dismissal removes a worker for conduct or performance; redundancy removes the job because it is no longer needed.",
    ],
    terms: [
      { term: "Autocratic leadership", def: "A style where the leader makes decisions alone with little or no consultation." },
      { term: "Democratic leadership", def: "A style where the leader involves employees in decisions." },
      { term: "Laissez-faire leadership", def: "A hands-off style that leaves staff to make their own decisions." },
      { term: "Paternalistic leadership", def: "A style where the leader acts in the staff's best interests and explains decisions." },
      { term: "Trade union", def: "An organisation of workers that negotiates with employers over pay and conditions." },
      { term: "Communication barrier", def: "Anything that prevents a message being sent, received or understood." },
      { term: "Redundancy", def: "Losing a job because the business no longer needs that role." },
      { term: "Dismissal", def: "Termination of a worker's contract by the employer, usually for conduct or poor performance." },
    ],
    redFlags: [
      "Writing 'democratic is best' without context. In a crisis or with untrained staff, autocratic may win.",
      "Confusing redundancy (the job goes) with dismissal (the worker is removed for conduct or performance).",
      "Saying 'email is fast and cheap' without limits: no tone, no guarantee of reading, no immediate feedback.",
    ],
    applications: [
      {
        title: "Festival rush at the bakery",
        concept: "Autocratic leadership",
        scenario:
          "On the busiest day of the year the supervisor shouts clear orders to a temporary team. Speed and clarity matter more than consultation.",
        tip: "Justify with context: 'With a tight deadline and untrained temporary staff, autocratic instructions avoid costly delays.'",
      },
      {
        title: "Union and shift allowances",
        concept: "Trade unions",
        scenario:
          "Warehouse staff at an FMCG distribution centre join a union to negotiate night-shift allowances, improving conditions but raising wage costs.",
        tip: "Two-sided: 'Better conditions may raise morale but also raise labour costs for the firm.'",
      },
    ],
  },
];
