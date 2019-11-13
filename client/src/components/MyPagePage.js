import React,{useState} from 'react';
import MypagePageChild from './MyPagePageChild.js';

const MyPagePage =()=>{

	const[userData,setUserData]=useState({
		name:'Göran Persson',
		password:'olga99',
		wantToChangePassword:false,
		phone:'0708-137490',
		email:'gptomelilla@hotmail.com',
		nationalIdNumber:'620221-1942',
		role:'parent',
		limit:500,
		wantToChangeLimit:false,
		children:[{id:'99972345',name:'Henrik Peeeeeeeeersson',limit:400},{id:'89898986',name:'Maja Persson',limit:400}]
	});
	const handleSubmit =()=>{
		console.log(userData);
	}

	const passwordToggler=()=>{
		setUserData({
			...userData,
			wantToChangePassword:true
		});		
	}
	const setNewPassword=(e)=>{
		setUserData({
			...userData,
			password:e.target.value
		});
	}

	const limitToggler=()=>{
		setUserData({
			...userData,
			wantToChangeLimit:true
		});
	}
	const setNewLimit=(e)=>{
		setUserData({
			...userData,
			limit:e.target.value
		});
	}



	return(
		<div className="mypage-component">

			<div className="header">
				<div className="person-logo"></div>
				<div className="name">{userData.name}</div>
			</div>

			<div className="personal-info-list" >
				<p className="label">Telefon:</p>  <output className="output-field">{userData.phone}</output>
				<p className="label">Email:</p>	<output className="output-field">{userData.email}</output>
				<p className="label">PrNr:</p>  <output className="output-field">{userData.nationalIdNumber}</output>
				<p className="label">Roll:</p>  <output className="output-field">{userData.role}</output>
				{userData.wantToChangePassword?  
					<div>
						<p className="label">Lösenord:</p>  
						<input type="password" className="input-field" onChange={setNewPassword} autoFocus />
					</div>:					
					<div>	
						<p className="label">Lösenord:</p>  <output className="output-field">{userData.password}</output>
						<div className="change-password-button" onClick={passwordToggler}></div> 
					</div>
				}
				{userData.wantToChangeLimit?
					<div>
						<p className="label">Begränsning</p> 
						<input type="text" className="input-field" onChange={setNewLimit} autoFocus/>
					</div>:
					<div>
						<p className="label">Begränsning</p> <output className="output-field">{userData.limit}</output>
						<div className="change-password-button" onClick={limitToggler}></div> 
					</div>
				}				
			</div>
			
			{userData.children.length>0? 
				<ul className="children-list">
					{userData.children.map(child=>{
						return(									
							<MypagePageChild child={child}/>
						);
					})}
	 			</ul>
				: <p>inga barn</p> }
		
			<button className="save-button" onClick={handleSubmit}>Spara</button>				
		</div>
	);
}
export default MyPagePage;