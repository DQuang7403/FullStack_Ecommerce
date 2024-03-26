import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
type ContextProviderProps = {
  children: ReactNode;
};
type ProductType = {
  id?: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  description: string;
  discount: number;
  images1: string;
  images2: string;
  images3: string;
};
type ProductsContextType = {
  addProducts: (input: ProductType) => void;
  editProducts: (input: ProductType) => void;
  deleteProducts: (id: number) => void;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: ContextProviderProps) {
  const navigate = useNavigate();
  const addProducts = async (input: ProductType) => {
    const res = await fetch("http://127.0.0.1:5000/admin/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: input.title,
        price: input.price,
        stock: input.stock,
        category: input.category,
        thumbnail: input.thumbnail,
        description: input.description,
        discount: input.discount,
        images1: input.images1,
        images2: input.images2,
        images3: input.images3,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Do you want try again?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Yes",
        confirmButtonText: "Go Back Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/product");
        }
      });
    }
  };
  const editProducts = async (input: ProductType) => {
    const res = await fetch(
      `http://localhost:5000/admin/products/update/${input.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: input.title,
          price: input.price,
          stock: input.stock,
          category: input.category,
          thumbnail: input.thumbnail,
          description: input.description,
          discount: input.discount,
          images1: input.images1,
          images2: input.images2,
          images3: input.images3,
        }),
      },
    );
    const data = await res.json();
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Do you want try again?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Yes",
        confirmButtonText: "Go Back Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/product");
        }
      });
    }
  };
  const deleteProducts = async (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:5000/admin/products/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Product deleted successfully",
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <ProductsContext.Provider
      value={{ addProducts, editProducts, deleteProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default function useProductsContext() {
  const value = useContext(ProductsContext);
  if (value === null) {
    throw new Error("ProductsContext must be used within ProductsProvider");
  }
  return value;
}
