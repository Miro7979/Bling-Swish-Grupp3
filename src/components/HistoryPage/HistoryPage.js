import React, { useState, useEffect, useContext } from 'react';
import HistoryDropdown from './HistoryDropdown.js';
import HistoryList from './HistoryList.js';
import Context from '../Context';


function HistoryPage() {

  const [state] = useContext(Context);
  const [theDropdownTitle, setTheDropdownTitle] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [dropdownNames, setDropdownNames] = useState([]);

  // Sets/updates the main name in dropdownList
  useEffect(() => {

    setTheDropdownTitle(state.user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // Inserts all user names to dropdownList
  useEffect(() => {

    // Checks if user has children. If true -
    // insert their names to the dropdownList
    let userWithpopulatedChildren = {};
    async function addNamesToDropDownList() {
      let dropDownList = [state.user.name];
      if(state.user.children.length > 0){
        try {
          userWithpopulatedChildren = await fetch('/api/populatemychildren');
          if(!userWithpopulatedChildren.ok) {
            throw new Error('Network response was not ok.');
          }
          let user = await userWithpopulatedChildren.json();
          user.children.forEach(child => {
            dropDownList.push(child.name)
          });

        } catch (error) {
          console.log('There has been a probelm with yout fetch operation.', error.message)
        }
      } else {
        dropDownList.push('Inga fler användare')
      }
      setDropdownNames(dropDownList)
    }

    addNamesToDropDownList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Fetches transactions from chosen user from dropdownList
  useEffect(() => {

    // Selects the correct userId
    let userId = '';
    if(state.user.children.length > 0 && theDropdownTitle !== state.user.name) {
      let nameIndex = dropdownNames.indexOf(theDropdownTitle);
      userId = state.user.children[nameIndex - 1];
      if(!userId) {return}
      userId = userId._id;
    } else {
      userId = state.user._id;
    }
    
    // Starts fetching requested transaction
    let myTransactions = [];
    async function fetchUserTransactions() {
      if(!userId) {return;}
      try {
        myTransactions = await fetch('/api/my-transactions/' + userId);
        if(!myTransactions.ok) {
          throw new Error('Network response was not ok.');
        }
        myTransactions = await myTransactions.json();
        
        let transactionsHash = [];
        for(let transaction of myTransactions) {
          let { date, amount, message, from, to } = transaction;
          let dateSlice1 = date.slice(0, 10);
          let dateSlice2 = date.slice(11, 19);
          date = dateSlice1 + ', kl.' + dateSlice2;
          transaction = { date, amount, message, fromUser: from.name === theDropdownTitle ? '' : from.name, toUser: to.name === theDropdownTitle ? '' : to.name };
          if(transaction.fromUser !== '' && transaction.toUser !== ''){
            return;
          }
          transactionsHash.push(transaction);
        }
        setTransactions(transactionsHash);
      } catch (error) {
        console.log('There has been a problem with your fetch operation.', error.message)
      }
      
    }

    fetchUserTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theDropdownTitle, state.reload]);


  function createDropdown(dropdownTitle) {
    setTheDropdownTitle(dropdownTitle)
  }

  // Sends props down to specific child components
  let propsToDropDown = { createDropdown, dropdownNames };
  let propsToHistoryList = { theDropdownTitle, transactions };

  return (
    <div className="history-page">
      <HistoryDropdown {...propsToDropDown} />
      <HistoryList {...propsToHistoryList} />
    </div>
  );
}

export default HistoryPage;







