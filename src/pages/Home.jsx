import React from 'react';
import MainCarousel from "../components/Customer/HomeCorousel/MainCarousel.jsx"
import HomeSectionCards from '../components/Customer/HomeSectionCard/HomeSectionCard.jsx';
import TwoSideCard from '../components/Customer/HomeSectionCard/TwoSideCard.jsx';
import OurFeatures from '../components/Customer/HomeSectionCard/Ourfeatures.jsx';
import Categories from '../components/Customer/HomeSectionCard/Categories2.jsx';

const Home = () => {
  return (
    <div>
        <MainCarousel/>
        <TwoSideCard womenFashionPath="/woman/clothing/lehenga-choli" menFashionPath="men/clothing/suits"/>
        <Categories/>
        <OurFeatures/>
        <HomeSectionCards category={"lehenga-choli"} sectionName={"New Lehnga-Choli"}/>
    </div>
  );
};

export default Home;