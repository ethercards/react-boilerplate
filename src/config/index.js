const dev = {
    DEPLOYED_NTW_NAME: 'rinkeby',
    DEPLOYED_CHAIN_ID: 4,
    INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
    FORTMATIC_KEY: 'pk_test_DD2BBA8AAA1D4FED',
    RPC_URL: 'https://rinkeby.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',

    BASE_CID: 'https://ec-serverapp-staging.herokuapp.com/card'
};

const prod = {
    DEPLOYED_NTW_NAME: 'mainnet',
    DEPLOYED_CHAIN_ID: 1,
    INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
    FORTMATIC_KEY: 'pk_live_FBFF1F05F2879F29',
    RPC_URL: 'https://mainnet.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',

    BASE_CID: 'https://heroku.ether.cards/card'
};

const common = {
    DAPP_ID: '3c7b6054-6292-481f-bd3a-af5687425e98',
    LAYERS_BASE_URL: 'https://ether-cards.mypinata.cloud/ipfs/Qmcm7BjsmhwWVA611EZSGkxcqt3JmsbF9m37kPNhDLoy4o',
}

// if use npm/yarn start,  NODE_ENV = "development"
// if use npm/yarn build,  NODE_ENV = "production"
let envConfig = dev// process.env.NODE_ENV === "development" ? dev : prod
let config = { ...envConfig, ...common }

export default config;


// pointless comment for test commit
