import React from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import '../login/Login.css'

export default function signup() {
    return (
        <div style={{textAlign:"left"}}>
            <Container className="login-container"  style={{paddingBottom: "200px"}}>
                <Row xs={1} md={2} className="justify-content-md-between">
                    <Col>
                        <Form className="login-form">
                            <Form.Group>
                                <h3 className="form-name">
                                    Đăng ký
                                </h3>
                                <p className="form-text">
                                    Đã có tài khoản? <a href="/" className="form-link">Đăng nhập ngay</a>
                                </p>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Control className="form-input-box" placeholder="Nhập email" />
                            </Form.Group>

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                <Form.Control className="form-input-box" type="password" placeholder="Nhập mật khẩu" />
                            </Form.Group>

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                <Form.Control className="form-input-box" type="password" placeholder="Nhập lại mật khẩu" />
                            </Form.Group>

                            <Button type="submit" className="submit-button"> Đăng ký tài khoản </Button>
                        </Form>
                    </Col>
                    <Col>
                        <img src="/auth-img.png" alt="bestsign-banner"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


