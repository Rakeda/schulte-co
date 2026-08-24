import type { Metadata } from "next";
import Header from "@/components/Header";
import Spine from "@/components/Spine";
import Baseline from "@/components/Baseline";
import BracketCursor from "@/components/BracketCursor";
import InstrumentRail from "@/components/InstrumentRail";
import Recede from "@/components/Recede";
import AiHero from "@/components/ai/AiHero";
import ToolPile from "@/components/ai/ToolPile";
import FunctionSurvey from "@/components/ai/FunctionSurvey";
import Anatomy from "@/components/ai/Anatomy";
import Roadmap from "@/components/ai/Roadmap";
import Ownership from "@/components/ai/Ownership";

export const metadata: Metadata = {
  title: "Schedule B · The AI Practice · Schulte & Co.",
  description:
    "A functional AI roadmap with ownership, drawn from your organization function by function. Alignment before automation: not a pile of tools.",
};

export default function AiPage() {
  return (
    <>
      <Header />
      <main className="survey">
        <Spine />
        <AiHero />
        <ToolPile />
        <FunctionSurvey />
        <Anatomy />
        <Roadmap />
        <Ownership />
      </main>
      <Baseline />
      <BracketCursor />
      <InstrumentRail />
      <Recede />
    </>
  );
}
