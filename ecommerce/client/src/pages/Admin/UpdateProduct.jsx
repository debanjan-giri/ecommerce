import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [DBcategories, setDBCategories] = useState([]);
  const [name, setName] = useState("");
  const [desciption, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");

  
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${param.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setPhoto(data.product.photo);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/read-category"
      );
      if (data?.success) {
        setDBCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  
  useEffect(() => {
    getAllCategory();
  }, []);

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", desciption);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        setTimeout(() => {
          toast.success("product is updated");
        }, 1000);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somtihing went wrong update");
    }
  };

  
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("product is deleted");
        }, 1000);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somtihing went wrong delete");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4>Update Product</h4>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {DBcategories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/product/get-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={desciption}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger m-3" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
