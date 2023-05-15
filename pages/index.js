import { useState, useEffect, useContext, createContext } from "react";
import Image from "next/image";

import { useAppContext } from "../context/FunToken";

const Home = () => {
  const { funToken } = useAppContext();

  return <div>{funToken}</div>;
};
export default Home;
