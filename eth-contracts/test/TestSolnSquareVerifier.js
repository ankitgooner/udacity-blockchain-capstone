var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var Verifier = artifacts.require("Verifier");
const zokratesProof = require("../../zokrates/code/square/proof.json");
// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract("SolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe("testing SolnSquareVerifier", function () {
    beforeEach(async function () {
      VerifierContract = await Verifier.new({
        from: account_one,
      });
      this.contract = await SolnSquareVerifier.new(VerifierContract.address, {
        from: account_one,
      });
    });

    it("should mint tokens for contract", async function () {
      let proofs = Object.values(zokratesProof.proof);
      let inputs = zokratesProof.inputs;
      let tx = await this.contract.mintNFT(account_one, 101, ...proofs, inputs);

      assert.equal(
        tx.logs[1].event,
        "Transfer",
        "correct proof is not working"
      );
      assert.equal(
        tx.logs[0].event,
        "SolutionAdded",
        "Solution added event expected"
      );
    });
  });
});
