import type { Metadata } from "next";
import Header from "@/components/Header";
import Spine from "@/components/Spine";
import Baseline from "@/components/Baseline";
import BracketCursor from "@/components/BracketCursor";
import InstrumentRail from "@/components/InstrumentRail";
import Recede from "@/components/Recede";
import SecHero from "@/components/security/SecHero";
import BinderTest from "@/components/security/BinderTest";
import EnvSurvey from "@/components/security/EnvSurvey";
import Reconstruction from "@/components/security/Reconstruction";
import BlindCase from "@/components/security/BlindCase";
import FourHours from "@/components/security/FourHours";
import ReadinessScore from "@/components/security/ReadinessScore";
import TrainWhatFailed from "@/components/security/TrainWhatFailed";

export const metadata: Metadata = {
  title: "Schedule C · The Security Practice · Schulte & Co.",
  description:
    "Incident readiness, measured: your environment reconstructed in an isolated range, a sealed blind case, four observed hours, one readiness score, and training built from what failed.",
};

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="survey">
        <Spine />
        <SecHero />
        <BinderTest />
        <EnvSurvey />
        <Reconstruction />
        <BlindCase />
        <FourHours />
        <ReadinessScore />
        <TrainWhatFailed />
      </main>
      <Baseline />
      <BracketCursor />
      <InstrumentRail />
      <Recede />
    </>
  );
}
