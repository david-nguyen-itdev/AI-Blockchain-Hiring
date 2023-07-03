import React from 'react';
import { useSendTransaction, useAccount } from 'wagmi'
import { isAddress } from 'ethers'

import './transfer.scss';
const Transfer = React.forwardRef(() => {
  const [receiver, setReceiver] = React.useState(null);
  const [errorReceiver, setErrorReceiver] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [errorAmount, setErrorAmount] = React.useState(null);
  const [errorWallet, setErrorWallet] = React.useState(null);
  const { isConnected } = useAccount();
  const { isLoading, sendTransaction, data } = useSendTransaction({
    to: receiver,
    value: `0x${(amount * 10**18).toString(16)}`,
  })

  React.useEffect(() => {
    console.log(receiver, isAddress(receiver));
    if (receiver !== null && !isAddress(receiver)) {
      setErrorReceiver("(*) Please enter a valid address");
    } else {
      setErrorReceiver("");
    }
  }, [receiver])

  React.useEffect(() => {
    if (amount === null) return;
    if (isNaN(amount)) {
      setErrorAmount("(*) Please enter a valid amount");
    } else if (Number(amount) <= 0) {
      setErrorAmount("(*) Amount must be greater than 0");
    } else {
      setErrorAmount("");
    }
  }, [amount])

  React.useEffect(() => {
    if (!isConnected) {
      setErrorWallet("(*) Please connect wallet first");
    } else {
      setErrorWallet("");
    }
  }, [isConnected])

  const isValidInput = () => {
    if (errorAmount || errorReceiver) {
      return false;
    }
    if (receiver === null) {
      setReceiver("");
      return false;
    }
    if (amount === null) {
      setAmount("");
      return false;
    }
    return true;
  }

  const handleTransfer = () => {
    if (!isValidInput()) {
      return;
    }
    sendTransaction();
  }

  return (
    <div className="transfer-container">
      {errorWallet && (<div className="error-message">{errorWallet}</div>)}
      <div className="receiver">
        <span>Receiver: </span>
        <input
          type="text"
          className="message-input"
          placeholder="Enter receiver's address"
          onChange={(event) => {
            setReceiver(event.target.value);
          }}
        />
      </div>
      {errorReceiver && (<div className="error-message">{errorReceiver}</div>)}

      <div className="amount">
        <span>Amount: </span>
        <input
          type="number"
          className="message-input"
          placeholder="Enter amount to send"
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
      </div>
      {errorAmount && (<div className="error-message">{errorAmount}</div>)}

      <div className="send-button">
        {isLoading ? (
          <button className="sign-button" onClick={() => null}>
            Sending...
          </button>
        ) : (
          <button className="sign-button" onClick={() => handleTransfer()}>
            Send
          </button>
        )}
      </div>

      {data && (
        <div className="transaction-hash">Transaction was sent, transaction hash: {data.hash}</div>)
      }
  </div>
  );
});

Transfer.displayName = 'SignMessage';
export default Transfer;
