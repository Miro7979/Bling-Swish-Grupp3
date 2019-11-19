import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { Login } from '../../../node_modules/the.rest/dist/to-import';
import Context from './Context';

import {
	Button, Input,
	Form,
	Row,
	Col,
	FormGroup,
	Label,
	Alert
} from 'reactstrap';




function LogInPage(props) {
	let [state, setState] = useContext(Context)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [problem, setProblem] = useState(false);
	const dismissProblem = () => setProblem(false);

	async function handleSubmit(e) {
		e.preventDefault();
		let logInUser = await new Login({ email, password })
		await logInUser.save()
		let whoIsLoggedIn = await Login.findOne()
		if (whoIsLoggedIn._id) {
			setState((prev) => ({ ...prev, user: whoIsLoggedIn }))
		}

	};

	return (
		<React.Fragment>
			<div className="container">
				{(!state.user &&
					<div className="logInContent mt-5">
						<div className="logInHeader">
							<Row>
								<Col lx={12} lg={12} md={12} sm={6} >
									<h2 className="h2LogInHeader">Välkommen till Bling</h2>
								</Col>
							</Row>
							<Row>
								<Col lx={12} lg={12} md={12} sm={6} >
									<h4 className="h4LogInHeader">Vänligen logga in på ditt konto</h4>
								</Col>
							</Row>
						</div>
						<Form>
							<Row form>
								<Col lx={12} lg={12} md={12} sm={6}>
									<div>
										<Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={true}>
											Email eller lösenord är felaktigt, vänligen försök igen.
					        	</Alert>
									</div>
									<FormGroup>
										<Label for="emailLabel">Email</Label>
										<Input type="email" name="email" id="exampleEmail" placeholder="Ange din email här"
											key={1}
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</FormGroup>
									<FormGroup>
										<Label for="passwordLabel">Lösenord</Label>
										<Input type="password" name="password" id="examplePassword" placeholder="Ange ditt lösenord här"
											key={2}
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lx={12} lg={12} md={12} sm={6}>
									<Button onClick={handleSubmit} color="success" className="logInBtn mr-3">Logga in</Button>
								</Col>
								<Col lx={12} lg={12} md={12} sm={6}>
									<div className="forgotPasswordLink">
										<Link to="/forgotPasswordPage">Glömt lösenord</Link>
									</div>
								</Col>
								<Col lx={12} lg={12} md={12} sm={6}>
									<div className="registerNewUserLink">
										<Link to="/registerNewUserPage">Registrera dig som ny användare</Link>
									</div>
								</Col>
							</Row>
						</Form>
					</div >) || <Redirect to="/betalningar" />}
			</div>
		</React.Fragment>
	);
};

export default LogInPage;