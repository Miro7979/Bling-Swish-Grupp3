import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
	Button, Input,
	Form,
	Row,
	Col,
	FormGroup,
	Label
} from 'reactstrap';
const request = require('request-promise-native');

function LogInPage() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		let response = {
			uri: 'http://localhost:3000/api/login',
			body: {
				...email,
				...password
			},
			json: true
		};

		try {
			const res = await request.post(response);
			console.log(res)
			if (res.statusCode !== 200) {
				console.log("We got an error")
			}
			return res;
		} catch (err) {
			return err;
		}

	}

	useEffect(() => {
		setRedirect(true);
	}, []);

	let redirectTo = () => {
		return <Redirect to="/payment" />;
	}




	return (
		<div className="container">
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
							<FormGroup>
								<Label for="emailLabel">Email</Label>
								<Input type="email" name="email" id="exampleEmail" placeholder="Ange din email här"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="passwordLabel">Lösenord</Label>
								<Input type="password" name="password" id="examplePassword" placeholder="Ange ditt lösenord här"
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
			</div >
		</div >
	);
};

export default LogInPage;