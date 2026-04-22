import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import BidProduct from "./BidProduct";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const product = useLoaderData();
  const modalOpen = useRef(null);

  const {
    _id,
    title,
    price_min,
    price_max,
    image,
    category,
    created_at,
    condition,
    usage,
    description,
    location,
    seller_name,
    seller_image,
    seller_contact,
    email,
    status,
  } = product;

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [_id]);
  const handleBidModal = () => {
    modalOpen.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const price = parseInt(form.price.value);
    const contact = form.contact.value;
console.log(price);
    const newBid = {
      product: _id,
      buyer_image: photo,
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };
    console.log(newBid);

    // Bid data send to the Database via server
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          modalOpen.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          //   add new bid to the state
          newBid._id = data.insertedId;
          const updatedBids = [...bids, newBid];

          //   sort price
          updatedBids.sort(
            (a, b) => parseInt(a.bid_price) - parseInt(b.bid_price),
          );
          setBids(updatedBids);
        }
      });
  };
  return (
    <div className="w-10/12 mx-auto my-10 space-y-6">
      {/* Product Info */}
      <div>
        {/* Back Button */}
        <Link to="/" className="text-sm text-gray-500 hover:underline">
          ← Back To Products
        </Link>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="bg-gray-200 rounded-xl h-80 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Info */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                {category}
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-green-600 font-bold text-xl">
                ${price_min} - {price_max}
              </p>
              <p className="text-sm text-gray-500">Price starts from</p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
              <p>
                <span className="font-semibold">Product ID:</span> {_id}
              </p>
              <p>
                <span className="font-semibold">Posted:</span>{" "}
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Description */}
          <div className="bg-gray-100 p-5 rounded-xl space-y-3">
            <h2 className="font-semibold text-gray-800">Product Description</h2>

            <div className="flex justify-between text-sm text-gray-600">
              <p>
                <span className="text-purple-600 font-medium">Condition:</span>{" "}
                {condition}
              </p>
              <p>
                <span className="text-purple-600 font-medium">Usage Time:</span>{" "}
                {usage}
              </p>
            </div>

            <hr />

            <p className="text-sm text-gray-500">{description}</p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-100 p-5 rounded-xl space-y-4">
            <h2 className="font-semibold text-gray-800">Seller Information</h2>

            <div className="flex items-center gap-3">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-700">{seller_name}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Contact:</span> {seller_contact}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded text-xs">
                  {status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          to={``}
          onClick={handleBidModal}
          className="w-full py-3 rounded-xl text-white font-semibold primary-bg btn hover:opacity-90"
        >
          I Want Buy This Product
        </Link>

        <dialog ref={modalOpen} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-3xl">
            {/* Title */}
            <h3 className="text-xl font-bold text-center mb-6">
              Give Seller Your Offered Price
            </h3>

            {/* Form */}
            <form onSubmit={handleBidSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Buyer Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    readOnly
                    placeholder="Your name"
                    className="input input-bordered w-full mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Buyer Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    readOnly
                    className="input input-bordered w-full mt-1"
                    required
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="text-sm font-medium">Buyer Image URL</label>
                <input
                  type="url"
                  name="photo"
                  defaultValue={user?.photoURL}
                  placeholder="Your Photo"
                  className="input input-bordered w-full mt-1"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium">Place your Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter your offered price"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="text-sm font-medium">Contact Info</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="e.g. +8801XXXXXXXXX"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              {/* Actions */}
              <div className="modal-action flex justify-end gap-3">
                {/* Cancel (closes modal) */}
                <form method="dialog">
                  <button className="btn btn-outline">Cancel</button>
                </form>

                {/* Submit */}
                <button type="submit" className="btn primary-bg">
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {/* Bids for this Product */}
      <div>
        <h1 className="font-semibold text-2xl text-center">
          Bids for this Product:{" "}
          <span className="primary-text">{bids.length}</span>
        </h1>
        <div>
          <div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2">
            <div>SL</div>
            <div>Buyer</div>
            <div>Price</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {bids.map((bid, index) => (
            <BidProduct index={index} key={bid._id} bid={bid}></BidProduct>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
