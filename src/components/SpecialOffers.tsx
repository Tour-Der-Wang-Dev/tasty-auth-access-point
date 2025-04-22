
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { specialOffers } from "../data/mockData";
import { useNavigate } from "react-router-dom";

const SpecialOffers = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Special Offers</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {specialOffers.map((offer) => (
            <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
              <div 
                className="h-36 rounded-lg overflow-hidden relative"
                onClick={() => navigate(`/restaurant/${offer.restaurantId}`)}
              >
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{offer.title}</h3>
                  <p className="text-white text-sm">{offer.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default SpecialOffers;
