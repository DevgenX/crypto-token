import Style from "../styles/index.module.css";
import { useState, useEffect, useContext, createContext } from "react";

import Image from "next/image";
import banner from "../assets/home-banner.png";
import FunToken from "../assets/funtoken.png";
import Transfer from "../components/Transfer/Transfer";
import User from "../components/User/User";

import { useAppContext } from "../context/FunToken";

const Home = () => {
  const {
    checkConnection,
    ERC20FunToken,
    transferToken,
    tokenHolderData,
    account,
    accountBalance,
    userId,
    totalNumTokens,
    TokenStandard,
    TokenName,
    TokenSymbol,
    TokenOwner,
    TokenOwnerBalance,
    holders,
  } = useAppContext();

  useEffect(() => {
    checkConnection();
    tokenHolderData();
    ERC20FunToken();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>Launching Fun Token (FUN) ERC20 Token</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            commodi exercitationem
          </p>
          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>White paper</button>
            <button className={Style.btn}>Product intro</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
          <Image
            src={FunToken}
            alt="banner"
            width={300}
            height={300}
            className={Style.heroSection_right_img_one}
          />
          <Image
            src={FunToken}
            alt="banner"
            width={200}
            height={200}
            className={Style.heroSection_right_img}
          />
          <Image
            src={FunToken}
            alt="banner"
            width={100}
            height={100}
            className={Style.heroSection_right_img}
          />
          <Image
            src={FunToken}
            alt="banner"
            width={50}
            height={50}
            className={Style.heroSection_right_img}
          />
          <Image
            src={FunToken}
            alt="banner"
            width={20}
            height={20}
            className={Style.heroSection_right_img}
          />
        </div>
      </div>

      <Transfer
        NoOfToken={totalNumTokens}
        TokenName={TokenName}
        TokenStandard={TokenStandard}
        TokenSymbol={TokenSymbol}
        TokenOwnerBal={TokenOwnerBalance}
        transferToken={transferToken}
      />
      <User holderArray={holders} />
    </div>
  );
};
export default Home;
