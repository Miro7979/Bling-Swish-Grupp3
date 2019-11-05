import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

function LoginPage() {



    return (
        <div>

            <InputGroup>
                <Input />
                <InputGroupAddon addonType="append">
                    <Button color="secondary">To the Right!</Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );


};

export default LoginPage;