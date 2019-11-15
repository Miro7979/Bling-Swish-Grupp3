import React from 'react';
import { Login } from 'the.rest/dist/to-import';
// import { Link } from 'react-router-dom';
import {
  NavLink,
} from 'reactstrap';


function LogOut() {



  async function handleLogout() {
    // e.preventDefault();

    let whoIsLoggedIn = await Login.findOne()
    console.log(whoIsLoggedIn);
    let deleteThisUser = await whoIsLoggedIn.delete()
    console.log(deleteThisUser)
  }

  let handleRoute = history => {
    history.push('/')
  }


  return (

    <NavLink onClick={handleLogout} onChange={handleRoute.history} href='/login' >Logga ut</NavLink>
  )

};

export default LogOut;