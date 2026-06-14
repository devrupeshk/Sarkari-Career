import { fetchDesignations } from "@/lib/api";
import { DesignationsPage } from "@/views/DesignationsPage";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Govt Jobs by Designation: Clerk, Officer, Assistant Vacancies",
  description:
    "Find central and state government jobs based on specific designations. Apply online for Clerk, Assistant, Officer, Engineer, Typist, and various other posts.",
};

export default async function Page() {
  let designations: any[] = [];
  try {
    designations = await fetchDesignations();
  } catch (err) {
    console.error("[DesignationsPage] Failed to fetch designations:", err);
  }
  return <DesignationsPage initialDesignations={designations} />;
}
