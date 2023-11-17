import dotenv from 'dotenv';

dotenv.config ();

const INFURA_LINK = process.env.INFURA_API || 'https://polygon-mumbai.infura.io/v3/96c9b7089776456e9c20dc643e27c590';
const CONTRACT_ADDR = process.env.CONTRACT_ADDRESS || '0xF0Ed749C95A3F789873F3Ce552308F1433399ddf';
const ETH_PRIVATE_KEY = process.env.PRIVATE_KEY || '0x94b5443058bdb507897bfb921cbe617120d042015b9d8a6fc3f3bb725f8c7ddf';
export {
    INFURA_LINK,
    CONTRACT_ADDR,
    ETH_PRIVATE_KEY,
}