"use client";
import React, { useEffect, useState } from "react";
import "./Browse.scss";
import Image from "next/image";
import { arrowupleft } from "@/assets/icons";
import Link from "next/link";
import { getCategoryList } from "@/services/home/api";

const BrowseCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
console.log("categoryList", categoryList);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await getCategoryList();
        const list =
          response?.data.categoryList ||
        
          [];
                  // console.log("list", list);
console.log("list", list);

        setCategoryList(list);
      } catch (error) {
        console.log("Category API Error:", error);
      }
    };

    fetchCategoryList();
  }, []);
 
  return (
    <section className="wrapper-browse-category m-btm">
      <div className="container">
        <div className="common_flex">
          <h3>Browse by Categories</h3>
          <Link href="">
            <span>EXPLORE ALL </span>
            <Image src={arrowupleft} alt="arrow_up" width={20} height={20} />
          </Link>
        </div>
      </div>
      <div className="wrap_flex_category">
        {categoryList.map((item) => (
          <div className="wrap_cards" key={item._id}>
            <figure>
              <Image
                className="category_img"
                src={item.image}
                alt={item.name}
                width={260}
                height={200}
                sizes="100vw"
                unoptimized
              />
            </figure>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategory;
