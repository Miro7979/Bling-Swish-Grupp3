import React,{useState,useEffect} from 'react';
import MypagePageChild from './MyPagePageChild.js';
import MyPagePageAddChild from './MyPagePageAddChild.js';
import editIcon from '../images/edit-icon.png';
import logo from '../images/person-icon.png';

import { User, Login } from '../../../node_modules/the.rest/dist/to-import';

const MyPagePage =()=>{

	const[userData,setUserData]=useState({
		name:'',
		password:'',
		phone:'',
		email:'',
		nationalIdNumber:'',
		role:'',
		limit:null,
		children:[]
	});

	useEffect(() => {
		async function loadLoggedInUser(){

			let whoIsLoggedIn = await Login.findOne();
			let user= (await User.find({name:whoIsLoggedIn.name}).populate('children','name limit'))[0];
			setUserData({
				...userData,
				name:user.name,
				password:user.password,
				phone:user.phone,
				email:user.email,
				nationalIdNumber:user.nationalIdNumber,
				role:user.role,
				limit:user.limit,
				children:user.children
			});
		}
		loadLoggedInUser();
	},[]);

	async function handleSubmit(){
		let whoIsLoggedIn = await Login.findOne();
		let user= await User.findOne({name:whoIsLoggedIn.name});

		user.password=userData.password;
		user.limit=userData.limit;
		user.children=userData.children;

		let child=await User.findOne({_id:userData.children[0]._id});
		child.limit=userData.children[0].limit;

		await child.save();
		await user.save();
	}

	const deleteChild=(id)=>{

		let updatedData= userData.children.filter((object)=>{
			return object.id !==id;
		});
		setUserData({
			...userData,
			children:updatedData
		});
	}

	const[wantToEdit,setWantToEdit]=useState({
		wantToEdit:false
	});


	return(
		<div className="mypage-component mt-5">

			<div className="row header">
				<div className="col-3">
					<img src={logo} alt="person ikon"></img>
				</div>
				<div className="col-7">
					<div className="name">{userData.name}</div>
				</div>
				<div className="col-2" onClick={()=>setWantToEdit({wantToEdit:true})}>
					<img src={editIcon} alt="redigera ikon" className="edit-button"></img>
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
				<p className="col-3">Begränsning:</p>  
				<div className="col-7">			
					{wantToEdit.wantToEdit?	
						<input type="text" value={userData.limit} onChange={(e)=>setUserData({...userData,limit:e.target.value})} />:
						<output>{userData.limit}</output>
					}								
				</div>			
			</div>
			
			{wantToEdit.wantToEdit?			
				<div className="row">
					<p className="col-3">Byt Lösen</p>  
					<div className="col-7">
						<input type="password" placeholder="Nytt lösenord" onChange={(e)=>setUserData({...userData,password:e.target.value})} />
					</div>		
				</div> 
			:''}
						
			{userData.children.length>0? 
				<div className="mt-4">
					{userData.children.map((child,index)=>{
						return(									
							<MypagePageChild key={index+1} child={child} deleteChild={deleteChild} wantToEdit={wantToEdit}/>
						);
					})}
	 			</div>
			: '' }

			<MyPagePageAddChild userData={userData} setUserData={setUserData} />
		
			<button className="row mx-auto mt-5 btn btn-success" onClick={handleSubmit}>Spara</button>				
		</div>
	);
}
export default MyPagePage;

/*
[{id:'99972345',name:'Henrik Peersson',limit:400},{id:'89898986',name:'Maja Persson',limit:400}]
*/

/*    GAMLA LÖSENORD !!!!!!!!!!!!!!!!!!!!!!!!
		<div className="row">
				<p className="col-3">Lösenord:</p>  
				<div className="col-7">
					{userData.wantToChangePassword? 
						<input type="password" onChange={(e)=>setUserData({...userData,password:e.target.value})} autoFocus />:
						<output>{/*{userData.password}*/  /*}</output>}	
						</div>			
						<div className="col-2 edit-button" onClick={()=>setUserData({...userData,wantToChangePassword:true})}>
							<img src={editIcon} alt="ändra ikon"></img>
						</div>
					</div> 

*/

/*  GAMLA BEGRÄNSNING !!!!!!!!!!!!!!!
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
					</div>   */