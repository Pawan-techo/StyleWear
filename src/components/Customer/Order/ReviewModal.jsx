import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createRating, createReview } from "../../../state/Rate&Review/Action";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ productId, open, handleClose }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setRating(0);
      setComment("");
    }
  }, [open]);
  const handleSubmit = () => {
    if (!rating) return alert("Please give a rating!");

    dispatch(createRating(rating,productId));

    if (comment.trim()) {
      dispatch(createReview(comment,productId));
    }
    handleClose();
    navigate("/orders/history");
  };
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Rate & Review Product</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl cursor-pointer transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a review (optional)"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value.replace(/\n/g, " "))}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!rating}
            className={`px-4 py-2 rounded cursor-pointer text-white ${
              rating
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
