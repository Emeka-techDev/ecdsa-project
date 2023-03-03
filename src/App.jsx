import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  
  useEffect(() => {
    
    // takes an address and returns the balance of the address
    const getBalance =  async () => {        
        const regex = new RegExp('^0x[a-fA-F0-9]{40}$');
        
        if (regex.test(address)) {
            // const response = await server.get(`balance/${address}`); // this calls the backend get and the route being called is the balance/address
            // const data = reponse.data;
            // const balance = data.balance;
            const { data: {balance}, } = await server.get(`balance/${address}`); // this calls the backend get and the route being called is the balance/address
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    getBalance();
  }, [address]);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        address={address}
        setAddress={setAddress}
        privateKey= {privateKey}
        setPrivateKey= {setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
    </div>
  );
}

export default App;
