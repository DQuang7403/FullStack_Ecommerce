import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../../components/Table";
import { ProductTitle } from "../../utils/constants";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import { IoMdSearch } from "react-icons/io";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import useProductsContext from "../../context/ProductsContext";
export type productType = {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  category: string;
  stock: number;
};
export default function Products() {
  const [query, setQuery] = useState<string>("");
  const titleRef = useRef<HTMLSelectElement>(null);
  const [products, setProducts] = useState<productType[]>([]);
  const { deleteProducts } = useProductsContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://localhost:5000/admin/products`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  const filteredProducts: productType[] = useMemo(() => {
    return products.filter((product: productType) => {
      switch (titleRef.current?.value) {
        case "productId":
          return product.id.toString().includes(query);
        case "price":
          return product.price.toString().includes(query);
        case "category":
          return product.category.toLowerCase().includes(query.toLowerCase());
        default:
          return product.title?.toLowerCase().includes(query.toLowerCase());
      }
    });
  }, [products, query]);
  const rowsDisplay = useMemo(() => {
    return filteredProducts.map((item: productType) => {
      return (
        <tr key={item.id} className={` font-semibold`}>
          <td>{item.id}</td>
          <td>
            <img className="w-16" src={item.thumbnail} alt="" />
          </td>
          <td>{item.title}</td>
          <td>$ {item.price}</td>
          <td>{item.category}</td>
          <td>
            {item.stock > 0 ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaXmark className="text-red-500" />
            )}
          </td>
          <td>
            <div className="cursor-pointer text-xl flex gap-2 items-center ">
              <Link to={`/product/${item.id}`}>
                <FaRegEdit className="text-green-500 hover:text-green-700" />
              </Link>
              <FaRegTrashCan
                onClick={() => deleteProducts(item.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [filteredProducts]);

  return (
    <div className="overflow-auto bg-white sm:m-6">
      <TopSection query={query} setQuery={setQuery} titleRef={titleRef} />
      <Table title={ProductTitle} RowsDisplay={rowsDisplay} />
    </div>
  );
}
type TopSectionProps = {
  query: string;
  setQuery: any;
  titleRef: any;
};
function TopSection(props: TopSectionProps) {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2  flex-wrap">
        <div className="flex items-center gap-2 border-b-2">
          <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
          <input
            onChange={(e) => props.setQuery(e.target.value)}
            type="search"
            className="h-8 focus:outline-none "
            placeholder={`Search ...`}
          />
        </div>
        <select ref={props.titleRef}>
          <option value="title">Title</option>
          <option value="productId">Product ID</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        <Link
          to="/product/add-product"
          onClick={() => setSelectedPageURL("/product/add-product")}
          className="btn btn-sm"
        >
          Add Product +
        </Link>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
}
