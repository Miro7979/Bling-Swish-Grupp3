import React, { useState, useContext } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { User } from '../../../node_modules/the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';

const Favourites = () => {
  let [state, setState] = useContext(Context);

  const [favourite, setFavourite] = useState();
  const [favourites, setFavourites] = useState();



  // const addToFavourites = async (e) => {
  //   let favourite = (await User.findOne({ email: state.user.email }).populate('favourites', 'name email _id'));
  //   favourites.push(favourite)
  //   //find input e.target.value
  //   //save to [favourites]
  //   console.log('hi');

  // }

  const chooseFavourite = () => {
    //map through all favourites
    //find which one is in input field
    //grab the value and save to input field
    console.log('bye');
    setFavourite({ user: favourite })
  }

  return (
    <Row>
      <Col sm="4" md="4">
        {/* {favourites.map(({ _id, name, phone }, index) => ( */}
          <Card body className="mt-2">
            {/* <CardTitle>{name}</CardTitle>
            <CardText>{phone}</CardText> */}
            <Button className="btn btn-info card-btn mr-2">Välj</Button>
            <Button className="btn btn-danger card-btn">Ta bort</Button>
          </Card>
          {/* ))} */}
      </Col>

    </Row>
  );
}



export default Favourites;