import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3'
import './App.css';
import mintContractABI from './contracts/mintContractABI.json';

const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/c6ac371ea2dc4ed0b28db1a86143050b')
);

const mintContract = new web3Socket.eth.Contract(mintContractABI, '0x2Aa0724852CdCbe74B7737075885d538896a1FaF');

function App() {
  const [lastMinted, setLastMinted] = useState(null);
  useEffect(() => {
    listenToMintEvents();
  }, []);

  const listenToMintEvents = () => {
    mintContract.events.TokenMinted({}, function (error, event) {
      console.log(event);
      setLastMinted(event.returnValues.tokenId);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="100" height="100" />
        <h3 style={{marginTop: 0}}>Listen for Ethereum smart contract events</h3>
        {
          lastMinted ?
            <p>Last token ID minted: <code>{lastMinted}</code></p> :
            <p>Waiting for new events...</p>
        }
      </header>
    </div>
  );
}

export default App;
