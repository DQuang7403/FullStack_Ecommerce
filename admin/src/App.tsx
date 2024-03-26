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
import Login from "./pages/Login";
import useAuthContext from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import AdminManage from "./pages/AdminManage";
function App() {
  const { url } = useAuthContext();
  return (
    <SidebarProvider>
      <ProductsProvider>
        <div className="max-h-screen flex flex-col ">
          <Navbar />
          <div className="sm:grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5] min-h-[calc(100vh-64px)]">
            {url !== "/login" && <Sidebar />}

            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/orders">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <OrderManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <OrderDetails />
                    </PrivateRoute>
                  }
                ></Route>
              </Route>

              <Route path="/user">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <User />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <EditUser />
                    </PrivateRoute>
                  }
                ></Route>
              </Route>

              <Route path="/product">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <Product />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="add-product"
                  element={
                    <PrivateRoute>
                      <AddProducts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <PrivateRoute>
                      <EditProduct />
                    </PrivateRoute>
                  }
                />
              </Route>

              <Route
                path="/reviews"
                element={
                  <PrivateRoute>
                    <Reviews />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/revenue"
                element={
                  <PrivateRoute>
                    <Revenue />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminManage />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/*" element={<h1>Not found</h1>}></Route>
            </Routes>
          </div>
        </div>
      </ProductsProvider>
    </SidebarProvider>
  );
}

export default App;
