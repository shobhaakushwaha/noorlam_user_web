"use client";
import { banner } from "@/assets/images";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "./Banner.scss";

const Banner = () => {
  const bannerSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    // fade: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: "ease-in-out",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
        },
      },
    ],
  };
  return (
    <section className="wrap_banner m-btm">
      <Slider {...bannerSettings}>
        <figure className="wrap_banner_image">
          <Image src={banner} alt="Banner Image" sizes="100vw" unoptimized />
        </figure>
        <figure className="wrap_banner_image">
          <Image src={banner} alt="Banner Image" sizes="100vw" unoptimized />
        </figure>
        <figure className="wrap_banner_image">
          <Image src={banner} alt="Banner Image" sizes="100vw" unoptimized />
        </figure>
      </Slider>
    </section>
  );
};

export default Banner;
