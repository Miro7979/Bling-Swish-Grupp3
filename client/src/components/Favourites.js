import React, { useState, useContext, useEffect } from 'react';
import { Login } from 'the.rest/dist/to-import';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { User } from '../../../node_modules/the.rest/dist/to-import';
// import { starIcon } from '../images/star-black.png';
import Context from './Context';
const Favourites = (props) => {
  let [state, setState] = useContext(Context);

  const [favourite, setFavourite] = useState();
  const [favourites, setFavourites] = useState([]);

  // console.log(state)

  let name = 'test'
  let phone = 'user'

  console.log('props dataaa ', props.data)

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

  // useEffect((...props) => {
  //   async function checkUserSession() {
  //     let whoIsLoggedIn = await Login.findOne()
  //     if (whoIsLoggedIn._id) {
  //       setState((prev) => ({ ...prev, user: favourites}))
  //       return;
  //     }
  //     setState((prev) => ({ ...prev, booting: false }))
  //   }
  //   checkUserSession()

  // }, [...props.data]);

  useEffect(() => {
    async function checkUserSession() {
      let whoIsLoggedIn = await User.find({phone: state.user.phone}).populate('favorites', 'name phone _id');
      if (whoIsLoggedIn[0]._id) {
        // console.log(whoIsLoggedIn[0].favorites)
        setFavourites(whoIsLoggedIn[0].favorites)
        // setState((prev) => ({ ...prev, user: "favourites" }))
        return;
      }
      setState((prev) => ({ ...prev, booting: false }))
    }
    checkUserSession()
  }, [])

  return (
    <Row>
      <Col sm="4" md="4">
        {/* {favourites.map(({ _id, name, phone }, index) => ( */}

        {favourites.map(x => {
          return(
            <Card body className="mt-2">
            <CardTitle>{x.name}</CardTitle>
            <CardText>{x.phone}</CardText>
            <Button className="btn btn-info card-btn mr-2">Välj</Button>
            <Button className="btn btn-danger card-btn">Ta bort</Button>
          </Card>
          )
        })}

      </Col>

    </Row>
  );
}



export default Favourites;