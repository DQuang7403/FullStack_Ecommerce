import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import CartContext from "../context/CartContext";
import WishListContext from "../context/WishListContext";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function WishListCart({ product }) {
  const { formatNumberWithCommas } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { toggleWishList, wishList, toggleUserWishList } =
    useContext(WishListContext);
  const discountPrice = (price, discount) => {
    return Number((price / (1 - discount / 100)).toFixed(2));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        user
          ? toggleUserWishList(product, true)
          : toggleWishList(product, true);
        Swal.fire({
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
      );
  };

  return (
    <div
      key={product.id}
      className="w-[250px] h-[320px] relative justify-self-center"
    >
      {product?.discount ? (
        <div className="absolute bg-info text-white py-1 px-3 text-sm left-2 top-2 rounded-lg">
          - {Math.floor(product?.discount)} %
        </div>
      ) : null}
      <div className="absolute z-10 flex gap-2 right-2 top-2 flex-col">
        <button
          className="btn btn-ghost btn-circle bg-white hover:bg-slate-200"
          onClick={() => {
            user
              ? toggleUserWishList(product, true)
              : toggleWishList(product, true);
          }}
        >
          <GoTrash className="text-lg text-red-500 text-bold" />
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="w-full">
        <img
          src={product.thumbnail}
          alt=""
          className="w-full h-52 object-contain py-6 bg-[#f5f5f5]"
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="flex items-center gap-4 bg-primary w-full h-10 justify-center text-white text-md  hover:bg-secondary"
        >
          <AiOutlineShoppingCart className="text-xl" />
          Add To Cart
        </button>
      </form>
      <div className="mt-3">
        <h3 className="text-md font-semibold">{product.title}</h3>
        <h4 className="text-md text-primary flex gap-3">
          ${product.price}
          {product?.discount ? (
            <s className="text-[#f4c2c2]">
              $
              {formatNumberWithCommas(
                discountPrice(product?.price, product?.discount)
              )}
            </s>
          ) : null}
        </h4>
      </div>
    </div>
  );
}
