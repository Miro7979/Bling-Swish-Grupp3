import React,{useState} from 'react';
import { User } from '../../../node_modules/the.rest/dist/to-import';
import {Col,Row,Button} from 'reactstrap';

const MyPagePageAddChild=({userData,setUserData})=>{

	const[data,setData]=useState({
		wantsToAddChild:false,
		childPhone:null,
		foundChild:'',
		error:''
	});

	async function findChild(){
		let child = await User.findOne({phone:data.childPhone});
		if(child===undefined){
			setData({...data,foundChild:'',error:'Inga användare med det nummret'});	
		}
		else{
			setData({...data,error:'',foundChild:child});	
		}
	}

	const addChild=()=>{

		let duplicate=false
		for(let child of userData.children){			
			if(child._id===data.foundChild._id){duplicate=true;}
		}
		if(duplicate===false){
			setUserData({
				...userData,
				children: [ ...userData.children, data.foundChild ]
			}); 
		}
	}

  return(
    <div className="mt-5 add-child-component">
			
			<Row>
				<Col>
					<p className="add-child-text"> Lägg till ett barn </p>
				</Col>
			</Row>
			<Row>
				<Col xs={9}>
					<input type="text" className="form-control" placeholder="Telefonnummer" 
					onChange={(e)=>setData({...data,childPhone:e.target.value})}></input>
				</Col>
				<Col xs={3}>
					<Button color="info" onClick={findChild}> Sök </Button>
				</Col>
			</Row>

			{data.error?
				<Row className="mt-4">
					<Col xs={8} className="mx-auto">
						<p className="error-text">{data.error}</p>
					</Col>
				</Row>:''}

			{data.foundChild?
				<Row className="mt-4">
					<Col xs={7} className="mx-auto">
						<div className="mx-auto found-child" onClick={addChild}> {data.foundChild.name} </div>
					</Col>
				</Row>:''}

		</div>    
  );
}
export default MyPagePageAddChild;

/*
<input type="text" className="form-control" placeholder="Skriv in ditt barns telefon nummer" 
								 onChange={(e)=>setData({...data,childPhone:e.target.value})}></input>
*/

/*

	<div className="row">
				<button className="col-4 mx-auto btn btn-info" onClick={()=>setData({...data,wantsToAddChild:true})}>Lägg till barn</button>
			</div>
			
			{data.wantsToAddChild?
				<div className="row mt-3">
					<p className="col-3">Telefon nr:</p> 
					<div className="col-7">
						<input type="text" onChange={(e)=>setData({...data,childPhone:e.target.value})}></input>
					</div>
					<div className="col-2 search-button" onClick={findChild}>
						<img src={searchIcon} alt="sök ikon"></img>
					</div>
				</div>:
			''
			}

			{data.foundChild?
				<div className="row mt-2">
					<div className="col-3"></div>
					<div className="col-7">
						<p className="mx-auto">{data.foundChild.name} </p>
					</div>	 
					<div className="col-2" onClick={addChild}>
						<img src={addIcon} alt="lägg till ikon"></img>
					</div>
				</div>:
				''
			}

*/

