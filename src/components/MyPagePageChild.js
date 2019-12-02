import React from 'react';
import logo from '../images/child-icon.png';
import deleteIcon from '../images/delete-icon.png';
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
						<img src={deleteIcon} alt="ta bort ikon" className="button" onClick={()=>deleteChild(child._id)}></img>:''}
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
					{child.limit?<p>{child.limit},00 sek</p>:<p className="limit-text">Ingen gräns satt</p>}
				</Col>
				}
			</Row>
					   				
		</div>	
  );
}
export default MyPagePageChild;

/*

<div className="row">
				<div className="col-3">
					<img src={logo} alt="barn ikon"></img>
				</div>			
				<p className="col-7 child-name">{child.name}</p>			
				{wantToEdit.wantToEdit?
					<div className="col-2 delete-button" onClick={()=>deleteChild(child._id)}>
						<img src={deleteIcon} alt="ta bort ikon"></img>
					</div>:''}			
			</div>

			<div className="row">
				<p className="col-4">MaxSwish:</p>
				<div className="col-8">
					{wantToEdit.wantToEdit?
						<input type="text" placeholder={child.limit} onChange={changeLimit}></input>:
						<output>{child.limit}</output>	
					}						
				</div>											
			</div>

*/