
import React from "react";


import Layout from "../components/layout/Layout";


const About = () => {
  return ( 
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            [Your Company Name] is a leading ecommerce platform that offers a
            wide range of [product or service]. We are dedicated to providing
            our customers with a seamless and convenient online shopping
            experience. With our user-friendly interface, secure payment
            options, and exceptional customer service, we strive to exceed your
            expectations and become your trusted source for [product or service].
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
