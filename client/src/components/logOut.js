import React from 'react';

import { Login } from 'the.rest/dist/to-import';
import {
  NavLink
} from 'reactstrap';


function LogOut() {




  async function handleSubmit(e) {
    e.preventDefault();

    let whoIsLoggedIn = await Login.findOne()
    console.log(whoIsLoggedIn);
    let deleteThisUser = await whoIsLoggedIn.delete()
    console.log(deleteThisUser)

  }

  return (

    <NavLink onSubmit={handleSubmit} href="/login">Logga ut</NavLink>
  )

};

export default LogOut;