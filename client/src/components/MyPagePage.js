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
		children:['99972345', '89898986']
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
			children:['99972345', '89898986']
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

			<div className="personal-info-list" >
				<p className="label">Namn:</p>  <output className="output-field">{userData.name}</output>
				<p className="label">Telefon:</p>  <output className="output-field">{userData.phone}</output>
				<p className="label">Email:</p>	<output className="output-field">{userData.email}</output>
				<p className="label">PrNr:</p>  <output className="output-field">{userData.nationalIdNumber}</output>
				<p className="label">Roll:</p>  <output className="output-field">{userData.role}</output>
				<p className="label">Barn:</p>	<output className="output-field">{userData.children}</output>
			</div>

			{wantToChangePassword.wantToChange? 
				<div className="personal-info-list">
					<p className="label">Lösenord:</p>  <input type="password" className="input-field" onChange={(e)=>setnewPassword(e.target.value)} autoFocus />
				</div> 
				: 
				<div className="personal-info-list">	
					<p className="label">Lösenord:</p>  <output className="output-field">{userData.password}</output>
					<div className="change-password-button" onClick={HtmlToggler}></div>
				</div>
			}

			
			<h2>Mina barn</h2>

			{userData.children.length>0? 
				<ul>
					{userData.children.map(child=>{
					return(<li>{child}</li>);
					})}

				</ul>
			:
				<p>inga barn</p>
			}
				
		</div>
	);

}
export default MyPagePage;


/*
<button onClick={handleSubmit}> Spara </button> 
*/