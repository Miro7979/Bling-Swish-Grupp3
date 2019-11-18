import React from 'react';

function HistoryList(props) {

  return (
    <div className="history-list">
      <h1 className="list-h1">{props.theDropdownTitle}</h1>

      {props.transactions.map((transaction, i) => 
        <div className="row history-list-row" key={i}>
          <div className="col list-col">
            <div className="row list-row">{transaction.date}</div>
            <div className="row list-row">
              <p>{transaction.fromUser === '' ? '' : transaction.fromUser}</p>
              <p>{transaction.toUser === '' ? '' : transaction.toUser}</p>
              <p className={transaction.fromUser === '' ? 'red-dot' : 'green-dot'}></p>
            </div>
          </div>
          <div className="col list-col">
            <div className="row list-row empty-placeholder"></div>
            <div className="row list-amount">
              <p>{transaction.toUser === '' ? '+ ' : '- '}{transaction.amount} SEK</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default HistoryList;