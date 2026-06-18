import Header from "./components/Header";
import Intro from "./components/Intro";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-950 font-sans">
      <Header />
      <Intro />
    </main>
  );
}
