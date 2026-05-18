"use client";
import React from 'react';
import "./ShopInterest.scss";
import Image from 'next/image';
import { interest_img, interest_img_1, interest_img_2, interest_img_3, interest_img_4, interest_img_5 } from '@/assets/images';
import Link from 'next/link';

const ShopInterest = () => {

    const categoryArray = [
        { id: 1, name: "Fitness", image: interest_img },
        { id: 2, name: "Gaming", image: interest_img_1 },
        { id: 3, name: "Home", image: interest_img_2 },
        { id: 4, name: "Travel", image: interest_img_3 },
        { id: 5, name: "Photography", image: interest_img_4 },
        { id: 6, name: "Entertainment", image: interest_img_5 },
        { id: 7, name: "Fitness", image: interest_img },
        { id: 8, name: "Gaming", image: interest_img_1 },
        { id: 9, name: "Home", image: interest_img_2 },
        { id: 10, name: "Travel", image: interest_img_3 },
        { id: 11, name: "Photography", image: interest_img_4 },
        { id: 12, name: "Entertainment", image: interest_img_5 },

    ]

    return (
        <section className="wrapper_shop_interest m-btm">
            <div className="container">
                <div className="common_flex">
                    <h3>Shop by Interest</h3>
                </div>
                <div className="wrap_flex_category">
                    {categoryArray.map((item, index) => (
                        <Link href={""} className="wrap_cards" key={index}>
                            <figure>
                                <Image
                                    className="category_img"
                                    src={item.image}
                                    alt="category_img"
                                    sizes="100vw"
                                    unoptimized
                                />
                            </figure>
                            <p>{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ShopInterest