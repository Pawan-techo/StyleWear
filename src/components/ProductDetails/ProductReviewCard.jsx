import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const ProductReviewCard = ({ review, userRating }) => {
  const user = userRating?.user || { firstName: "Anonymous", lastName: "" };

  return (
    <Box className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{xs:2,sm:1}} className="flex justify-center sm:justify-start">
          <Avatar sx={{ width: 48, height: 48, bgcolor: "#3949AB" }}>
            {user.firstName?.[0] || "A"}
          </Avatar>
        </Grid>
        <Grid size={{xs:10,sm:11}}>
          <div className="space-y-1">
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-900 leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {new Date(review.createAt).toLocaleDateString()}
              </p>
            </div>
            <Rating
              value={userRating?.rating || 0}
              name="read-only"
              readOnly
              precision={0.5}
              size="small"
            />
            <p className="text-gray-700 text-sm sm:text-base leading-snug">
              {review.review}
            </p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductReviewCard;
