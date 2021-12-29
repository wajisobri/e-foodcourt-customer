// import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import './Login.css'

async function loginCustomer(credentials) {
    return fetch('http://localhost:6969/customer/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login(props) {
    if(props.isLoggedIn) {
        alert('You have logged in')
        window.location.href = "/home";
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginCustomer({
            email,
            password
        });

        if(response.id) {
            alert('Login Successful')
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('customerId', response.id);
            localStorage.setItem('accessToken', response.token.accessToken);
            window.location.href = "/";
        } else {
            alert('Login Failed')
        }
    }
  
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
}