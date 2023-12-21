import { createContext, useState, useEffect, useReducer } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState(0);
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "INCREASEQUANTITY":
        return {
          ...state,
          quantity: state.quantity + 1,
        };
      case "DECREASEQUANTITY":
        return {
          ...state,
          quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity,
        };
      case "ADD_DETAILS":
        return {
          ...state,
          id: action.payload.id,
          details: action.payload,
        };
      default:
        return state;
    }
  };
  const contextValue = {
    cartReducer: cartReducer,
    setItems: setItems,
    items: items,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
