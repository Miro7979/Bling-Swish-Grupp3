import React,{useState} from 'react';

const MyPagePageChild=({child})=>{

    const [editLimit,setEditLimit]=useState({
		wantToEdit: false
	});
	const htmlToggler=()=>{
		setEditLimit({ 
			wantToEdit: true
		});
	}

	const [newLimit,setNewLimit]=useState({
		theLimit:''
	});

    return(
        <div className="mypagepage-child-component">
			<li>{child.name}</li>
		    {editLimit.wantToEdit?
			<div>
				<p className="limited-text">Limiterad till</p>
				<input type="text" className="child-limit-input" 
				onChange={(e)=>setNewLimit(e.target.value)} autoFocus></input>
			</div>
			:
			<div>
				<p className="limited-text">Limiterad till : {child.limit} kr</p>
				<div className="edit-limit-button" onClick={htmlToggler}></div>
			</div>
			}
		</div>	
    );
}

export default MyPagePageChild;