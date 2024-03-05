import { useEffect, useState } from "react";

type BestSellingType = {
  id: number;
  title: string;
  stocks: number;
  totalOrder: number;
  price: number;

}
export default function BestSelling() {
  const [bestSelling, setBestSelling] = useState<BestSellingType[]>([]);
  useEffect(() =>{
    const fetchProduct = async () =>{
      const res = await fetch("http://localhost:5000/admin/best_selling_products");
      const data = await res.json();
      setBestSelling(data);

    }
    fetchProduct();
  }, [])
  return (
    <div className="bg-white rounded-lg col-span-1 md:col-span-2 p-6 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Best Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Order</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bestSelling.map((item) => {
              return (
                <tr className="font-semibold" key={item.id}>
                  <th>{item.title}</th>
                  <td>{item.totalOrder}</td>
                  {item.stocks > 0 ? (
                    <td className="text-green-500 ">In Stock</td>
                  ) : (
                    <td className="text-red-500 ">Out of Stock</td>
                  )}
                  <td>${item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


