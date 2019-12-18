import { Login } from 'the.rest/dist/to-import';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';

function LogOut() {
  let [state, setState] = useContext(Context);

  async function handleLogout() {
    let whoIsLoggedIn = await Login.findOne();
    await whoIsLoggedIn.delete();
    let newUser = { role: 'visitor' }
    state.user = newUser
    setState({ ...state })
  }

  return (
    <React.Fragment>
      <Link className="navLink ml-3" onClick={handleLogout} to="/" >Logga ut</Link>
    </React.Fragment>
  )
};

export default LogOut;