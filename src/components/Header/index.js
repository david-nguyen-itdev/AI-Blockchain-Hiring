import React, { useEffect } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


import './index.scss';
function HomePage() {

  const { isConnected, address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert("No Metamask!")
    }
  }, []);

  const shortAddress = () => {
    return address.slice(0, 6) + '...' + address.slice(address.length - 4, address.length);
  }

  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo" >
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/sign" className="margin-12">
          SIGN
        </Link>
        <span>/</span>
        <Link to="/transfer" className="margin-12">
          TRANSFER
        </Link>
      </Col>
      <Col xs="4" className="logo" >
        {isConnected ? (
          <div className="connected">
            <a className="margin-12 pointer" onClick={() => disconnect()}>
              Disconnect
            </a>
            <div>Connected wallet: {shortAddress()}</div>            
          </div>
        ) : (
          <a className="margin-12 pointer" onClick={() => connect()}>
            Connect Wallet
          </a>
        )}
        
      </Col>
    </Row>
  );
}

export default HomePage;
