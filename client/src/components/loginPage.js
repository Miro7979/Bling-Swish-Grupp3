import React from 'react';
import {
	Button, Input,
	Form,
	Row,
	Col,
	FormGroup,
	Label
} from 'reactstrap';

function LogInPage() {



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
								<Input type="email" name="email" id="exampleEmail" placeholder="Ange din email här" />
							</FormGroup>
							<FormGroup>
								<Label for="passwordLabel">Lösenord</Label>
								<Input type="password" name="password" id="examplePassword" placeholder="Ange ditt lösenord här" />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col lx={12} lg={12} md={12} sm={6}>
							<Button color="success" className="logInBtn mr-3">Logga in</Button>
						</Col>
						<Col lx={12} lg={12} md={12} sm={6}>
							<Button color="info" className="forgotPasswordBtn mr-3">Glömt lösenord</Button>
						</Col>
						<Col lx={12} lg={12} md={12} sm={6}>
							<Button color="primary" className="newUserBtn">Registrera dig som ny användare</Button>
						</Col>
					</Row>
				</Form>
			</div >
		</div >
	);
};

export default LogInPage;