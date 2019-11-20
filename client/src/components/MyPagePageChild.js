import React,{useState} from 'react';
import logo from '../images/child-icon.png';
import deleteIcon from '../images/delete-icon.png';

const MyPagePageChild=({child,deleteChild,wantToEdit})=>{

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
				{wantToEdit.wantToEdit?
					<div className="col-2 delete-button" onClick={()=>deleteChild(child.id)}>
						<img src={deleteIcon} alt="ta bort ikon"></img>
					</div>:''}			
			</div>

			<div className="row">
				<p className="col-3">Begränsning:</p>
				<div className="col-7">
					{wantToEdit.wantToEdit?
						<input type="text" placeholder={child.limit} onChange={changeLimit}></input>:
						<output>{child.limit}</output>	
					}						
				</div>											
			</div>
		   				
		</div>	
  );
}
export default MyPagePageChild;
