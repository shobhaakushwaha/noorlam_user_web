"use client";
import React from 'react';
import './LiveBetter.scss';
import { banner } from "@/assets/images";

const LiveBetter = () => {
    return (
        <section className="live-better-section m-btm">
            <div className="live-better-overlay"></div>
            <div className="live-better-content">
                <h3>
                    <span className="underline">Shop Smarter. Live Better.</span>
                </h3>
                <p>
                    From everyday essentials to premium collections, find <br className="hide-on-mobile" />
                    everything you need to upgrade your lifestyle.
                </p>
            </div>
        </section>
    );
};

export default LiveBetter;