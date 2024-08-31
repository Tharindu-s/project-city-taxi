import Layout from "@/components/layout/Layout";
import Cta1 from "@/components/sections/Cta1";
import Faq1 from "@/components/sections/Faq1";
import Hero1 from "@/components/sections/Hero1";
import Marque1 from "@/components/sections/Marque1";
export default function Home1Single() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} onePageNav>
        <Hero1 />
        <Marque1 />
        <Faq1 />
        <Cta1 />
      </Layout>
    </>
  );
}
