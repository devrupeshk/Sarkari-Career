export interface JobItem {
  title: string;
  status?: 'NEW' | 'OUT' | 'SOON' | 'PDF' | 'ONLINE' | 'EXTEND' | 'ALERT' | 'STARTED' | 'DATE' | 'APPLY NOW';
  href?: string;
  department?: string;
  lastDate?: string;
  meta?: string;
  slug?: string;
}

export const admitCards: JobItem[] = [
  { title: 'UPSC CSE Prelims Admit Card 2026', status: 'OUT' },
  { title: 'UP Home Guard Exam City 2026', status: 'OUT' },
  { title: 'NCHM JEE 2026 Exam City', status: 'OUT' },
  { title: 'Bihar Vidhan Parishad LDC, DEO Admit Card 2026', status: 'OUT' },
  { title: 'RMS Admission Joining Letters 2026' },
  { title: 'JSSC Paramedical Staff Rejection List 2026', status: 'NEW' },
  { title: 'BPSC 71st Mains Admit Card 2026', status: 'OUT' },
  { title: 'MPPSC State Service Exam SSE Admit Card 2026' },
  { title: 'MPPSC State Forest Service Exam SFS Admit Card 2026' },
  { title: 'HSSC Constable & Forest Guard PMT Admit Card 2026', status: 'DATE' },
  { title: 'Bihar Vidhan Parishad Security Guard Physical Admit Card 2026' },
];

export const latestUpdates: JobItem[] = [
  { title: 'UPSC Scientist B Recruitment 2026', status: 'NEW' },
  { title: 'OFSS Bihar 11th Admission 2026', status: 'ALERT' },

  { title: 'UP Home Guard Exam City', status: 'OUT' },
  { title: 'BRLPS JEEVIKA Result & Cut Off 2026', status: 'OUT' },
  { title: 'LNMU UG Semester 3 Admit Card 2024-28', status: 'SOON' },
  { title: 'BCECE Application Form 2026', status: 'STARTED' },
  { title: 'SSC Selection Post Phase 14 Vacancy 2026', status: 'NEW' },
  { title: 'HSSC Constable & Forest Guard PMT Admit Card 2026', status: 'DATE' },
  { title: 'JPSC JET Exam City 2026', status: 'OUT' },
  { title: 'NEET UG Exam City Slip 2026', status: 'OUT' },
  { title: 'RSSB Agriculture Supervisor Admit Card 2026', status: 'OUT' },
];

export const currentJobs: JobItem[] = [
  { title: 'UPSC Scientist B Recruitment 2026', status: 'NEW' },
  { title: 'LIC HFL Junior Assistant Recruitment 2026', status: 'NEW' },

  { title: 'RBI JE Recruitment 2026' },
  { title: 'SSC Selection Post Phase 14 Vacancy 2026', status: 'NEW' },
  { title: 'Patna High Court Computer Operator-cum-Typist Vacancy' },
  { title: 'MPPCB AE Environment Recruitment 2026' },
  { title: 'Chandigarh Clerk and Steno Recruitment 2026' },
  { title: 'CRPF Constable Tradesman Recruitment 2026', status: 'NEW' },
  { title: 'MPESB Nursing Officer and Sister Tutor Vacancy 2026' },
  { title: 'UPSSSC Excise Constable Recruitment 2026' },
  { title: 'BTSC Lab Assistant Recruitment 2026', status: 'NEW' },
];

export const results: JobItem[] = [
  { title: 'BRLPS JEEVIKA Result & Cut Off 2026', status: 'OUT' },
  { title: 'HSSC Constable Shortlisted Candidates List For PMT 2026' },
  { title: 'AIIMS NORCET 10th Result 2026', status: 'OUT' },
  { title: 'BHU School Admission E-Lottery Result 2026' },
  { title: 'CBSE Class 10th Results 2026', status: 'OUT' },
  { title: 'MP Board Class 10th and 12th Result 2026', status: 'OUT' },
  { title: 'Bihar Board 12th Result 2026', status: 'OUT' },
  { title: 'CG TET Result 2026' },
  { title: 'UPSC Civil Services Main Result 2026', status: 'OUT' },
  { title: 'IBPS PO XII Mains Result 2026', status: 'OUT' },
];

export const answerKeys: JobItem[] = [
  { title: 'RRB NTPC Graduate Level Answer Key 2026', status: 'OUT' },
  { title: 'Indian Air Force Agniveervayu Answer Key 2026' },
  { title: 'JSSC ANM Answer Key 2026' },
  { title: 'UPSSSC Stenographer Revised Answer Key 2026' },
  { title: 'RRB Technician Grade 1 Answer Key 2026' },
  { title: 'CG Vyapam Lab Assistant Answer Key 2026' },
  { title: 'MPESB ASI & HC Computer Answer Key 2026' },
  { title: 'DRDO CEPTAM 11 Answer Key 2026' },
  { title: 'SSC MTS Final Answer Key 2026', status: 'OUT' },
  { title: 'UPSC IES Prelims Answer Key 2026', status: 'OUT' },
];

export const syllabus: JobItem[] = [
  { title: 'CRPF Constable Tradesman Syllabus 2026', status: 'PDF' },
  { title: 'RRB ALP Syllabus 2026', status: 'PDF' },
  { title: 'RBI Grade B Syllabus 2026' },
  { title: 'RSSB Forest Guard and Forester Syllabus 2026' },
  { title: 'UPSSSC Lower PCS Syllabus 2026' },
  { title: 'MP PAT Syllabus 2026' },
  { title: 'NABARD Development Assistant Syllabus 2026' },
  { title: 'UPTET Syllabus 2026' },
  { title: 'SSC CGL Tier 2 Syllabus 2026', status: 'PDF' },
  { title: 'BPSC 71st Combined Syllabus 2026', status: 'PDF' },
];

export const admissions: JobItem[] = [
  { title: 'DCECE Bihar Polytechnic', status: 'ONLINE' },
  { title: 'Bihar ITI Online Form 2026', status: 'EXTEND' },
  { title: 'NIMCET 2026 Application Form' },
  { title: 'AP POLYCET Application 2026' },
  { title: 'Jharkhand BEd Entrance Online' },
  { title: 'CUET UG 2026 Re-Open Online', status: 'NEW' },
  { title: 'PTET 2026 Online Application' },
  { title: 'TS POLYCET Application 2026' },
  { title: 'JNU Entrance Exam JNUEE 2026 Online' },
  { title: 'BHU UG Admission Form 2026', status: 'ONLINE' },
];

export const stateJobNotifications: JobItem[] = [
  { title: 'Ordnance Factory Chanda Tenure Based DBW Offline Form 2026' },
  { title: 'UPSSSC Havaldar Instructor Online Form 2026' },
  { title: 'DESGPC 268 Assistant Professor/Lecturer Online Form 2026' },
  { title: 'SSB Odisha Librarian Online Form 2026' },
  { title: 'GPSSB Laboratory Technician Online Form 2026' },
  { title: 'Karnataka High Court Civil Judge Online Form 2026' },
  { title: 'HPRCA 894 Teacher Online Form 2026' },
  { title: 'Central Sanskrit University Non Teaching Online Form 2026' },
  { title: 'NVS Teaching and Non Teaching Online Form 2026' },
  { title: 'Andaman & Nicobar Health Department ANM Online Form 2026' },
  { title: 'GPSSB Gram Sevak & Pashudhan Nirikshak Online Form 2026' },
  { title: 'GMCH 100 Senior Resident Walk-in 2026' },
  { title: 'CSIR NIScPR Project Staff Walkin 2026' },
  { title: 'JPSC Assistant Professor Online Form 2026' },
  { title: 'UKMSSB ANM Health Worker Online Form 2026' },
  { title: 'BTSC 726 Instructor Online Form 2026' },
];

export const eduUpdates: JobItem[] = [
  { title: 'MHT CET 2026 PCB Hall Ticket Out', status: 'OUT' },
  { title: 'NTA NCHM JEE Exam City Details 2026 Out', status: 'OUT' },
  { title: 'VITEEE Slot Booking 2026 Out', status: 'OUT' },
  { title: 'ICAI CA Admit Card May 2026 Out', status: 'OUT' },
  { title: 'KVS 2nd Admission Result 2026' },
  { title: 'CBSE Class 10th Result 2026 Out', status: 'OUT' },
  { title: 'NEET PG 2026 Postponed Notification', status: 'ALERT' },
  { title: 'JEE Advanced 2026 Registration Open', status: 'STARTED' },
  { title: 'AIIMS INI CET July 2026 Admit Card', status: 'SOON' },
  { title: 'UGC NET June 2026 Notification Out', status: 'NEW' },
];

export const eduNotifications: JobItem[] = [
  { title: 'JAC Class 9th Result 2026 OUT', status: 'OUT' },
  { title: 'NTA NCHM JEE Exam City Details 2026 Out' },
  { title: 'JIPMAT 2026 Registration Begins', status: 'NEW' },
  { title: 'GPAT 2026 Scorecard and Final Answer Key Out', status: 'OUT' },
  { title: 'Bihar Board 10th and 12th Compartment Exam Date 2026', status: 'OUT' },
  { title: 'TS SBTET Result 2026 OUT', status: 'OUT' },
  { title: 'NCHM JEE 2026 Admit Card Released', status: 'OUT' },
  { title: 'ICAR AIEEA UG 2026 Online Application', status: 'STARTED' },
  { title: 'IGNOU BEd Entrance Result 2026', status: 'OUT' },
  { title: 'TISSNET 2026 Registration Extended', status: 'EXTEND' },
];

export const eduResults: JobItem[] = [
  { title: 'Dr MGR Medical University Result 2026 Out', status: 'OUT' },
  { title: 'Punjabi University Result 2026 Out', status: 'OUT' },
  { title: 'Pondicherry University Result 2026 Out', status: 'OUT' },
  { title: 'MP Board Class 10th, 12th Result 2026 Out', status: 'OUT' },
  { title: 'AP Inter 1st 2nd Year Results 2026 Out', status: 'OUT' },
  { title: 'KVS Class 1 Lottery Result 2026' },
  { title: 'DU Semester Exam Results Nov-Dec 2025', status: 'OUT' },
  { title: 'Anna University UG/PG Results 2026', status: 'OUT' },
  { title: 'VTU Semester Results 2026', status: 'OUT' },
  { title: 'Mumbai University IDE Result 2026', status: 'OUT' },
];

export const yojana: JobItem[] = [
  { title: 'CM Pratigya Yojana 2025 Apply Online' },
  { title: 'Bihar Student Credit Card Apply Online, BSCC Login' },
  { title: 'Bihar Mukhyamantri Nischay Swayam Sahayata Bhatta Yojana Apply' },
  { title: 'PM Internship Scheme 2024 Online' },
  { title: 'Bihar Rajya Fasal Sahayata Yojana 2024' },
  { title: 'Seekho Kamao Yojana Online' },
  { title: 'PM Kisan Check Status 2024' },
  { title: 'Har Ghar Tiranga Upload Selfie 2024' },
  { title: 'Pradhan Mantri Awas Yojana 2.0 List 2026' },
  { title: 'Ayushman Bharat Golden Card Registration 2026' },
];

export const documents: JobItem[] = [
  { title: 'Aadhar Card Download Online' },
  { title: 'PAN Card Download / Apply' },
  { title: 'Voter ID Card Download' },
  { title: 'Ayushman Card Online Apply' },
  { title: 'Ayushman Card Download' },
  { title: 'ABHA Card Download' },
  { title: 'e-Shram Card Download PDF' },
  { title: 'BCECE Apply Online, Notification' },
  { title: 'Ration Card Online Apply/Status 2026' },
  { title: 'Birth Certificate Apply Online Portal' },
];

export const trendingJobs: JobItem[] = [
  { title: 'UPSC Scientist B Recruitment 2026', status: 'NEW', meta: 'UPSC | Last Date: 12 June 2026' },
  { title: 'OFSS Bihar 11th Admission 2026', status: 'ALERT', meta: 'Bihar Board | Last Date: 30 May 2026' },

  { title: 'CRPF 9195 Constable Tradesman Recruitment 2026', status: 'NEW', meta: 'CRPF | Last Date: 20 June 2026' },
  { title: 'SSC Selection Post Phase 14 Vacancy 2026', status: 'NEW', meta: 'SSC | Last Date: 20 June 2026' },
  { title: 'BPSC 71st Mains Admit Card 2026', status: 'OUT', meta: 'BPSC | Released' },
  { title: 'Railway RRB ALP CEN 01/2026 Notification', status: 'NEW', meta: 'Railway | Last Date: 15 June 2026' },
  { title: 'LIC HFL Junior Assistant 2026', status: 'NEW', meta: 'LIC | Last Date: 30 May 2026' },
  { title: 'SSB Constable GD Recruitment 2026', status: 'APPLY NOW', meta: 'Defence | Last Date: 25 May 2026' },
  { title: 'UP TET 2026 Online Form', status: 'STARTED', meta: 'Teaching | Exam: July 2026' },
  { title: 'IBPS PO XII Mains Admit Card', status: 'OUT', meta: 'Banking | Released' },
  { title: 'RBI Grade B 2026 Notification', status: 'SOON', meta: 'RBI | Expected June' },
];

export const featuredJobs: JobItem[] = [
  { title: 'SSB Constable, HC, ASI, SI Recruitment 2026', status: 'APPLY NOW', meta: 'Posts: 827+ | Last Date: 30 May 2026', department: 'Defence' },
  { title: 'BTSC Lab Assistant Recruitment 2026', status: 'NEW', meta: 'Posts: 500+ | Last Date: 25 May 2026', department: 'Medical' },
  { title: 'CRPF Constable Tradesman Recruitment 2026', status: 'APPLY NOW', meta: 'Posts: 9195 | Last Date: 20 June 2026', department: 'Defence' },
  { title: 'UP TET 2026 Online Application Form', status: 'STARTED', meta: 'Exam Date: July 2026 | Apply Online', department: 'Education' },
  { title: 'SSC GD Constable 2026 Notification', status: 'NEW', meta: 'Posts: 25000+ | Coming Soon', department: 'SSC' },
  { title: 'Railway RRC Group D Recruitment 2026', status: 'NEW', meta: 'Posts: 100000+ | Last Date: 30 June 2026', department: 'Railway' },
  { title: 'SBI Clerk Recruitment 2026', status: 'NEW', meta: 'Posts: 8000+ | Apply Online', department: 'Banking' },
  { title: 'India Post GDS Recruitment 2026', status: 'APPLY NOW', meta: 'Posts: 35000+ | 10th Pass Job', department: 'Postal' },
  { title: 'CISF Constable Tradesman 2026', status: 'APPLY NOW', meta: 'Posts: 1000+ | Last Date: 15 June 2026', department: 'Defence' },
  { title: 'Air Force Agniveervayu 01/2026', status: 'STARTED', meta: 'Apply Now | Last Date: 20 May 2026', department: 'Defence' },
];

export const allIndiaJobs: JobItem[] = [
  { title: 'UPSC Scientist B Recruitment 2026', department: 'UPSC', lastDate: '12 June 2026', status: 'NEW' },
  { title: 'LIC HFL Junior Assistant Recruitment 2026', department: 'LIC HFL', lastDate: '30 May 2026', status: 'NEW' },

  { title: 'RBI JE Recruitment 2026', department: 'Reserve Bank of India', lastDate: '25 May 2026' },
  { title: 'SSC Selection Post Phase 14 Vacancy 2026', department: 'SSC', lastDate: '20 June 2026', status: 'NEW' },
  { title: 'CRPF Constable Tradesman Recruitment 2026', department: 'CRPF', lastDate: '20 June 2026', status: 'APPLY NOW' },
  { title: 'Indian Bank 350 SO Recruitment 2026', department: 'Indian Bank', lastDate: '15 May 2026' },
  { title: 'NCL 577 Trainee Recruitment 2026', department: 'Northern Coalfields', lastDate: '28 May 2026' },
  { title: 'Railway RRB ALP CEN 01/2026 Notification', department: 'RRB', lastDate: '15 June 2026', status: 'NEW' },
  { title: 'SSB Constable Tradesman Online Form 2026', department: 'SSB', lastDate: '30 May 2026' },
  { title: 'POWERGRID 660 Non Executive Online Form 2026', department: 'POWERGRID', lastDate: '22 May 2026' },
  { title: 'MCL 500 Asst Foreman, Technician Online Form 2026', department: 'MCL', lastDate: '25 May 2026' },
  { title: 'Aadhaar Operator Supervisor Recruitment 2026', department: 'UIDAI', lastDate: '18 May 2026' },
  { title: 'Punjab and Sind Bank 1000 LBO Online Form 2026', department: 'Punjab & Sind Bank', lastDate: '12 May 2026', status: 'NEW' },
  { title: 'ITBP Constable Barber Washerman Recruitment 2026', department: 'ITBP', lastDate: '10 June 2026' },
  { title: 'Territorial Army Officer Online Form 2026', department: 'Territorial Army', lastDate: '15 June 2026', status: 'NEW' },
  { title: 'Indian Navy Agniveer Online Form 2026', department: 'Indian Navy', lastDate: '22 May 2026' },
];

export const educationLevels = [
  { count: '21,742', label: '10th Pass' },
  { count: '777', label: '8th Pass' },
  { count: '6,893', label: '12th Pass' },
  { count: '12,230', label: 'Diploma' },
  { count: '15,710', label: 'ITI' },
  { count: '8,495', label: 'B.Tech/B.E' },
  { count: '3,455', label: 'B.Com' },
  { count: '12,609', label: 'Any Graduate' },
  { count: '1,227', label: 'Post Graduate' },
];

export const categories = [
  { icon: 'Building2', label: 'Current Job', href: '/current-job' },
  { icon: 'Landmark', label: 'Bank Jobs', href: '/bank' },
  { icon: 'BookOpen', label: 'Teaching Jobs', href: '/teaching' },
  { icon: 'Train', label: 'Railway Jobs', href: '/railway' },
  { icon: 'Shield', label: 'Police/Defence Jobs', href: '/police-defence' },
  { icon: 'Briefcase', label: 'Engineering Jobs', href: '/engineering' },
  { icon: 'Stethoscope', label: 'Medical Jobs', href: '/medical' },
  { icon: 'FileText', label: 'SSC Jobs', href: '/ssc' },
  { icon: 'Globe', label: 'UPSC Jobs', href: '/upsc' },
  { icon: 'GraduationCap', label: 'Education', href: '/education' },
];

export const faqData = [
  { q: 'What is Sarkari Career Hub?', a: 'Sarkari Career Hub is a comprehensive job portal that provides the fastest updates on government jobs, results, admit cards, syllabus, answer keys, education updates, and important documents across India.' },
  { q: 'Does this website cover all India recruitment?', a: 'Yes, we cover job updates from all 28 states and 8 Union Territories of India, along with all central government recruitments including SSC, IBPS, Railway, Defence, and more.' },
  { q: 'How frequently is the content updated?', a: 'Our team updates the portal multiple times daily to ensure you get the latest job notifications, admit cards, and results as soon as they are announced.' },
  { q: 'Is Sarkari Career Hub free to use?', a: 'Yes, all services on Sarkari Career Hub are completely free. You can browse jobs, download admit cards, check results, and access all resources without any charges.' },
  { q: 'How can I get instant job alerts?', a: 'Join our Telegram channel and WhatsApp group for instant notifications. You can also subscribe to our email alerts for daily job updates.' },
  { q: 'Does this website take any user data?', a: 'No, we do not collect any sensitive personal data. You can browse all information anonymously without creating an account.' },
];

export const categoryMeta: Record<string, { title: string; description: string; icon: string }> = {
  'current-job': { title: 'Current Job', description: 'Find the latest central government job notifications, online forms, and recruitment updates from across India.', icon: 'Building2' },
  'bank': { title: 'Bank Jobs', description: 'Latest bank recruitment notifications including IBPS, SBI, RBI, and other banking sector jobs.', icon: 'Landmark' },
  'teaching': { title: 'Teaching Jobs', description: 'Find teaching faculty jobs, professor vacancies, and education sector recruitment across India.', icon: 'BookOpen' },
  'railway': { title: 'Railway Jobs', description: 'Indian Railways recruitment updates including RRB, RRC, NTPC, ALP, Group D, and more.', icon: 'Train' },
  'police-defence': { title: 'Police & Defence Jobs', description: 'Police, Army, Navy, Air Force, and paramilitary forces recruitment notifications.', icon: 'Shield' },
  'engineering': { title: 'Engineering Jobs', description: 'Engineering sector government jobs for civil, mechanical, electrical, and other disciplines.', icon: 'Briefcase' },
  'medical': { title: 'Medical Jobs', description: 'Medical officer, nursing, paramedic, and healthcare professional jobs in government hospitals.', icon: 'Stethoscope' },
  'ssc': { title: 'SSC Jobs', description: 'Staff Selection Commission recruitment for CGL, CHSL, MTS, JE, and GD Constable.', icon: 'FileText' },
  'upsc': { title: 'UPSC Jobs', description: 'Union Public Service Commission exams including Civil Services, IES, NDA, and CDS.', icon: 'Globe' },
  'education': { title: 'Education Updates', description: 'Education-related updates including entrance exams, university results, and academic notifications.', icon: 'GraduationCap' },
};
