import React, { useContext, useEffect } from 'react';
import { Card, Button, CardBody, Row, Col } from 'reactstrap';
import { User } from 'the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';



const Favorites = props => {

  const [state, setState] = useContext(Context);

  const deleteFavorite = async (e) => {
    let favList = state.user.favorites.filter(favorite => favorite._id !== e.id)
    let loggedInUser = await User.findOne({ phone: state.user.phone });
    loggedInUser.favorites = favList;
    await loggedInUser.save();
    //state is the same but override user and add the favorites
    setState((prev) => ({ ...prev, user: { ...prev.user, favorites: favList } }))

  }

  const selectFavorite = () => {
    //   //map through all favorites
    //   //find which one is in input field
    //   //grab the value and save to input field
    console.log('bye');
    //   setFavorite({ user: favorite })
  }

  useEffect(() => {
    async function displayFavorites() {
      try {
        let users = await User.find({ _id: state.user._id })[0].populate('favorites', 'name phone _id');
        //if users true and they have have an id
        if (users[0] && users[0]._id) {

          setState((prev) => ({ ...prev, user: { ...prev.user, favorites: users[0].favorites } }))

          return;
        }
      } catch (error) {
        console.log(error);
      }
      setState((prev) => ({ ...prev, booting: false }))
    }
    displayFavorites()
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  return (
    <Row>
      <Col sm={{ size: 6, offset: 3 }}>
        {/*check if favorites exists, if false make empty array*/}
        {(state.user.favorites[0] ? state.user.favorites : []).map(favorite => {
          return (
            <Card key={favorite._id} body className=" favCardBody mt-3 p-0">
              <CardBody className="p-3">
                <Row>
                  <Col className="favName pl-3 pr-0">
                    {favorite.name}
                  </Col>
                  <Col className="favPhone pl-1 pr-0">
                    {favorite.phone}
                    <Button onClick={selectFavorite} size="sm" className="btn btn-info ml-2" id="select-btn">Välj</Button>
                    <Button className="card-btn-delete btn btn-danger ml-3" onClick={(e) => deleteFavorite({ id: e.target.value })} size="sm" value={favorite._id}>Ta&nbsp;bort</Button>

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

export default Favorites;