import { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../state/Product/Action";

const CATEGORY_DATA = {
  Men: {
    Clothing: [
      "Men's Kurta",
      "Shirts",
      "Men's Jeans",
      "Sweaters",
      "T-Shirts",
      "Suits",
      "Activewears",
    ],
    Accessories: [
      "Watches",
      "Wallets",
      "Bags",
      "Sunglasses",
      "Hats",
      "Belts",
    ],
  },

  Women: {
    Clothing: [
      "Tops",
      "Dresses",
      "Woman Jeans",
      "Lehenga Choli",
      "Sweaters",
      "Jackets",
      "Gowns",
      "Sarees",
      "Kurtas",
    ],
    Accessories: [
      "Watches",
      "Wallets",
      "Bags",
      "Sunglasses",
      "Hats",
      "Belts",
    ],
  },
};


const toKebab = (str) =>
  str.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

const AddProducts = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    brand: "",
    color: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    sizes: { S: "", M: "", L: "", XL: "" },
    imageUrl: [""],
  });

  useEffect(() => {
    if (form.price && form.discountedPrice) {
      const p = Number(form.price);
      const dp = Number(form.discountedPrice);

      if (p > 0 && dp > 0) {
        const discount = Math.round(((p - dp) / p) * 100);
        setForm((prev) => ({ ...prev, discountPercent: discount }));
      }
    }
  }, [form.price, form.discountedPrice]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size, qty) => {
    setForm({ ...form, sizes: { ...form.sizes, [size]: qty } });
  };

  const handleImageUrlChange = (i, value) => {
    const updated = [...form.imageUrl];
    updated[i] = value;
    setForm({ ...form, imageUrl: updated });
  };

  const addImageUrl = () => {
    if (form.imageUrl.length < 4) {
      setForm({ ...form, imageUrl: [...form.imageUrl, ""] });
    }
  };

  const removeImageUrl = (i) => {
    setForm({
      ...form,
      imageUrl: form.imageUrl.filter((_, idx) => idx !== i),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      imageUrl: form.imageUrl.filter((url) => url.trim() !== ""),
      topLevelCategory: toKebab(form.topLevelCategory),
      secondLevelCategory: toKebab(form.secondLevelCategory),
      thirdLevelCategory: toKebab(form.thirdLevelCategory),
      sizes: Object.entries(form.sizes)
        .filter(([_, qty]) => qty !== "")
        .map(([name, quantity]) => ({
          name,
          quantity: Number(quantity),
        })),
    };
    dispatch(createProduct(dataToSend));
    console.log("✅ Product added");
  };

  useEffect(() => {
    if (product?.createdProduct) {
      alert("Product created successfully!");
      navigate("/admin/products");
    }
  }, [product.createdProduct]);

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl"
      >
        {[
          "title",
          "description",
          "price",
          "discountedPrice",
          "discountPercent",
          "quantity",
          "brand",
          "color",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold capitalize text-gray-700">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={["price", "discountedPrice", "discountPercent", "quantity"].includes(field) ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border p-2 rounded-md mt-1"
              disabled={field === "discountPercent"} 
            />
          </div>
        ))}
        <div>
          <label className="font-semibold">Top Category</label>
          <select
            name="topLevelCategory"
            value={form.topLevelCategory}
            onChange={handleChange}
            className="border p-2 rounded-md mt-1 w-full"
          >
            <option value="">Select Category</option>
            {Object.keys(CATEGORY_DATA).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Second Category</label>
          <select
            name="secondLevelCategory"
            value={form.secondLevelCategory}
            onChange={handleChange}
            className="border p-2 rounded-md mt-1 w-full"
          >
            <option value="">Select</option>
            {form.topLevelCategory &&
              Object.keys(CATEGORY_DATA[form.topLevelCategory]).map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Third Category</label>
          <select
            name="thirdLevelCategory"
            value={form.thirdLevelCategory}
            onChange={handleChange}
            className="border p-2 rounded-md mt-1 w-full"
          >
            <option value="">Select</option>
            {form.topLevelCategory &&
              form.secondLevelCategory &&
              CATEGORY_DATA[form.topLevelCategory][form.secondLevelCategory].map(
                (item) => <option key={item}>{item}</option>
              )}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800">Sizes with Quantity</label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            {["S", "M", "L", "XL"].map((size) => (
              <div key={size} className="border rounded-lg p-3 shadow bg-gray-50">
                <p className="font-bold text-lg">{size}</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={form.sizes[size]}
                  onChange={(e) => handleSizeChange(size, e.target.value)}
                  className="border p-2 rounded-md mt-2 w-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800">Image URLs (Max 4)</label>
          <div className="flex flex-col gap-3 mt-2">
            {form.imageUrl.map((url, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder={`Image URL ${i + 1}`}
                  value={url}
                  onChange={(e) => handleImageUrlChange(i, e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
                {i > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => removeImageUrl(i)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            {form.imageUrl.length < 4 && (
              <button
                type="button"
                onClick={addImageUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-max"
              >
                + Add URL
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default memo(AddProducts);
