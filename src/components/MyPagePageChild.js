import React from 'react';
import logo from '../images/child-icon.png';
import deleteIcon from '../images/delete-icon-black.png';
import {Col,Row} from 'reactstrap';

const MyPagePageChild=({child,wantToEdit,userData,setUserData})=>{

	const changeLimit=(e)=>{
		if(e.target.value>0){
			child.limit=e.target.value;
		}
	}
	const deleteChild=(id)=>{
		child.limit='';
		let updatedData= userData.children.filter((object)=>{
			return object._id !==id;
		});
		setUserData({
			...userData,
			children:updatedData
		});
	}

  return(
    <div className="child-component">

			<Row>
				<Col xs={4}>
					<img src={logo} alt="barn ikon"></img>
				</Col>
				<Col xs={6} className="children-name">
					{child.name}
				</Col>
				<Col xs={2}>
					{wantToEdit.wantToEdit?
						<img src={deleteIcon} alt="ta bort ikon" className="button delete-button" onClick={()=>deleteChild(child._id)}></img>:''}
				</Col>
			</Row>

			<Row className="mt-3" style={{height:'40px'}}>
				<Col xs={4}>
						Beloppsgräns<br></br>/månad
				</Col>		
				
				{wantToEdit.wantToEdit?
				<Col sm={7} xs={8}>
					<input type="number" className="form-control vertical-center" placeholder={child.limit} onChange={changeLimit}></input>
				</Col>:
				<Col xs={8}>
					{child.limit?<p>{child.limit},00 sek</p>:<p className="limit-text" style={{color:'red'}}>Ingen gräns satt</p>}
				</Col>
				}
			</Row>
					   				
		</div>	
  );
}
export default MyPagePageChild;

