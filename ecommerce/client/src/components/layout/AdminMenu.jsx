import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h1>Admin</h1>
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            orders
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
