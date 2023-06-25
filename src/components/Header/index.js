import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './index.scss';
import Web3 from 'web3';
function HomePage({ sign }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert('No Metamask!');
    }
  }, []);

  const signText = async () => {
    try {
      // Check if MetaMask is installed and enabled
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission

        const accounts = await web3.eth.getAccounts();
        const address = accounts[0]; // Get the current user's address

        // Prompt the user to sign the text
        const signature = await web3.eth.personal.sign('Hello, Chainfuse!', address, '');

        console.log('Signature:', signature);
        // Create a transaction object with relevant details
        const transaction = {
          from: address,
          to: '', // Specify the destination address if applicable
          value: 0, // Specify the value in wei if applicable
          data: '', // Specify data if sending a transaction to a contract
          signature: signature
        };

        console.log('Transaction:', transaction);
      } else {
        console.error('Please install MetaMask extension.');
      }
    } catch (error) {
      console.error('Error signing text:', error);
    }
  };

  const connectWallet = async () => {
    try {
      // Request access to the user's Metamask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };

  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo">
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>{' '}
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo">
        <a className="margin-12" onClick={connectWallet}>
          {isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {sign ? (
                <Button style={{ background: 'transparent' }} onClick={signText}>
                  Sign 'Hello, Chainfuse!'
                </Button>
              ) : null}
              <p>
                Connected {!sign ? '&' : ''} {!sign ? <Link to="/sign">Sign</Link> : ''}
              </p>
            </div>
          ) : (
            'Connect Wallet'
          )}
        </a>
      </Col>
    </Row>
  );
}

export default HomePage;
