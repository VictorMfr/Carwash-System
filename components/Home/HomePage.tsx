"use client";
import MainSection from "./MainSection";
import FeatureSection from "./FeatureSection";
import FAQs from "./FAQs";
import Footer from "./Footer";
import { Fragment } from "react";

export default function HomePage() {
    return (
        <Fragment>    
            <MainSection />
            <FeatureSection />
            <FAQs />
            <Footer />
        </Fragment>
    )
}