import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from "../ui/Button";

import { books, clothes, skincare, tech } from "../../assets";

function AboutSection() {
  const mockCategories = [
    {
      name: "Books",
      image: books,
      desc: "Curated literary journeys",
      color: "moss",
    },
    {
      name: "Clothes",
      image: clothes,
      desc: "Mindful fashion choices",
      color: "ochre",
    },
    {
      name: "Skincare",
      image: skincare,
      desc: "Gentle self-care rituals",
      color: "umber",
    },
    {
      name: "Tech",
      image: tech,
      desc: "Thoughtful innovations",
      color: "moss",
    },
  ];
}
