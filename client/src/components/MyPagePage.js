import React,{useState,useEffect} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';

const MyPagePage =()=>{

	const[userData,setUserData]=useState([{
		name:'Göran Persson',
		password:'olga99',
		phone:'0708-137490',
		email:'gptomelilla@hotmail.com',
		nationalIdNumber:'620221-1942',
		role:'parent',
		children:'99972345, 89898986'
	}]);
	const[newPassword,setnewPassword]=useState([{
		password:''
	}]);

	const handleSubmit =()=>{
		console.log(newPassword);
		setUserData([{
			name:'Göran Persson',
			password:newPassword,
			phone:'0708-137490',
			email:'gptomelilla@hotmail.com',
			nationalIdNumber:'620221-1942',
			role:'parent',
			children:'99972345, 89898986'
		}]);
		console.log(userData[0]);
	}

	return(
		<div className="mypage-component">

			<ListGroup className="personal-info-list" >
				<ListGroupItem>{userData[0].name}</ListGroupItem>
				<ListGroupItem>{userData[0].phone}</ListGroupItem>
				<ListGroupItem>{userData[0].email}</ListGroupItem>
				<ListGroupItem>{userData[0].nationalIdNumber}</ListGroupItem>
				<ListGroupItem>{userData[0].role}</ListGroupItem>
				<ListGroupItem>{userData[0].children}</ListGroupItem>
			</ListGroup>

			<input type="password" onChange={(e)=>setnewPassword(e.target.value)} />
			<button onClick={handleSubmit}> Spara </button>
				
		</div>
	);

}
export default MyPagePage;

