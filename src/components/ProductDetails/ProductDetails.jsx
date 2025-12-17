import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Grid from "@mui/material/Grid";
import ProductReviewCard from "./ProductReviewCard";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../state/Product/Action";
import { addItmeToCart } from "../../state/Cart/Action";
import SimilarProducts from "./SimilarProducts";
export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { user } = useSelector((store) => store.auth);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId]);

  useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setMainImage(product.imageUrl[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please register/login first!");
      navigate("/");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }
    const data = {
      productId: params.productId,
      size: selectedSize,
    };
    dispatch(addItmeToCart(data));
    navigate("/cart");
  };

  const averageRating =
    product?.ratings?.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.rating, 0) /
        product.ratings.length
      : 0;
  const ratingCounts = [5, 4, 3, 2, 1].map((val) => ({
    value: val,
    count: product?.ratings?.filter((r) => r.rating === val).length || 0,
  }));
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 text-sm text-gray-500 sm:px-6 lg:px-8">
            <li className="flex items-center">
              <a href="/" className="hover:text-gray-900 transition">
                Home
              </a>
              <span className="mx-2 text-gray-400">/</span>
            </li>

            {product?.category?.name && (
              <li className="flex items-center">
                <span
                  onClick={() => navigate(-1)}
                  className="hover:text-gray-900 transition cursor-pointer"
                >
                  {product.category.name}
                </span>
                <span className="mx-2 text-gray-400">/</span>
              </li>
            )}

            {product?.subCategory && (
              <li className="flex items-center">
                <a
                  href={`/category/${product.category}/${product.subCategory}`}
                  className="hover:text-gray-900 transition"
                >
                  {product.subCategory}
                </a>
                <span className="mx-2 text-gray-400">/</span>
              </li>
            )}

            <li className="text-gray-700 font-medium">{product?.brand}</li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 px-6 lg:px-16 pb-20">
          <div className="flex flex-col lg:flex-row gap-10 md:ml-22 ">
            <div className="hidden lg:flex flex-col gap-4 w-1/5">
              {product?.imageUrl?.map((image, idx) => (
                <div
                  key={idx}
                  className={`aspect-square overflow-hidden rounded-md border-2 cursor-pointer ${
                    mainImage === image ? "border-gray-600" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="hidden lg:block flex-1">
              <div className="h-[585px] w-[400px] overflow-hidden rounded-2xl shadow-md">
                <img
                  src={mainImage}
                  alt="Main product"
                  className="h-full w-[400px] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="block lg:hidden w-full">
              <Swiper
                spaceBetween={15}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full"
              >
                {product?.imageUrl.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={image}
                      alt={`Product thumbnail ${idx + 1}`}
                      className="w-full h-[460px] rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                {product?.brand}
              </h1>

              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 mb-2">
                {product?.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{product?.discountedPrice}
                </p>
                <p className="text-gray-400 line-through text-lg">
                  ₹{product?.price}
                </p>
                <span className="text-green-600 font-semibold">
                  {product?.discountPercent}% Off
                </span>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Rating value={averageRating} readOnly precision={0.5} />
                  <p className="opacity-50 text-sm">
                    {product?.ratings?.length || 0} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product?.reviews?.length || 0} Reviews
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Select Size
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product?.sizes?.map((size) => (
                    <label
                      key={size.name}
                      className={`border rounded-lg py-2 text-center text-sm font-medium cursor-pointer ${
                        size.quantity > 0
                          ? selectedSize === size.name
                            ? "border-indigo-600 bg-indigo-100"
                            : "hover:border-indigo-500"
                          : "text-gray-400 bg-gray-100 cursor-not-allowed"
                      }`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size.name}
                        disabled={!size.quantity}
                        className="hidden"
                        onChange={() => setSelectedSize(size.name)}
                      />
                      {size.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mb-8 border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 md:px-20">
          <h1 className="font-semibold text-lg pb-4">
            Recent Ratings and Reviews
          </h1>

          <div className="shadow-md p-5 rounded-xl bg-white">
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, md: 5 }}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-4">
                  <Rating value={averageRating} readOnly precision={0.5} />
                  <p className="opacity-60 text-sm md:text-base">
                    {product?.ratings?.length || 0} Ratings
                  </p>
                  <p className="opacity-60 text-sm md:text-base">
                    {product?.reviews?.length || 0} Reviews
                  </p>
                </div>

                <Box className="space-y-3">
                  {ratingCounts.map((r, idx) => (
                    <Grid
                      container
                      alignItems="center"
                      key={idx}
                      spacing={2}
                      className="text-sm md:text-base"
                    >
                      <Grid size={{ xs: 3, md: 2 }} sx={{ pl: 3 }}>
                        <p>{r.value} Star</p>
                      </Grid>
                      <Grid size={{ xs: 7, md: 8 }}>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (r.count / product?.ratings?.length) * 100 || 0
                          }
                          color={
                            r.value >= 4
                              ? "success"
                              : r.value === 3
                              ? "warning"
                              : "error"
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 1, md: 2 }}>
                        <p className="text-md opacity-60">{r.count}</p>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <div className="mt-5 md:mt-0 max-h-[420px] overflow-y-auto pr-3 space-y-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {product?.reviews?.length > 0 ? (
                    product.reviews.map((review) => {
                      const userRating = product.ratings?.find(
                        (r) => r.user._id === review.user
                      );
                      return (
                        <ProductReviewCard
                          key={review._id}
                          review={review}
                          userRating={userRating}
                        />
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center">
                      No reviews yet !!
                    </p>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
        <div className="mt-3">
          <SimilarProducts
            category={product?.category.name}
            currentProductId={product?._id}
          />
        </div>
      </div>
    </div>
  );
}
