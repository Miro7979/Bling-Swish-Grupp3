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

  let [user, setUser] = useState(context[0].user)
  // let [user, setUser] = useState(dummyUser)
  // let [user, setUser] = useState(dummyUser2)

  async function fetchThisUserTransactions() {
    let myTransactions = await fetch('/api/my-transactions/' + user.phone);
    myTransactions = await myTransactions.json();

    convertUser(myTransactions);
  }


  function convertUser(thisUserTransactions){
    let {name, children} = user;
    let transactionsHash = [];
    thisUserTransactions.forEach(transaction => {
      let {date, amount, message, from, to} = transaction;
      let dateSlice1 = date.slice(0,10);
      let dateSlice2 = date.slice(11,19);
      date = dateSlice1 + ', kl.' + dateSlice2;
      transaction = {date, amount, message, fromUser: from.name === name ? '' : from.name, toUser: to.name === name ? '' : to.name};
      transactionsHash.push(transaction);
    });
    let convertedUser = {name, transactions: transactionsHash, children};

    if(children.length > 0) {
      let myConvertedChildren = fetchThisUsersChildren(children);
      convertedUser = {name, transactions: transactionsHash, children: myConvertedChildren};
    }

    setUser(convertedUser);
  }


  async function fetchThisUsersChildren(childrens) {
    let myConvertedChildren = [];
    for(let child of childrens) {
      let myChildTransactions = await fetch('/api/my-transactions/' + child.phone);
      myChildTransactions = await myChildTransactions.json();

      let {name, children} = child;
      children = [];
      let transactionsHash = [];
      myChildTransactions.forEach(transaction => {
        let {date, amount, message, from, to} = transaction;
        let dateSlice1 = date.slice(0,10);
        let dateSlice2 = date.slice(11,19);
        date = dateSlice1 + ', kl.' + dateSlice2;
        transaction = {date, amount, message, fromUser: from.name === name ? '' : from.name, toUser: to.name === name ? '' : to.name};
        transactionsHash.push(transaction);
      });
      let convertedChild = {name, transactions: transactionsHash, children};
      myConvertedChildren.push(convertedChild);
    }

    return myConvertedChildren;
  }


  useEffect(() => {
    fetchThisUserTransactions();
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
    <div className="history-page">
      <HistoryDropdown {...propsToDropDown} />
      <HistoryList {...propsToHistoryList} />
    </div>
  );
}

export default HistoryPage;







