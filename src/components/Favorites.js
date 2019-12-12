import React, { useContext, useEffect } from 'react';
import { Card, Button, CardBody, Row, Col } from 'reactstrap';
import { User , Populatemyfavorites} from 'the.rest/dist/to-import';
import Context from './Context';
const uuidv4 = require('uuid/v4')

const Favorites = props => {
  const [state, setState] = useContext(Context);

  async function displayFavorites() {
    try {
      let user = await Populatemyfavorites.findOne()
      //if users true and they have have an id
      if (user && user._id) {
        setState((prev) => ({ ...prev, user: { ...prev.user, favorites: user.favorites } }))
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setState((prev) => ({ ...prev, booting: false }))
  }

  useEffect(() => {
    displayFavorites()
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  function selectFavorite(favorite) {
    // listen for onclick (on the name)
    // grab the name
    // send  value (name/number) to the input field
    props.setNumber(favorite.phone)
  }

  const deleteFavorite = async (e) => {
    let favList = state.user.favorites.filter(favorite => favorite._id !== e.id)
    let loggedInUser = await User.findOne({ phone: state.user.phone });
    loggedInUser.favorites = favList;
    await loggedInUser.save();
    //state is the same but override user and add the favorites
    setState((prev) => ({ ...prev, user: { ...prev.user, favorites: favList } }))
  }
  // if (state.user.favorites.length > 1 && typeof state.user.favorites[0] === 'string') {
  //   // no good, the favorites array has not been populated, let us try to populate it
  //   displayFavorites();
  // }

  return (
    <Row>
      <Col sm={{ size: 6, offset: 3 }}>
        {/*check if favorites exists, if false make empty array*/}
        {(state.user.favorites && state.user.favorites[0] ? state.user.favorites : []).map(favorite => {
          return (
            <Card keys={favorite._id} key={uuidv4()} body className=" favCardBody mt-3 p-0">
              <CardBody className="p-3">
                <Row>
                  <Col className="favName pl-3">
                    {favorite.name}
                  </Col>
                  <Col className="favPhone"
                    onClick={() => selectFavorite(favorite)}>
                    {favorite.phone}
                  </Col>
                  <Col>
                    <Button className="card-btn-delete btn btn"
                      onClick={(e) => deleteFavorite({ id: e.target.value })}
                      size="sm" value={favorite._id}>Ta&nbsp;bort</Button>
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