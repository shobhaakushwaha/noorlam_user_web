"use client";

import CommonCard from "@/component/landing/commoncard/CommonCard";
import { category_img } from "@/assets/images";
import { getCategoryList } from "@/services/home/api";
import { getproductList } from "@/services/product/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FiSliders, FiX } from "react-icons/fi";
import "./CategoryProducts.scss";

const getList = (response, keys) => {
  for (const key of keys) {
    const value = key
      .split(".")
      .reduce((current, item) => current?.[item], response);

    if (Array.isArray(value)) return value;
  }

  return [];
};

const normalizeProduct = (item, index) => {
  const firstImage =
    item?.image ||
    item?.thumbnail ||
    item?.productImage ||
    item?.images?.[0] ||
    item?.productImages?.[0]?.image ||
    item?.productImages?.[0];

  const secondImage =
    item?.images?.[1] ||
    item?.productImages?.[1]?.image ||
    item?.productImages?.[1] ||
    firstImage;

  return {
    id: item?._id || item?.id || index,
    name: item?.name || item?.productName || item?.title || "Product",
    price: item?.price || item?.salePrice || item?.sellingPrice || 0,
    originalPrice: item?.originalPrice || item?.mrp || item?.price || 0,
    rating: item?.rating || item?.averageRating || 0,
    totalCount: item?.totalCount || item?.reviewCount || item?.reviews || 0,
    image: firstImage,
    images: secondImage,
  };
};

const CategoryProducts = ({ categoryId }) => {
  const router = useRouter();
  const activeCategory = categoryId || "";
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryList();
        const list = getList(response, [
          "data.categoryList",
          "data.data",
          "data.categories",
          "data",
        ]);
        setCategories(list);
      } catch (error) {
        console.log("Category API Error:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
           console.log("Fetching products with categoryId:", activeCategory);
        const response = await getproductList(
          activeCategory
            ? { page: 1, limit: 10, categoryId: activeCategory }
            : { page: 1, limit: 10 },
        );
        const list = getList(response, [
          "data.productList",
          "data.products",
          "data.data.productList",
          "data.data.products",
          "data.data",
          "data",
        ]);
        setProducts(list.map(normalizeProduct).filter((item) => item.image));
      } catch (error) {
        console.log("Product API Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const selectedCategory = useMemo(() => {
    return categories.find((item) => String(item._id) === String(activeCategory));
  }, [activeCategory, categories]);

  const handleCategoryChange = (categoryId) => {
    router.push(categoryId ? `/category/${categoryId}` : "/category");
    setShowFilters(false);
  };

  return (
    <main className="category-page">
      <div className="container">
        <div className="category-page__header">
          <div className="category-page__title">
            {selectedCategory && (
              <figure>
                <Image
                  src={selectedCategory.image || category_img}
                  alt={selectedCategory.name || "Category"}
                  width={64}
                  height={64}
                  unoptimized={Boolean(selectedCategory.image)}
                />
              </figure>
            )}
            <h3>All Recommended Products</h3>
            {selectedCategory?.name && <p>{selectedCategory.name}</p>}
          </div>
          <button
            className="category-page__filter-button"
            type="button"
            onClick={() => setShowFilters((value) => !value)}
          >
            {showFilters ? <FiX /> : <FiSliders />}
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        <div className={`category-page__content ${showFilters ? "is-open" : ""}`}>
          <aside className="category-page__filters">
            <div className="filter-box">
              <div className="filter-box__head">
                <h6>Category</h6>
                <button type="button" onClick={() => handleCategoryChange("")}>
                  Clear
                </button>
              </div>
              <label className="filter-option">
                <input
                  checked={!activeCategory}
                  name="category"
                  onChange={() => handleCategoryChange("")}
                  type="radio"
                />
                <span>All categories</span>
              </label>
              {categories.map((item) => (
                <label className="filter-option" key={item._id}>
                  <input
                    checked={activeCategory === item._id}
                    name="category"
                    onChange={() => handleCategoryChange(item.categorySlug)}
                    type="radio"
                  />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </aside>

          <section className="category-page__products">
            {loading ? (
              <div className="category-page__empty">Loading products...</div>
            ) : products.length ? (
              <div className="wrapper_deal_card">
                {products.map((item) => (
                  <CommonCard item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="category-page__empty">No products found.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryProducts;
