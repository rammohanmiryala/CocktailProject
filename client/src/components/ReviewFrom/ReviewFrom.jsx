import React, { useState } from "react";
import { useMutation } from "@apollo/client";



const ReviewForm = ({ thoughtId }) => {
  const handleFormSubmit = () => {};
  const handleChange = () => {};
 

  return (
    <div>
      <h5>Add review to drinks</h5>

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name=""
            placeholder="Add your comment..."
            value={1}
            className="form-input w-100"
            style={{ lineHeight: "1.5" }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
