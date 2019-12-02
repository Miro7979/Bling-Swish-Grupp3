import React, { useContext, useEffect } from 'react';
import { Card, Button, CardBody, Row, Col } from 'reactstrap';
import { User } from 'the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';



const Favourites = () => {

  let [state, setState] = useContext(Context);

  const deleteFavourite = async (e) => {
    let favList = state.user.favourites.filter(favourite => favourite._id !== e.id)
    let loggedInUser = await User.findOne({ phone: state.user.phone });
    loggedInUser.favorites = favList;
    await loggedInUser.save();
    //state is the same but override user and add the favourites
    setState((prev) => ({ ...prev, user: { ...prev.user, favourites: favList } }))

  }

  const selectFavourite = () => {
    //   //map through all favourites
    //   //find which one is in input field
    //   //grab the value and save to input field
    console.log('bye');
    //   setFavourite({ user: favourite })
  }


  async function displayFavourites() {
    try {

      let users = await User.find({ phone: state.user.phone })[0].populate('favorites', 'name phone _id');
      //if users true and they have have an id
      if (users[0] && users[0]._id) {

        setState((prev) => ({ ...prev, user: { ...prev.user, favourites: users[0].favorites } }))

        return;
      }
    } catch (error) {
      console.log(error);
    }
    setState((prev) => ({ ...prev, booting: false }))
  }
  displayFavourites()

  useEffect(() => {
    displayFavourites();
    
  })
  
  return (
    <Row>
      <Col sm={{ size: 6, offset: 3 }}>
        {/*check if favourites exists, if false make empty array*/}
        {(state.user.favourites || []).map(favourite => {
          return (
            <Card key={favourite._id} body className="mt-3 p-0">
              <CardBody className="p-3">
                <Row>
                  <Col className="pl-3 pr-0">
                    {favourite.name}
                  </Col>
                  <Col className="pl-3 pr-0">
                    {favourite.phone}
                  </Col>
                </Row>
                <Row className="btn-row mt-3">
                  <Col className="pl-3 pr-0">
                    <Button onClick={selectFavourite} size="sm" className="btn btn-info" id="select-btn">Välj</Button>
                  </Col>
                  <Col className="pl-3 pr-0">
                    <Button className="card-btn-delete btn btn-danger" onClick={(e) => deleteFavourite({ id: e.target.value })} size="sm" value={favourite._id}>Ta&nbsp;bort</Button>
                  </Col>

                </Row>
              </CardBody>
            </Card>
          )
        })}

      </Col>

    </Row>
  );
}



export default Favourites;