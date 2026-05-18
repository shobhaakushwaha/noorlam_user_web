"use client";
import React from "react";
import { handbag_img, jacket_style_img, shoes_style_img, t_shirt_style_img } from "@/assets/images";
import Image from "next/image";
import "./ShopStyle.scss";

const ShopByStyle = () => {
  return (
    <section className="wrapper_shop_style m-btm">
      <div className="container">
        <div className="common_flex">
          <h3>Shop by Style</h3>
        </div>
      </div>
      <div className="wrapper_shop_card">
        {/* Left Card */}
        <div className="wrap_inner_card">
          <div className="wrap_txt text_white">
            <div className="wrap_data_show">
              <p>HANDBAG</p>
              <span>Upgrade Your Look with Elegant Handbags</span>
            </div>
            <button>Shop Now</button>
          </div>
          <figure>
            <Image src={handbag_img} alt="Handbag" sizes="100vw" />
          </figure>
        </div>

        {/* Center Column */}
        <div className="wrap_center_card">
          <div className="wrap_card_double bg_lightblue">
            <div className="wrap_txt text_dark">
              <div className="wrap_data_show">
                <p>T-SHIRT</p>
                <span>Discover Your Perfect T-Shirt</span>
              </div>
              <button>Shop Now</button>
            </div>
            <figure>
              <Image src={t_shirt_style_img} alt="T-Shirt" sizes="100vw" />
            </figure>
          </div>

          <div className="wrap_card_double bg_beige">
            <div className="wrap_txt text_brown">
              <div className="wrap_data_show">
                <p>JACKET</p>
                <span>Upgrade Your Style with This Jacket</span>
              </div>
              <button>Shop Now</button>
            </div>
            <figure>
              <Image src={jacket_style_img} alt="Jacket" />
            </figure>
          </div>
        </div>

        {/* Right Card */}
        <div className="wrap_inner_card">
          <div className="wrap_txt text_white">
            <div className="wrap_data_show">
              <p>SHOES</p>
              <span>Discover the Perfect Pair That Complements Your Style</span>
            </div>
            <button>Shop Now</button>
          </div>
          <figure>
            <Image src={shoes_style_img} alt="Shoes" sizes="100vw" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ShopByStyle;
