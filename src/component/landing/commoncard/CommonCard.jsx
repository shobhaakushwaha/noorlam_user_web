"use client";
import { RatingStar } from "@/component/form";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CommonCard = ({item}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="common_cards">
      <figure className="common_figure">
        <span className="tag">40% OFF</span>
        <Image
          src={item.image}
          className="primary_img"
          alt="care_img"
          sizes="100vw"
          unoptimized
        />
        <Image
          src={item.images}
          className="secondary_img"
          alt="care_img"
          sizes="100vw"
          unoptimized
        />
        <span
          className="wishlist"
          onClick={() => setIsWishlisted(!isWishlisted)}
          role="button"
          aria-label="Add to wishlist"
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </span>
      </figure>
      <div className="data_txt">
        <p>{item.name}</p>
        <div className="wrap_amount">
          <span>$ {item.price}</span>
          <del>$ {item.originalPrice}</del>
        </div>
        <RatingStar
        rating={2.5}
          user={item.rating}
          totalcount={item.totalCount}
        ></RatingStar>
      </div>
    </div>
  );
};

export default CommonCard;
