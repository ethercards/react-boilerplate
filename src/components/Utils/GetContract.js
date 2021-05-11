import {ethers} from 'ethers';
import AddressesMain from '../../contracts/addresses-1.json';
import AddressesRinkeby from '../../contracts/addresses-4.json';
import AddressesLocal from '../../contracts/addresses-1337.json'; 
import EtherCards from '../../contracts/EtherCards.json';

const contractAbis = {EtherCards};
const addresses = {
1:     {addr: AddressesMain, name:'Main'},
4:     {addr: AddressesRinkeby, name:'Rinkeby'},
1337:  {addr: AddressesLocal,name:'localhost'}
};

export const getContract = async (contractName,provider) => {
    //console.log('get contract fn',provider);

    let ntw = await provider.getNetwork();
    //console.log('nnetwork',ntw);

    let contractAbi = contractAbis[contractName];
    let address = addresses[ntw.chainId].addr[contractName];
    
    let contract = null;

    
    try{
        contract = new ethers.Contract(address, contractAbi.abi, provider);
    }catch{
        console.log('contract not found');
    }
    //console.log(contractName,contract);
    return contract;
}