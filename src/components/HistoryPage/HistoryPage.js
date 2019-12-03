import React, { useState, useEffect, useContext } from 'react';
import HistoryDropdown from './HistoryDropdown.js';
import HistoryList from './HistoryList.js';
import Context from '../Context';

function HistoryPage() {

  const [theDropdownTitle, setTheDropdownTitle] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dropdownNames, setDropdownNames] = useState([]);
  let context = useContext(Context);
  // let [user, setUser] = useState(context[0].user)
  let [user, setUser] = useState({transactions: []})
 

  useEffect(() => {
    console.log('runEffect')

    populateUserChildren()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context[0].reload]);

  
  console.log(context[0].reload)

  async function populateUserChildren() {
    let userWithpopulatedChildren;
    try {
      userWithpopulatedChildren = await fetch('/api/populatemychildren');
      if(!userWithpopulatedChildren.ok) {
        throw new Error('Network response was not ok.');
      }
      user = await userWithpopulatedChildren.json();
    } catch (error) {
      console.log('There has been a probelm with yout fetch operation.', error.message)
    }
    callAwaitedFunctions(user)
  }
  

  function callAwaitedFunctions(user) {
    fetchThisUserTransactions(user);
    insertNamesToDropdown();
    organizeTransactions();
  }
  

  async function fetchThisUserTransactions(user) {
    let myTransactions;
    try {
      myTransactions = await fetch('/api/my-transactions/' + user._id);
      if(!myTransactions.ok) {
        throw new Error('Network response was not ok.');
      }
      myTransactions = await myTransactions.json();
    } catch (error) {
      console.log('There has been a probelm with yout fetch operation.', error.message)
    }
    convertUser(user, myTransactions);
  }
  
  
  async function convertUser(user, thisUserTransactions) {
    let { name, children } = user;
    let transactionsHash = [];
    thisUserTransactions.forEach(transaction => {
      let { date, amount, message, from, to } = transaction;
      let dateSlice1 = date.slice(0, 10);
      let dateSlice2 = date.slice(11, 19);
      date = dateSlice1 + ', kl.' + dateSlice2;
      transaction = { date, amount, message, fromUser: from.name === name ? '' : from.name, toUser: to.name === name ? '' : to.name };
      transactionsHash.push(transaction);
    });
    let convertedUser = { name, transactions: transactionsHash, children };
    
    if (children.length > 0) {
      let myConvertedChildren = await fetchThisUsersChildren(children);
      convertedUser = { name, transactions: transactionsHash, children: myConvertedChildren };
    }
    
    setUser(convertedUser);
  }
  
  
  async function fetchThisUsersChildren(childrens) {
    let myConvertedChildren = [];
    for (let child of childrens) {
      let myChildTransactions = await fetch('/api/my-transactions/' + child._id);
      myChildTransactions = await myChildTransactions.json();
      
      let { name, children } = child;
      children = [];
      let transactionsHash = [];
      myChildTransactions.forEach(transaction => {
        let { date, amount, message, from, to } = transaction;
        let dateSlice1 = date.slice(0, 10);
        let dateSlice2 = date.slice(11, 19);
        date = dateSlice1 + ', kl.' + dateSlice2;
        transaction = { date, amount, message, fromUser: from.name === name ? '' : from.name, toUser: to.name === name ? '' : to.name };
        transactionsHash.push(transaction);
      });
      let convertedChild = { name, transactions: transactionsHash, children };
      myConvertedChildren.push(convertedChild);
    }
    
    return myConvertedChildren;
  }
  
  
  function insertNamesToDropdown() {
    let dropdownNames = ['Min historik'];
    if (user.children.length > 0) {
      for (let child of user.children) {
        dropdownNames.push(child.name);
      }
    } else {
      dropdownNames.push('Inga fler användare')
    }
    setDropdownNames(dropdownNames);
  }
  

  async function organizeTransactions(dropdownTitle) {
    let transactionsArr = [{ name: 'Min historik', transactions: user.transactions }]
    
    if (await user.children) {
      for (let child of await user.children) {
        let { name, transactions } = child;
        let childObj = { name, transactions };
        transactionsArr.push(childObj);
      }
    }
    
    let nameFromDropdown = transactionsArr.find(({ name }) => name === dropdownTitle);
    if (!nameFromDropdown) { return };
    
    setTransactions(nameFromDropdown.transactions)
  }

  
  const createDropdown = (dropdownTitle) => {
    setTheDropdownTitle(dropdownTitle);
    organizeTransactions(dropdownTitle);
  }

  
  let propsToDropDown = { createDropdown, dropdownNames, organizeTransactions };
  let propsToHistoryList = { theDropdownTitle, transactions };


  return (
    <div className="history-page">
      <HistoryDropdown {...propsToDropDown} />
      <HistoryList {...propsToHistoryList} />
    </div>
  );
}

export default HistoryPage;







