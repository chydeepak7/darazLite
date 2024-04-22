import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import Product from "../components/Product";
import Footer from "../components/Footer";
import axios from "axios";

function HomeScreen() {
  return (
    <div>
      <Category />
      <Product />
      {/* <Footer /> */}
    </div>
  );
}

export default HomeScreen;
