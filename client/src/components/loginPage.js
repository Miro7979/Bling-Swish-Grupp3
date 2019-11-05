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
                        <Col lx={6} lg={6} md={6} sm={6} >
                            <h2>Välkommen till Bling</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lx={6} lg={6} md={6} sm={6} >
                            <h4>Vänligen logga in på ditt konto.</h4>
                        </Col>
                    </Row>
                </div>
                <Form>
                    <Row form>
                        <Col lx={6} lg={6} md={6} sm={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Ange din email här" />
                            </FormGroup>
                        </Col>
                        <Col lx={6} lg={6} md={6} sm={6}>
                            <FormGroup>
                                <Label for="examplePassword">Lösenord</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Ange ditt lösenord här" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lx={6} lg={6} md={6} sm={6}>
                            <Button className="logInBtn mr-3">Logga in</Button>
                            <Button className="forgotPasswordBtn mr-3">Glömt lösenord</Button>
                            <Button className="newUserBtn">Registrera dig som ny användare</Button>
                        </Col>
                    </Row>
                </Form>
            </div >
        </div >
    );
};

export default LogInPage;