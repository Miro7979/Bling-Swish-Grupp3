import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function HistoryPage() {
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
  },[setMyChildren]);

  const toggle = () => setDropdownOpen( prevState => !prevState);

  const displayDropdownTitle = (e) => {

    setDropdownTitle(e.target.value);

  }

  return (
    <div className="container history-page">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          {dropdownTitle}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={e => displayDropdownTitle(e)} value={'Min historik'}>Min historik</DropdownItem>
          {myChildren.map( (child, id) => (
            <DropdownItem onClick={e => displayDropdownTitle(e)} value={child} key={id}>{child}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );


}

export default HistoryPage;

