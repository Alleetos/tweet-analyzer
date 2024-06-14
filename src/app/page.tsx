import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
