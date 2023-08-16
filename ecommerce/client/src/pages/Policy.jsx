
import React from "react";


import Layout from "../components/layout/Layout";


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          <p>
            We may collect personal information such as your name, email
            address, shipping address, and payment details when you place an
            order on our website. We also collect non-personal information,
            including your IP address, browser type, and device information, to
            enhance your browsing experience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
