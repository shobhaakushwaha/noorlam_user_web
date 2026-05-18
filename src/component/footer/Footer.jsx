import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { logo } from '@/assets/icons';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="wrapper_footer">
            <div className="container">
                <div className="footer_top">
                    <div className="footer_logo_section">
                        <Link href="/" className="logo">
                            <Image src={logo} alt="Noorlam Baba Logo" unoptimized />
                        </Link>
                        <p className="footer_desc">
                            Kind care, cutting-edge treatments, and personnel dedicated to your health and rehabilitation.
                        </p>
                        <div className="social_links">
                            <Link href="#" aria-label="Facebook"><FaFacebookF /></Link>
                            <Link href="#" aria-label="Instagram"><FaInstagram /></Link>
                        </div>
                    </div>
                    
                    <div className="footer_links_section">
                        <div className="link_column">
                            <h4>Company</h4>
                            <nav aria-label="Company Links">
                                <ul>
                                    <li><Link href="#">Home</Link></li>
                                    <li><Link href="#">Why Us</Link></li>
                                    <li><Link href="#">Contact Us</Link></li>
                                    <li><Link href="#">FAQs</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="link_column">
                            <h4>Help</h4>
                            <nav aria-label="Help Links">
                                <ul>
                                    <li><Link href="#">Customer Support</Link></li>
                                    <li><Link href="#">Shipping Details</Link></li>
                                    <li><Link href="#">Returns & Refunds</Link></li>
                                    <li><Link href="#">Returns & Refunds</Link></li>
                                    <li><Link href="#">Track Order</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="link_column">
                            <h4>Business</h4>
                            <nav aria-label="Business Links">
                                <ul>
                                    <li><Link href="#">Become a Seller</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer_bottom">
                <div className="container">
                    <div className="bottom_flex">
                        <p>© Copyright 2025</p>
                        <div className="legal_links">
                            <Link href="#">Terms of Service</Link>
                            <Link href="#">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;