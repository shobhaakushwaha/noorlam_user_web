"use client";
import React, { useEffect, useState } from "react";
import "./Browse.scss";
import Image from "next/image";
import { arrowupleft } from "@/assets/icons";
import Link from "next/link";
import { getCategoryList } from "@/services/home/api";

const getCategorySlug = (item) => item?.categorySlug || item?.slug || "";

const BrowseCategory = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await getCategoryList();
        const list = response?.data.categoryList || response?.data?.data || [];

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
          <Link href="/category">
            <span>EXPLORE ALL </span>
            <Image src={arrowupleft} alt="arrow_up" width={20} height={20} />
          </Link>
        </div>
      </div>
      <div className="wrap_flex_category">
        {categoryList.map((item) => {
          const slug = getCategorySlug(item);
          const key = item._id || item.id || slug;
          if (!slug) return null;

          return (
            <Link
              className="wrap_cards"
              href={`/category/${encodeURIComponent(slug)}`}
              key={key}
            >
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
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BrowseCategory;
