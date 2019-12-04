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
    </div>
  );

}
export default MyPagePageWaitingChild;

