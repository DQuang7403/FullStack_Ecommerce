import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
export default function YourCart() {
  const [refetch, setReFetch] = useState(true);
  const [cart, setCart] = useState([]);
  const { setItems } = useContext(CartContext);
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return Number(total.toFixed(2)); // Round to two decimal placestotal
  };
  useEffect(() => {
    const fetchResult = () => {
      fetch("http://127.0.0.1:5000/cart", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          setItems(data.length);
        });
    };
    if (refetch){
      fetchResult();
      setReFetch(!refetch)
    }
  }, [refetch]);
  const removeItem = (id) => {
    fetch("http://127.0.0.1:5000/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ product_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReFetch(!refetch)
      });
      
  };
  const changeQuantity = (id, quantity) => {
    
  }
  
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
                <td></td>
                <td></td>
                <td>
                  <Link
                    to={"/"}
                    className="btn bg-[#db4444] hover:bg-[#BB232D] btn-sm text-xs text-white"
                  >
                    Back To Home
                  </Link>
                </td>
              </tr>
            ) : null}

            {cart.map((item) => {
              return (
                <tr key={item.id}>
                  <th className="flex flex-col items-center sm:flex-row gap-2 md:gap-6 w-full">
                    <img className="w-14 object-contain" src={item.thumbnail} />
                    <div className="flex flex-col items-start gap-2">
                      <div>{item.title}</div>
                      <div className="font-normal">${item.price}</div>{" "}
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
                      className=" w-11 h-9 p-2 rounded-lg border-2"
                      // onChange={changeQuantity.bind(this, item.id)}
                      readOnly
                    />
                  </td>
                  <td>
                    <div>${ Number(item.price * item.quantity).toFixed(2)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
            <p>$ {calculateTotal()}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-y-2">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p>Total:</p>
            <p>$ {calculateTotal()}</p>
          </div>
          <button className="btn bg-[#db4444] hover:bg-[#BB232D] text-white rounded-base">
            Process to checkout
          </button>
        </div>
      </div>
    </section>
  );
}
