import React,{useState} from 'react';
import MypagePageChild from './MyPagePageChild.js';
import MyPagePageAddChild from './MyPagePageAddChild.js';
import editIcon from '../images/edit-icon.png';
import logo from '../images/person-icon.png';

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

	return(
		<div className="mypage-component container">

			<div className="header row">
				<div className="col-3 header-cols">
					<img src={logo} alt="person ikon"></img>
				</div>
				<div className="col-9 header-cols">
					<div className="name">{userData.name}</div>
				</div>
			</div>

			<div className="row">
				<p className="col-3">Telefon:</p>  <output className="col-9">{userData.phone}</output>
			</div>
			<div className="row">
				<p className="col-3">Email:</p>	<output className="col-9">{userData.email}</output>
			</div>
			<div className="row">
				<p className="col-3">PrNr:</p>  <output className="col-9">{userData.nationalIdNumber}</output>
			</div>
			<div className="row">
				<p className="col-3">Roll:</p>  <output className="col-9">{userData.role}</output>
			</div>
						
			<div className="row">
				<p className="col-3">Lösenord:</p>  
				<div className="col-7">
					{userData.wantToChangePassword? 
						<input type="password" onChange={(e)=>setUserData({...userData,password:e.target.value})} autoFocus />:
						<output>{userData.password}</output>}	
				</div>			
				<div className="col-2 edit-button" onClick={()=>setUserData({...userData,wantToChangePassword:true})}>
					<img src={editIcon} alt="ändra ikon"></img>
				</div>
			</div>
						
			<div className="row">
				<p className="col-3">Begränsning:</p>  
				<div className="col-7">
					{userData.wantToChangeLimit?
						<input type="text" onChange={(e)=>setUserData({...userData,limit:e.target.value})} autoFocus/>:
						<output>{userData.limit}</output>}
				</div>
				<div className="col-2 edit-button" onClick={()=>setUserData({...userData,wantToChangeLimit:true})}>
					<img src={editIcon} alt="ämdra ikon"></img>
				</div> 
			</div>
						
			{userData.children.length>0? 
				<div className="mt-4">
					{userData.children.map(child=>{
						return(									
							<MypagePageChild child={child}/>
						);
					})}
	 			</div>
			: <p>inga barn</p> }

			<MyPagePageAddChild />
		
			<br></br><button onClick={handleSubmit}>Spara</button>				
		</div>
	);
}
export default MyPagePage;