import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/Order/OrderManagement";
import User from "./pages/Users/User";
import Product from "./pages/Products/Products";
import Revenue from "./pages/Revenue";
import AddProducts from "./pages/Products/AddProducts";

import OrderDetails from "./pages/Order/OrderDetails";
import Reviews from "./pages/Reviews";
import EditProduct from "./pages/Products/EditProduct";
import EditUser from "./pages/Users/EditUser";
function App() {
  return (
    <SidebarProvider>
      <ProductsProvider>
        <div className="max-h-screen flex flex-col ">
          <Navbar />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5]">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders">
                <Route index element={<OrderManagement />} />
                <Route path=":id" element={<OrderDetails />}></Route>
              </Route>

              <Route path="/user">
                <Route index element={<User />}></Route>
                <Route path=":id" element={<EditUser />}></Route>
              </Route>

              <Route path="/product">
                <Route index element={<Product />} />
                <Route path="add-product" element={<AddProducts />} />
                <Route path=":id" element={<EditProduct />} />
              </Route>

              <Route path="/reviews" element={<Reviews />}></Route>
              <Route path="/revenue" element={<Revenue />}></Route>
              <Route path="/*" element={<h1>Not found</h1>}></Route>
            </Routes>
          </div>
        </div>
      </ProductsProvider>
    </SidebarProvider>
  );
}

export default App;
