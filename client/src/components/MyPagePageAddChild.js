import React,{useState} from 'react';
import { User } from '../../../node_modules/the.rest/dist/to-import';
import searchIcon from '../images/search-icon.png';
import addIcon from '../images/add-icon.png';


const MyPagePageAddChild=({userData,setUserData})=>{

	const[data,setData]=useState({
		wantsToAddChild:false,
		childPhone:null,
		foundChild:''
	});

	async function findChild(){
		let child = await User.findOne({phone:data.childPhone});
		setData({
			...data,
			foundChild:child
		});	
	}

	const addChild=()=>{
		setUserData({
			...userData,
			children:[data.foundChild]
		});
	}

  return(
    <div className="mt-2">
			
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


		</div>    
  );
}
export default MyPagePageAddChild;



/*
children:[...userData.children,{id:data.foundChild.id,name:data.foundChild.name,limit:400}]
*/