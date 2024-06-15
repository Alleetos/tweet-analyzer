// pages/index.tsx
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        <Main />
      </div>
      <Footer />
    </div>
  );
}
