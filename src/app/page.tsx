import Layout from "@/components/layout/Layout";
import Cta1 from "@/components/sections/Cta1";
import Hero1 from "@/components/sections/Hero1";
// import Marque1 from "@/components/sections/Marque1";
export default function Home1Single() {
  return (
    <div>
      <Layout breadcrumbTitle={null} headerStyle={1} footerStyle={1} onePageNav>
        <Hero1 />
        <Cta1 />
      </Layout>
    </div>
  );
}
