import React, { useState, useEffect } from 'react';
import MypagePageChild from './MyPagePageChild.js';
import MyPagePageAddChild from './MyPagePageAddChild.js';
import {Col,Row,Button} from 'reactstrap';
import logo from '../images/person-icon.png';
import goBackLogo from '../images/goback-icon.png';

import { User, Login } from 'the.rest/dist/to-import';

const MyPagePage = () => {

	const[userData,setUserData]=useState({
		name:'',password:'',phone:'',email:'',nationalIdNumber:'',role:'',limit:'',children:[]
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
		// eslint-disable-next-line
	},[]);


	// --- PASSWORD ERROR --- //
	const[passwordError,setPasswordError]=useState({
		passwordError:false
	});

 


	async function handleSubmit(){

		//alert(userData.password);
		let regularx = /^[\w ]+$/;
		if(userData.password.length<6){ setPasswordError({passwordError:true}); }
		else if(!regularx.test(userData.password)){ setPasswordError({ passwordError:true}); }
		else{ 
			setPasswordError({ passwordError:false }); 
			alert('passed tha test');
		}


/*
		let whoIsLoggedIn = await Login.findOne();
		let user= await User.findOne({name:whoIsLoggedIn.name});

		user.password=userData.password;
		user.limit=userData.limit;
		user.children=userData.children;

		if(userData.children.length>0){
			let child=await User.findOne({_id:userData.children[0]._id});
			child.limit=userData.children[0].limit;
			await child.save();
		}
	
		await user.save();

		setWantToEdit({
			wantToEdit:false
		});
		*/
	}

	const[wantToEdit,setWantToEdit]=useState({
		wantToEdit:false
	});


	return(
		<div className="mypage-component mt-5">

			<Row className="pb-5">
				<Col>
					{wantToEdit.wantToEdit?
						<img src={goBackLogo} alt="pil ikon" className="button" onClick={()=>setWantToEdit({wantToEdit:false})}></img>:
						<Button color="info" className="edit-button" onClick={()=>setWantToEdit({wantToEdit:true})}> Redigera </Button>
				}
					
				</Col>
			</Row>

			<Row>
				<Col xs={3}> 
					<img src={logo} alt="person ikon"></img>
				</Col>
				<Col xs={9} className="user-name"> 
					{userData.name}
				</Col>
			</Row>

			<Row className="mt-4">
				<Col xs={3} className="text-dark"> Telefon </Col>
				<Col xs={9}> {userData.phone} </Col>
			</Row>
			<Row>
				<Col xs={3} className="text-dark"> Epost </Col>
				<Col xs={9}> {userData.email} </Col>
			</Row>
			<Row>
				<Col xs={3} className="text-dark"> Pers.Nr. </Col>
				<Col xs={9}> {userData.nationalIdNumber} </Col>
			</Row>

			<Row style={{height:'40px'}}>
				<Col xs={3} className="password-text text-dark"> Lösenord </Col>
				<Col sm={6} xs={7}> 
					{wantToEdit.wantToEdit?	
					<input type="password" className="form-control" placeholder="Nytt lösenord" onChange={(e)=>setUserData({...userData,password:e.target.value})} />:
					<p className="password-text">{/*{userData.password}*/}********</p> }
				</Col>
			</Row>
			{passwordError.passwordError?
				<div>
					<Row>
						<Col>
							<p className="error-text">! Lösenord måste vara minst sex tecken långt och får endast inehålla bokstäver samt siffror </p>
						</Col>
					</Row>
				</div>:''
			}
			
			
			<Row className="mt-2">
				<Col className="text-center text-dark"> Beloppsgräns (per månad) </Col>	
			</Row>
			<Row className="mt-1">		
	
					{wantToEdit.wantToEdit?	
				
				
						<Col xs={4} className="mx-auto"> 
						<input type="number" className="form-control" value={userData.limit} onChange={(e)=>setUserData({...userData,limit:e.target.value})} />
						</Col>
						:
						<Col className="text-center">
						{userData.limit?<p>{userData.limit} sek</p>:<p className="limit-text">Ingen gräns satt</p>}
						</Col> }
				
			</Row>

			{userData.children.length>0?
				<div className="mt-4">
					{userData.children.map((child,index)=>{
						return(									
							<MypagePageChild key={index+1} child={child} wantToEdit={wantToEdit} userData={userData} setUserData={setUserData}/>
						);
					})}
				</div>
				: ''}

			{wantToEdit.wantToEdit?
				<MyPagePageAddChild userData={userData} setUserData={setUserData} />:''
			}
			{wantToEdit.wantToEdit?
				<Row className="mt-5">
					<button className="col-3 mx-auto btn btn-success" onClick={handleSubmit}>Spara</button>
				</Row>:''}

		</div>
	);
}
export default MyPagePage;
