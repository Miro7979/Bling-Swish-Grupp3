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

	return(
		<div className="mypage-component container-fluid">

			<div className="header row">
				<div className="col-3 header-cols">
					<div className="logo mx-auto"></div>
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
				{userData.wantToChangePassword? 
					<input type="password" className="col-7" onChange={(e)=>setUserData({...userData,password:e.target.value})} autoFocus />:
					<output className="col-7">{userData.password}</output>}				
				<div className="col-2 edit-button" onClick={()=>setUserData({...userData,wantToChangePassword:true})}></div>
			</div>
						
			<div className="row">
				<p className="col-3">Begränsning:</p>  
				{userData.wantToChangeLimit?
					<input type="text" className="col-7" onChange={(e)=>setUserData({...userData,limit:e.target.value})} autoFocus/>:
					<output className="col-7">{userData.limit}</output>}
				<div className="col-2 edit-button" onClick={()=>setUserData({...userData,wantToChangeLimit:true})}></div> 
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