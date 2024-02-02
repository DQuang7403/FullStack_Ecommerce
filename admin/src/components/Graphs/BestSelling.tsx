import { TopSellingProduct } from "../../utils/constants";
export default function BestSelling() {
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
            {TopSellingProduct.map((item) => {
              return (
                <tr className="font-semibold" key={item.id}>
                  <th>{item.name}</th>
                  <td>{item.totalOrder}</td>
                  {item.stock > 0 ? (
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
