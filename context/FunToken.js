import { createContext, useContext, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { funTokenAddress, funTokenABI } from "./constants";

export const ERC20ICOContext = createContext();

// fetching the smart contract
const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(funTokenAddress, funTokenABI, signerOrProvider);

export const ERC2OProvider = ({ children }) => {
  //---- USER ACCOUNT
  const [holders, setHolders] = useState([]);
  const [account, setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [userId, setUserId] = useState("");

  //---- TOKEN INFO
  const [totalNumTokens, setTotalNumTokens] = useState("");
  const [TokenName, setTokenName] = useState("");
  const [TokenStandard, setTokenStandard] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenOwner, setTokenOwner] = useState("");
  const [TokenOwnerBalance, setTokenOwnerBalance] = useState("");

  //--- CONNECTING WALLET TO APPLICATION

  const checkConnection = async () => {
    try {
      // check if metamask exist and if they have wallet
      if (!window.ethereum) return console.log("install metamask");

      // if metamask exist, request for the account, and set it to the state
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts[0]);
      //--- CREATING CONNECTION TO CONTRACT AND FETCH DATA
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.provider.Web3Provider(connection);
      // get the signer of the contract, who approved the connect
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      //--- GET ALL TOKEN HOLDER

      const allTokenHolder = await contract.balanceOf(account);
      setAccountBalance(allTokenHolder.toNumber());

      const totalHolders = await contract._userId();
      setUserId(totalHolders.toNumber());
    } catch (error) {
      console.log("App is not connected", error);
    }
  };

  const ERC20FunToken = async () => {
    try {
      //-- CONNECTION
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.provider.Web3Provider(connection);
      // get the signer of the contract, who approved the connect
      const signer = provider.getSigner(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      );
      const contract = fetchContractERC20(signer);

      // TOKEN SUPPLY

      const supply = await contract.totalSupply();
      const totalSupply = supply.toNumber();
      setTotalNumTokens(totalSupply);

      // TOKEN NAME
      const name = await contract.name();
      setTokenName(name);

      // token symbol
      const symbol = await contract.symbol();
      setTokenSymbol(symbol);

      // token standard
      const standard = await contract.standard();
      setTokenStandard(standard);

      // token owner contract
      const ownerOfContract = await contract.ownerOfContract();
      setTokenOwner(ownerOfContract);

      // get owner token balance
      const balance = await contract.balanceOf(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      );
      setTokenOwnerBalance(balance);
    } catch (error) {
      console.log("Error in ERC20 Token", error);
    }
  };

  const transferToken = async (address, value) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.provider.Web3Provider(connection);
      // get the signer of the contract, who approved the connect
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const transfer = await contract.transfer(address, BigInt(value * 1));
      transfer.wait();
      // reload
      window.location.wait();
    } catch (error) {
      console.log("Error in transfering token", error);
    }
  };

  const tokenHolderData = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.provider.Web3Provider(connection);
      // get the signer of the contract, who approved the connect
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const allTokenHolder = await contract.getTokenHolder();

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        holders.push(singleHolderData);
      });
    } catch (error) {
      console.log("Error in user data", error);
    }
  };

  return (
    <ERC20ICOContext.Provider
      value={{
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
      }}
    >
      {children}
    </ERC20ICOContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ERC20ICOContext);
};
