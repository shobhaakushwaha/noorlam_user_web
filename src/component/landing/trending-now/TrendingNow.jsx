"use client";
import { arrowupleft } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import CommonCard from "../commoncard/CommonCard";
import "./TrendingNow.scss";
import {
  common_img,
  common_img_1,
  common_img_2,
  common_img_3,
  common_img_4,
  common_img_5,
} from "@/assets/images";
import Link from "next/link";

const TrendingNow = () => {
  const ArrayData = [
    {
      id: 1,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: common_img,
      images: common_img_1,
    },
    {
      id: 2,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: common_img_1,
      images: common_img,
    },
    {
      id: 3,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: common_img_2,
      images: common_img_3,
    },
    {
      id: 4,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: common_img_3,
      images: common_img_4,
    },
    {
      id: 5,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: common_img_4,
      images: common_img_5,
    },
  ];

  return (
    <section className="wrapper_trending_now m-btm">
      <div className="container">
        <div className="common_flex">
          <h3>Trending Now</h3>
          <Link href="">
            <span>EXPLORE ALL </span>
            <Image src={arrowupleft} alt="arrow_up" width={20} height={20} />
          </Link>
        </div>
        <div className="wrapper_deal_card">
          {ArrayData.map((item, index) => (
            <CommonCard item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
