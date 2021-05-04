import React, { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import '../login/Login.css';
import Notification from '../../components/Notification'
import ErrorNotification from '../../components/ErrorNotification'

export default function Notice(props) {
    const signupStatus = localStorage.getItem('success-signup');
    //console.log(signupStatus);
    const userEmail = localStorage.getItem('user-email');

    return (
        <div style={{textAlign:"left"}}>
            <Container className="login-container"  style={{paddingBottom: "200px", marginLeft: "157px"}}>
                <Row xs={1} md={2}>
                    <Col className="login-form">
                        {signupStatus === 'true' ? <Notification userEmail={userEmail}/> : <ErrorNotification userEmail={userEmail}/>}
                    </Col> 
                    <Col>
                        <img src="/auth-img.png" alt="bestsign-banner"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

