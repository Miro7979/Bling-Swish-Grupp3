import React, { useState } from 'react';
import { Input, Form, FormGroup, Label } from 'reactstrap';
import { User } from '../../../node_modules/the.rest/dist/to-import';

import { starIcon } from '../images/star-black.png';

const Favourites = () => {

  const [favourite, setFavourite] = useState();
  const [favourites, setFavourites] = useState();
  const [validationError, setValidationError] = useState();


  const addToFavourites = async(e) => {
    let favourites = [];
    let id = e.target['data-id'].value;
    let tempFavvo = await User.findOne(id);
    favourites.tempFavvo.save()
    //find input e.target.value
    //save to [favourites]
    console.log('hi');

  }

  const chooseFavourite = () => {
    //map through all favourites
    //find which one is in input field
    //grab the value and save to input field
    console.log('bye');
    setFavourite({ user: favourite })
  }

  return (
    <Form>
      <FormGroup>
        <Label className="mt-3" for="selectFavourite">Mina favoriter:</Label>
        {/*map()*/}
        <Input type="select" name="select" id="selectFavourite">
          <img src={starIcon}></img>
          <option>1</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
    </Form>
  );
}



export default Favourites;