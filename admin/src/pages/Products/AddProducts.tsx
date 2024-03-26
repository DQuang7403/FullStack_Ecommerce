import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import useProductsContext from "../../context/ProductsContext";
import { useForm } from "react-hook-form";
type FormValues = {
  title: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  discount: number;
  thumbnail: string;
  images1: string;
  images2: string;
  images3: string;
};
export default function AddProducts() {
  const { setSelectedPageURL } = useSidebarContext();
  const { addProducts } = useProductsContext();
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
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    addProducts(data);
  };
  return (
    <section className="overflow-auto bg-white md:m-6 rounded-md">
      <h1 className="text-2xl p-6 font-semibold">Add New Products</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Product Name: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product Name"
            {...register("title")}
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
            {...register("price")}
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
            className="input input-bordered"
            {...register("stock")}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="form-control grow">
            <label className="label">
              <span className="label-text">Category: </span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full max-w-xs min-w-10"
            >
              {category.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control min-w-10">
            <label className="label">Discount: </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="Discount"
              {...register("discount")}
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
            {...register("thumbnail")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 2: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("images1")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 3: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("images2")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 4: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            placeholder="Insert Image URL"
            {...register("images3")}
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Description: </label>
          <textarea
            required
            className="textarea textarea-bordered"
            {...register("description")}
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
