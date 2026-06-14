export interface DesignationItem {
  slug: string;
  dbSlug: string;
  label: string;
  count: string;
  description: string;
}

export const designations: DesignationItem[] = [
  { slug: "clerk-jobs", dbSlug: "clerk", label: "Clerk", count: "10,230", description: "Latest Clerk, LDC, UDC, and typist government jobs." },
  { slug: "officer-jobs", dbSlug: "officer", label: "Officer", count: "5,420", description: "Gazetted and non-gazetted officer jobs in banks and government sectors." },
  { slug: "computer-deo-jobs", dbSlug: "computer-deo", label: "Computer & DEO", count: "3,892", description: "Data Entry Operator (DEO), Programmer, and computer assistant jobs." },
  { slug: "steno-typist-jobs", dbSlug: "steno-typist", label: "Steno & Typist", count: "2,510", description: "Stenographer, personal assistant, and typist positions in government departments." },
  { slug: "assistant-jobs", dbSlug: "assistant", label: "Assistant", count: "12,654", description: "Office assistant, support staff, and administrative assistant jobs." },
  { slug: "driver-jobs", dbSlug: "driver", label: "Driver", count: "1,820", description: "Staff car driver, ambulance driver, and light/heavy vehicle driver jobs." },
  { slug: "nurse-jobs", dbSlug: "nurse", label: "Nurse", count: "4,560", description: "Staff nurse, ANM, GNM, and nursing officer vacancies in government hospitals." },
  { slug: "sports-jobs", dbSlug: "sports", label: "Sports Quota", count: "980", description: "Government recruitments for sportspersons under sports quota." },
  { slug: "teacher-jobs", dbSlug: "teacher", label: "Teacher", count: "15,430", description: "TGT, PGT, PRT, school teacher, lecturer, and professor government recruitments." },
  { slug: "it-engineer-jobs", dbSlug: "it-engineer", label: "IT & Engineer", count: "6,780", description: "Software engineer, system analyst, network engineer, and IT officer jobs." },
  { slug: "doctor-jobs", dbSlug: "doctor", label: "Doctor", count: "2,150", description: "Medical officer, specialist doctor, dentist, and veterinarian government posts." },
  { slug: "apprentice-jobs", dbSlug: "apprentice", label: "Apprentice", count: "22,450", description: "Apprentice training vacancies in public sector undertakings (PSUs) and railways." },
  { slug: "scientist-jobs", dbSlug: "scientist", label: "Scientist", count: "1,120", description: "Scientific officer, researcher, and scientist posts in DRDO, ISRO, and CSIR." }
];
