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
	const changeLimit=(e)=>{
		child.limit=e.target.value;
	}

    return(
        <div>
			<li>
				<p className="name">{child.name}</p>
		   		<p className="limit-text">Begränsning:</p>
				{editLimit.wantToEdit?
					<input type="text" className="child-limit-input" onChange={changeLimit} autoFocus></input>
					:<p className="limit">{child.limit}</p>}  				
				<p className="limit-text">kr</p>
				<div className="edit-limit-button" onClick={htmlToggler}></div> 
			</li>
		</div>	
    );
}
export default MyPagePageChild;
