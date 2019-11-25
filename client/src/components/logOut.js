import { Login } from '../../../node_modules/the.rest/dist/to-import';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


import {
  NavLink,
} from 'reactstrap';
import Context from './Context';


function LogOut() {
  let [state, setState] = useContext(Context);
  async function handleLogout() {
    let whoIsLoggedIn = await Login.findOne()
    state.user.role = 'visitor'
    await whoIsLoggedIn.delete()
    setState((prev) => ({ ...prev, user: state.user }))
  }

  return (
    <React.Fragment>
      {state.user ? <Link className="align-middle mt-1" onClick={handleLogout} style={{ cursor: 'pointer' }} >Logga ut</Link> : <Redirect to="/" />}
    </React.Fragment>
  )
};

export default LogOut;