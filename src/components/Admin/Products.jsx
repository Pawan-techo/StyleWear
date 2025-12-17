import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteProduct, findProducts } from "../../state/Product/Action";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((store) => store);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  useEffect(() => {
    const data = {
      category: "",
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
  }, [product.deletedProduct]);

  const handleProductDelete=(productId)=>{
    dispatch(deleteProduct(productId));
  }

  const allProducts = product?.products?.content || [];
  const indexLast = currentPage * productsPerPage;
  const indexFirst = indexLast - productsPerPage;
  const currentProducts = allProducts.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  return (
    <div className="p-4 md:p-6">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">All Products</h1>

        <button
          onClick={() => navigate("/admin/product/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base"
        >
          + Add New Product
        </button>
      </div>

    
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600 text-sm tracking-wide bg-gray-100">
              <th className="py-3 px-3 md:px-5 rounded-l-xl">#</th>
              <th className="py-3 px-3 md:px-5">Image</th>
              <th className="py-3 px-3 md:px-5">Title</th>
              <th className="py-3 px-3 md:px-5">Category</th>
              <th className="py-3 px-3 md:px-5">Price</th>
              <th className="py-3 px-3 md:px-5">Stock</th>
              <th className="py-3 px-3 md:px-5 rounded-r-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map((item, idx) => {
              const serialNumber =
                (currentPage - 1) * productsPerPage + idx + 1;
              return (
                <tr
                  key={item._id}
                  className="bg-white shadow-md hover:bg-gray-50 transition-all duration-300 rounded-xl border border-gray-200"
                >
                
                  <td className="py-3 px-2 md:px-5 font-semibold text-gray-700">
                    {serialNumber}
                  </td>

                  <td className="py-3 px-2 md:px-5">
                    <img
                      src={item.imageUrl[0]}
                      alt={item.title}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shadow-sm"
                    />
                  </td>

                  <td className="py-3 px-2 md:px-5 font-semibold text-gray-900 text-sm md:text-base">
                    {item.title}
                  </td>

                  <td className="py-3 px-2 md:px-5">
                    <span className="bg-gray-100 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-700">
                      {item.category?.name || "N/A"}
                    </span>
                  </td>

                  <td className="py-3 px-2 md:px-5 font-bold text-gray-800 text-sm md:text-base">
                    ₹{item.discountedPrice}
                  </td>

                  <td className="py-3 px-2 md:px-5">
                    {item.quantity > 0 ? (
                      <span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="py-8 px-2 md:px-5 flex items-center gap-2 md:gap-4 text-lg md:text-xl">
                    <button
                      onClick={() =>
                        navigate(`/admin/product/edit/${item._id}`)
                      }
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </button>

                    <button onClick={()=>handleProductDelete(item._id)} className="text-red-600 hover:text-red-800 transition">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 md:px-4 py-1 md:py-2 rounded-md border text-sm md:text-base
              ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminProducts);
