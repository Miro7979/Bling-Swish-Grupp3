import React,{useState} from 'react';

const MyPagePageAddChild=()=>{

	const[data,setData]=useState({
		wantsToAddChild:false
	});

  return(
    <div className="mt-5">
			<button onClick={()=>setData({...data,wantsToAddChild:true})}>Lägg till barn</button>

			

			{data.wantsToAddChild?
				<div className="row newRow">
					<p className="col-3">Telefon nr:</p> 
					<div className="col-7">
						<input type="text" ></input>
					</div>
					<div className="col-2">
						<button className="button-success">sök</button>
					</div>
				</div>:
			<p>vill inte</p>
			}
		</div>    
  );
}
export default MyPagePageAddChild;