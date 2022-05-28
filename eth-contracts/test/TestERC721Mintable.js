var CustomERC721Token = artifacts.require("CustomERC721Token");

contract("TestERC721Mintable", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({
        from: account_one,
      });

      // TODO: mint 3 tokens

      for (let i = 1; i < 4; i++) {
        await this.contract.mint(accounts[i], 100 + i);
      }
    });

    it("should return total supply", async function () {
      let totalTokensSupply = await this.contract.totalSupply();
      assert.equal(totalTokensSupply, 3, "total supply is stil not 3");
    });

    it("should get token balance", async function () {
      let balance = await this.contract.balanceOf(accounts[1]);
      assert.equal(balance, 1, "balance should return 1");
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      let tokenUri = await this.contract.getBaseTokenURI(101);
      assert.equal(
        tokenUri,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/101",
        "token uri is not set correctly"
      );
    });

    it("should transfer token from one owner to another", async function () {
      let fromOwner = await this.contract.ownerOf(101);
      assert.equal(fromOwner, accounts[1], "incorrect Owner");
      await this.contract.transferFrom(accounts[1], accounts[5], 101, {
        from: accounts[1],
      });
      let toOwner = await this.contract.ownerOf(101);
      assert.equal(toOwner, accounts[5], "incorrect Owner");
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({ from: account_one });
    });

    it("should fail when minting when address is not contract owner", async function () {
      let errorCount = 0;
      try {
        await this.contract.mint(accounts[6], 106, { from: accounts[3] });
      } catch (err) {
        errorCount++;
        console.log("got err" + err);
      }
      assert.equal(errorCount, 1, "Expected revert");
    });

    it("should return contract owner", async function () {
      let owner = await this.contract.getOwner();
      assert.equal(owner, account_one, "Incorrect Owner");
    });
  });
});
