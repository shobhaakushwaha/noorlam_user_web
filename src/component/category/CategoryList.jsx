"use client";

import { category_img } from "@/assets/images";
import { getCategoryList } from "@/services/home/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./CategoryProducts.scss";

const getCategoryArray = (response) => {
  return (
    response?.data?.categoryList ||
    response?.data?.data ||
    response?.data?.categories ||
    response?.data ||
    []
  );
};

const getCategorySlug = (item) => item?.categorySlug || item?.slug || "";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryList();
        const list = getCategoryArray(response);

        console.log(list, "*************************");
        setCategories(Array.isArray(list) ? list : []);
      } catch (error) {
        console.log("Category API Error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="category-list-page">
      <div className="container">
        <div className="category-list-page__header">
          <h3>All Categories</h3>
        </div>

        {loading ? (
          <div className="category-page__empty">Loading categories...</div>
        ) : categories.length ? (
          <div className="category-list-page__grid">
            {categories.map((item) => {
              const slug = getCategorySlug(item);
              const key = item._id || item.id || slug;
              if (!slug) return null;

              return (
                <Link
                  className="category-list-card"
                  href={`/category/${encodeURIComponent(slug)}`}
                  key={key}
                >
                  <figure>
                    <Image
                      src={item.image || category_img}
                      alt={item.name || "Category"}
                      width={360}
                      height={260}
                      sizes="(max-width: 600px) 100vw, (max-width: 1081px) 50vw, 25vw"
                      unoptimized={Boolean(item.image)}
                    />
                  </figure>
                  <p>{item.name}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="category-page__empty">No categories found.</div>
        )}
      </div>
    </main>
  );
};

export default CategoryList;
