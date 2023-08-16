
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";



import Layout from "../components/layout/Layout";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";






const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/read-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in total");
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadmore();
  }, [page]);

  
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  
  const getFilterData = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filter",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong 2");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) getFilterData();
  }, [checked, radio]);

  return (
    <Layout title={"home pages"}>
      <div className="row mt-3" style={{ marginLeft: "10px" }}>
        <div className="col-md-2">
          <h6 className="text-center">Category Filter</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h6 className="text-center mt-4">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-md-10">
          <h5 className="text-center">All Products</h5>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2 shadow p-3 mb-5 bg-white rounded"
                style={{ width: "18rem" }}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top"
                  style={{ height: "200px", width: "250px" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                  <button
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                    className="btn btn-primary ms-1"
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("item added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading.." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
