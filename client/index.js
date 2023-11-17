import Web3 from 'web3';
import {CONTRACT_ADDR, ETH_PRIVATE_KEY, INFURA_LINK} from './config.js';
import contractABI from './abi.json' assert {type: 'json'};


const web3Instance = new Web3(INFURA_LINK);
const mySmartContract = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDR);
const ethAccount = web3Instance.eth.accounts.privateKeyToAccount(ETH_PRIVATE_KEY);


async function insertData(id, name, active, addr) {
    const currentNonce = await web3Instance.eth.getTransactionCount(ethAccount.address);
    const transactionObject = mySmartContract.methods.addData(id, name, active, addr);
    const estimatedGas = await transactionObject.estimateGas({ from: ethAccount.address });

    const transactionDetails = {
        from: ethAccount.address,
        to: CONTRACT_ADDR,
        gas: estimatedGas,
        gasPrice: await web3Instance.eth.getGasPrice(),
        nonce: currentNonce,
        data: transactionObject.encodeABI()
    };

    const signedTransaction = await web3Instance.eth.accounts.signTransaction(transactionDetails, ETH_PRIVATE_KEY);
    await web3Instance.eth.sendSignedTransaction(signedTransaction.rawTransaction);
}


async function deleteData(id) {
    const currentNonce = await web3Instance.eth.getTransactionCount(ethAccount.address);
    const transactionObject = mySmartContract.methods.removeData(id);
    const estimatedGas = await transactionObject.estimateGas({ from: ethAccount.address });

    const transactionDetails = {
        from: ethAccount.address,
        to: CONTRACT_ADDR,
        gas: estimatedGas,
        gasPrice: await web3Instance.eth.getGasPrice(),
        nonce: currentNonce,
        data: transactionObject.encodeABI()
    };

    const signedTransaction = await web3Instance.eth.accounts.signTransaction(transactionDetails, ETH_PRIVATE_KEY);
    await web3Instance.eth.sendSignedTransaction(signedTransaction.rawTransaction);
}

async function retrieveEvents(filterOptions) {
    return mySmartContract.getPastEvents({
        fromBlock: 0,
        toBlock: 'latest',
        filter: filterOptions
    });
}
// Вызов функций
await insertData(11, "ExampleName1", true, '0xB4b7e747652aF365A91A039632C440396B29b763');
await insertData(22, "ExampleName2", false, '0xB4b7e747652aF365A91A039632C440396B29b763');
await deleteData(22);
const contractEvents = await retrieveEvents({});
console.log('Contract Events:', contractEvents);
