pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.issueCert(9845298452,"Prabhu","OSI2019","Bangalore","OSI India");
    string memory expected = "Prabhu";

    Assert.equal(simpleStorage.getAttendeeName(9845298452), expected, "It should store Prabhu.");
  }

}
