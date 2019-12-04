import React from 'react';
import logo from '../images/child-icon.png';
import waitIcon from '../images/hourglass.png';
import {Col,Row} from 'reactstrap';

const MyPagePageWaitingChild=({child})=>{

  return(
    <div className="waiting-child-component">
      <Row>
				<Col xs={4}>
					<img src={logo} alt="barn ikon"></img>
				</Col>
				<Col xs={6}>
					{child.name}
          <img src={waitIcon} alt="timmglas ikon" className="wait-icon"></img>
				</Col>
				<Col xs={2}>
				</Col>
			</Row>
      <Row>
        <Col className="text-center">
          <p style={{color:'red',position:'relative',bottom:'30px'}}>Väntar på ditt barns godkännande</p>
        </Col>
      </Row>
    </div>
  );

}
export default MyPagePageWaitingChild;

