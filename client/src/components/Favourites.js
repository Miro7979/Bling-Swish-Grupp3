import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { User } from '../../../node_modules/the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';



const Favourites = () => {
  let [state, setState] = useContext(Context);

  const [favourite, setFavourite] = useState();
  const [favourites, setFavourites] = useState([]);

  const deleteFavourite = (e) => {
    let favList = favourites.find()
    console.log('fav', favList);

  }
  const selectFavourite = () => {
    //map through all favourites
    //find which one is in input field
    //grab the value and save to input field
    console.log('bye');
    setFavourite({ user: favourite })
  }

  useEffect(() => {
    async function displayFavourites() {
      let favourite = await User.find({ phone: state.user.phone })[0].populate('favorites', 'name phone _id');
      if (favourite[0]._id) {
        setFavourites(favourite[0].favorites)
        return;
      }
      setState((prev) => ({ ...prev, booting: false }))
    }
    displayFavourites ()
  }, [state, setState])

  return (
    <Row>
      <Col lg={3} md={3} >
        {favourites.map(x => {
          return (
            <Card key={x._id} body className="mt-2">
              <CardTitle>{x.name}</CardTitle>
              <CardText>{x.phone}</CardText>
              <Button onClick={selectFavourite} className="btn btn-info card-btn mr-2">Välj</Button>
              <Button onClick={(e) => deleteFavourite} value={x._id} className="btn btn-danger card-btn">Ta bort</Button>
            </Card>
          )
        })}

      </Col>

    </Row>
  );
}



export default Favourites;