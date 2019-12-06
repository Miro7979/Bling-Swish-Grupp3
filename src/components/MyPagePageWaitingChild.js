import React from 'react';

import waitIcon from '../images/hourglass.png';
import {Col,Row} from 'reactstrap';

const MyPagePageWaitingChild=({child})=>{

  return(
    <div className="waiting-child-component">
      <Row>
				<Col xs={4}>
					<img src={waitIcon} alt="barn ikon"></img>
				</Col>
				<Col xs={8} className="children-name">
					{child.name}
          
				</Col>
	
			</Row>
      <Row>
        <Col className="text-center">
          <p style={{color:'red',fontStyle:'italic'}}>Väntar på ditt barns godkännande</p>
        </Col>
      </Row>
    </div>
  );

}
export default MyPagePageWaitingChild;

/*
<img src={waitIcon} alt="timmglas ikon" className="wait-icon"></img>
*/