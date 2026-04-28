import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bids, setBids] = useState([]);
//   console.log("Token", user.accessToken);


  useEffect(() => {
    // if (user?.email) {
    //   fetch(`https://smart-deals-server-eight-xi.vercel.app/bids?email=${user.email}`, {
    //     headers: {
    //         authorization: `Bearer ${user.accessToken}`
    //         // authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setBids(data));
    // }

    axiosSecure.get(`/bids?email=${user.email}`)
    .then(data => {
        setBids(data.data)
    })
  }, [user, axiosSecure]);

  const handleDeleteBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-server-eight-xi.vercel.app/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter(bid => bid._id !== id);
              setBids(remainingBids)
            }
          });
      }
    });
  };
  return (
    <div className="w-10/12 mx-auto my-10">
      {/* Title */}
      <h1 className="font-semibold text-2xl text-center mb-10">
        My Bids: <span className="text-purple-600">{bids.length}</span>
      </h1>

      {/* Table Header */}
      <div className="grid grid-cols-6 font-semibold border-b pb-3 mb-3 text-gray-700">
        <div>SL No</div>
        <div>Product</div>
        <div>Seller</div>
        <div>Bid Price</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      {bids.map((bid, index) => (
        <div
          key={bid._id}
          className="grid grid-cols-6 items-center gap-4 border-b py-3 px-2 hover:bg-gray-50"
        >
          {/* SL */}
          <div>{index + 1}</div>

          {/* Product */}
          <div className="flex items-center gap-3">
            <img
              src={bid.product_image}
              alt="product"
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="font-medium">{bid.product_title}</p>
              <p className="text-sm text-gray-500">${bid.product_price}</p>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3">
            <img
              src={bid.seller_image}
              alt="seller"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{bid.seller_name}</p>
              <p className="text-sm text-gray-500">{bid.seller_email}</p>
            </div>
          </div>

          {/* Price */}
          <div className="font-semibold text-blue-600">
            ${parseInt(bid.bid_price)}
          </div>

          {/* Status */}
          <div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                bid.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : bid.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {bid.status}
            </span>
          </div>

          {/* Actions */}
          <div>
            <button
              onClick={() => handleDeleteBid(bid._id)}
              className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white text-sm btn btn-sm"
            >
              Remove Bid
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBids;
