import React, { useState, useContext } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Context from '../Context';

function HistoryDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [state] = useContext(Context);
  const [dropdownTitle, setDropdownTitle] = useState(state.user.name);


  const toggle = () => setDropdownOpen( prevState => !prevState);

  const displayDropdownTitle = (e) => {
    if(e.target.value === 'Inga fler användare') {
      return;
    }
    setDropdownTitle(e.target.value);
  }

  const callFunctionsOnHistoryPage = () => {
    props.createDropdown(dropdownTitle); 
  }


  return (
    <div className="history-dropdown">
      <Dropdown className="dropdown-list" isOpen={dropdownOpen} toggle={toggle}>
      <p className="user-balance">Ditt saldo: {state.user.balance.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</p>
        <DropdownToggle className="dropdown-title" caret>
          {dropdownTitle}
        </DropdownToggle>
        <DropdownMenu onClick={callFunctionsOnHistoryPage()}>
          {props.dropdownNames.map( (title, id) => (
            dropdownTitle !== title ? 
            <DropdownItem className="dropdown-title" onClick={e => displayDropdownTitle(e)} value={title} key={id}>{title}</DropdownItem>
            : null
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default HistoryDropdown;