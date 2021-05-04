import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Notification.css';
import {useHistory} from 'react-router-dom';

function Notification(){
    const history = useHistory();

    const routeChange = () =>{ 
        const path = '/'; 
        history.push(path);
    }
    
    const userEmail = localStorage.getItem('user-email');
    return(
        <>
           <Container >
                <Row>
                    <Col className="noti-container">
                        <img src="/tick-square-icon.png" alt="tick_square"/>
                        <h5 className="noti-title">Tạo tài khoản thành công</h5>
                        <p className="noti-text">
                            Chúc mừng bạn đã đăng ký tài khoản thành công với tên đăng nhập là: <b> {userEmail} </b>
                        </p>
                        <p className="noti-subtext">Đăng nhập ngay để trải nghiệm BestSign</p>
                        
                        <Button className="back-button" onClick={routeChange}> Đăng nhập </Button>
                    </Col>
                </Row>
           </Container>
        </>
    )
}

export default Notification;