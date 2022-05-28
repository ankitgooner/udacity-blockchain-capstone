pragma solidity >=0.4.21;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SolnSquareVerifier is CustomERC721Token{


   struct Solution{

        uint256 index;
        address _address;
        
   }

   

Verifier public verifierContract;
    constructor(address VerifierContractAddress) public {
        verifierContract = Verifier(VerifierContractAddress);
    }



    // define an array of the above struct
    mapping(bytes32 => Solution) solutions;

    // define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) private uniqueSolutions;

    // Create an event to emit when a solution is added
    event SolutionAdded(bytes32 key, address addr, uint256 _index);

    //  Create a function to add the solutions to the array and emit the event
    function addSolution(address _Address, uint256 _index, bytes32 _key) internal {
        solutions[_key] = Solution({
            index: _index,
            _address: _Address
        });

         emit SolutionAdded(_key, _Address, _index);

    }

     function mintNFT(address addr, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input)
    public returns(bool) {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(solutions[key]._address == address(0), "not a unique solution");
        require(verifierContract.verifyTx(a, b,c, input), "not verified");
        addSolution(addr, tokenId, key);        
        return super.mint(addr, tokenId);

    }
   
    




}
























