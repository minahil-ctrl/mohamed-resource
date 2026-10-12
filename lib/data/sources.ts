export interface Source {
  name: string;
  url: string;
  what: string;
  access: string;
  official?: boolean;
}

/** URLs were found and checked through web search on 12 Oct 2026. Pearson restricts the most recent series, so older papers are the reliable ones. */
export const SOURCES: Source[] = [
  {
    name: "Pearson: International GCSE Business (2017) past papers",
    url: "https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html?Qualification-Family=International-GCSE&Qualification-Subject=Business+%282017%29&Status=Pearson-UK%3AStatus%2FLive&Specification-Code=Pearson-UK%3ASpecification-Code%2Figcse-business-2017",
    what: "Official question papers, mark schemes and examiner reports for 4BS1.",
    access: "Free for older series. The newest series are locked to schools for about nine months.",
    official: true,
  },
  {
    name: "Save My Exams: Edexcel IGCSE Business past papers",
    url: "https://www.savemyexams.com/igcse/business/edexcel/past-papers/",
    what: "Papers and mark schemes sorted by year, with separate pages for each paper.",
    access: "Mostly free to view; some solutions may need an account.",
  },
  {
    name: "Save My Exams: Paper 1 (Investigating Small Businesses)",
    url: "https://www.savemyexams.com/igcse/business/edexcel/past-papers/paper-1/",
    what: "Paper 1 past papers (4BS1/01).",
    access: "Free to browse.",
  },
  {
    name: "Save My Exams: Paper 2 (Investigating Large Businesses)",
    url: "https://www.savemyexams.com/igcse/business/edexcel/past-papers/paper-2",
    what: "Paper 2 past papers (4BS1/02).",
    access: "Free to browse.",
  },
  {
    name: "Exam Papers Practice: Edexcel IGCSE Business Studies (4BS1)",
    url: "https://www.exampaperspractice.co.uk/edexcel-igcse-business-studies-past-papers-4bs1/",
    what: "Sessions from 2020 onward with mark schemes for the newer ones.",
    access: "First download is free; others need a subscription.",
  },
  {
    name: "Tutopiya: Edexcel IGCSE Business (4BS1) past papers",
    url: "https://www.tutopiya.com/learning-portal/resource/edexcel-igcse/business-studies/standard/4bs1/past-papers",
    what: "Papers and marking schemes for 2019 to 2025.",
    access: "Requires a free account on some pages.",
  },
];

export const DIRECT_PDFS: Source[] = [
  {
    name: "Paper 2, June 2023: question paper (PDF)",
    url: "https://qualifications.pearson.com/content/dam/pdf/International-GCSE/Business/2017/Exam-materials/4bs1-02-que-20230613.pdf",
    what: "A full Paper 2 (Investigating Large Businesses) to sit under timed conditions.",
    access: "Direct PDF from Pearson.",
    official: true,
  },
  {
    name: "Paper 2, August 2022: mark scheme (PDF)",
    url: "https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Business/2017/Exam-materials/4BS1_02_rms_20220825.pdf",
    what: "Official mark scheme: read it to see exactly how AO3 and AO4 marks are awarded.",
    access: "Direct PDF from Pearson.",
    official: true,
  },
  {
    name: "Sample assessment materials, both papers with mark schemes (PDF)",
    url: "https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Business%20Studies/2017/specification-and-sample-assessment/9781446942758_Int_GCSE_Bus_SAMs.pdf",
    what: "The exam board's own sample papers and mark schemes.",
    access: "Direct PDF from Pearson.",
    official: true,
  },
  {
    name: "Paper 1 exemplar answers with examiner commentary (PDF)",
    url: "https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Business%20Studies/2017/teaching-learning-materials/IG_Business_Paper_1_exemplar_with_commentaries.pdf",
    what: "Real student answers with examiner comments on what earned and lost marks.",
    access: "Direct PDF from Pearson.",
    official: true,
  },
  {
    name: "International GCSE Business (9-1) specification (PDF)",
    url: "https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Business%20Studies/2017/specification-and-sample-assessment/9781446942765_International_GCSE_Business_Specification.pdf",
    what: "The official syllabus: check every topic against this.",
    access: "Direct PDF from Pearson.",
    official: true,
  },
  {
    name: "Pearson: assessment support page for International GCSE Business",
    url: "https://qualifications.pearson.com/en/news-policy/subject-updates/business/international-gcse-business-assessment-support-page.html",
    what: "Grade boundaries, examiner reports and teaching support.",
    access: "Free; some items need a school login.",
    official: true,
  },
];
