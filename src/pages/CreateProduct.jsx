// import axios from "axios";
import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
// import useAuth from "../hooks/useAuth";
// import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CreateProduct = () => {
    // const {user} = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      title: form.title.value,
      category: form.category.value,
      minPrice: form.minPrice.value,
      maxPrice: form.maxPrice.value,
      condition: form.condition.value,
      usageTime: form.usageTime.value,
      productImage: form.productImage.value,
      sellerName: form.sellerName.value,
      sellerEmail: form.sellerEmail.value,
      sellerContact: form.sellerContact.value,
      sellerImage: form.sellerImage.value,
      location: form.location.value,
      description: form.description.value,
    };


    // axios.post(`https://smart-deals-server-eight-xi.vercel.app/products`, formData)
    // .then(data => {
    //     console.log(data.data);
    //     if(data.data.insertedId) {
    //         Swal.fire({
    //                     position: "center",
    //                     icon: "success",
    //                     title: "Your product has been created!",
    //                     showConfirmButton: false,
    //                     timer: 1500,
    //                   });
    //     }
    //     e.target.reset();
    // })

    axiosSecure.post("/products", formData)
    .then(data => {
        console.log(data.data);
        if(data.data.insertedId) {
            Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your product has been created!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
        }
        // e.target.reset();

    })

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Link to={"/"} className="text-gray-600 mb-2 cursor-pointer">← Back To Products</Link>

      <h1 className="text-3xl font-bold mb-6">
        Create <span className="text-purple-600">A Product</span>
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="">Select a Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="vehicles">Vehicles</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="text-sm font-medium">
              Min Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="minPrice"
              step="0.01"
              placeholder="e.g. 18.5"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="text-sm font-medium">
              Max Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="maxPrice"
              step="0.01"
              placeholder="Optional (default = Min Price)"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Product Condition
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  value="brand_new"
                  defaultChecked
                  className="radio radio-primary"
                />
                Brand New
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  className="radio radio-primary"
                />
                Used
              </label>
            </div>
          </div>

          {/* Usage Time */}
          <div>
            <label className="text-sm font-medium">
              Product Usage time
            </label>
            <input
              type="text"
              name="usageTime"
              placeholder="e.g. 1 year 3 month"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Product Image */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Your Product Image URL
            </label>
            <input
              type="url"
              name="productImage"
              placeholder="https://..."
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Seller Name */}
          <div>
            <label className="text-sm font-medium">Seller Name</label>
            <input
              type="text"
              name="sellerName"
              placeholder="e.g. Artisan Roasters"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Seller Email */}
          <div>
            <label className="text-sm font-medium">Seller Email</label>
            <input
              type="email"
              name="sellerEmail"
              placeholder="email@example.com"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm font-medium">Seller Contact</label>
            <input
              type="tel"
              name="sellerContact"
              placeholder="+1-555-1234"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Seller Image */}
          <div>
            <label className="text-sm font-medium">
              Seller Image URL
            </label>
            <input
              type="url"
              name="sellerImage"
              placeholder="https://..."
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Simple Description about your Product
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="e.g. I bought this product 3 month ago..."
              className="textarea textarea-bordered w-full mt-1"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90"
            >
              Create A Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;