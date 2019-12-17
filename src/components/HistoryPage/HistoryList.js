import React, { useContext } from 'react';
import Context from '../Context';

function HistoryList(props) {
  const [state] = useContext(Context);


  return (
    <div className="history-list">
      
      <div className="row history-list-header">
        <h1 className="col list-h1">{props.theDropdownTitle}</h1>
        <p className="col user-balance">Ditt saldo: {state.user.balance.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</p>   
      </div>

      {props.transactions.length > 0 ? '' :
        <h3 className="history-list-no-transactions">- Inga transaktioner genomförda -</h3>
      }

      {props.transactions.map((transaction, i) => 
        <div className="row history-list-row" key={i}>

          <div className="col">
            <div className="row">
              <div className="col list-col">
                <div className="row list-row">
                  <p>
                    {transaction.date}
                  </p>
                </div>
                <div className="row list-row">
                  <p className="p-name">{transaction.fromUser === '' ? '' : transaction.fromUser}</p>
                  <p className="p-name">{transaction.toUser === '' ? '' : transaction.toUser}</p>
                  <p className={transaction.fromUser === '' ? 'red-dot' : 'green-dot'}></p>
                </div>
              </div>
              <div className="col list-col">
                <div className="row list-amount">
                  <p>{transaction.toUser === '' ? '+ ' : '- '}{transaction.amount.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</p>
                </div>
                <div className="row list-row empty-placeholder"></div>
              </div>
            </div>
            {transaction.message ?  
            <div className="row list-row  list-message">
              <p>Meddelande: {transaction.message}</p>
            </div>
          : ''}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default HistoryList;