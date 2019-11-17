import React,{useState} from 'react';

import { User, Login } from 'the.rest/dist/to-import';

const MyPagePageAddChild=({userData,setUserData})=>{

	const[data,setData]=useState({
		wantsToAddChild:false,
		childPhone:null,
		foundChild:''
	});

	async function findChild(){
		let child = await User.findOne({phone:data.childPhone});
		console.log(child );
		setData({
			...data,
			foundChild:child
		});	
	}

	const addChild=()=>{
		setUserData({
			...userData,
			children:[...userData.children,{id:data.foundChild.id,name:data.foundChild.name,limit:400}]
		});
	}


  return(
    <div className="mt-5">
			<button onClick={()=>setData({...data,wantsToAddChild:true})}>Lägg till barn</button>

			{data.wantsToAddChild?
				<div className="row newRow">
					<p className="col-3">Telefon nr:</p> 
					<div className="col-7">
						<input type="text" onChange={(e)=>setData({...data,childPhone:e.target.value})} ></input>
					</div>
					<div className="col-2">
						<button onClick={findChild}>sök</button>
					</div>
				</div>:
			''
			}

			{data.foundChild?
				<div>
					<p>{data.foundChild.name}</p>	
					<button onClick={addChild}>Lägg till</button>
				</div>:
				''
			}


		</div>    
  );
}
export default MyPagePageAddChild;



/*
	async function findChild(){

		let child = await User.findOne({phone:data.childPhone});
		console.log('child'+child);
					
		if(child.length>0){
			setData({
				...data,
				foundChild:child
			});	
		}

		console.log('state'+data.foundChild);

		/*
		else{
			setData({
				...data,
				foundChild:'Det finns ingen med detta telefonnummer'
			});	
		} */
	//}