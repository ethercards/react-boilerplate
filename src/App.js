import './App.css';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import routes from './Routes';
import Onboard from 'bnc-onboard';
import {ethers} from 'ethers';

import { useEffect, useState } from 'react';
import { toast, ToastContainer} from 'react-toast'

import Web3Ctx from './components/Context/Web3Ctx.js'; 

//*
export const DEPLOYED_NTW_NAME = 'rinkeby';
export const DEPLOYED_CHAIN_ID = 4;
const INFURA_ID = 'a5e79e6ee9a14236b385e47849805596';
const FORTMATIC_KEY = 'pk_test_DD2BBA8AAA1D4FED';
//const RPC_URL = 'https://small-lingering-feather.rinkeby.quiknode.pro/4093cd8bffd26688802327779af8b485f8759f3e/';
const RPC_URL = 'https://rinkeby.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc';
/*/
export const DEPLOYED_NTW_NAME = 'mainnet';
export const DEPLOYED_CHAIN_ID = 1;
const INFURA_ID = 'a5e79e6ee9a14236b385e47849805596';
const FORTMATIC_KEY = 'pk_live_FBFF1F05F2879F29';
//const RPC_URL = 'https://icy-weathered-glade.quiknode.pro/74e3e2900f41260b429e8ac065b8bee720298c94/';
const RPC_URL = 'https://mainnet.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc';
//*/

function App(props) {

  const [onboard,setOnboard] = useState(null);
  const [address,setAddress] = useState(null);
  const [wallet,setWallet] = useState(null);
  const [ethersProvider,setEthersProvider] = useState(null);
  const [chainId, setChainId] = useState(DEPLOYED_CHAIN_ID);

  const [connecting,setConnecting] = useState(false);
  const [initDone,setInitDone] = useState(false);

  useEffect(()=>{
    console.log('app mounted');
    const initApp = async () => {
      setInitDone(false);
      try{
        const onboard = Onboard({
          dappId: '3c7b6054-6292-481f-bd3a-af5687425e98',       // [String] The API key created by step one above
          /* dappId: 'a53f6e8b-8255-45f7-bb90-c5ba428c8548', */       // [String] The API key created by step one above
          networkId: DEPLOYED_CHAIN_ID,  // [Integer] The Ethereum network ID your Dapp uses.
          darkMode: true,
          blockPollingInterval:12000,
          walletSelect: {
            wallets:[
              { walletName: "metamask"},
              { walletName: "coinbase"},
              { walletName: "trust",rpcUrl: RPC_URL },
              { walletName: "authereum" },
              { walletName: "wallet.io", rpcUrl: RPC_URL },
              { walletName: "atoken" },
              {
                walletName: "fortmatic",
                apiKey: FORTMATIC_KEY
              },
              {
                walletName: "walletConnect",
                rpc: {
                        1: RPC_URL,
                        4: RPC_URL
                     }
              },
              { walletName: "opera" },
              { walletName: "operaTouch" },
              { walletName: "torus" },
              { walletName: 'status' },
              { walletName: 'walletLink', rpcUrl: RPC_URL },
              {
                walletName: 'trezor',
                appUrl: 'ether.cards',
                email: 'info@ether.cards',
                rpcUrl: RPC_URL
              },
              {
                walletName: 'ledger',
                rpcUrl: RPC_URL
              }]
          },
          walletCheck: [
            { checkName: 'derivationPath' },
            { checkName: 'accounts' },
            { checkName: 'connect' },
            { checkName: 'network' }],
          
          subscriptions: {
            wallet: obWallet => {
             // console.log('wallet on select',obWallet)
              setWallet(obWallet);
            },
            address: obAddress => {
              setAddress(obAddress);
            },
            network: network => {
              setChainId(network);
            }
          }
        });

        const savedWallet = localStorage.getItem('selectedWallet');
        if(savedWallet){
          setConnecting(true);
          await onboard.walletSelect(savedWallet);
          const userReady = await onboard.walletCheck();
          //console.log('user ready(with saved wallet)',userReady);
        }else{
          const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
          setEthersProvider(provider);
        }

        setOnboard(onboard);

      }catch (e){
        console.log('onboard init error',e);
      }

    };

    initApp();
  },[]);

  useEffect(()=>{
    //console.log('user ready [wallet, chainId, address]',wallet, chainId, address);

    if(onboard && wallet && wallet.name && chainId ){
      const userReady =  onboard.walletCheck();
      window.localStorage.setItem('selectedWallet', wallet.name);
      setEthersProvider(new ethers.providers.Web3Provider(wallet.provider));

      //console.log('allset');
      //console.log('wallet,chainId, address, ethersProvider',wallet,chainId, address, ethersProvider)
      setInitDone(true);
      setConnecting(false);
    }else{
      setConnecting(false);
      if(ethersProvider){
        setInitDone(true);
      }
    }

  },[wallet, chainId, onboard])

  if(!initDone){
    return (
      <>loading...</>
    );
  } 

  if(initDone && ( chainId && chainId !== DEPLOYED_CHAIN_ID)){
    return (
      <>wrong chain {''+chainId}</>
    );
  } 
  return (
    <Web3Ctx.Provider value={{onboard,wallet,address,ethersProvider,chainId,connecting}}>
      <div id="application">
          <HashRouter basename='/'>
            <Switch>
              {routes.map((route, key)=>(
                <Route key={key} path={route.path} component={route.component} exact={route.exact} />
              ))}
            </Switch>
          </HashRouter>
        <ToastContainer delay={4000}  position="bottom-right"/>
      </div>
    </Web3Ctx.Provider>
  );
}

export default App;
