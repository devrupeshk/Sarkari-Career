import { Building2, MapPin, Landmark, BookOpen, Train, Shield, Briefcase, GraduationCap, Stethoscope, FileText, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CategoryDef {
  slug: string;
  label: string;
  icon: LucideIcon;
  color: string;
  jobCount: number;
  description: string;
  subcategories?: string[];
}

export const allCategoryDefs: CategoryDef[] = [
  {
    slug: 'current-job',
    label: 'Current Job',
    icon: Building2,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    jobCount: 124,
    description: 'Central government jobs across all departments including ministries, PSUs, and autonomous bodies.',
    subcategories: ['SSC', 'UPSC', 'Railway', 'Defence', 'Banking', 'Postal'],
  },
  {
    slug: 'bank',
    label: 'Bank Jobs',
    icon: Landmark,
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    jobCount: 64,
    description: 'Bank recruitment notifications including IBPS, SBI, RBI, NABARD, and other banking institutions.',
    subcategories: ['IBPS', 'SBI', 'RBI', 'NABARD', 'RRB', 'Private Banks'],
  },
  {
    slug: 'teaching',
    label: 'Teaching Jobs',
    icon: BookOpen,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    jobCount: 92,
    description: 'Teaching faculty jobs, professor vacancies, TET exams, and education sector recruitment.',
    subcategories: ['TET', 'PRT', 'PGT', 'Professor', 'Lecturer', 'Principal'],
  },
  {
    slug: 'railway',
    label: 'Railway Jobs',
    icon: Train,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    jobCount: 85,
    description: 'Indian Railways recruitment updates including RRB, RRC, NTPC, ALP, Group D, and more.',
    subcategories: ['RRB NTPC', 'RRB ALP', 'RRC Group D', 'RPF', 'Metro', 'RITES'],
  },
  {
    slug: 'police-defence',
    label: 'Police & Defence Jobs',
    icon: Shield,
    color: 'bg-red-50 text-red-600 border-red-200',
    jobCount: 120,
    description: 'Police, Army, Navy, Air Force, Coast Guard, and paramilitary forces recruitment.',
    subcategories: ['Army', 'Navy', 'Air Force', 'Police', 'CRPF', 'BSF'],
  },
  {
    slug: 'engineering',
    label: 'Engineering Jobs',
    icon: Briefcase,
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    jobCount: 78,
    description: 'Engineering sector government jobs for civil, mechanical, electrical, and IT disciplines.',
    subcategories: ['Civil', 'Mechanical', 'Electrical', 'IT', 'Mining', 'Survey'],
  },
  {
    slug: 'medical',
    label: 'Medical Jobs',
    icon: Stethoscope,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    jobCount: 56,
    description: 'Medical officer, nursing, paramedic, and healthcare professional jobs in government hospitals.',
    subcategories: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Tech', 'AIIMS', 'NRHM'],
  },
  {
    slug: 'ssc',
    label: 'SSC Jobs',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    jobCount: 110,
    description: 'Staff Selection Commission recruitment for CGL, CHSL, MTS, JE, and GD Constable.',
    subcategories: ['CGL', 'CHSL', 'MTS', 'Stenographer', 'JE', 'CPO'],
  },
  {
    slug: 'upsc',
    label: 'UPSC Jobs',
    icon: Globe,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    jobCount: 34,
    description: 'Union Public Service Commission exams including Civil Services, IES, NDA, and CDS.',
    subcategories: ['IAS/IPS', 'IES', 'NDA', 'CDS', 'CMS', 'IFS'],
  },
  {
    slug: 'education',
    label: 'Education Updates',
    icon: GraduationCap,
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    jobCount: 45,
    description: 'Education-related updates including entrance exams, university results, and academic notifications.',
    subcategories: ['Entrance Exams', 'University', 'Admissions', 'Scholarships', 'Results', 'Syllabus'],
  },
];
