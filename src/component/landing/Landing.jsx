import React from 'react'
import Banner from './banner-section/Banner'
import BrowseCategory from './browse-category/BrowseCategory'
import EssentialCollection from './essential-collection/EssentialCollection'
import DealsDay from './deals-day/DealsDay'
import SeasonalArrivals from './seasonal-arrivals/SeasonalArrivals'
import LiveBetter from './live-better/LiveBetter'
import TrendingNow from './trending-now/TrendingNow'
import NewCollection from './new-collection/NewCollection'
import AfghanCulture from './afghan-cultural-fashion/AfghanCulture'
import ShopByStyle from './shop-by-style/ShopByStyle'
import ShopInterest from './shop-by-interest/ShopInterest'
import GirlsAssentials from './girls-essentials/GirlsAssentials'
import VerifiedSeller from './verified-seller/VerifiedSeller'
import UpsSection from './ups-section/UpsSection'

const Landing = () => {
  return (
    <>
      <Banner />
      <BrowseCategory />
      <EssentialCollection />
      <DealsDay />
      <ShopByStyle />
      <SeasonalArrivals />
      <LiveBetter />
      <TrendingNow />
      <AfghanCulture />
      <NewCollection />
      <ShopInterest />
      <GirlsAssentials />
      <VerifiedSeller />
      <UpsSection />
    </>
  )
}

export default Landing