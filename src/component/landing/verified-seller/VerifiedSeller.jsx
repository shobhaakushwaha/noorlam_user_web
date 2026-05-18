"use client";
import React from 'react';
import Image from 'next/image';
import { RatingStar } from "@/component/form";
import { interest_img, interest_img_1, interest_img_2 } from "@/assets/images";
import "./VerifiedSeller.scss";
import { arrowupleft } from '@/assets/icons';

const VerifiedSeller = () => {
    const sellers = [
        {
            id: 1,
            title: "NaturalAura Skincare",
            rating: 4.8,
            totalCount: 239,
            category: "Cosmetic",
            orders: "1,200+",
            image: interest_img
        },
        {
            id: 2,
            title: "Urban Threads",
            rating: 4.5,
            totalCount: 568,
            category: "Fashion",
            orders: "1,408+",
            image: interest_img_1
        },
        {
            id: 3,
            title: "NextGen HomeTech",
            rating: 3.5,
            totalCount: 156,
            category: "Electronics",
            orders: "1,680+",
            image: interest_img_2
        }
    ];

    // Duplicate the array for seamless marquee
    const marqueeData = [...sellers, ...sellers];

    return (
        <section className="wrapper_verified_seller m-btm">
            <div className="container">
                <div className="common_flex">
                    <h3>Verified Premium Seller</h3>
                </div>
                <div className="marquee_container">
                    <div className="marquee_track">
                        {marqueeData.map((item, index) => (
                            <div className="verified_card" key={index}>
                                <div className="top_section">
                                    <figure>
                                        <Image src={item.image} alt={item.title} sizes="100vw" unoptimized />
                                    </figure>
                                    <div className="text_data">
                                        <h4>{item.title}</h4>
                                        <RatingStar
                                            rating={item.rating}
                                            user={item.rating}
                                            totalcount={item.totalCount}
                                        />
                                    </div>
                                </div>
                                <div className="bottom_section">
                                    <div className="badges">
                                        <span>{item.category}</span>
                                        <span>{item.orders} Orders</span>
                                    </div>
                                    <div className="icon_arrow">
                                        <Image src={arrowupleft} alt="Arrow" unoptimized />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    )
}

export default VerifiedSeller;