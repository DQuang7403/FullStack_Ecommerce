import { createContext, useState, useEffect } from "react"
import React from 'react'
import { fetchAPI } from "../utils/fetchAPI";
const CategoryContext = createContext();

export function CategoryProvider({children}) {
  const [allCategories, setAllCategories] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await fetchAPI("products/category");
      setAllCategories(data);
    };
    fetchCategory();
  }, []);
  const contextData = {
    allCategories: allCategories,
  }
  return (
    <CategoryContext.Provider value={contextData}>
      {children}
    </CategoryContext.Provider>
  )
}
export default CategoryContext
