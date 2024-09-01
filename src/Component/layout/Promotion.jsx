import React, {useState } from 'react';
import data from "../../data.json";

const Promotion = () => {
  const [promotions, setPromotions] = useState(data.slice(4, 7));

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-center text-4xl font-bold mb-4 text-orange-400">Best Promotions</h2>
      <p className="text-center text-gray-600 mb-8">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur <br /> aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="relative border rounded-lg overflow-hidden shadow-lg">
            <img
              src={promotion.image}
              alt={promotion.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Rating {promotion.rating}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-orange-600">{promotion.title}</h3>
              <p className="text-sm text-gray-500">{promotion.location}</p>
              <p className="text-gray-700 mt-2">{promotion.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">From ${promotion.price}</span>
                <a href="/hotels" className="text-orange-600 font-semibold">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
