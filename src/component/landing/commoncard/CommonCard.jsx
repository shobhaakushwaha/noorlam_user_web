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
        <span className="tag">{item?.discountPercentage}% OFF</span>
        <Image
          src={item.image}
          className="primary_img"
          alt="care_img"
          width={300}
          height={300}
          sizes="100vw"
          unoptimized
        />
        <Image
          src={item.images}
          className="secondary_img"
          alt="care_img"
          width={100}
          height={200}
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
        <p>{item?.name}</p>
        <div className="wrap_amount">
          <span>$ {item?.salePrice}</span>
          <del>$ {item?.price}</del>
        </div>
        <RatingStar
          rating={item?.averageRating}
          user={item?.averageRating}
          totalcount={item?.reviewCount}
        ></RatingStar>
      </div>
    </div>
  );
};

export default CommonCard;
