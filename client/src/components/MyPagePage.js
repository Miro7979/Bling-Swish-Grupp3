import React,{useState,useEffect} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';

const MyPagePage =()=>{

	const[userData,setUserData]=useState({
		name:'Göran Persson',
		password:'olga99',
		phone:'0708-137490',
		email:'gptomelilla@hotmail.com',
		nationalIdNumber:'620221-1942',
		role:'parent',
		children:'99972345, 89898986'
	});
	const[newPassword,setnewPassword]=useState({
		password:''
	});

	const handleSubmit =()=>{
		setUserData({
			name:'Göran Persson',
			password:newPassword,
			phone:'0708-137490',
			email:'gptomelilla@hotmail.com',
			nationalIdNumber:'620221-1942',
			role:'parent',
			children:'99972345, 89898986'
		});
	}

	const[wantToChangePassword,setWantToChangePassword]=useState({
		wantToChange:false
	});
	const HtmlToggler=()=>{
		setWantToChangePassword({
			wantToChange:true
		});
	}
 
	return(
		<div className="mypage-component">

			<ListGroup className="personal-info-list" >
				<ListGroupItem>{userData.name}</ListGroupItem>
				<ListGroupItem>{userData.phone}</ListGroupItem>
				<ListGroupItem>{userData.email}</ListGroupItem>
				<ListGroupItem>{userData.nationalIdNumber}</ListGroupItem>
				<ListGroupItem>{userData.role}</ListGroupItem>
				<ListGroupItem>{userData.children}</ListGroupItem>
			</ListGroup>

			{wantToChangePassword.wantToChange? 
				<div>
					<input type="password" onChange={(e)=>setnewPassword(e.target.value)} />
					<button onClick={handleSubmit}> Spara </button> 
				</div> 
				: 
				<div>	
					<output className="password-field">{userData.password}</output>
					<div className="change-password-button" onClick={HtmlToggler}></div>
				</div>
			}
				
		</div>
	);

}
export default MyPagePage;
