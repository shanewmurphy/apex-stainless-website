import Header from "./components/Header";
import Intro from "./components/Intro";
import IndustriesScrollTriggerSection from "./components/Horizontal-Trigger-industries";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 font-sans">
      <Header />
      <Intro />
      <IndustriesScrollTriggerSection />
    </main>
  );
}
