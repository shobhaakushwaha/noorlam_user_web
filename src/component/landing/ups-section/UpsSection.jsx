"use client";
import { cashOnDelivery, easyReturn, fastDelivery, securePayment } from '@/assets/icons';
import Image from 'next/image';
import React from 'react';
import "./UpsSection.scss"

const UpsSection = () => {
    return (
        <div className="wrapper_ups_section m-btm">
            <div className="container">
                <div className="wrapper_ups_card">
                    <div className="ups_card">
                        <figure>
                            <Image src={securePayment} alt="securePayment" sizes='100vw' />
                        </figure>
                        <div className="text_data">
                            <h4>Secure Payments</h4>
                            <p>Escrow protection</p>
                        </div>
                    </div>
                    <div className="ups_card">
                        <figure>
                            <Image src={easyReturn} alt="easyReturn" sizes='100vw' />
                        </figure>
                        <div className="text_data">
                            <h4>Easy Returns</h4>
                            <p>30-day policy</p>
                        </div>
                    </div>
                    <div className="ups_card">
                        <figure>
                            <Image src={fastDelivery} alt="fastDelivery" sizes='100vw' />
                        </figure>
                        <div className="text_data">
                            <h4>Fast Delivery</h4>
                            <p>Free shipping for all orders.</p>
                        </div>
                    </div>

                    <div className="ups_card">
                        <figure>
                            <Image src={cashOnDelivery} alt="cashOnDelivery" sizes='100vw' />
                        </figure>
                        <div className="text_data">
                            <h4>Cash On Delivery</h4>
                            <p>Pay on delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpsSection