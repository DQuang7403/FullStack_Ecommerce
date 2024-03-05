import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import useProductsContext from "../../context/ProductsContext";
export default function AddProducts() {
  const { setSelectedPageURL } = useSidebarContext();
  const { addProducts } = useProductsContext();
  const [category, setCategory] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const images1Ref = useRef<HTMLInputElement>(null);
  const images2Ref = useRef<HTMLInputElement>(null);
  const images3Ref = useRef<HTMLInputElement>(null);
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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title: string = titleRef.current?.value as string;
    const price: number = Number(priceRef.current?.value);
    const stock: number = Number(stockRef.current?.value);
    const category: string = categoryRef.current?.value as string;
    const description: string = descriptionRef.current?.value as string;
    const discount: number = Number(discountRef.current?.value);
    const thumbnail: string = thumbnailRef.current?.value as string;
    const images1: string = images1Ref.current?.value as string;
    const images2: string = images2Ref.current?.value as string;
    const images3: string = images3Ref.current?.value as string;
    addProducts({
      title,
      price,
      category,
      stock,
      description,
      discount,
      thumbnail,
      images1,
      images2,
      images3,
    });
  };
  return (
    <section className="overflow-x-auto bg-white md:m-6  overflow-auto rounded-md">
      <h1 className="text-2xl p-6 font-semibold">Add New Products</h1>
      <form
        onSubmit={onSubmit}
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
            name="title"
            className="input input-bordered"
            defaultValue={titleRef.current?.value}
            ref={titleRef}
            onChange={(e) => {
              if (titleRef.current) titleRef.current.value = e.target.value;
            }}
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
            ref={priceRef}
            defaultValue={priceRef?.current?.value}
            onChange={(e) => {
              if (priceRef.current) priceRef.current.value = e.target.value;
            }}
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
            ref={stockRef}
            defaultValue={stockRef?.current?.value}
            onChange={(e) => {
              if (stockRef.current) stockRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="form-control grow">
            <label className="label">
              <span className="label-text">Category: </span>
            </label>
            <select
              ref={categoryRef}
              defaultValue={categoryRef?.current?.value}
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
              ref={discountRef}
              type="number"
              className="input input-bordered"
              placeholder="Discount"
              name="discount"
              defaultValue={0}
              onChange={(e) => {
                if (discountRef.current)
                  discountRef.current.value = e.target.value;
              }}
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
            ref={thumbnailRef}
            defaultValue={thumbnailRef?.current?.value}
            onChange={(e) => {
              if (thumbnailRef.current)
                thumbnailRef.current.value = e.target.value;
            }}
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
            ref={images1Ref}
            defaultValue={images1Ref?.current?.value}
            onChange={(e) => {
              if (images1Ref.current) images1Ref.current.value = e.target.value;
            }}
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
            ref={images2Ref}
            defaultValue={images2Ref?.current?.value}
            onChange={(e) => {
              if (images2Ref.current) images2Ref.current.value = e.target.value;
            }}
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
            ref={images3Ref}
            defaultValue={images3Ref?.current?.value}
            onChange={(e) => {
              if (images3Ref.current) images3Ref.current.value = e.target.value;
            }}
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Description: </label>
          <textarea
            required
            className="textarea textarea-bordered"
            name="description"
            placeholder="Insert description for the product"
            rows={5}
            ref={descriptionRef}
            defaultValue={descriptionRef?.current?.value}
            onChange={(e) => {
              if (descriptionRef.current)
                descriptionRef.current.value = e.target.value;
            }}
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
