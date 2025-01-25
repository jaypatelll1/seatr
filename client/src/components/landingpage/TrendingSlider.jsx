import React from "react";
import Slider from "react-slick";
import { TrendingCard } from "./TrendingCard";

export default function TrendingSlider() {
  const dummyData = [
    {
      id: 1,
      name: "Restaurant 1",
      image: "/src/assets/rest1.jpg", // Replace with actual image path
      place: "Place 1",
      rating: "4.5",
    },
    {
      id: 2,
      name: "Restaurant 2",
      image: "/src/assets/rest2.jpg", // Replace with actual image path
      place: "Place 2",
      rating: "4.5",
    },
    {
      id: 3,
      name: "Restaurant 3",
      image: "/src/assets/rest3.jpg", // Replace with actual image path
      place: "Place 3",
      rating: "4.5",
    },
    {
      id: 4,
      name: "Restaurant 4",
      image: "/src/assets/rest4.jpg", // Replace with actual image path
      place: "Place 4",
      rating: "4.5",
    },

  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show only 4 images at a time
    slidesToScroll: 1,
    centerMode: false, // Ensure no center positioning
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 images on smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 images on mobile
        },
      },
    ],
  };

  return (
    <div className="relative mt-20 z-20 px-15 mb-15">
      <h1 className="text-4xl font-bold md:text-5xl pb-10 pl-2">Trending Restaurants</h1>
      <Slider {...settings}>
        {dummyData.map((data) => (
          <div className="px-2"> {/* Add margin between each card */}
            <TrendingCard key={data.id} data={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
}