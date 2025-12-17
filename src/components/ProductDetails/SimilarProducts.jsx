import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Customer/Product/ProductCard";
import { findProducts } from "../../state/Product/Action";

const SimilarProducts = ({ category, currentProductId }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    const data = {
      category: category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 200,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [category, dispatch]);

  useEffect(() => {
    if (products?.content?.length > 0 && category) {
      const filtered = products.content.filter(
        (p) => p.category?.name === category && p._id !== currentProductId
      );
      setSimilarProducts(filtered);
    }
  }, [products, category, currentProductId]);

  return (
    <section className="pt-10 px-4 lg:px-20 bg-gray-50 mb-10">
      <h1 className="font-semibold text-lg pb-4">Similar Products</h1>

      {similarProducts.length === 0 ? (
        <p className="text-gray-500">No similar products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {similarProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProducts;
