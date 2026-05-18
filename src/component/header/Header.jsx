"use client";
import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import {
  blackArrow,
  cartIcon,
  chatIcon,
  countryIcon,
  downArrow,
  likeIcon,
  location,
  logo,
  microphoneIcon,
  notiIcon,
  searchIcon,
  userIcon,
} from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { isLogin, logoutUser } from "@/utils/cookie";
import { useRouter } from "next/navigation";


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const addressRef = useRef(null);
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLogin());
  }, []);
  const toggleDropdown = (e, key) => {
    // e.stopPropagation();
    if (key === "language") {
      setIsLanguageOpen((prev) => !prev);
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const header = document.querySelector(".wrap_header");

    const handleScroll = () => {
      if (window.scrollY > 100) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup (VERY IMPORTANT)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        // setIsLanguageOpen(false);
      }

      if (addressRef.current && !addressRef.current.contains(event.target)) {
        // setIsDropdownOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // ---------handle-log-out---------------
  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    router.push("/login");
  };
  return (
    <div className="wrap_header">
      <nav className="navbar">
        <div className="container">
          <div className="inner_part">
            <div className="left_part" ref={dropdownRef}>
              <div
                className="location_wrap"
                onClick={(e) => toggleDropdown(e, "address")}
              >
                <Image
                  className="location-icon"
                  src={location}
                  alt="location"
                  sizes="100vw"
                />
                <span className="delever-txt">Deliver to </span>
                <span className="city-txt">New York, NY 10001</span>
                <Image
                  className={`arrow-icon ${isDropdownOpen ? "active" : ""}`}
                  src={downArrow}
                  alt="downArrow"
                  sizes="100vw"
                />
              </div>
              {isDropdownOpen && (
                <div className="btm_dropdown">
                  <ul className="list">
                    <li className="item">
                      <Link href="#">
                        <Image
                          className="location-icon"
                          src={location}
                          alt="location"
                          sizes="100vw"
                        />
                        New York, NY 10001
                      </Link>
                    </li>
                    <li className="item">
                      <Link href="#">
                        <Image
                          className="location-icon"
                          src={location}
                          alt="location"
                          sizes="100vw"
                        />
                        New York, NY 10001
                      </Link>
                    </li>
                    <li className="item">
                      <Link href="#">
                        <Image
                          className="location-icon"
                          src={location}
                          alt="location"
                          sizes="100vw"
                        />
                        New York, NY 10001
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="right_part" ref={addressRef}>
              <div
                className="language_wrap"
                // onClick={toggleLanguage}
                onClick={(e) => toggleDropdown(e, "language")}
              >
                <Image src={countryIcon} alt="countryIcon" sizes="100vw" />
                <span className="language-txt">ENG</span>
                <Image
                  className={`arrow-icon ${isLanguageOpen ? "active" : ""}`}
                  src={downArrow}
                  alt="downArrow"
                  sizes="100vw"
                />
              </div>
              {isLanguageOpen && (
                <div className="choose-language">
                  <ul className="language-list">
                    <li>
                      <Link href="#">English</Link>
                    </li>
                    <li>
                      <Link href="#">Hindi</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <header className="header">
        <div className="container">
          <div className="inner_part">
            <div className="left_part">
              <Link href="#">
                <Image src={logo} alt="logo" sizes="100vw" />
              </Link>
            </div>
            <div className="right_part">
              <div className="header-list">
                <ul className="list-itm">
                  <li>
                    <Link href="#">Trending Now</Link>
                  </li>
                  <li>
                    <Link href="#">Best Seller</Link>
                  </li>
                  <li>
                    <Link href="#">New Collections</Link>
                  </li>
                </ul>
              </div>
              <div className="select-search">
                <div className="search-wrap">
                  <div
                    className="category-select"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <span className="selected">{category}</span>
                    <Image
                      className={`arrow-icon ${isCategoryOpen ? "active" : ""}`}
                      src={blackArrow}
                      alt="downArrow"
                    />
                    {isCategoryOpen && (
                      <div className="category-dropdown">
                        <ul>
                          <li
                            onClick={() => {
                              setCategory("All");
                              setIsCategoryOpen(false);
                            }}
                          >
                            All
                          </li>
                          <li
                            onClick={() => {
                              setCategory("Products");
                              setIsCategoryOpen(false);
                            }}
                          >
                            Products
                          </li>
                          <li
                            onClick={() => {
                              setCategory("Brands");
                              setIsCategoryOpen(false);
                            }}
                          >
                            Brands
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="search-input-wrap">
                    <Image
                      className="search-icon"
                      src={searchIcon}
                      alt="searchIcon"
                      sizes="100vw"
                    />
                    <input
                      type="text"
                      placeholder="Search for products, brand and more..."
                      className="search-input"
                    />
                  </div>
                  <div className="divider"></div>
                  <div className="voice-search">
                    <Image
                      className="mic-icon"
                      src={microphoneIcon}
                      alt="microphoneIcon"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>

              <div className="notification-wrap">
                <div className="tabs-wrapes">
                  <Image src={notiIcon} alt="notiIcon" sizes="100vw" />
                </div>
                <div className="tabs-wrapes">
                  <Image src={chatIcon} alt="chatIcon" sizes="100vw" />
                </div>
                <div className="tabs-wrapes">
                  <Image src={likeIcon} alt="likeIcon" sizes="100vw" />
                </div>
                <div className="tabs-wrapes">
                  <Image src={cartIcon} alt="cartIcon" sizes="100vw" />
                  <span className="count-txt">2</span>
                </div>
                <div
                  className="tabs-wrapes"
                  onClick={() => setIsUserOptionsOpen(!isUserOptionsOpen)}
                >
                  <Image src={userIcon} alt="userIcon" sizes="100vw" />
                  <div
                    className={`login-data ${isUserOptionsOpen ? "show" : ""}`}
                  >
                    <ul>
                      {/* {isLogin() ?
                        <li>
                          <Link href="/login">Logout</Link>
                        </li>
                        :
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                      } */}

                      {loggedIn ? (
                        <li>
                          <button onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      ) : (
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                      )}
                      <li>
                        <Link href="/createaccount">Register</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
