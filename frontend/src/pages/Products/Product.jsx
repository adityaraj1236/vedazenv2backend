import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
// import SpotlightCard from ".../src/blocks/Components/SpotlightCard/SpotlightCard";
import SpotlightCard from "../../blocks/Components/SpotlightCard/SpotlightCard";

const Product = ({ product }) => {
  return (
    <div className="w-[300px] rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:shadow-xl">
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(222, 184, 135, 0.8)">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded-xl"
        />
        <div className="absolute top-2 right-2 z-10">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl text-[#F2AE72] font-medium">
            &#8377;{product.price}
          </span>
          <button className="text-xs bg-[#F2AE72] text-gray-600 font-bold py-2 px-4 rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
      </SpotlightCard>
    </div>
  );
};

export default Product;
