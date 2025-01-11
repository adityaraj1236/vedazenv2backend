import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { Leaf, Star, Droplet, Recycle } from 'lucide-react'; // Correct imports for Lucide icons

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300
};

const ShuffleCard = () => {
  const [cards, setCards] = useState(initialCards);
  const [shuffleCount, setShuffleCount] = useState(0); // Counter for shuffle limit

  // Shuffle logic that runs only 3 times
  useEffect(() => {
    if (shuffleCount < 2) {
      const timer = setTimeout(() => {
        setCards(shuffle(cards)); // Shuffle the cards
        setShuffleCount(shuffleCount + 1); // Increment shuffle count
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount or shuffle change
    }
  }, [cards, shuffleCount]); // Dependency on cards and shuffleCount

  return (
    <div className="flex flex-col gap-8 text-3xl justify-center items-center w-full h-screen">
        <div>Why choose VedaZen ?</div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
            <motion.li
  key={card.id}
  layout
  transition={spring}
  className="w-[320px] h-auto min-h-[320px] bg-gradient-to-r from-[#e2e0df] to-[#bead9d] flex flex-col justify-between items-center rounded-lg shadow-xl p-6 text-white font-bold"
>
  <div className="flex justify-center items-center">
    {/* Render icon components */}
    <div className="w-24 h-24 mb-4 flex justify-center items-center">
      {card.image}
    </div>
  </div>
  <div className="text-center">
    <h3 className="text-2xl font-bold truncate text-green-500">{card.title}</h3>
    <p className="text-lg leading-relaxed overflow-hidden text-ellipsis text-green-500">
      {card.content}
    </p>
  </div>
</motion.li>

        ))}
      </ul>
    </div>
  );
};

// Initial set of cards with titles, content, and icons
const initialCards = [
  {
    id: 1,
    title: "100% Natural Ingredients",
    content: "Sustainably sourced herbs and botanicals, free from harmful chemicals.",
    image: <Leaf className="w-12 h-12 text-green-600" /> // Rendering as component
  },
  {
    id: 2,
    title: "Holistic Wellness",
    content: "Addressing root causes for long-lasting results and overall harmony.",
    image: <Star className="w-12 h-12 text-green-600" /> // Rendering as component
  },
  {
    id: 3,
    title: "Authentic Formulations",
    content: "Crafted using authentic Ayurvedic recipes refined with modern research.",
    image: <Droplet className="w-12 h-12 text-green-600" /> // Rendering as component
  },
  {
    id: 4,
    title: "Eco-Friendly Practices",
    content: "Committed to sustainable packaging and environmentally friendly practices.",
    image: <Recycle className="w-12 h-12 text-green-600" /> // Rendering as component
  }
];

export default ShuffleCard;
