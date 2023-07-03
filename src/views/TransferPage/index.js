import React from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';

// import HomeFooter from 'components/HomeFooter';

import Header from '../../components/Header';
import Transfer from '../../components/Transfer';

function TransferPage() {

  return (
    <div className="">
      <Row>
        <Col className="">
          <Header />
            <Transfer />
          {/* <HomeFooter /> */}
        </Col>
      </Row>
    </div>
  );
}

export default TransferPage;
