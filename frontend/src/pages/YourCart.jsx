import React, { useState, useEffect, useContext, useId } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function YourCart() {
  const {
    setItems,
    formatNumberWithCommas,
    removeItem,
    updateCart,
    cart,
    setCart,
    update,
    refetch,
    setUpdate,
    setReFetch,

  } = useContext(CartContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/checkout/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart}),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location = data?.url;
      });
  };
  const changeQuantity = (id, e) => {
    const value = e.target.value.replace(/\D/g, "");

    setCart((current) => {
      return current.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Number(value) };
        }
        return item;
      });
    });
    setUpdate(true);
  };
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return Number(total.toFixed(2)); // Round to two decimal placestotal
  };
  useEffect(() => {
    const fetchResult = () => {
      fetch(`http://127.0.0.1:5000/cart`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          setItems(data.length);
        });
    };
    fetchResult();
    if (refetch) {
      fetchResult();
      setReFetch(!refetch);
    }
  }, [refetch]);

  return (
    <section className="lg:mx-32 md:my-8 mx-1 my-4">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-base">
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotals</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <th className="flex items-center gap-2 md:gap-6 text-2xl">
                  Your cart is empty
                </th>
              </tr>
            ) : null}

            {cart.map((item) => {
              return (
                <tr key={item.id}>
                  <th className="flex flex-col items-center sm:flex-row gap-2 md:gap-6 w-full">
                    <img
                      loading="lazy"
                      className="w-14 object-contain"
                      src={item.thumbnail}
                    />
                    <div className="flex flex-col items-start gap-2">
                      <div>{item.title}</div>
                      <div className="font-normal">
                        ${formatNumberWithCommas(item.price)}
                      </div>{" "}
                      <input type="hidden" name="product_id" value={item?.id} />
                      <button
                        className=" text-[#db4444] hover:text-[#BB232D]"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </th>

                  <td className="">
                    <input
                      type="number"
                      value={item.quantity}
                      className=" w-14 h-9 p-2 rounded-lg border-2"
                      onChange={(e) => changeQuantity(item.id, e)}
                      min={1}
                    />
                  </td>
                  <td>
                    <div>
                      $
                      {formatNumberWithCommas(
                        Number(item.price * item.quantity).toFixed(2)
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between">
          <button>
            <Link
              to={"/"}
              className="btn btn-outline btn-accent btn-md text-white"
            >
              Back To Home
            </Link>
          </button>
          <form method="post" onSubmit={updateCart}>
            {update === true ? (
              <button
                type="submit"
                className="btn btn-accent btn-md text-white"
              >
                Update
              </button>
            ) : (
              <button className="btn btn-disabled btn-md ">Updated</button>
            )}
          </form>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center gap-10 flex-grow w-full md:flex-row md:items-start justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            className="input input-bordered border-black rounded-sm w-full max-w-xs min-w-[130px]"
            placeholder="Coupon Code"
          />
          <button
            type="submit"
            className="btn bg-[#db4444] hover:bg-[#BB232D] text-white rounded-base"
          >
            Apply Coupon
          </button>
        </div>
        <div className="border-black border-2 rounded-md px-6 py-8 w-full max-w-md ">
          <h3 className=" text-lg my-4">Cart Total</h3>
          <div className="flex items-center justify-between py-4">
            <p>Subtotal: </p>
            <p>$ {formatNumberWithCommas(calculateTotal())}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-y-2">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p>Total:</p>
            <p>$ {formatNumberWithCommas(calculateTotal())}</p>
          </div>
          <form method="post" onSubmit={handleCheckout}>
            <button
              type="submit"
              className={`btn bg-[#db4444] hover:bg-[#BB232D] text-white rounded-base ${
                cart.length === 0 && "btn-disabled"
              }`}
            >
              Process to checkout
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
