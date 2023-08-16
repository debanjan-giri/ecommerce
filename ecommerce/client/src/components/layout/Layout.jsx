import React from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title, decription, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={decription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "100vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  decription: "Ecommerce App",
  keywords: "Ecommerce App",
  author: "Debanjan Code",
};

export default Layout;
