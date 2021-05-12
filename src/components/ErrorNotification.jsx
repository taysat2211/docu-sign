import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Notification.css';
import {useHistory} from 'react-router-dom';

function ErrorNotification(props){
    const history = useHistory();

    const routeChange = () =>{ 
        const path = '/signup'; 
        history.push(path);
    }
    const {userEmail} = props;
    
    return(
        <>
           <Container >
                <Row>
                    <Col className="noti-container">
                        <img src="/danger-icon.png" alt="danger"/>
                        <h5 className="noti-title" style={{color: "#DF0909"}}>Email đã tồn tại</h5>
                        <p className="noti-text">
                            Email: <b>{userEmail}</b> đã được sử dụng để đăng ký tài khoản trước đó. Vui lòng sử dụng 1 email khác để đăng ký. 
                        </p>
                        <Button className="back-button" onClick={routeChange}> Về trang đăng ký </Button>
                    </Col>
                </Row>
           </Container>
        </>
    )
}

export default ErrorNotification;