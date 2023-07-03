import React from 'react';
import { useSignMessage, useAccount } from 'wagmi';
// reactstrap components

import './sign-message.scss';
const SignMessage = React.forwardRef(() => {
  const { isConnected } = useAccount();
  const [message, setMessage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { data, isSuccess, signMessage } = useSignMessage({
    message,
  });

  React.useEffect(() => {
    if (message !== null && !message?.length) {
      setError("(*) Please enter message")
    } else {
      setError(null)
    }
  }, [message])

  React.useEffect(() => {
    if (!isConnected) {
      setError("(*) Please connect wallet first");
    } else {
      setError("");
    }
  }, [isConnected])

  const handleSign = () => {
    if (!message) {
      setMessage("");
      return;
    }
    signMessage()
  }

  return (
    <>
      <div className="sign-container">
        <span>Message: </span>
        <input
          type="text"
          className="message-input"
          placeholder="Enter message to sign"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button className="sign-button" onClick={() => handleSign()}>
          Sign
        </button>
      </div>
      {error && (<div className="error-message">{error}</div>)}
      {isSuccess && (
        <div className="signature-container signature">
          <span>Signature: </span>
          <input
            type="text"
            className="message-input"
            readOnly
            value={data}
          />
          <button className="sign-button" onClick={() => {navigator.clipboard.writeText(data)}}>
            Copy
          </button>
        </div>
      )}
  </>
  );
});

SignMessage.displayName = 'SignMessage';
export default SignMessage;
