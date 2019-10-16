const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  it("...should store the value of OSI conference attendees.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Issue certificate
    await simpleStorageInstance.issueCert(9845298452,"Prabhu","OSI2019","Bangalore","OSI India", { from: accounts[0] });

    // Get details of issued certificate
    const storedData = await simpleStorageInstance.verifyCert.call(9845298452);
    console.log("verify cert", storedData);
    assert.equal(storedData.name, "Prabhu", "Value not correct.");
    assert.equal(storedData.conf, "OSI2019", "Value not correct.");
    assert.equal(storedData.details, "Bangalore", "Value not correct.");
    assert.equal(storedData.issuedBy, "OSI India", "Value not correct.");



  });
});
