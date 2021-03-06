// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps


// Test verification with incorrect proof

var Verifier = artifacts.require('Verifier');
const zokratesProof = require("../../zokrates/code/square/proof.json");
const zokratesIncorrectProof = require("../../zokrates/code/square/proof.json");
contract('Verifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('testing Verifier', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new({
                from: account_one
            });

        })

        it('with correct proof', async function () {

            let proofs = Object.values(zokratesProof.proof);
            let inputs = zokratesProof.inputs;
            let result = await this.contract.verifyTx.call( ...proofs, inputs);
            assert.equal(result, true, "correct proof is not working");



        })

        it('with incorrect proof', async function () {
            let incorrectProofs = Object.values(zokratesIncorrectProof.proof);
            let inputs = zokratesIncorrectProof.inputs;
            let result = await this.contract.verifyTx.call( ...incorrectProofs, inputs);
            assert.equal(result, true, "incorrect proof is  working somehow");
        })

    });
})