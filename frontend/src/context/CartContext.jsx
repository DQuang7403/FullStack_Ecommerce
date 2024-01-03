import { createContext, useState, useEffect, useReducer } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState(0);
  const formatNumberWithCommas = (number) => {
    number = Number(number).toFixed(2);
    const numberString = number.toString();

    // Split the string into the integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");

    // Format the integer part with commas
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Combine the formatted integer part and the decimal part
    const formattedNumber = `${formattedIntegerPart}.${decimalPart}`;

    return formattedNumber;
  }
  const contextValue = {
    formatNumberWithCommas: formatNumberWithCommas,
    setItems: setItems,
    items: items,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
