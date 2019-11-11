import React,{useState} from 'react';
import MypagePageChild from './MyPagePageChild.js';

const MyPagePage =()=>{

	const[userData,setUserData]=useState({
		name:'Göran Persson',
		password:'olga99',
		phone:'0708-137490',
		email:'gptomelilla@hotmail.com',
		nationalIdNumber:'620221-1942',
		role:'parent',
		children:[{id:'99972345',name:'Henrik Peeeeeeeeersson',limit:400},{id:'89898986',name:'Maja Persson',limit:400}]
	});
	const[newPassword,setnewPassword]=useState({
		password:''
	});

	const handleSubmit =()=>{
		/*setUserData({
			name:'Göran Persson',
			password:newPassword,
			phone:'0708-137490',
			email:'gptomelilla@hotmail.com',
			nationalIdNumber:'620221-1942',
			role:'parent',
			children:['666', '666']
		});*/
		console.log(userData.children);

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

			<div className="header">
				<div className="person-logo"></div>
				<div className="name">{userData.name}</div>
			</div>

			<div className="personal-info-list" >
				<p className="label">Telefon:</p>  <output className="output-field">{userData.phone}</output>
				<p className="label">Email:</p>	<output className="output-field">{userData.email}</output>
				<p className="label">PrNr:</p>  <output className="output-field">{userData.nationalIdNumber}</output>
				<p className="label">Roll:</p>  <output className="output-field">{userData.role}</output>
			
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

			<div className="personal-info-list">
				{userData.children.length>0? 
					<ul className="children-list">
						{userData.children.map(child=>{
							return(									
								<MypagePageChild child={child}/>
							);
						})}
					</ul>
				: <p>inga barn</p> }
			</div>
			<button className="save-button" onClick={handleSubmit}>Spara</button>				
		</div>
	);
}
export default MyPagePage;
