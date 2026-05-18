"use client";
import { arrowupleft } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import "./DealsDay.scss";
import { common_img, common_img_1, common_img_2, common_img_3, common_img_4, common_img_5, common_img_6, common_img_7 } from "@/assets/images";
import CommonCard from "../commoncard/CommonCard";
import Link from "next/link";

const DealsDay = () => {
  
  const ArrayData =[
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
   {
    id: 6,
    name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
    price: 299,
    originalPrice: 320,
    rating: 4.8,
    totalCount: 239,
    image: common_img_5,
    images: common_img_6,

  },
   {
    id: 7,
    name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
    price: 299,
    originalPrice: 320,
    rating: 4.8,
    totalCount: 239,
    image: common_img_6,
    images: common_img_7,

  },
   {
    id: 8,
    name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
    price: 299,
    originalPrice: 320,
    rating: 4.8,
    totalCount: 239,
    image: common_img_7,
    images: common_img_1,
  },
]
 
  return (
    <section className="wrapper_day_deal m-btm">
      <div className="container">
        <div className="common_flex">
          <div className="wrap_txt_time">
            <h3>Deals of the day</h3>
            <span>ENDS IN 04:32:12</span>
          </div>
          <Link href="">
            <span>EXPLORE ALL </span>
            <Image src={arrowupleft} alt="arrow_up" width={20} height={20} />
          </Link>
        </div>
        <div className="wrapper_deal_card">
          {ArrayData.map((item, index) => (
            <CommonCard item={item} key={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsDay;
