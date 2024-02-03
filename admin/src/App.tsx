import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/OrderManagement";
import User from "./pages/User";
import Product from "./pages/Products";
import Revenue from "./pages/Revenue";
function App() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col ">
        <Navbar />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5]">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/user" element={<User />} />
            <Route path="/product" element={<Product />} />
            <Route path="/revenue" element={<Revenue />}></Route>
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
