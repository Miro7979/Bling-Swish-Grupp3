import React, { useState, useEffect, useContext } from 'react';
import HistoryDropdown from './HistoryDropdown.js';
import HistoryList from './HistoryList.js';
import Context from '../Context';

import {dummyUser} from './dummyUser.js';
import {dummyUser2} from './dummyUser2.js';

function HistoryPage() {
  
  const [theDropdownTitle, setTheDropdownTitle] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dropdownNames, setDropdownNames] = useState([]);
  let context = useContext(Context);

  let [user] = useState(context[0].user)
  // let [user, setUser] = useState(dummyUser)
  // let [user, setUser] = useState(dummyUser2)


  useEffect(() => {
    insertNamesToDropdown();
    organizeTransactions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function insertNamesToDropdown() {
    let dropdownNames = ['Min historik'];
    if(user.children.length > 0) {
      for(let child of user.children) {
        dropdownNames.push(child.name);
      }
    } else {
      dropdownNames.push('Inga fler användare')
    }

    setDropdownNames(dropdownNames);
  }

  function organizeTransactions(dropdownTitle) {
    let transactionsArr = [{name: 'Min historik', transactions: user.transactions }]
    for( let child of user.children) {
      let {name, transactions} = child;
      let childObj = {name, transactions};
      transactionsArr.push(childObj);
    }

    let personFromDropdown = transactionsArr.find( ({name}) => name === dropdownTitle);
    if(!personFromDropdown) { return };

    setTransactions(personFromDropdown.transactions)
  }

  const createDropdown = (dropdownTitle) => {
    setTheDropdownTitle(dropdownTitle);
    organizeTransactions(dropdownTitle);
  }

  let propsToDropDown = {createDropdown, dropdownNames, organizeTransactions};
  let propsToHistoryList = {theDropdownTitle, transactions};
  
  return (
    <div className="container history-page">
      <HistoryDropdown {...propsToDropDown} />
      <HistoryList {...propsToHistoryList} />
    </div>
  );
}

export default HistoryPage;







