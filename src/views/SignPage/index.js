import React from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';

// import HomeFooter from 'components/HomeFooter';

import Header from '../../components/Header';
import SignMessage from '../../components/SignMessage';

function SignPage() {

  return (
    <div className="">
      <Row>
        <Col className="">
          <Header />
            <SignMessage />
          {/* <HomeFooter /> */}
        </Col>
      </Row>
    </div>
  );
}

export default SignPage;
