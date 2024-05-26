import CoinCard from "./CoinCard";
const coinPacks = [
  {
    title: "Bronze Coin Pack",
    benefits: [
      "Get 500 bronze coins to use in the app.",
      "Unlock basic features.",
      "Support your favorite content creators.",
    ],
    imageURL:
      "https://i.ibb.co/4FGD8J3/3490030-520005-PITCSN-423-removebg-preview.png",
    price: 500,
  },
  {
    title: "Silver Coin Pack",
    benefits: [
      "Get 1000 silver coins to use in the app.",
      "Unlock intermediate features.",
      "Support your favorite content creators.",
      "Get priority access to new content.",
    ],
    imageURL:
      "https://i.ibb.co/4FGD8J3/3490030-520005-PITCSN-423-removebg-preview.png",
    price: 1000,
  },
  {
    title: "Gold Coin Pack",
    benefits: [
      "Get 2000 gold coins to use in the app.",
      "Unlock all features.",
      "Support your favorite content creators.",
      "Get priority access to new content.",
      "Receive exclusive bonuses and discounts.",
    ],
    imageURL:
      "https://i.ibb.co/4FGD8J3/3490030-520005-PITCSN-423-removebg-preview.png",
    price: 2000,
  },
];

const BuyCoins = () => {
  return (
    <div className="overflow-hidden grid grid-cols-3 gap-4 max-w-4xl mx-auto">
      {coinPacks.map((pack, index) => (
        <CoinCard pack={pack} key={index} />
      ))}
    </div>
  );
};

export default BuyCoins;
