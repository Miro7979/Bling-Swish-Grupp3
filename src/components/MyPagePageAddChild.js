import React,{useState} from 'react';
import { Findchild, SendChildRequest } from 'the.rest/dist/to-import';
import {Col,Row,Button} from 'reactstrap';

const MyPagePageAddChild=({userData,setUserData})=>{

	const[data,setData]=useState({
		wantsToAddChild:false,
		childPhone:null,
		foundChild:'',
		error:''
	});

	async function findChild(){
		let child = await new Findchild({phone:data.childPhone});
		await child.save()
		if(child===undefined){
			setData({...data,foundChild:'',error:'Inga användare med det nummret'});	
		}
		else{
			setData({...data,error:'',foundChild:child});
		}
	}

	const addChild= async ()=>{
		let duplicate=false
		for(let child of userData.waitingChildren){			
			if(child._id===data.foundChild._id){duplicate=true;}
		}
		for(let child of userData.children){			
			if(child._id===data.foundChild._id){duplicate=true;}
		}
		if(duplicate===false){
			let childRequest = await new SendChildRequest({_id:userData._id,childId: data.foundChild._id})
			await childRequest.save()
			console.log(childRequest)
			// let _id = userData._id
			// let childId = data.foundChild._id
				
			// let newChild = await new SendChildRequest({_id, childId})
			// await newChild.save()
			setUserData({
				...userData,
				waitingChildren: [ ...userData.waitingChildren, data.foundChild ]
			}); 
		}
	}

  return(
    <div className="mt-3 add-child-component">
			
			<Row>
				<Col className="text-center">
					<p> Lägg till ett barn </p>
				</Col>
			</Row>
			<Row>
				<Col xs={9}>
					<input type="number" className="form-control" placeholder="Telefonnummer" 
					onChange={(e)=>setData({...data,childPhone:e.target.value})}></input>
				</Col>
				<Col xs={3}>
					<Button className="search-button" onClick={findChild}> Sök </Button>
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


