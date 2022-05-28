const HDWalletProvider = require("truffle-hdwallet-provider");
const zokratesProof = [
  require("./proof.json"),
  require("./proof1.json"),
  require("./proof2.json"),
  require("./proof3.json"),
];
const web3 = require("web3");
const OWNER_ADDRESS = "0x08Bc8462496AA779ea951077550979c00Bd1Fa96";
const CONTRACT_ADDRESS = "0x229dF1904d1e11A5c505cDfc04E902866b6D5b1d";

const MINT_COUNT = 3;
const MNEMONIC = "XXXXXX";

if (!MNEMONIC || !OWNER_ADDRESS) {
  console.error(
    "Please set a mnemonic, infura key, owner, network, and contract address."
  );
}

const contract = require("/Users/ankit/Blockchain-Capstone/eth-contracts/build/contracts/SolnSquareVerifier.json");
const ABI = contract.abi;

async function main() {
  const provider = new HDWalletProvider(
    MNEMONIC,
    `https://https://rinkeby.infura.io/v3/<my-key>`
  );
  const web3Instance = new web3(provider);

  if (CONTRACT_ADDRESS) {
    const myToken = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, {
      gasLimit: "1000000",
    });
    // tokens issued directly to the owner.
    for (let i = 0; i < MINT_COUNT; i++) {
      try {
        let proofs = Object.values(zokratesProof[i].proof);
        let inputs = zokratesProof[i].inputs;
        console.log("OWNER_ADDRESS " + OWNER_ADDRESS + "\n");
        console.log("i " + i + "\n");
        console.log("proofs " + proofs + "\n");
        console.log("inputs " + inputs + "\n");
        console.log(" myToken" + myToken + "\n");
        let tx = await myToken.methods
          .mintNFT(OWNER_ADDRESS, i, ...proofs, inputs)
          .send({ from: OWNER_ADDRESS });
        console.log("Minted Token Transaction: " + tx.transactionHash);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

main();
