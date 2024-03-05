import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import useProductsContext from "../../context/ProductsContext";
type productType = {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  description: string;
  totalRating: number;
  discount: number;
  images: string[];
};
export default function EditProduct() {
  const { id } = useParams();
  const { setSelectedPageURL } = useSidebarContext();
  const [productData, setProductData] = useState<productType>(
    {} as productType,
  );
  const { editProducts } = useProductsContext();
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

  const category = [
    "smartphones",
    "laptop",
    "watch",
    "tablet",
    "TV",
    "accessories",
  ];
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/admin/products/${id}`);
      const data = await res.json();
      setProductData(data);
    };
    fetchProduct();
  }, []);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title: string = titleRef.current?.value as string;
    const price: number = Number(priceRef.current?.value);
    const category: string = categoryRef.current?.value as string;
    const stock: number = Number(stockRef.current?.value);
    const description: string = descriptionRef.current?.value as string;
    const discount: number = Number(discountRef.current?.value);
    const thumbnail: string = thumbnailRef.current?.value as string;
    const images1: string = images1Ref.current?.value as string;
    const images2: string = images2Ref.current?.value as string;
    const images3: string = images3Ref.current?.value as string;
    editProducts({
      id: Number(id),
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
      <img src={productData?.thumbnail} alt="" className="w-[100px]" />
      <h1 className="text-2xl p-6 font-semibold">{productData?.title}</h1>
      <form
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
        onSubmit={onSubmit}
      >
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Product Name: </span>
          </label>
          <input
            ref={titleRef}
            required
            type="text"
            placeholder="Product Name"
            name="title"
            className="input input-bordered"
            defaultValue={productData?.title}
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
            ref={priceRef}
            required
            type="text"
            placeholder="Product Price"
            name="price"
            className="input input-bordered"
            defaultValue={productData?.price}
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
            ref={stockRef}
            required
            type="text"
            placeholder="Product Stock"
            name="stock"
            className="input input-bordered"
            defaultValue={productData?.stock}
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
              className="select select-bordered w-full max-w-xs min-w-10"
              defaultValue={productData?.category || ""}
              ref={categoryRef}
              onChange={(e) => {
                if (categoryRef.current)
                  categoryRef.current.value = e.target.value;
              }}
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
              defaultValue={productData?.discount}
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
            ref={thumbnailRef}
            type="text"
            className="input input-bordered"
            name="thumbnail"
            placeholder="Insert Image URL"
            defaultValue={productData?.thumbnail}
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
            ref={images1Ref}
            type="text"
            className="input input-bordered"
            name="thumbnail2"
            placeholder="Insert Image URL"
            defaultValue={productData.images && productData.images[0]}
            onChange={(e) => {
              if (images1Ref.current) images1Ref.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 3: </label>
          <input
            required
            ref={images2Ref}
            type="text"
            className="input input-bordered"
            name="thumbnail3"
            placeholder="Insert Image URL"
            defaultValue={productData.images && productData.images[1]}
            onChange={(e) => {
              if (images2Ref.current) images2Ref.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">Thumbnail 4: </label>
          <input
            required
            ref={images3Ref}
            type="text"
            className="input input-bordered"
            name="thumbnail4"
            placeholder="Insert Image URL"
            defaultValue={productData.images && productData.images[2]}
            onChange={(e) => {
              if (images3Ref.current) images3Ref.current.value = e.target.value;
            }}
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Decription: </label>
          <textarea
            required
            ref={descriptionRef}
            className="textarea textarea-bordered"
            name="description"
            placeholder="Insert description for the product"
            rows={5}
            defaultValue={productData?.description}
            onChange={(e) => {
              if (descriptionRef.current)
                descriptionRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-primary text-white" type="submit">
            Update Product
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
