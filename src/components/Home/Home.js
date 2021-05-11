import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './Home.css';
import { toast } from 'react-toast';
import Web3Ctx from '../Context/Web3Ctx';
import { getContract } from '../Utils/GetContract';
import Address from '../common/Address';

const Home = (props) => {

    const {ethersProvider,address} = useContext(Web3Ctx);

    const [tokenId,setTokenId] = useState('');
    const [contract,setContract] = useState(null);
    const [metaUri,setMetaUri] = useState('');

    useEffect(()=>{

        const initContract = async ()=>{
            let c = await getContract('EtherCards',ethersProvider);
            if(c){
                setContract(c);
                console.log(c)
            }else{
                toast.error('contract not found');
            }
        }

        if(ethersProvider){
            initContract();
        }
    },[ethersProvider]);

    const getTokenUri = async ()=>{
        if(tokenId==''){
            toast.error('no token id');
            return;
        }

        if(contract===null){
            return;
        }

        let uri = await contract.tokenURI(tokenId).catch(e=>{console.log(e)});
        
        setMetaUri(uri);
    }



    return (
        <>
            <Navigation/>
            <div className="container mt-5 h-100 home">
                <div className="row">
                    
                    <div className="col-md-6 mx-auto">
                        {address && 
                         <div className="mb-3">Connected as  <Address address={address} blockie short/></div> 
                        }


                        <div className="form-group  dark">
                            <input type="text" className="form-control" id="sdsd" placeholder="token id" value={tokenId} onChange={(e)=>{setTokenId(e.target.value)}}/>
                        </div>
                        <button className="btn btn-peach" onClick={getTokenUri}>Get token uri</button>
                        {metaUri&&<p className="mt-3">TokenURI: <span className="text-white">{metaUri}</span></p>}
                    </div>
                </div>

            </div>
        </>
    );

}

export default Home;