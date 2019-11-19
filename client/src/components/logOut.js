import { Login } from '../../../node_modules/the.rest/dist/to-import';
import React, { useContext } from 'react';
import { Login } from 'the.rest/dist/to-import';
import {
  NavLink,
} from 'reactstrap';
import Context from './Context';


function LogOut() {
  let [state, setState] = useContext(Context);
  async function handleLogout() {
    let whoIsLoggedIn = await Login.findOne()
    await whoIsLoggedIn.delete()
    setState((prev) => ({ ...prev, user: null }))
  }

  return (
    <React.Fragment>
      {state.user ? <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }} >Logga ut</NavLink> : <Redirect to="/" />}
    </React.Fragment>
  )
};

export default LogOut;