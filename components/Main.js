import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar.js'
import Post from './Post.js'
import SocialNetwork from '../abis/SocialNetwork.json'
import Design from './Design.png'

class Main extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //connect to ethereum
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
  //load blockchain data
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {   //get contract
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      console.log(socialNetwork)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      console.log(postCount)
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }

      // Sort posts. Show newest to latest posts
      this.setState({
        posts: this.state.posts.sort((a,b) => b - a )
      })
      console.log({posts: this.state.posts})
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location.reload(false);
    })  
  }

  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true
    }

    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
  }
  render() {
    return (
     <div sytle={{justifyContent:'center'}}>
        
        <div> <img src={Design} style={{width: '700px', height:'400px'}}/> </div>

       { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading......</p> 
           </div>
          : <Post
              posts={this.state.posts}
              createPost={this.createPost}
              tipPost={this.tipPost}
            />
        }

      </div>
    );
  }
}

export default Main;