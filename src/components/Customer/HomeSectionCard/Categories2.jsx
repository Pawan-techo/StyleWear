import React from "react";
import { useNavigate } from "react-router-dom";

const categorie = [
  {
    title: "Women",
    key:"women",
    img: "https://img.freepik.com/free-photo/portrait-curly-girl-with-red-lipstick-taking-notes-tablet-pink-background-with-dressees_197531-17620.jpg?semt=ais_hybrid&w=740&q=80",
    items: ["Tops", "Dresses","lehenga-choli", "Jeans", "Sarees", "Kurtas", "Gowns","jackets"],
  },
  {
    title: "Men",
     key:"men",
    img: "https://img.freepik.com/free-photo/young-man-menswear-shop-talking-phone_1303-19871.jpg?semt=ais_hybrid&w=740&q=80",
    items: ["Shirts", "Jeans", "T-Shirts","Boxers" ,"Jackets", "Kurta", "Activewears"],
  },
  {
    title: "Accessories",
     key:"accessories",
    img: "https://img.freepik.com/free-vector/online-shop-round-composition_1284-21401.jpg?semt=ais_hybrid&w=740&q=80",
    items: ["Watches", "Wallets", "Bags", "Sunglasses", "Belts", "Hats"],
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Shop by Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {categorie.map((cat, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-85 group-hover:scale-105 transition-transform duration-500"
              onClick={() => navigate(`/category/${cat.key}`)}
            />

            <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md text-white p-5 ">
              <h3 className="text-xl font-semibold">{cat.title}</h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {cat.items.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() =>
                      navigate(
                        `/category/${cat.key}/${item.toLowerCase().replace(/ /g, "-")}`
                      )
                    }
                    className="text-sm bg-white/20 px-2 py-1 rounded-lg hover:bg-white/40 transition-all cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}