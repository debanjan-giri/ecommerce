import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProducts, setProducts] = useState([]);
  
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/read-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Products List</h2>
          <div className="d-flex flex-wrap">
            {allProducts?.map((p) => (
              <div
                className="card m-2 shadow p-3 mb-4 bg-white rounded"
                style={{ width: "15rem" }}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top"
                  style={{ height: "150px", width: "170px" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
