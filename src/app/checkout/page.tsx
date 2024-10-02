import { CheckoutFormComponent } from "@/components/checkout-form";
import Layout from "@/components/layout/Layout";
import React from "react";

const Page = () => {
  return (
    <div>
      <Layout breadcrumbTitle={null} headerStyle={1} footerStyle={1} onePageNav>
        <CheckoutFormComponent />
      </Layout>
    </div>
  );
};

export default Page;
