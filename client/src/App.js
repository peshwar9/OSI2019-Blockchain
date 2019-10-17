import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: null, conf: null, details: null, issuedBy: null, storageValue: 0, web3: null, accounts: null, contract: null };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Issues attandance record on blockchain for a given attendeee.
  //  await this.state.contract.methods.issueCert(9845298452, "Vitalik Buterin", "OSI2019", "Bangalore", "OSI India").send({ from: this.state.accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.verifyCert(9845498454).call();

    // Update state with the result.
    this.setState({ storageValue: response, name: response.name, conf: response.conf, details: response.details, issuedBy: response.issuedBy  });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <h1>Welcome to OSI2019 Blockchain workshop!</h1>
        <p>This is your first DApp.</p>
        <h2>Smart Contract Example to verify conference participation records</h2>
        <p>
          If your contracts compiled and migrated successfully, and if data is stored correctly, below will show
          details of attendees stored on blockchain (by default).
        </p>
        <p>
          Try changing the phone number stored on <strong>line 48</strong> of App.js.
        </p>
        <div>Phone number is: {this.state.number}</div>
        <div>Attendee Name is: {this.state.name}</div>
        <div>Conference name is: {this.state.conf}</div>
        <div>Conference detail : {this.state.details}</div>
        <div>Issued By: {this.state.issuedBy}</div>
      </div>
    );
  }
}

export default App;
