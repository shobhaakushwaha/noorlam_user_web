"use client";
import React from 'react';
import "./GirlsAssentials.scss";
import Image from 'next/image';
import { girl_essentials_img, girl_essentials_img_1, girl_essentials_img_2, interest_img, interest_img_1, interest_img_2, interest_img_3, interest_img_4, interest_img_5 } from '@/assets/images';
import Link from 'next/link';
import { arrowupleft } from '@/assets/icons';

const GirlsAssentials = () => {

    const categoryArray = [
        { id: 1, name: "Denim That Moves With You", image: girl_essentials_img },
        { id: 2, name: "Elevate Your Everyday Style", image: girl_essentials_img_1 },
        { id: 3, name: "Perfect Pairs for Every Step", image: girl_essentials_img_2 },
    ]
    return (
        <section className="wrapper_girls_essentials m-btm">
            <div className="container">
                <div className="common_flex">
                    <h3>Girls' Everyday Essentials</h3>
                </div>
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
                        <p>{item.name} <span> <Image
                            className="category_img"
                            src={arrowupleft}
                            alt="category_img"
                            sizes="100vw"
                            unoptimized
                        /></span></p>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default GirlsAssentials