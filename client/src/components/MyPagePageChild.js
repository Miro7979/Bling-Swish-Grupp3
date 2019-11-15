import React,{useState} from 'react';
import logo from '../images/child-icon.png';
import editIcon from '../images/edit-icon.png';
import deleteIcon from '../images/delete-icon.png';

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

			<div className="row">
				<div className="col-3">
					<img src={logo} alt="barn ikon"></img>
				</div>			
				<p className="col-7 child-name">{child.name}</p>
				<div className="col-2 delete-button" onClick={htmlToggler}>
					<img src={deleteIcon} alt="ta bort ikon"></img>
				</div> 
			</div>

			<div className="row">
				<p className="col-3">Begränsning:</p>
				<div className="col-7">
					{editLimit.wantToEdit?
						<input type="text" onChange={changeLimit} autoFocus></input>:
						<p>{child.limit}</p>} 
				</div>		
				<div className="col-2 edit-button" onClick={htmlToggler}>
					<img src={editIcon} alt="ändra ikon"></img>
				</div> 		
								
			</div>	
		   				
		</div>	
  );
}
export default MyPagePageChild;
