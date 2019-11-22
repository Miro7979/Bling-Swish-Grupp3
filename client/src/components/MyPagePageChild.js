import React from 'react';
import logo from '../images/child-icon.png';
import deleteIcon from '../images/delete-icon.png';
import {Col,Row,Button} from 'reactstrap';

const MyPagePageChild=({child,wantToEdit,userData,setUserData})=>{

	const changeLimit=(e)=>{
		child.limit=e.target.value;
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
				<Col xs={3}>
					<img src={logo} alt="barn ikon"></img>
				</Col>
				<Col xs={7} className="children-name">
					{child.name}
				</Col>
				<Col xs={2}>
					{wantToEdit.wantToEdit?
						<img src={deleteIcon} alt="ta bort ikon" className="delete-button" onClick={()=>deleteChild(child._id)}></img>:''}
				</Col>
			</Row>

			<Row className="mt-2">
				<Col xs={3}>
						Max-Swish
				</Col>
				<Col xs={6}>
					{wantToEdit.wantToEdit?
						<input type="text" className="form-control" placeholder={child.limit} onChange={changeLimit}></input>:
						<p>{child.limit} kr</p>}
				</Col>
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