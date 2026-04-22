import React from "react";

const BidProduct = ({ bid, index }) => {
    
  const {
    buyer_name,
    buyer_email,
    buyer_image,
    bid_price,
    status,
  } = bid;

  return (
    <div className="grid grid-cols-5 items-center gap-4 border-b py-3 px-2 hover:bg-gray-50">

      {/* SL No */}
      <div>{index + 1}</div>

      {/* Buyer Info */}
      <div className="flex items-center gap-3">
        <img
          src={buyer_image}
          alt="buyer"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{buyer_name}</p>
          <p className="text-sm text-gray-500">{buyer_email}</p>
        </div>
      </div>

      {/* Bid Price */}
      <div className="font-semibold text-green-600">
        ${parseInt(bid_price)}
      </div>

      {/* Status */}
      <div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : status === "accepted"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white text-sm">
          Accept
        </button>

        <button className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white text-sm">
          Reject
        </button>
      </div>
    </div>
  );
};

export default BidProduct;