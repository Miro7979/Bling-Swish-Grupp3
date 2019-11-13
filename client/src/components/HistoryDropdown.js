import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function HistoryDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [myChildren, setMyChildren] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState('Min historik');


  useEffect(() => {

    function fetchChildren() {
      //Dummy data, should be replaced later when db is available.
      let arrayWithMyChildren = ['Lisa', 'Emma', 'Hannes'];
      setMyChildren(arrayWithMyChildren);
    }

    fetchChildren();
  }, [setMyChildren]);

  const toggle = () => setDropdownOpen( prevState => !prevState);

  const displayDropdownTitle = (e) => {

    setDropdownTitle(e.target.value);

  }

  return (
    <div className="history-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          {dropdownTitle}
        </DropdownToggle>
        <DropdownMenu>
          { dropdownTitle != 'Min historik' ? 
            <DropdownItem onClick={e => displayDropdownTitle(e)} value={'Min historik'}>Min historik</DropdownItem>
            : null }
          { myChildren.map( (child, id) => (
            dropdownTitle != child ? 
            <DropdownItem onClick={e => displayDropdownTitle(e)} value={child} key={id}>{child}</DropdownItem>
            : null
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default HistoryDropdown;