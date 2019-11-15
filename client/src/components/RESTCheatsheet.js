//here we type the route-models we want to use in the component 
//both those who have an mongoose-model and the routes who dont have
import { User, Login } from 'the.rest/dist/to-import'

// New user
let user = {
    name: "Lilla sjöhästen",
    email: "lillasjohasten@hej.com",
    password: "12345",
    phone: "12121212",
    nationalIdNumber: 12121212
}
//create an new user from the user above
let newUser = new User(user);
//and saving the user
await newUser.save()
//Log in the user with email and password
let logInUser = new Login({ email: user.email, password: user.password })
//Post the login to the server
console.log(await logInUser.save())
//Check who is logged in
let whoIsLoggedIn = await Login.findOne()
console.log(whoIsLoggedIn);
// Log out with delete
let deleteThisUser = await whoIsLoggedIn.delete()
console.log(deleteThisUser)

// Same as let newUser = newUser(user)
//await newUser.save()
    //     let response = {
//       uri: 'http://localhost:3000/api/users',
//       body: {
//           ...user
//       },
//       json: true
//   };
//   try {
//     const res = await request.post(response);
//     console.log(res)
//     if (res.statusCode !== 200) {
//       console.log("oh no we got an error")
//     }
//     console.log(res);
//     console.log("statuscode", res.statusCode)
//     return res;
// } catch (err) {
//     return err;
// }
