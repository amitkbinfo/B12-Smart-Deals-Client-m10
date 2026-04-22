import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    price_min,
    price_max,
    image,
    location,
    condition,
    usage,
    seller_name,
    seller_image,
    created_at,
  } = product;

  return (
    <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {title} <span className="text-sm text-gray-500">[{condition}]</span>
        </h2>

        {/* Price */}
        <p className="text-purple-600 font-bold text-lg">
          ${price_min} - ${price_max}
        </p>

        {/* Extra Info */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>📍 {location}</p>
          <p>🕒 {usage}</p>
          <p>
            📅 {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={seller_image}
            alt={seller_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm font-medium text-gray-700">
            {seller_name}
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center">
            <Link to={`/productDetails/${_id}`} className="btn mt-3 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition">
          View Details
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;