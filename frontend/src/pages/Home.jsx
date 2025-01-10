import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import logo from "./images/vedazen-logo.png";
import Masonry from "../blocks/Components/Masonry/Masonry";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
import RollingGallery from "../blocks/Components/RollingGallery/RollingGallery";
const Home = () => {
  const imagesArray = [
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/35600/road-forest-season-trees.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end">
            <Link
              to="/"
              className="mt-10 order-2 md:order-1"
            >
              <img
                src={logo}
                alt="VedaZen"
                className="h-16 w-16 md:ml-[20rem]"
              />
            </Link>

            <Link
              to="/shop"
              className="bg-[#F2AE72] font-bold rounded-full py-2 px-10 mt-5 order-1 md:order-2 md:mr-[18rem]"
            >

              Explore Vedazen
            </Link>
          </div>

          <div>
          {/* <Masonry
          breakpointCols={{
                default: 4,
                1100: 3,
                700: 2,
                500: 1
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"> */}
              
              <div className="flex flex-wrap justify-around items-center">
            {/* <Masonry data={data.products} /> */}
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
              </div>
          {/* </Masonry> */}

<BlurText
  text="Vedazen: Revive with Nature's Touch."
  delay={150}
  animateBy="words"
  direction="top"
  // onAnimationComplete={handleAnimationComplete}
  className="text-6xl mb-8 ml-[20%] font-bold text-[#F2AE72]"
/>
        {/* <RollingGallery autoplay={true} pauseOnHover={true} images={imagesArray} /> */}
          </div>
        </>
      )}
    </>
  );
};

export default Home;