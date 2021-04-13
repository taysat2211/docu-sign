import React from 'react'
import {Form, Button, Container, Row, Col, Image} from 'react-bootstrap'

export default function login() {
    return (
        <div style={{textAlign:"left"}}>
            <Container style={{marginTop: "100px"}}>
                <Row xs={1} md={2} className="justify-content-md-between">
                    <Col>
                        <Form style={{width:"454px", display:"inline-block" ,textAlign:"left", borderRadius: "12px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", 
                            backgroundColor: "#FFFFFF", padding: "30px", width: "454px"}}>
                            <Form.Group style={{textAlign:"left"}}>
                                <h3 style={{color:"#24305E", fontSize: "18px", fontWeight: "700", lineHeight: "26px", 
                                    fontStyle: "normal", textTransform: "uppercase"}}>
                                    Đăng nhập
                                </h3>
                                <p style={{color:"#201934", fontSize: "16px", fontWeight: "400", lineHeight: "23px", 
                                    fontStyle: "normal"}}>
                                    Chưa có tài khoản? <a href="/register" style={{color: "#3626EB", fontSize: "18px", fontWeight: "700"}}>Đăng ký ngay</a>
                                </p>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Control style={{height: "56px", backgroundColor: "#F3F6FF", border: "1px solid #D6D6D6", borderRadius: "6px"}} placeholder="Tên đăng nhập" />
                            </Form.Group>

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                <Form.Control style={{height: "56px", backgroundColor: "#F3F6FF", border: "1px solid #D6D6D6", borderRadius: "6px"}} type="password" placeholder="Mật khẩu" />
                            </Form.Group>

                            <div align="center" style={{marginTop: "20px"}}>
                                <a style={{fontSize:"16px", fontWeight:"500",textDecoration:"none", color:"#3626EB"}} href="/forgot-password">Quên mật khẩu?</a>
                            </div>

                            <Button type="submit" style={{width:"394px", marginTop:"20px", backgroundColor:"#3626EB", color: "#FFFFFF", fontSize: "18px", fontWeight: "700"}}> Đăng nhập </Button>
                            <p style={{marginTop: "20px"}}>Hoặc đăng nhập bằng</p>
                            <Container>
                                <Row className="justify-content-around" xs={2}>
                                    <Col>
                                        <Button style={{width: "inherit", backgroundColor: "#F3F6FF", color: "#201934", fontSize: "16px", fontWeight: "400"}}>
                                            <i class="fab fa-facebook" style={{color: "#3B5998", marginRight: "12px", fontSize: "24px"}}></i>
                                            Facebook
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button style={{width: "inherit", backgroundColor: "#F3F6FF", color: "#201934", fontSize: "16px", fontWeight: "400"}}>
                                            <img alt="google-icon" src="https://img.icons8.com/fluent/24/000000/google-logo.png" style={{marginRight: "12px"}}/>
                                            Google
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
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

