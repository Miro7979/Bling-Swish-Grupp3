import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, CardTitle, CardBody, Row, Col } from 'reactstrap';
import { User } from '../../../node_modules/the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';



const Favourites = (props) => {

  let [state, setState] = useContext(Context);

  const [setFavourite] = useState();
  const [favourites, setFavourites] = useState([]);

  const deleteFavourite = async (e) => {
    let favList = favourites.filter(favourite => favourite._id !== e.id)
    let loggedInUser = await User.findOne({ phone: state.user.phone });
    loggedInUser.favorites = favList;
    await loggedInUser.save();
    setFavourites(favList)
    setFavourite(loggedInUser)

  }
  // const selectFavourite = () => {
  //   //map through all favourites
  //   //find which one is in input field
  //   //grab the value and save to input field
  //   console.log('bye');
  //   setFavourite({ user: favourite })
  // }

  useEffect(() => {
    async function displayFavourites() {
      let favourite = await User.find({ phone: state.user.phone })[0].populate('favorites', 'name phone _id');
      if (favourite[0]._id) {

        setFavourites(favourite[0].favorites)
        return;
      }
      setState((prev) => ({ ...prev, booting: false }))
    }
    displayFavourites()
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  return (
    <Row>
      <Col className="card-cols">
        {favourites.map(favourite => {
          return (
            <Card key={favourite._id} body className="mt-2" sm={12} md={12}>
              <CardTitle>{favourite.name}</CardTitle>
              <CardBody>{favourite.phone}</CardBody>
              <Row className="btn-row">
                {/* <Button onClick={selectFavourite} size="sm" className="card-btn-select btn btn-info  mr-2">Välj</Button> */}
                <Button onClick={(e) => deleteFavourite({ id: e.target.value })} size="sm" value={favourite._id} className="card-btn-delete btn btn-danger">Ta bort</Button>
              </Row>
            </Card>
          )
        })}

      </Col>

    </Row>
  );
}



export default Favourites;