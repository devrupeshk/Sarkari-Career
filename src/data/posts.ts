import {
  JobItem,
  admitCards,
  latestUpdates,
  currentJobs,
  results,
  answerKeys,
  syllabus as syllabusList,
  admissions,
  stateJobNotifications,
  eduUpdates,
  eduNotifications,
  eduResults,
  yojana,
  documents,
  trendingJobs,
  featuredJobs,
  allIndiaJobs
} from "./jobs";

export interface PostDetail {
  id: string;
  title: string;
  category: string;
  department: string;
  status: JobItem['status'];
  lastDate: string;
  examDate?: string;
  totalPosts: string;
  ageLimit: string;
  qualification: string;
  applicationFee: string;
  salary: string;
  selectionProcess: string;
  howToApply: string;
  importantDates: { label: string; date: string }[];
  tags: string[];
  relatedPosts: string[];
  applyUrl?: string;
  notificationUrl?: string;
  syllabusUrl?: string;
  content?: string;
  importantLinks?: { label: string; url: string; type?: 'primary' | 'secondary' | 'info' }[];
  faq?: { question: string; answer: string }[];
}


export const postDetails: Record<string, PostDetail> = {
  'ssc-selection-post-phase-14-vacancy-2026': {
    id: 'ssc-selection-post-phase-14',
    title: 'SSC Selection Post Phase 14 Vacancy 2026',
    category: 'current-job',
    department: 'Staff Selection Commission (SSC)',
    status: 'NEW',
    lastDate: '20 June 2026',
    examDate: 'August 2026',
    totalPosts: '3,003',
    ageLimit: '18-30 Years (Age relaxation as per rules)',
    qualification: 'Matriculation / 10+2 / Graduate (Post-wise)',
    applicationFee: 'Rs. 100/- (SC/ST/PWD/Women exempted)',
    salary: 'Rs. 19,900 – 92,300/- (Level 1-7)',
    selectionProcess: 'Computer Based Test (CBT) followed by Document Verification',
    howToApply: 'Apply online through SSC official website. Upload photo, signature, and required documents. Pay fee via online mode.',
    importantDates: [
      { label: 'Notification Date', date: '15 April 2026' },
      { label: 'Online Form Start', date: '22 April 2026' },
      { label: 'Last Date to Apply', date: '20 June 2026' },
      { label: 'Admit Card', date: 'July 2026' },
      { label: 'Exam Date', date: 'August 2026' },
      { label: 'Result', date: 'October 2026' },
    ],
    tags: ['SSC', 'All India', 'Graduate', '10th Pass', '12th Pass'],
    relatedPosts: [
      'SSC MTS Recruitment 2026',
      'SSC CHSL 10+2 Recruitment 2026',
      'SSC GD Constable Recruitment 2026',
      'SSC CGL 2026 Notification',
    ],
    applyUrl: 'https://ssc.gov.in/',
    notificationUrl: 'https://ssc.gov.in/',
    syllabusUrl: 'https://ssc.gov.in/',
  },
  'crpf-constable-tradesman-recruitment-2026': {
    id: 'crpf-constable-tradesman',
    title: 'CRPF Constable Tradesman Recruitment 2026',
    category: 'police-defence',
    department: 'Central Reserve Police Force (CRPF)',
    status: 'APPLY NOW',
    lastDate: '20 June 2026',
    examDate: 'September 2026',
    totalPosts: '9,195',
    ageLimit: '18-25 Years (Relaxation for reserved categories)',
    qualification: '10th Pass from recognized board',
    applicationFee: 'Rs. 100/- (SC/ST/ESM/PWD exempted)',
    salary: 'Rs. 21,700 – 69,100/- (Pay Level-3)',
    selectionProcess: 'Written Test, Physical Efficiency Test (PET), Physical Standard Test (PST), Document Verification, Medical Examination',
    howToApply: 'Apply online through SSC portal. Upload documents and pay fee. Download admit card when available.',
    importantDates: [
      { label: 'Notification Date', date: '25 March 2026' },
      { label: 'Online Form Start', date: '01 April 2026' },
      { label: 'Last Date to Apply', date: '20 June 2026' },
      { label: 'Admit Card', date: 'August 2026' },
      { label: 'PET/PST', date: 'September 2026' },
      { label: 'Written Exam', date: 'November 2026' },
    ],
    tags: ['CRPF', 'Defence', '10th Pass', 'Constable', 'All India'],
    relatedPosts: [
      'BSF Constable Recruitment 2026',
      'ITBP Constable Recruitment 2026',
      'CISF Constable Recruitment 2026',
      'SSB Constable Recruitment 2026',
    ],
    applyUrl: 'https://rect.crpf.gov.in/',
    notificationUrl: 'https://rect.crpf.gov.in/',
    syllabusUrl: 'https://rect.crpf.gov.in/',
  },
  'lic-hfl-junior-assistant-recruitment-2026': {
    id: 'lic-hfl-junior-assistant',
    title: 'LIC HFL Junior Assistant Recruitment 2026',
    category: 'bank',
    department: 'LIC Housing Finance Limited',
    status: 'NEW',
    lastDate: '30 May 2026',
    examDate: 'June 2026',
    totalPosts: '180',
    ageLimit: '21-28 Years',
    qualification: 'Graduate in any discipline from recognized University',
    applicationFee: 'Rs. 500/- + GST (SC/ST/PWD: Rs. 100/-)',
    salary: 'Rs. 28,000 – 35,000/- per month (approx)',
    selectionProcess: 'Online Examination followed by Interview',
    howToApply: 'Visit LIC HFL official website. Register with email and mobile. Fill application form, upload photo and documents. Pay fee online.',
    importantDates: [
      { label: 'Notification Date', date: '20 April 2026' },
      { label: 'Online Form Start', date: '25 April 2026' },
      { label: 'Last Date to Apply', date: '30 May 2026' },
      { label: 'Admit Card', date: 'June 2026' },
      { label: 'Online Exam', date: 'June 2026' },
      { label: 'Interview', date: 'July 2026' },
    ],
    tags: ['LIC', 'Banking', 'Graduate', 'Assistant', 'All India'],
    relatedPosts: [
      'Indian Bank SO Recruitment 2026',
      'Punjab & Sind Bank Recruitment 2026',
      'Central Bank of India Recruitment 2026',
      'Federal Bank Recruitment 2026',
    ],
    applyUrl: 'https://www.lichousing.com/',
    notificationUrl: 'https://www.lichousing.com/',
    syllabusUrl: 'https://www.lichousing.com/',
  },
  'railway-rrb-alp-cen-01-2026-notification': {
    id: 'rrb-alp-cen-01-2026',
    title: 'Railway RRB ALP CEN 01/2026 Notification',
    category: 'railway',
    department: 'Railway Recruitment Board (RRB)',
    status: 'NEW',
    lastDate: '15 June 2026',
    examDate: 'August 2026',
    totalPosts: '11,127',
    ageLimit: '18-30 Years',
    qualification: 'Matriculation / ITI / Diploma / Degree in relevant trade',
    applicationFee: 'Rs. 500/- (SC/ST/PWD/Women: Rs. 250/-)',
    salary: 'Rs. 19,900/- (Level-2) + Allowances',
    selectionProcess: 'CBT Stage 1, CBT Stage 2, Computer Based Aptitude Test (CBAT), Document Verification, Medical Exam',
    howToApply: 'Apply through any RRB regional website. Register with Aadhaar. Fill form, upload documents. Pay fee and print application.',
    importantDates: [
      { label: 'Notification Date', date: '10 March 2026' },
      { label: 'Online Form Start', date: '20 March 2026' },
      { label: 'Last Date to Apply', date: '15 June 2026' },
      { label: 'CBT Stage 1', date: 'August 2026' },
      { label: 'CBT Stage 2', date: 'October 2026' },
      { label: 'Final Result', date: 'December 2026' },
    ],
    tags: ['Railway', 'RRB', 'ITI', 'Diploma', 'All India', 'ALP'],
    relatedPosts: [
      'RRB NTPC Recruitment 2026',
      'RRC Group D Recruitment 2026',
      'RPF SI/Constable Recruitment 2026',
      'RRB JE Recruitment 2026',
    ],
    applyUrl: 'https://www.rrcb.gov.in/',
    notificationUrl: 'https://www.rrcb.gov.in/',
    syllabusUrl: 'https://www.rrcb.gov.in/',
  },
  'up-tet-2026-online-application-form': {
    id: 'up-tet-2026',
    title: 'UP TET 2026 Online Application Form',
    category: 'education',
    department: 'UP Basic Education Board',
    status: 'STARTED',
    lastDate: '25 May 2026',
    examDate: 'July 2026',
    totalPosts: 'Teacher Eligibility Test',
    ageLimit: 'No Age Limit',
    qualification: 'Graduate + B.Ed / D.El.Ed / BTC / Special Education Degree',
    applicationFee: 'Rs. 600/- (General/OBC), Rs. 400/- (SC/ST), Rs. 100/- (PWD)',
    salary: 'N/A (Eligibility Test)',
    selectionProcess: 'Written Examination (Paper 1 for Primary, Paper 2 for Upper Primary)',
    howToApply: 'Register on UP TET official website. Fill application form with personal and educational details. Upload photo and signature. Pay fee online.',
    importantDates: [
      { label: 'Notification Date', date: '01 April 2026' },
      { label: 'Online Form Start', date: '10 April 2026' },
      { label: 'Last Date to Apply', date: '25 May 2026' },
      { label: 'Admit Card', date: 'June 2026' },
      { label: 'Exam Date', date: 'July 2026' },
      { label: 'Result', date: 'September 2026' },
    ],
    tags: ['UP', 'Teaching', 'TET', 'Graduate', 'B.Ed', 'Education'],
    relatedPosts: [
      'Bihar TET 2026',
      'MP TET 2026',
      'Rajasthan REET 2026',
      'Haryana TET 2026',
    ],
    applyUrl: 'https://updeled.gov.in/',
    notificationUrl: 'https://updeled.gov.in/',
    syllabusUrl: 'https://updeled.gov.in/',
  },
  'btsc-lab-assistant-recruitment-2026': {
    id: 'btsc-lab-assistant',
    title: 'BTSC Lab Assistant Recruitment 2026',
    category: 'state',
    department: 'Bihar Technical Service Commission (BTSC)',
    status: 'NEW',
    lastDate: '25 May 2026',
    examDate: 'July 2026',
    totalPosts: '500+',
    ageLimit: '18-37 Years (Bihar Govt rules apply)',
    qualification: '12th Pass with Science Stream / Diploma in Medical Lab Technology',
    applicationFee: 'Rs. 750/- (General), Rs. 200/- (SC/ST/Bihar domicile)',
    salary: 'Rs. 25,500 – 81,100/- (Pay Level-4)',
    selectionProcess: 'Written Examination (CBT) followed by Document Verification',
    howToApply: 'Apply through BTSC Bihar official portal. Create login ID, fill form, upload documents, pay fee.',
    importantDates: [
      { label: 'Notification Date', date: '15 March 2026' },
      { label: 'Online Form Start', date: '01 April 2026' },
      { label: 'Last Date to Apply', date: '25 May 2026' },
      { label: 'Admit Card', date: 'June 2026' },
      { label: 'Written Exam', date: 'July 2026' },
      { label: 'Result', date: 'August 2026' },
    ],
    tags: ['Bihar', 'Medical', 'Lab Assistant', '12th Pass', 'Diploma'],
    relatedPosts: [
      'BTSC Pharmacist Recruitment 2026',
      'Bihar Health Dept Recruitment 2026',
      'BPSC Medical Officer 2026',
      'Bihar ANM Recruitment 2026',
    ],
    applyUrl: 'https://btsc.bih.nic.in/',
    notificationUrl: 'https://btsc.bih.nic.in/',
    syllabusUrl: 'https://btsc.bih.nic.in/',
  },
  'ssb-constable-hc-asi-si-recruitment-2026': {
    id: 'ssb-constable-recruitment',
    title: 'SSB Constable, HC, ASI, SI Recruitment 2026',
    category: 'police-defence',
    department: 'Sashastra Seema Bal (SSB)',
    status: 'APPLY NOW',
    lastDate: '30 May 2026',
    examDate: 'July 2026',
    totalPosts: '827+',
    ageLimit: '18-25 Years (Post-wise variation)',
    qualification: '10th / 12th / Graduate (Post-wise)',
    applicationFee: 'Rs. 100/- (SC/ST/PWD/Women exempted)',
    salary: 'Rs. 21,700 – 69,100/- (Pay Level-3 to 6)',
    selectionProcess: 'Written Test, Physical Test, Skill Test, Document Verification, Medical',
    howToApply: 'Apply through SSC portal. Fill post preference, upload documents. Pay application fee.',
    importantDates: [
      { label: 'Notification Date', date: '01 April 2026' },
      { label: 'Online Form Start', date: '10 April 2026' },
      { label: 'Last Date to Apply', date: '30 May 2026' },
      { label: 'Admit Card', date: 'June 2026' },
      { label: 'PET/PST', date: 'July 2026' },
      { label: 'Written Exam', date: 'August 2026' },
    ],
    tags: ['SSB', 'Defence', 'Constable', 'SI', 'All India'],
    relatedPosts: [
      'CISF Recruitment 2026',
      'ITBP Recruitment 2026',
      'BSF Recruitment 2026',
      'Assam Rifles Recruitment 2026',
    ],
    applyUrl: 'https://ssbrectt.gov.in/',
    notificationUrl: 'https://ssbrectt.gov.in/',
    syllabusUrl: 'https://ssbrectt.gov.in/',
  },
  'ofss-bihar-11th-admission-2026': {
    id: 'ofss-bihar-11th',
    title: 'OFSS Bihar 11th Admission 2026',
    category: 'education',
    department: 'Bihar School Examination Board (BSEB)',
    status: 'ALERT',
    lastDate: '30 May 2026',
    examDate: 'N/A',
    totalPosts: 'Admission',
    ageLimit: 'As per school norms',
    qualification: '10th Pass from Bihar Board or equivalent',
    applicationFee: 'Rs. 300/- (Online processing fee)',
    salary: 'N/A',
    selectionProcess: 'Merit-based selection based on 10th board marks',
    howToApply: 'Visit OFSS Bihar portal. Register with mobile number. Fill school/college choices. Upload documents and pay fee.',
    importantDates: [
      { label: 'Notification Date', date: '01 May 2026' },
      { label: 'Online Form Start', date: '05 May 2026' },
      { label: 'Last Date to Apply', date: '30 May 2026' },
      { label: 'First Merit List', date: 'June 2026' },
      { label: 'Second Merit List', date: 'June 2026' },
      { label: 'Spot Admission', date: 'July 2026' },
    ],
    tags: ['Bihar', 'Admission', '11th', '10th Pass', 'Education'],
    relatedPosts: [
      'Bihar DElEd Admission 2026',
      'Bihar Polytechnic Admission 2026',
      'Bihar ITI Admission 2026',
      'OFSS Bihar Spot Admission 2026',
    ],
    applyUrl: 'https://www.ofssbihar.org/',
    notificationUrl: 'https://www.ofssbihar.org/',
    syllabusUrl: 'https://www.ofssbihar.org/',
  },
  'rrb-ntpc-recruitment-2026': {
    id: 'rrb-ntpc-2026',
    title: 'Railway RRB NTPC Graduate Level Recruitment 2026',
    category: 'railway',
    department: 'Railway Recruitment Board (RRB)',
    status: 'NEW',
    lastDate: '30 June 2026',
    examDate: 'September 2026',
    totalPosts: '35,281',
    ageLimit: '18-33 Years',
    qualification: 'Graduate Degree in any discipline',
    applicationFee: 'Rs. 500/- (Refundable after CBT 1)',
    salary: 'Rs. 25,500 – 44,900/- (Level 4-6)',
    selectionProcess: 'CBT 1, CBT 2, Typing Test/Aptitude Test, Document Verification',
    howToApply: 'Apply via regional RRB websites. Complete registration, upload documents, and pay fee.',
    importantDates: [
      { label: 'Notification Date', date: '10 May 2026' },
      { label: 'Online Form Start', date: '15 May 2026' },
      { label: 'Last Date to Apply', date: '30 June 2026' },
      { label: 'CBT 1 Exam', date: 'September 2026' },
    ],
    tags: ['Railway', 'NTPC', 'Graduate', 'RRB', 'All India'],
    relatedPosts: [
      'RRB Group D 2026',
      'RRB ALP 2026',
      'Railway RPF Recruitment 2026',
    ],
    applyUrl: 'https://www.rrcb.gov.in/',
    notificationUrl: 'https://www.rrcb.gov.in/',
    syllabusUrl: 'https://www.rrcb.gov.in/',
  },
  'sbi-clerk-junior-associate-2026': {
    id: 'sbi-clerk-2026',
    title: 'SBI Clerk Junior Associate Recruitment 2026',
    category: 'bank',
    department: 'State Bank of India (SBI)',
    status: 'NEW',
    lastDate: '15 June 2026',
    examDate: 'August 2026',
    totalPosts: '8,236',
    ageLimit: '20-28 Years',
    qualification: 'Graduate in any discipline',
    applicationFee: 'Rs. 750/- (SC/ST/PWD exempted)',
    salary: 'Rs. 19,900 – 47,920/-',
    selectionProcess: 'Preliminary Exam, Main Exam, Local Language Test',
    howToApply: 'Apply on SBI careers portal. Fill personal details, upload photo/signature, pay fee.',
    importantDates: [
      { label: 'Notification Date', date: '05 May 2026' },
      { label: 'Online Form Start', date: '10 May 2026' },
      { label: 'Last Date to Apply', date: '15 June 2026' },
      { label: 'Prelims Exam', date: 'August 2026' },
    ],
    tags: ['SBI', 'Banking', 'Clerk', 'Graduate', 'All India'],
    relatedPosts: [
      'IBPS Clerk 2026',
      'RBI Assistant 2026',
      'LIC Assistant 2026',
    ],
    applyUrl: 'https://bank.sbi/careers',
    notificationUrl: 'https://bank.sbi/careers',
    syllabusUrl: 'https://bank.sbi/careers',
  },
  'upsc-scientist-b-recruitment-2026': {
    id: 'upsc-scientist-b-recruitment-2026',
    title: 'UPSC Scientist B Recruitment 2026: Apply Online for 46 Posts | Last Date 12 June',
    category: 'upsc',
    department: 'Union Public Service Commission (UPSC)',
    status: 'NEW',
    lastDate: '12 June 2026',
    totalPosts: '46',
    ageLimit: 'Max 35 Years (Age relaxation as per rules)',
    qualification: "Master's Degree in Science or Bachelor's Degree in Engineering / Technology (Relevant Discipline)",
    applicationFee: 'Rs. 25/- (SC/ST/PwBD/Women exempted)',
    salary: 'Rs. 56,100 – 1,77,500/- (Pay Level-10)',
    selectionProcess: 'Shortlisting, Recruitment Test / Interview, Document Verification, Medical Examination',
    howToApply: 'Apply online through UPSC official website (upsconline.nic.in). Complete registration/E-KYC, fill application form, upload required documents and pay application fee before 12 June 2026 at 6:00 PM.',
    importantDates: [
      { label: 'Notification Date', date: '22 May 2026' },
      { label: 'Online Form Start', date: '23 May 2026' },
      { label: 'Last Date to Apply', date: '12 June 2026 up to 6:00 PM' },
      { label: 'Admit Card', date: 'To be announced' },
      { label: 'Exam/Interview Date', date: 'To be announced' },
    ],
    tags: ['UPSC', 'Scientist B', 'IMD', 'Engineering', 'Government Jobs 2026'],
    relatedPosts: [
      'UPSC Civil Services Exam 2026',
      'UPSC IES Recruitment 2026',
      'ISRO Scientist Recruitment 2026',
    ],
    applyUrl: 'https://upsconline.nic.in/',
    notificationUrl: 'https://upsc.gov.in/',
    syllabusUrl: 'https://upsc.gov.in/',
    importantLinks: [
      { label: 'Apply Online', url: 'https://upsconline.nic.in/', type: 'primary' },
      { label: 'Official Notification PDF:', url: 'https://upsc.gov.in/recruitment/recruitment-advertisements', type: 'info' },
      { label: 'Official Website', url: 'https://upsc.gov.in/', type: 'info' },
      { label: 'Join Telegram Channel:', url: '', type: 'secondary' },
      { label: 'Join WhatsApp Channel', url: '', type: 'secondary' },
    ],
    faq: [
      {
        question: 'What is the last date to apply for UPSC Scientist B Recruitment 2026?',
        answer: 'The last date to submit the online application is 12 June 2026 up to 6:00 PM.[4]',
      },
      {
        question: 'How many posts are available in UPSC Scientist B Recruitment 2026?',
        answer: 'There are 46 total vacancies in this recruitment.[1][2]',
      },
      {
        question: 'What is the salary of UPSC Scientist B?',
        answer: 'The salary is under Level 10 with basic pay from ₹56,100 to ₹1,77,500.[2]',
      },
      {
        question: 'Can freshers apply for UPSC Scientist B 2026?',
        answer: 'Yes, freshers can apply for some posts, especially Scientist-B (Instrumentation), subject to the required qualification.[1][2]',
      },
      {
        question: 'What is the official website for UPSC Scientist B application?',
        answer: 'Candidates can apply through upsconline.nic.in.[1]',
      },
    ],
    content: `
      <h2>Overview</h2>
      <p>UPSC Scientist B Recruitment 2026 notification has been released for 46 posts in the Indian Meteorological Department (IMD).[1][2] The online application process is open from 23 May 2026 and the last date to apply is 12 June 2026 up to 6:00 PM.[3][4] This recruitment is a strong opportunity for candidates from science and engineering backgrounds who want a central government Group A post with good salary and career growth.[1][2]</p>
      <p>The Union Public Service Commission has invited online applications for Scientist B posts under different disciplines including Atmospheric Sciences, General Meteorology, and Instrumentation.[1] The post comes under the Indian Meteorological Department and offers Level 10 pay under the 7th CPC pay matrix.[2] Candidates should read the eligibility, age limit, vacancy, application process, and important links carefully before filling out the form.[1][4]</p>

      <h2>UPSC Scientist B Recruitment 2026 Highlights</h2>
      <table>
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Recruitment Authority</td>
            <td>Union Public Service Commission (UPSC)</td>
          </tr>
          <tr>
            <td>Post Name</td>
            <td>Scientist B</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>Indian Meteorological Department (IMD)</td>
          </tr>
          <tr>
            <td>Total Posts</td>
            <td>46[1][2]</td>
          </tr>
          <tr>
            <td>Advertisement Status</td>
            <td>Notification Out[1]</td>
          </tr>
          <tr>
            <td>Application Mode</td>
            <td>Online[1]</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>23 May 2026[3][5]</td>
          </tr>
          <tr>
            <td>Last Date</td>
            <td>12 June 2026 till 6:00 PM[3][4]</td>
          </tr>
          <tr>
            <td>Pay Scale</td>
            <td>Level 10, ₹56,100 to ₹1,77,500[2]</td>
          </tr>
          <tr>
            <td>Official Website</td>
            <td><a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer">upsc.gov.in</a>[6]</td>
          </tr>
        </tbody>
      </table>

      <h2>Important Dates</h2>
      <p>Job seekers usually want dates first, so here are the most important dates in simple form.[3][4]</p>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Notification Release Date</td>
            <td>22 May 2026[3]</td>
          </tr>
          <tr>
            <td>Online Application Start</td>
            <td>23 May 2026[3][5]</td>
          </tr>
          <tr>
            <td>Last Date to Apply</td>
            <td>12 June 2026[4]</td>
          </tr>
          <tr>
            <td>Last Time to Submit Form</td>
            <td>6:00 PM on 12 June 2026[4]</td>
          </tr>
          <tr>
            <td>Eligibility Cut-off Date</td>
            <td>12 June 2026[4]</td>
          </tr>
          <tr>
            <td>Exam / Interview Date</td>
            <td>To be announced[1]</td>
          </tr>
          <tr>
            <td>Admit Card</td>
            <td>To be announced[1]</td>
          </tr>
        </tbody>
      </table>

      <h2>Vacancy Details</h2>
      <p>UPSC has announced 46 Scientist B vacancies in total.[1][2] The vacancies are divided post-wise and category-wise as given below.[1]</p>
      <table>
        <thead>
          <tr>
            <th>Post Name</th>
            <th>Total Vacancies</th>
            <th>Category Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scientist-B (Atmospheric Sciences)</td>
            <td>07</td>
            <td>UR-03, EWS-03, SC-01[1]</td>
          </tr>
          <tr>
            <td>Scientist-B (General Meteorology)</td>
            <td>30</td>
            <td>UR-12, EWS-11, OBC-01, SC-05, ST-01[1]</td>
          </tr>
          <tr>
            <td>Scientist-B (Instrumentation)</td>
            <td>09</td>
            <td>UR-03, EWS-03, OBC-02, SC-01[1]</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>46</strong></td>
            <td><strong>All Categories</strong>[1]</td>
          </tr>
        </tbody>
      </table>

      <h2>Eligibility Criteria</h2>
      <p>Candidates must check their qualification carefully because eligibility changes according to the discipline.[1] UPSC has asked for either a relevant master’s degree or engineering degree depending on the post.[1][2]</p>

      <h3>Educational Qualification</h3>
      <table>
        <thead>
          <tr>
            <th>Post Name</th>
            <th>Required Qualification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scientist-B (Atmospheric Sciences)</td>
            <td>Master’s Degree in Atmospheric Sciences / Ocean Science / Hydrology / Atmospheric Physics / Atmospheric Ocean Science & Technology / Radar & Microwave Engineering[1]</td>
          </tr>
          <tr>
            <td>Scientist-B (General Meteorology)</td>
            <td>Master’s Degree in Science in Mathematics / Physics / Atmospheric Science / Physics with Meteorology[1]</td>
          </tr>
          <tr>
            <td>Scientist-B (Instrumentation)</td>
            <td>Bachelor’s Degree in Engineering or Technology in Electronics & Communication / Mechanical / IT / Instrumentation / Mechatronics / Electrical / Computer Science[1]</td>
          </tr>
        </tbody>
      </table>
      <p>Fresh candidates can also find this recruitment useful because experience is not required for most Scientist B posts, especially for the Instrumentation discipline.[1][2]</p>

      <h3>Age Limit</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Maximum Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General / EWS</td>
            <td>35 years[2]</td>
          </tr>
          <tr>
            <td>OBC</td>
            <td>38 years[1]</td>
          </tr>
          <tr>
            <td>SC / ST</td>
            <td>40 years[1]</td>
          </tr>
          <tr>
            <td>PwBD</td>
            <td>45 years for suitable posts[1]</td>
          </tr>
        </tbody>
      </table>
      <p>Age relaxation is available as per UPSC rules for reserved categories and other eligible groups.[1]</p>

      <h2>Application Fee</h2>
      <p>The application fee is low, which makes this post accessible for many candidates.[1] Women, SC, ST, and PwBD candidates do not need to pay the fee.[1][7]</p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General / OBC / EWS</td>
            <td>₹25[1]</td>
          </tr>
          <tr>
            <td>SC / ST / PwBD</td>
            <td>Nil[1]</td>
          </tr>
          <tr>
            <td>Women Candidates</td>
            <td>Nil[7]</td>
          </tr>
        </tbody>
      </table>
      <p>The fee can be paid through online modes such as debit card, credit card, UPI, or internet banking.[7]</p>

      <h2>Salary Details</h2>
      <p>UPSC Scientist B is a well-paid central government job with regular allowances and long-term benefits.[2] The post is placed in Level 10 of the 7th Pay Commission.[2]</p>
      <table>
        <thead>
          <tr>
            <th>Salary Component</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pay Level</td>
            <td>Level 10[2]</td>
          </tr>
          <tr>
            <td>Basic Pay</td>
            <td>₹56,100 to ₹1,77,500[2]</td>
          </tr>
          <tr>
            <td>Dearness Allowance</td>
            <td>As per central government rules[2]</td>
          </tr>
          <tr>
            <td>HRA</td>
            <td>As applicable by city[2]</td>
          </tr>
          <tr>
            <td>TA</td>
            <td>As per rules[2]</td>
          </tr>
          <tr>
            <td>Job Status</td>
            <td>Group A Gazetted Post[2]</td>
          </tr>
        </tbody>
      </table>
      <p>The in-hand salary may go much higher after adding HRA, DA, and other allowances, which makes this post attractive for technical graduates.[2]</p>

      <h2>Selection Process</h2>
      <p>The selection process may include shortlisting, recruitment test if needed, and interview.[1] After that, document verification and medical examination may be conducted before final appointment.[1]</p>
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stage 1</td>
            <td>Application screening / shortlisting[1]</td>
          </tr>
          <tr>
            <td>Stage 2</td>
            <td>Recruitment Test, if required[1]</td>
          </tr>
          <tr>
            <td>Stage 3</td>
            <td>Interview[1]</td>
          </tr>
          <tr>
            <td>Stage 4</td>
            <td>Document Verification[1]</td>
          </tr>
          <tr>
            <td>Stage 5</td>
            <td>Medical Examination[1]</td>
          </tr>
        </tbody>
      </table>
      <p>Candidates should not assume that every applicant will be called directly for interview because UPSC may first shortlist applicants based on qualifications or conduct a recruitment test.[1]</p>

      <h2>How to Apply Online</h2>
      <ol>
        <li>Visit the official UPSC online portal at <a href="https://upsconline.nic.in" target="_blank" rel="noopener noreferrer">upsconline.nic.in</a>.[1]</li>
        <li>Open the Online Recruitment Application section.[1]</li>
        <li>Complete one-time registration and E-KYC process.[1]</li>
        <li>Fill personal, educational, and communication details correctly.[1]</li>
        <li>Upload photograph, signature, and required certificates in proper format.[1]</li>
        <li>Pay the application fee, if applicable.[1]</li>
        <li>Submit the form and save the final printout for future use.[1]</li>
      </ol>

      <h2>Documents Required</h2>
      <p>Candidates should keep these documents ready before applying online so the form can be completed without delay.</p>
      <ul>
        <li>Passport size photograph.[1]</li>
        <li>Signature scan copy.[1]</li>
        <li>Educational certificates and mark sheets.[1]</li>
        <li>Category certificate, if applicable.[1]</li>
        <li>Disability certificate, if applicable.[1]</li>
        <li>Valid ID proof such as Aadhaar card.[1]</li>
        <li>Active mobile number and email ID.[1]</li>
      </ul>

      <h2>Why This Job Is Good</h2>
      <p>This post is suitable for candidates who want a respected technical role in the central government.[2] It offers stable career growth, decent salary, and a strong professional profile under UPSC recruitment.[2][1]</p>
      <ul>
        <li>Group A Gazetted status gives strong career value.[2]</li>
        <li>Salary is much better than many entry-level technical jobs.[2]</li>
        <li>The application fee is very low.[1]</li>
        <li>Candidates from science and engineering streams can both apply depending on the discipline.[1]</li>
        <li>Freshers have a fair chance in some disciplines.[1][2]</li>
      </ul>

      <h2>Conclusion</h2>
      <p>UPSC Scientist B Recruitment 2026 is one of the better technical government job opportunities available right now for science and engineering candidates.[1][2] Candidates should complete the application well before 12 June 2026 and verify all documents before final submission.[4][1]</p>
    `,
  },
  'upsc-cse-prelims-admit-card-2026': {
    id: 'upsc-cse-prelims-admit-card-2026',
    title: 'UPSC CSE Prelims Admit Card 2026',
    category: 'admit-card',
    department: 'Union Public Service Commission (UPSC)',
    status: 'OUT',
    lastDate: '25 June 2026',
    examDate: '25 June 2026',
    totalPosts: 'N/A',
    ageLimit: 'N/A',
    qualification: 'Graduate',
    applicationFee: 'N/A',
    salary: 'N/A',
    selectionProcess: 'Civil Services Examination (Preliminary)',
    howToApply: 'Candidates can download their e-Admit Card from the official website upsconline.nic.in.',
    importantDates: [
      { label: 'Admit Card Release Date', date: '28 May 2026' },
      { label: 'UPSC CSE Prelims Exam Date', date: '25 June 2026' },
    ],
    tags: ['UPSC', 'Civil Services', 'Admit Card', 'CSE 2026'],
    relatedPosts: [
      'UPSC Scientist B Recruitment 2026',
      'UPSC Civil Services Main Result 2026',
    ],
    applyUrl: 'https://upsconline.nic.in/',
    notificationUrl: 'https://upsc.gov.in/',
    content: `<h2>Overview</h2>
<p>Union Public Service Commission (UPSC) has released the e-Admit Card for the Civil Services (Preliminary) Examination 2026. Candidates who have registered for the exam can now download their e-Admit Card from the official website upsconline.nic.in. The exam is scheduled to be conducted on 25 June 2026 across various exam centers nationwide.</p>

<h2>Important Dates</h2>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200 dark:border-slate-800">
  <thead>
    <tr class="bg-slate-100 dark:bg-slate-800/60">
      <th class="border border-slate-200 dark:border-slate-800 p-2 text-left font-bold text-foreground">Event</th>
      <th class="border border-slate-200 dark:border-slate-800 p-2 text-left font-bold text-foreground">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-200 dark:border-slate-800 p-2 text-foreground">Admit Card Release Date</td>
      <td class="border border-slate-200 dark:border-slate-800 p-2 text-foreground">28 May 2026</td>
    </tr>
    <tr>
      <td class="border border-slate-200 dark:border-slate-800 p-2 text-foreground">UPSC CSE Prelims Exam Date</td>
      <td class="border border-slate-200 dark:border-slate-800 p-2 text-foreground">25 June 2026</td>
    </tr>
  </tbody>
</table>
</div>

<h2>How to Download UPSC CSE Admit Card 2026</h2>
<ol>
  <li>Go to the official website of UPSC at <a href="https://upsconline.nic.in" target="_blank" rel="noopener noreferrer">upsconline.nic.in</a>.</li>
  <li>Click on the link "e-Admit Cards for Various Examinations of UPSC".</li>
  <li>Select "Civil Services (Preliminary) Examination, 2026".</li>
  <li>Enter your Registration ID or Roll Number along with your Date of Birth.</li>
  <li>Submit the details to view your admit card on the screen.</li>
  <li>Download the e-Admit Card and print it out on an A4 sheet.</li>
</ol>`,
    importantLinks: [
      { label: 'Download Admit Card', url: 'https://upsconline.nic.in/', type: 'primary' },
      { label: 'Official Website', url: 'https://upsc.gov.in/', type: 'info' },
      { label: 'Join Telegram Channel', url: '', type: 'secondary' },
      { label: 'Join WhatsApp Channel', url: '', type: 'secondary' },
    ],
    faq: [
      { question: 'When will UPSC CSE Prelims 2026 be held?', answer: 'The preliminary exam is scheduled to be conducted on 25 June 2026.' },
      { question: 'How to download the e-Admit Card?', answer: 'Candidates can download their e-Admit Card by entering their Registration ID/Roll Number and Date of Birth on the upsconline.nic.in portal.' },
    ],
  },
};

export function resolveOfficialLinks(title: string, department: string) {
  const text = `${title} ${department}`.toLowerCase();

  if (text.includes("upsc") || text.includes("union public service")) {
    return {
      officialWebsite: "https://upsc.gov.in/",
      applyUrl: "https://upsconline.nic.in/"
    };
  }
  if (text.includes("ssc") || text.includes("staff selection")) {
    return {
      officialWebsite: "https://ssc.gov.in/",
      applyUrl: "https://ssc.gov.in/"
    };
  }
  if (text.includes("rrb") || text.includes("railway") || text.includes("rrc")) {
    return {
      officialWebsite: "https://www.rrcb.gov.in/",
      applyUrl: "https://www.rrcb.gov.in/"
    };
  }
  if (text.includes("sbi") || text.includes("state bank")) {
    return {
      officialWebsite: "https://bank.sbi/careers",
      applyUrl: "https://bank.sbi/careers"
    };
  }
  if (text.includes("lic")) {
    return {
      officialWebsite: "https://licindia.in/",
      applyUrl: "https://licindia.in/"
    };
  }
  if (text.includes("ibps")) {
    return {
      officialWebsite: "https://www.ibps.in/",
      applyUrl: "https://www.ibps.in/"
    };
  }
  if (text.includes("crpf")) {
    return {
      officialWebsite: "https://rect.crpf.gov.in/",
      applyUrl: "https://rect.crpf.gov.in/"
    };
  }
  if (text.includes("ssb") || text.includes("sashastra seema")) {
    return {
      officialWebsite: "https://ssbrectt.gov.in/",
      applyUrl: "https://ssbrectt.gov.in/"
    };
  }
  if (text.includes("bpsc")) {
    return {
      officialWebsite: "https://www.bpsc.bih.nic.in/",
      applyUrl: "https://www.bpsc.bih.nic.in/"
    };
  }
  if (text.includes("ofss")) {
    return {
      officialWebsite: "https://www.ofssbihar.org/",
      applyUrl: "https://www.ofssbihar.org/"
    };
  }
  if (text.includes("btsc")) {
    return {
      officialWebsite: "https://btsc.bih.nic.in/",
      applyUrl: "https://btsc.bih.nic.in/"
    };
  }
  if (text.includes("bcece")) {
    return {
      officialWebsite: "https://bceceboard.bihar.gov.in/",
      applyUrl: "https://bceceboard.bihar.gov.in/"
    };
  }
  if (text.includes("upsssc")) {
    return {
      officialWebsite: "https://upsssc.gov.in/",
      applyUrl: "https://upsssc.gov.in/"
    };
  }
  if (text.includes("uptet") || text.includes("up deled") || text.includes("up basic education")) {
    return {
      officialWebsite: "https://updeled.gov.in/",
      applyUrl: "https://updeled.gov.in/"
    };
  }
  if (text.includes("neet") || text.includes("jee") || text.includes("nta ")) {
    return {
      officialWebsite: "https://nta.ac.in/",
      applyUrl: "https://exams.nta.ac.in/"
    };
  }
  if (text.includes("air force") || text.includes("agniveer")) {
    return {
      officialWebsite: "https://agnipathvayu.cdac.in/",
      applyUrl: "https://agnipathvayu.cdac.in/"
    };
  }
  if (text.includes("kvs") || text.includes("kendriya vidyalaya")) {
    return {
      officialWebsite: "https://kvsangathan.nic.in/",
      applyUrl: "https://kvsangathan.nic.in/"
    };
  }

  // Default fallback
  return {
    officialWebsite: "https://www.india.gov.in/",
    applyUrl: "https://www.india.gov.in/"
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

export function getPostBySlug(slug: string): PostDetail | undefined {
  if (postDetails[slug]) {
    return postDetails[slug];
  }

  const allLists = [
    { list: admitCards, catName: "admit-card" },
    { list: latestUpdates, catName: "latest-updates" },
    { list: currentJobs, catName: "current-job" },
    { list: results, catName: "results" },
    { list: answerKeys, catName: "answer-key" },
    { list: syllabusList, catName: "syllabus" },
    { list: admissions, catName: "admission" },
    { list: stateJobNotifications, catName: "state" },
    { list: eduUpdates, catName: "university-update" },
    { list: eduNotifications, catName: "university-update" },
    { list: eduResults, catName: "university-update" },
    { list: yojana, catName: "yojana" },
    { list: documents, catName: "documents" },
    { list: trendingJobs, catName: "current-job" },
    { list: featuredJobs, catName: "current-job" },
    { list: allIndiaJobs, catName: "current-job" },
  ];

  for (const { list, catName } of allLists) {
    const found = list.find((item) => generateSlug(item.title) === slug);
    if (found) {
      const title = found.title;
      const department = found.department || "Recruitment Board";
      const status = found.status || "NEW";
      const lastDate = found.lastDate || "See notification";

      return {
        id: slug,
        title,
        category: catName,
        department,
        status,
        lastDate,
        totalPosts: "N/A",
        ageLimit: "Check official notification",
        qualification: "See eligibility details below",
        applicationFee: "As per notification rules",
        salary: "As per government norms",
        selectionProcess: "Written Test / Interview / Document Verification",
        howToApply: `Visit the official website. Find the notification link for ${title}. Register, fill the application form, upload documents, and submit before the last date.`,
        importantDates: [
          { label: "Notification Date", date: "Released" },
          { label: "Last Date to Apply", date: lastDate },
        ],
        tags: [catName.replace("-", " "), "Government Job", "Sarkari Result"],
        relatedPosts: [
          "UPSC Scientist B Recruitment 2026",
          "SSC Selection Post Phase 14 Vacancy 2026",
        ],
        applyUrl: found.href || resolveOfficialLinks(found.title, found.department || "").applyUrl,
        importantLinks: [
          { label: "Official Apply/Download Link", url: found.href || resolveOfficialLinks(found.title, found.department || "").applyUrl, type: "primary" },
          { label: "Official Website", url: resolveOfficialLinks(found.title, found.department || "").officialWebsite, type: "info" },
          { label: "Join Telegram Channel", url: "", type: "secondary" },
          { label: "Join WhatsApp Channel", url: "", type: "secondary" },
        ],
        content: `
          <h2>Overview</h2>
          <p>Official notification and details have been released for <strong>${title}</strong> under the <strong>${department}</strong>. Candidates can find download links, dates, and instructions below.</p>
          <p>Please review the official documentation on the website to ensure you comply with all candidate requirements.</p>

          <h2>Key Details</h2>
          <table>
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Conducting Body</td>
                <td>${department}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td>${title}</td>
              </tr>
              <tr>
                <td>Current Status</td>
                <td>${status}</td>
              </tr>
              <tr>
                <td>Target Date</td>
                <td>${lastDate}</td>
              </tr>
              <tr>
                <td>Direct Portal</td>
                <td><a href="${found.href || resolveOfficialLinks(found.title, found.department || "").applyUrl}" target="_blank" rel="noopener noreferrer">Access Link</a></td>
              </tr>
            </tbody>
          </table>

          <h2>How to Download / Access</h2>
          <ol>
            <li>Navigate to the conducting board portal or click the direct link provided in the table above.</li>
            <li>Look for the notification of <strong>${title}</strong>.</li>
            <li>Enter your login credentials (such as Registration ID, Roll Number, and Date of Birth).</li>
            <li>Save the generated document or take a clear printout for future reference.</li>
          </ol>
        `,
        faq: [
          { question: `What is the status of ${title}?`, answer: `The current status is ${status}.` },
          { question: `How can I download/access this?`, answer: `You can access it by visiting the portal via the links provided in the table above.` },
        ]
      };
    }
  }

  return undefined;
}

export function getAllSlugs(): string[] {
  const slugsSet = new Set<string>(Object.keys(postDetails));

  const allLists = [
    admitCards,
    latestUpdates,
    currentJobs,
    results,
    answerKeys,
    syllabusList,
    admissions,
    stateJobNotifications,
    eduUpdates,
    eduNotifications,
    eduResults,
    yojana,
    documents,
    trendingJobs,
    featuredJobs,
    allIndiaJobs
  ];

  for (const list of allLists) {
    for (const item of list) {
      slugsSet.add(generateSlug(item.title));
    }
  }

  return Array.from(slugsSet);
}
