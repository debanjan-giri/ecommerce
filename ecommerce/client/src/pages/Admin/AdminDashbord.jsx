import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashbord = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card mt-5 w60">
              <h4>Name : {auth?.user?.name}</h4>
              <h4>Email : {auth?.user?.email}</h4>
              <h4>Phone : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
