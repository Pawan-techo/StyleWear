import React, { useState, useEffect, Suspense } from "react";
import logo from "./assets/Logo.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routers/AdminRoutes.jsx";
import { AdminRoute } from "./Routers/ProtectRoutes.jsx";
import NotAuthorized from "./components/Customer/NotAuthorized.jsx";

const CustomerRoutes = React.lazy(() => import("./Routers/CustomerRoutes.jsx"));

function App() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 200); 
    return () => clearTimeout(timer);
  }, []);

  return (

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen w-full bg-white">
            <img
              src={logo}
              alt="Loading..."
              className="w-28 h-28 animate-pulse object-contain"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
           <Route path="/admin/*" element={<AdminRoute><AdminRoutes /></AdminRoute>} />
            <Route path="/not-authorized" element={< NotAuthorized />} />
        </Routes>
      </Suspense>
  );
}

export default App;
