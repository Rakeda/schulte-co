import Header from "@/components/Header";
import Spine from "@/components/Spine";
import Baseline from "@/components/Baseline";
import BracketCursor from "@/components/BracketCursor";
import InstrumentRail from "@/components/InstrumentRail";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HiddenCosts from "@/components/sections/HiddenCosts";
import Method from "@/components/sections/Method";
import FinancialCase from "@/components/sections/FinancialCase";
import AiPhilosophy from "@/components/sections/AiPhilosophy";
import PartnersClose from "@/components/sections/PartnersClose";

export default function Page() {
  return (
    <>
      <Header />
      <main className="survey">
        <Spine />
        <Hero />
        <Problem />
        <HiddenCosts />
        <Method />
        <FinancialCase />
        <AiPhilosophy />
        <PartnersClose />
      </main>
      <Baseline />
      <BracketCursor />
      <InstrumentRail />
    </>
  );
}
