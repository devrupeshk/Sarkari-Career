import { fetchEducations } from "@/lib/api";
import { EducationLevelsPage } from "@/views/EducationLevelsPage";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jobs by Education Level : Government Jobs for All Qualifications",
  description:
    "Find government jobs based on your educational qualification. 10th Pass, 12th Pass, Graduate, ITI, Diploma, B.Tech and more.",
};

export default async function Page() {
  let educations: any[] = [];
  try {
    educations = await fetchEducations();
  } catch (err) {
    console.error("[EducationLevelsPage] Failed to fetch educations:", err);
  }
  return <EducationLevelsPage initialEducations={educations} />;
}
