import React, { useState, useEffect } from 'react';
import HistoryDropdown from './HistoryDropdown.js';
import HistoryList from './HistoryList.js';
import {user} from './user.js';

function HistoryPage() {

  const [theDropdownTitle, setTheDropdownTitle] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dropdownNames, setDropdownNames] = useState([]);

  useEffect( () => {
    function fetchTransactions() {
      setTransactions(user.transactions);
    }

    fetchTransactions();
    insertNamesToDropdown();
    organizeTransactions();
  }, [setTransactions]);

  function insertNamesToDropdown() {
    let dropdownNames = ['Min historik'];
    if(user.children.length > 0) {
      for(let child of user.children) {
        dropdownNames.push(child.name);
      }
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

  const showDropdownTitle = (dropdownTitle) => {
    setTheDropdownTitle(dropdownTitle);
    organizeTransactions(dropdownTitle);
  }

  let propsToDropDown = {showDropdownTitle, dropdownNames, organizeTransactions};
  let propsToHistoryList = {theDropdownTitle, transactions};
  
  return (
    <div className="container history-page">
      <HistoryDropdown {...propsToDropDown} />
      <HistoryList {...propsToHistoryList} />
    </div>
  );
}

export default HistoryPage;







