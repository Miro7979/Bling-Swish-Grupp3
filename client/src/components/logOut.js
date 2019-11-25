import { Login } from '../../../node_modules/the.rest/dist/to-import';
import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Context from './Context';


function LogOut() {
  let [state, setState] = useContext(Context);
  async function handleLogout() {
    let whoIsLoggedIn = await Login.findOne();
    await whoIsLoggedIn.delete();
    console.log('inside', state);
    let newUser = { role: 'visitor' }
    setState((prev) => ({ ...prev, user: newUser }))
  }
  console.log('outside', state)



  return (
    <React.Fragment>
      {state.user ? <Link className="navLink ml-3" onClick={handleLogout} to="/" >Logga ut</Link> : <Redirect to="/login" />}
    </React.Fragment>
  )
};

export default LogOut;