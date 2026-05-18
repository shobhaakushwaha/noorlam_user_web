"use client";
import { arrowupleft } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import "./NewCollection.scss";
import { common_img, common_img_1, common_img_2, common_img_3, common_img_4 } from "@/assets/images";
import CommonCard from "../commoncard/CommonCard";
import Link from "next/link";

const NewCollection = () => {

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
    ]
  return (
    <section className="wrapper_new_collection m-btm">
      <div className="container">
        <div className="common_flex">
          <div className="wrap_txt_time">
            <h3>New Collections</h3>
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
  )
}

export default NewCollection