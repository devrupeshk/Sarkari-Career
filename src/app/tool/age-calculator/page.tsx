import { Metadata } from "next";
import { AgeCalculator } from "@/sections/AgeCalculator";

export const metadata: Metadata = {
  title:
    "Age Calculator - Calculate Your Exact Age for Government Jobs | Sarkari Career Hub",
  description:
    "Free age calculator tool to calculate your exact age in years, months, days, hours, and minutes. Essential for checking government job eligibility.",
  keywords:
    "age calculator, government job eligibility, DOB calculator, age calculation",
};

export default function AgeCalculatorPage() {
  return (
    <>
      <main>
        <AgeCalculator />
      </main>
    </>
  );
}
