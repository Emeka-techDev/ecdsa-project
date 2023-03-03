import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setPrivateKey, privateKey}) {
  async function onChange(evt) {
    // const privateKey = evt.target.value;
    const addr = evt.target.value
    // setPrivateKey(privateKey);
    // const address = toHex(secp.getPublicKey(privateKey));
    setAddress(addr);  
  }

  async function onChangePrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey)
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>


      <div>
        Address: {address}
      </div>

      <label>
        Wallet private Key
        <input placeholder="Enter private Key" type="text" value={privateKey} onChange={onChangePrivateKey} />
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}



export default Wallet;



