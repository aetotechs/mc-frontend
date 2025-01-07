import React, { useEffect } from "react";
import Header from "../components/global/Header";
import { useAuth } from "../utils/context/AuthContext";
import Hero from "../components/global/Hero";

const Home = () => {
  const { dispatchAuth } = useAuth();

  useEffect(() => {
    // dispatchAuth(true);  //Call this function to open login/register form.
  });

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
