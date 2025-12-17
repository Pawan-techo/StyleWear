import React from "react";
import { Sparkles, ShoppingBag, Users, Globe } from "lucide-react";

const AboutCompany = () => {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-yellow-400">StyleWear</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            StyleWear is a modern clothing and accessories eCommerce brand
            crafted for individuals who value style, comfort, and confidence.
            We don’t just sell fashion — we help you express who you are.
          </p>
        </div>
      </section>
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Redefining Everyday Fashion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At StyleWear, we believe fashion should be accessible, reliable,
              and trend-driven. Our collections are thoughtfully designed to
              blend modern aesthetics with everyday comfort.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From casual wear to statement pieces, we offer clothing and
              accessories that adapt to your lifestyle — whether you’re at
              work, traveling, or enjoying the weekend.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Why Choose StyleWear?</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Premium quality fabrics</li>
              <li>✔ Trend-focused designs</li>
              <li>✔ Affordable pricing</li>
              <li>✔ Secure and seamless shopping</li>
              <li>✔ Customer-first approach</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Sparkles size={28} />}
              title="Quality First"
              desc="Every product is crafted with attention to detail and durability."
            />
            <ValueCard
              icon={<ShoppingBag size={28} />}
              title="Style for All"
              desc="Fashion that fits every personality, mood, and moment."
            />
            <ValueCard
              icon={<Users size={28} />}
              title="Customer Trust"
              desc="Transparency, reliability, and long-term relationships."
            />
            <ValueCard
              icon={<Globe size={28} />}
              title="Growing Together"
              desc="Constantly evolving with trends, technology, and people."
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our vision is to become a trusted global fashion destination,
            delivering innovative designs, seamless digital experiences, and
            unmatched customer satisfaction — while staying true to our roots.
          </p>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-black mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

export default AboutCompany;
