"use client";
import React, { useState } from "react";
import "./SeasonalArrivals.scss";

import {
  common_img,
  common_img_1,
  common_img_2,
  common_img_3,
  common_img_4,
  common_img_5,
  handbag_img,
} from "@/assets/images";
import CommonCardTwo from "../commoncard/CommonCardTwo";
import Image from "next/image";
import { arrowupleft } from "@/assets/icons";
import Link from "next/link";

const SeasonalArrivals = () => {
  const [arrivalTab, setArrivalTab] = useState("Summer");
  const ArrayData = [
    {
      id: 1,
      name: "T7 ALWAYS ON Men's Relaxed Fit Track Pants",
      price: 299,
      originalPrice: 320,
      rating: 4.8,
      totalCount: 239,
      image: handbag_img,
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
  ];

  return (
    <section className="wrapper_seasonal_arrivals m-btm">
      <div className="container">
        <div className="common_flex">
          <div className="wrap_txt_time">
            <h3>Seasonal Arrivals</h3>
          </div>
          <div className="wrapper_cstm_tabers">
            <ul>
              <li
                className={arrivalTab === "Summer" ? "active" : ""}
                onClick={() => setArrivalTab("Summer")}
              >
                Summer
              </li>
              <li
                className={arrivalTab === "Spring" ? "active" : ""}
                onClick={() => setArrivalTab("Spring")}
              >
                Spring
              </li>
              <li
                className={arrivalTab === "Winter" ? "active" : ""}
                onClick={() => setArrivalTab("Winter")}
              >
                Winter
              </li>
            </ul>
          </div>
        </div>
        {arrivalTab === "Summer" && <div className="wrapper_deal_card">
          {ArrayData.map((item, index) => (
            <CommonCardTwo item={item} key={index} />
          ))}
        </div>}
        {arrivalTab === "Spring" && <div className="wrapper_deal_card">
          {ArrayData.map((item, index) => (
            <CommonCardTwo item={item} key={index} />
          ))}
        </div>}
        {arrivalTab === "Winter" && <div className="wrapper_deal_card">
          {ArrayData.map((item, index) => (
            <CommonCardTwo item={item} key={index} />
          ))}
        </div>}

        <div className="wrapper_btn">
          <Link className="common_btn" href="">EXPLORE ALL <Image src={arrowupleft} alt="arrow_up" width={20} height={20} /></Link>
        </div>
      </div>
    </section>
  );
};

export default SeasonalArrivals;
