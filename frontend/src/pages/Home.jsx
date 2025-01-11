import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import logo from "./images/vedazen-logo.png";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
import RollingGallery from "../blocks/Components/RollingGallery/RollingGallery";
// import Masonry from "../blocks/Components/Masonry/Masonry";
import ShuffleCard from "../blocks/Components/ShuffleCard/ShuffleCard";
import AnimatedContent from "../blocks/Animations/AnimatedContent/AnimatedContent";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

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
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end mt-0">
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

            <div className="flex text-[#F2AE72]  text-lg space-x-4 order-3 md:order-2">
              
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <Link
              to="/shop"
              className="bg-[#F2AE72] font-bold rounded-full py-2 px-10 mt-5 order-1 md:order-2 md:mr-[18rem]"
            >

              Shop Now
            </Link>
          </div>

          <div>
          
          <div className="flex ml-[50%] my-[28px] text-2xl font-semibold">Our Product Range</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 mt-8 place-items-center">
  {data.products.map((product) => (
    <div key={product._id}>
      <Product product={product} />
    </div>
  ))}
</div>



<BlurText
  text="Vedazen: Revive with Nature's Touch."
  delay={150}
  animateBy="words"
  direction="top"
  // onAnimationComplete={handleAnimationComplete}
  className="text-6xl mb-8 mt-8 ml-[20%] font-bold text-[#F2AE72]"
/>
        {/* <RollingGallery autoplay={true} pauseOnHover={true} images={imagesArray} /> */}
        {/* <Masonry/> */}
        <ShuffleCard/>
        <div className="flex justify-center items-center w-full h-screen">
  <AnimatedContent
    distance={50}
    direction="horizontal"
    reverse={false}
    config={{ tension: 80, friction: 20 }}
    initialOpacity={0.2}
    animateOpacity
    scale={1.1}
    threshold={0.2}
  >
    <div className="text-center  bg-gradient-to-r rounded-lg shadow-lg  text-white max-w-3xl">
      
    <SplitText
  text="Our Philoshphy"
  className="text-2xl font-semibold text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
/>
      <p className="text-xl font-medium mb-2">Balance. Harmony. Healing.</p>
      <p className="text-lg leading-relaxed">
        At VedaZen, we believe true wellness comes from balancing the three doshas—Vata, Pitta, and Kapha. 
        Our mission is to empower you with products that help you achieve that balance, so you can lead a healthier, happier life.
      </p>
    </div>
  </AnimatedContent>
</div>

          </div>
        </>
      )}
    </>
  );
};

export default Home;