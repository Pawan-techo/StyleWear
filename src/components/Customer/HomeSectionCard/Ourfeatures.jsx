import {
  LocalShipping,
  Payments,
  Replay,
  Security,
  SupportAgent,
  Public,
  Star,
} from "@mui/icons-material";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: <LocalShipping fontSize="large" />,
    title: "Worldwide Shipping",
    desc: "Fast & reliable delivery anywhere.",
  },
  {
    icon: <Payments fontSize="large" />,
    title: "Cash on Delivery",
    desc: "Pay only when your order arrives.",
  },
  {
    icon: <Replay fontSize="large" />,
    title: "Easy Returns",
    desc: "7-day hassle-free return & exchange.",
  },
  {
    icon: <Security fontSize="large" />,
    title: "Secure Payments",
    desc: "Trusted and encrypted transactions.",
  },
  {
    icon: <SupportAgent fontSize="large" />,
    title: "24/7 Support",
    desc: "We’re always here to help you.",
  },
  {
    icon: <Public fontSize="large" />,
    title: "Global Trust",
    desc: "Loved by shoppers worldwide.",
  },
  {
    icon: <Star fontSize="large" />,
    title: "Premium Quality",
    desc: "Every product passes quality checks.",
  },
];

export default function OurFeatures() {
  const scrollRef = useRef(null);
  const repeated = [...features, ...features];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let speed = 0.35;

    const animateScroll = () => {
      scrollAmount += speed;
      container.scrollLeft = scrollAmount;

      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return (
    <div className="w-full py-6 bg-white flex flex-col items-center">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
    Our Features
  </h2>

  <div
    ref={scrollRef}
    className="
      w-full max-w-7xl
      flex gap-4
      px-6 md:px-10
      overflow-x-scroll no-scrollbar
      py-3
      justify-start
    "
  >
    {repeated.map((f, i) => (
      <div
        key={i}
        className="
          min-w-[180px] sm:min-w-[200px]
          max-w-[220px]
          h-[150px] sm:h-[160px]
          bg-white border border-gray-300
          rounded-2xl p-4 shadow-md
          flex flex-col justify-center items-center 
          text-center space-y-2
        "
      >
        <div className="text-gray-900">{f.icon}</div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {f.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-[15px] leading-tight">
          {f.desc}
        </p>
      </div>
    ))}
  </div>
</div>

  );
}
