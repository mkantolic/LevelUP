import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
class Info extends Component {

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
    //console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      console.log(socialNetwork)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
     // console.log(postCount)
      // Load Posts
      
	      for (var i = 1; i <= postCount; i++) {
	        const post = await socialNetwork.methods.posts(i).call()
	        this.setState({
	          posts: [...this.state.posts, post]
	        })
	      } 
 	 // console.log("account", accounts)
 	  //console.log(typeof this.state.posts)
 	  let auth = ""; 
 	  let tipSum= 0;
 	  let sumPosts = 0;
 	  let icon,icons,tip, tips;
 	  let times= 0;
 	  let tippies = 0;


 	  for(let value of Object.values(this.state.posts)){
 	  	if(this.state.account == value.author) {  
 	  		tipSum +=Math.floor(value.tipAmount);
 	    	sumPosts ++;
 	  	} 
 	   	 
 	   }
 	   //first award is collected for first published post
 	  if(sumPosts >= 1) {
 	   		console.log("icon", icon)  
 	   		icons = 'First Post: ';
 	   }

 	  //second: awards are collected after every 10th published post
 	  if((times=Math.floor(sumPosts/10)) >=1) {
 	  		icon = '10th post:  '
 	  		//times ++

 	  } 

 	  //third: award is collected for your first TIP
 	  if(Math.floor(tipSum) >=0.1) {
 	  		tip = "First TIP: "
 	  }

 	  //fourth: awards are collected after every earned 1 ETH
 	  if((tippies=Math.floor(tipSum/1000000000000000000)) >0) {
 	  		tips = "Piggy bank ETH: "
 	  }
 	  console.log(tippies)
 	  console.log("sum", tipSum)
 	  this.setState({tipSum})
 	  this.setState({sumPosts})
 	  this.setState({icon, times}) 
 	  this.setState({icons})
 	  this.setState({tip})
 	  this.setState({tips, tippies})

      // Sort posts. From newest to latest
      this.setState({
        posts: this.state.posts.sort((a,b) => b - a )
      })
      console.log({posts: this.state.posts})
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
}

    constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      sumPosts: 0,
      posts: [],
      loading: true,
      tipSum: 0,
      icon: '',
      icons: '',
      tip: '',
      tips: '',
      tippies: 0,
      times: 0
    }
  }
  render() {
    return (
     <div sytle={{justifyContent:'center'}}>
     	<div className="container-fluid mt-5">      
       		<div className="row">
       		<div className="column">
       			<h3 className="title"> This is your page with all your goals! </h3>
       			<p className="title2"> Here you can see all your collected awards:</p>
       			<div className="award"> 
	       			<div class="tooltip-text"> <p> ETH {window.web3.utils.fromWei(this.state.tipSum.toString())} </p>
					  <span class="tooltiptext">Award is collected after your first TIP! And after every earned 1ETH</span>
					</div> <br/>
					<div class="tooltip-text"> <p> Total posts: {this.state.sumPosts} </p>
					  <span class="tooltiptext">Award is collected after published post! And after every 10th published posts!</span>
					</div> 
	       			<p> {this.state.icons} <i class="fas fa-award"> </i>  </p>	       			 
	       			<p> {this.state.icon} <i class="fas fa-crown">   x {this.state.times} </i> </p>
	       			<p> {this.state.tip} <i class="fas fa-money-bill-wave"> </i> </p>
	       			<p> {this.state.tips} <i class="fas fa-piggy-bank">  x {this.state.tippies} </i> </p> 
	       		</div>	
       		</div>
       		<main role="main" className="col-lg-12 ml-auto mr-auto column" style={{ maxWidth: '700px' }}>
            <div className="content mr-auto ml-auto">

         { this.state.posts.map((post, key) => {
         	{console.log("author", this.state.account)}
         	if(this.state.account == post.author) {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                       
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        
                      </li>
                    </ul>
                  </div>
                )
            }
              })}
         </div>
         </main>
         </div>
         </div>

      </div>
    );
  }
}

export default Info;