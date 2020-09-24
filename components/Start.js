import React, { Component }  from 'react';
import Web3 from 'web3';
import './App.css'; 
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar.js' 
import Routes from './Routes.js'

class Start extends Component  {
	async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
  
  }

   constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null
    }

   
  }
  render(){
	return(
		<div>
			<Navbar account={this.state.account} />
			<Routes />
		</div>
		)
	}
}

export default Start;