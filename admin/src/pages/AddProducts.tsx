import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSidebarContext from "../context/SidebarContext";
export default function AddProducts() {
  const { setSelectedPageURL } = useSidebarContext();
  const [category, setCategory] = useState<string[]>([]);
  useEffect(() => {
    setCategory([
      "smartphones",
      "laptop",
      "watch",
      "tablet",
      "TV",
      "accessories",
    ]);
  }, []);
  return (
    <section className="overflow-x-auto bg-white md:m-6  overflow-auto rounded-md">
      <h1 className="text-2xl p-6 font-semibold">Add New Products</h1>
      <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Product Name: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product Name"
            name="title"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product Price"
            name="price"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product Stock"
            name="stock"
            className="input input-bordered"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="form-control grow">
            <label className="label">
              <span className="label-text">Category: </span>
            </label>
            <select className="select select-bordered w-full max-w-xs min-w-10">
              {category.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="form-control min-w-10">
            <label className="label">Discount: </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="Discount"
              name="discount"
              defaultValue={0}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">Thumbnail: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="thumbnail"
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 2: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="thumbnail2"
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 3: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="thumbnail3"
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 4: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="thumbnail4"
            placeholder="Insert Image URL"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Decription: </label>
          <textarea
            required
            className="textarea textarea-bordered"
            name="description"
            placeholder="Insert description for the product"
            rows={5}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-primary text-white" type="submit">
            Add Product
          </button>
          <Link
            to="/product"
            onClick={() => setSelectedPageURL("/product")}
            className="link "
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
