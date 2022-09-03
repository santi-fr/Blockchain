const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC ("secp256k1");

const myKey = ec.keyFromPrivate("b665664be3ee4e8810c7b895a49a163ce4f9ca2eeb8f30b79883e9da55712fd3");
const myWalletAddress = myKey.getPublic('hex');

let digitalEuro = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 100);

tx1.signTransaction(myKey);
digitalEuro.addTransaction(tx1);

console.log("\nStarting the miner...");
digitalEuro.minePendingTransactions(myWalletAddress);

console.log("\nBalance of Santi is ", digitalEuro.checkBalance(myWalletAddress));

console.log("Is chain valid?", digitalEuro.isChainValid());
