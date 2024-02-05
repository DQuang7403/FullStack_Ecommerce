import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { ProductTitle } from "../utils/constants";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useSidebarContext from "../context/SidebarContext";
export default function Products() {
  const { setSelectedPageURL } = useSidebarContext();
  const ProductData = [
    {
      ProductID: 1,
      title: "Iphone 15",
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150",
      price: 999.0,
      category: "smartphones",
      Stock: 10,
    },
    {
      ProductID: 2,
      title: "iPhone 14",
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone14-digitalmat-gallery-3-202209?wid=364&hei=333&fmt=png-alpha&.v=1662055813794",
      price: 699.0,
      category: "smartphones",
      Stock: 0,
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto bg-white m-6  overflow-auto">
        <div className="flex items-center justify-between m-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 border-b-2">
              <IoMdSearch className="text-2xl rounded-lg" />
              <input
                type="text"
                className="h-8 focus:outline-none "
                placeholder={`Search ...`}
              />
            </div>
            <Link to="/product/add-product" onClick={() => setSelectedPageURL("/product/add-product")} className="btn btn-sm">
              Add Product +
            </Link>
          </div>
          <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <PiExport />
            <h2>Export</h2>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {ProductTitle.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ProductData.map((item) => {
              const [check, setCheck] = useState(false);
              return (
                <tr
                  key={item.ProductID}
                  className={`${check ? "bg-base-200" : ""} font-semibold`}
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                        onChange={() => setCheck(!check)}
                      />
                    </label>
                  </th>
                  <td>{item.ProductID}</td>
                  <td>
                    <img className="w-16" src={item.image} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>$ {item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.Stock > 0 ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaXmark className="text-red-500" />
                    )}
                  </td>
                  <td>
                    <div className="cursor-pointer text-xl flex gap-2 items-center">
                      <FaRegEdit className="text-green-500 hover:text-green-700" />
                      <FaRegTrashCan className="text-red-500 hover:text-red-700" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
