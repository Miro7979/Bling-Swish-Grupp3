import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function HistoryDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState('Min historik');

  const toggle = () => setDropdownOpen( prevState => !prevState);

  const displayDropdownTitle = (e) => {
    if(e.target.value === 'Inga fler användare') {
      return;
    }
    setDropdownTitle(e.target.value);
  }

  const callFunctionsOnHistoryPage = () => {
    props.showDropdownTitle(dropdownTitle); 
    props.organizeTransactions(dropdownTitle);
  }

  return (
    <div className="history-dropdown">
      <Dropdown className="dropdown-list" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          {dropdownTitle}
        </DropdownToggle>
        <DropdownMenu onClick={callFunctionsOnHistoryPage()}>
          {props.dropdownNames.map( (title, id) => (
            dropdownTitle !== title ? 
            <DropdownItem onClick={e => displayDropdownTitle(e)} value={title} key={id}>{title}</DropdownItem>
            : null
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default HistoryDropdown;