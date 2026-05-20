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
  const variantImages = item?.variants?.[0]?.images || [];
  const firstImage =
    item?.image ||
    item?.thumbnail ||
    item?.productImage ||
    variantImages?.[0] ||
    item?.images?.[0] ||
    item?.productImages?.[0]?.image ||
    item?.productImages?.[0];

  return {
    id: item?._id || item?.id || index,
    name: item?.name || item?.productName || item?.title || "Product",
    price: item?.price || item?.salePrice || item?.sellingPrice || 0,
    originalPrice: item?.originalPrice || item?.mrp || item?.price || 0,
    rating: item?.rating || item?.averageRating || 0,
    totalCount: item?.totalCount || item?.reviewCount || item?.reviews || 0,
    image: firstImage,
    images: firstImage,
  };
};

const getCategorySlug = (item) => item?.categorySlug || item?.slug || "";
const getCategoryId = (item) => item?._id || item?.id || "";

const CategoryProducts = ({ categorySlug }) => {
  const router = useRouter();
  const activeCategory = categorySlug || "";
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedCategory = useMemo(() => {
    return categories.find(
      (item) =>
        String(getCategorySlug(item)) === String(activeCategory) ||
        String(getCategoryId(item)) === String(activeCategory),
    );
  }, [activeCategory, categories]);

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
        console.log("Category list response:", list);
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
        if (activeCategory && categories.length === 0) return;
        if (activeCategory && !selectedCategory) {
          setProducts([]);
          return;
        }

        const categoryId = selectedCategory?._id || selectedCategory?.id;
        const categoryParams =
          activeCategory && categoryId ? { categoryId } : {};
        const productPayload = { page: 1, limit: 10, ...categoryParams };

        const response = await getproductList(productPayload);
        console.log("Product list API response:", response);

        const productList =
          response?.data?.productList ||
          response?.data?.products ||
          [];

        console.log("Product list mapped data:", productList);

        setProducts(
          Array.isArray(productList)
            ? productList.map(normalizeProduct).filter((item) => item.image)
            : [],
        );

      } catch (error) {
        console.log("Product API Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, categories.length, selectedCategory]);

  const handleCategoryChange = (nextCategorySlug) => {
    router.push(
      nextCategorySlug
        ? `/category/${encodeURIComponent(nextCategorySlug)}`
        : "/category",
    );
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
              {categories.map((item) => {
                const slug = getCategorySlug(item);
                const key = item._id || item.id || slug;
                if (!slug) return null;

                return (
                  <label className="filter-option" key={key}>
                    <input
                      checked={activeCategory === slug}
                      name="category"
                      onChange={() => handleCategoryChange(slug)}
                      type="radio"
                    />
                    <span>{item.name}</span>
                  </label>
                );
              })}
            </div>
          </aside>

          <section className="category-page__products">
            {loading ? (
              <div className="category-page__empty">Loading products...</div>
            ) : products?.length > 0 ? (
              <div className="wrapper_deal_card">
                {products.map((item) => (
                  <CommonCard item={item} key={item._id || item.id} />
                ))}
              </div>
            ) : (
              <div className="category-page__empty">Product not found.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryProducts;
