import React from "react";

const CategoryForm = ({ propValue, propSetValue, propHandleSubmit }) => {
  return (
    <>
      <form onSubmit={propHandleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={propValue}
            onChange={(e) => propSetValue(e.target.value)}
            placeholder="Enter Category Name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
