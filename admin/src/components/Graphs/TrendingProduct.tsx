import { useEffect, useState } from "react";
// import { TopSellingProduct } from "../../utils/constants";
type TrendingProduct = {
  id: number;
  title: string;
  price: number;
  stock: number;
}
function TrendingProduct() {
  const [TopSellingProduct, setTopSellingProduct] = useState<TrendingProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:5000/admin/trending_products",
      );
      const data = await response.json();
      setTopSellingProduct(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="bg-white rounded-lg col-span-1 flex flex-col gap-4 p-6">
      <h2 className="font-bold text-lg">TrendingProduct</h2>
      <div className="flex flex-col gap-4 ml-6">
        {TopSellingProduct.map((item) => {
          return (
            <div className="flex items-center justify-between gap-6" key={item.id}>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold">{item.title}</h2>
                <h3 className="text-xs font-bold text-[#8B909A]">
                  ID: #{item.id}
                </h3>
              </div>
              <div className="font-semibold">${item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingProduct;
