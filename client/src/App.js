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

    // Stores a given value, 5 by default.
    await this.state.contract.methods.issueCert(9845298452, "Pari", "OSI2019", "Bangalore", "OSI India").send({ from: this.state.accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.verifyCert(9845298452).call();

    // Update state with the result.
    this.setState({ storageValue: response, name: response.name  });
  };
  /*handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({storageValue: event.target.value});
    console.log("Prabhu", event.target);
    this.state.contract.methods.set(this.state.value).send({ from: this.state.accounts[0] });
      // Get the value from the contract to prove it worked.
      const response = this.state.contract.methods.get().call();

      // Update state with the result.
      this.setState({ storageValue: response });
  }*/
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <h1>Welcome to OSI2019 Blockchain workshop!</h1>
        <p>This is your first DApp.</p>
        <h2>Smart Contract Example to store your conference participation record</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of attendee Prabhu (by default).
        </p>
     {/*
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
     </form> */}
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.name}</div>
      </div>
    );
  }
}

export default App;
