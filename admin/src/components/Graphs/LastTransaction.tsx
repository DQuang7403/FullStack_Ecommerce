import useSidebarContext from "../../context/SidebarContext";
import { LastestTransaction } from "../../utils/constants";
import { Link } from "react-router-dom";
export default function LastTransaction() {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="bg-white rounded-lg col-span-1 md:col-span-2 p-6 flex flex-col gap-4">
      <h3 className="font-bold text-lg">Last Transaction</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {LastestTransaction.map((item) => {
              const date = new Date(item.date);
              const formattedDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <tr>
                  <th>#{item.id}</th>
                  <td>{formattedDate}</td>
                  <td>$ {item.totals}</td>
                  <td>
                    <Link
                      to={`/transactions/${item.id}`}
                      onClick={() => setSelectedPageURL(`/transactions`)}
                      className="link link-hover text-blue-500 font-semibold"
                    >
                      View Details
                    </Link>
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
