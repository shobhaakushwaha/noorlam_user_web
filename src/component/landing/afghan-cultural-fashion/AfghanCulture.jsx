"use client";
import { arrowupleft } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import "./AfghanCulture.scss";
import { afghan_img, afghan_img_1, afghan_img_2, afghan_img_3, common_img, common_img_1, common_img_2, common_img_3, common_img_4} from "@/assets/images";
import CommonCard from "../commoncard/CommonCard";
import Link from "next/link";

const AfghanCulture = () => {

     const ArrayData =[
            {
            id: 1,
            name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
            price: 299,
            originalPrice: 320,
            rating: 4.8,
            totalCount: 239,
            image: afghan_img,
            images: afghan_img_1,
        
          },
            {
            id: 2,
            name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
            price: 299,
            originalPrice: 320,
            rating: 4.8,
            totalCount: 239,
            image: afghan_img_1,
            images: afghan_img_2,
        
        
        
          },
           {
            id: 3,
            name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
            price: 299,
            originalPrice: 320,
            rating: 4.8,
            totalCount: 239,
            image: afghan_img_2,
            images: afghan_img_3,
        
          },
           {
            id: 4,
            name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
            price: 299,
            originalPrice: 320,
            rating: 4.8,
            totalCount: 239,
            image: afghan_img_3,
            images: afghan_img,
        
          },
        ]
  return (

    <section className="wrapper_afghanculture m-btm">
      <div className="container">
        <div className="common_flex">
            <h3>Afghan Cultural Fashion</h3>
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

export default AfghanCulture