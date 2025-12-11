"use client";
import { Box, Typography, Stack, Button, Grid, Card, CardContent, Avatar, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import MainSection from "./MainSection";
import FeatureSection from "./FeatureSection";
import ShowCase from "./ShowCase";
import FAQs from "./FAQs";
import Footer from "./Footer";

export default function HomePage() {
    return (
        <Box>    
            <MainSection />
            <FeatureSection />
            <FAQs />
            <Footer />
        </Box>
    )
}