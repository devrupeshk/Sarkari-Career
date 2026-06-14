import { GenericSectionPage } from "@/views/GenericSectionPage";
import { eduUpdates } from "@/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Update : Latest Education News, Board Results & Notifications",
  description:
    "Get the latest educational news, board results, and academic notifications from across India.",
};

export default function UniversityUpdatePage() {
  return <GenericSectionPage title="University Update" jobs={eduUpdates} />;
}
