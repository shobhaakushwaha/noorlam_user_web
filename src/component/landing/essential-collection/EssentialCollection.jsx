"use client";
import React from "react";
import "./Essential.scss";
import Image from "next/image";
import { Button, Input } from "@/component/form";
import { care_img, shoes_img, sofa_img } from "@/assets/images";

const EssentialCollection = () => {
  return (
    <section className="wrapper_essential_collection m-btm">
      <div className="container">
        <div className="common_flex">
          <h3>Minimalist Essentials Collections</h3>
        </div>
      </div>
      <div className="wrap_card_data">
        <div className="wrap_left">
          <div className="product_cards">
            <div className="text_data">
              <h4>
                Spring beauty musts <span></span> having a moment
              </h4>
              <p>Grab the discount and start your journey</p>
              <Button className="round">Shop our favorite</Button>
            </div>
            <figure>
              <Image src={care_img} alt="care_img" sizes="100vw" unoptimized />
            </figure>
          </div>
          <div className="product_cards second">
            <figure>
              <Image src={sofa_img} alt="sofa_img" sizes="100vw" unoptimized />
            </figure>
            <div className="text_data">
              <h4>
                Save 20% on selected <span></span> items
              </h4>
              <p>Score savings this week on tech, fashion, home and more.</p>
              <Button className="round">Shop Now</Button>
            </div>
          </div>
        </div>
        <div className="wrap-right">
          <div className="wrap_shoes">
            <h4>Crazy Seasons <span></span> Essential From $30</h4>
            <Button className="round">Shop our favorite</Button>
          </div>
          <figure>
            <Image src={shoes_img} alt="shoes_img" sizes="100vw" unoptimized />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default EssentialCollection;
