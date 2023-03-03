import { utf8ToBytes } from "ethereum-cryptography/utils";
import { useState } from "react";
import server from "./server";
import { sign } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { sha256 } from  "ethereum-cryptography/sha256";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const amount = parseInt(sendAmount);
    const sender = address;
    const message = `${recipient},${amount}`;
    const messageHash = sha256(utf8ToBytes(message))
    const [signature, recoveryNumber] = await sign(messageHash, privateKey, { recovered: true});
    const sigHex = toHex(signature);

   

    try {
      const { data: { balance }, } = await server.post(`send`, {
        sender,
        amount,
        recipient,
        signature: sigHex,
        recoveryNumber,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
