import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/social-media/SocialMedia";
import NewsletterBox from "../../components/newsletter-box/newsletter-box";
import FeaturedProducts from "../../components/featured-products/FeaturedProducts";
import "./home.scss";
// import FeaturedRooms from "../../components/FeaturedRooms";
const Home = ({ history }) => {
  return (
    <>
      <Hero>
        <Banner title="royal fashion" subtitle="fancy and affordable">
          <Link to="/store" className="store-link">
            our store
          </Link>
        </Banner>
      </Hero>
      <br />
      <FeaturedProducts />
      <SocialMedia />
      <NewsletterBox history={history} />
      <Footer />
    </>
  );
};

export default Home;
