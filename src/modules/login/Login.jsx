import React from 'react';
import { useState } from 'react';
import {Form, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';
import {IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import './Login.css';
import Swal from 'sweetalert2';
import { LoginService } from '../../axios/authorization/LoginService';
import Menu from '../../components/Menu';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({
        password: '',
        showPassword: false
    });
    
    const [alert, setAlert] = useState(false);

    function handleClickShowPassword () {
        setPassword({ ...password, showPassword: !password.showPassword });
    }
      
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const isAuthenticated = async () => {
        const userInfo = await LoginService(username, password.password);
        console.log(userInfo);
        if (userInfo === null) return false;
        return true;
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            return setAlert(true);
        }

        if (await isAuthenticated()) {
            return Swal.fire({
                title: 'Thành công',
                text: 'Đăng nhập thành công',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
        } else {
        
            return Swal.fire({
                title: 'Thất bại',
                text: 'Tên đăng nhập hoặc mật khẩu sai',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    }

    function onValidateInput(event) {
        if (event.target.value === '') setAlert(true)
        else setAlert(false);
    }

    return (
        <div className="background-authen" style={{textAlign:"left"}}>
			<Menu />
            <Container className="login-container"  style={{paddingBottom: "200px", marginLeft: "157px"}}>
                <Row xs={1} md={2}>
                    <Col>
                        <Form className="login-form" onSubmit={onFormSubmit}>
                            <Form.Group>
                                <h3 className="form-name">
                                    Đăng nhập
                                </h3>
                                <p className="form-text">
                                    Chưa có tài khoản? <a href="/signup" className="form-link">Đăng ký ngay</a>
                                </p>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Control className="form-input-box" value={username} placeholder="Tên đăng nhập" onChange={event => {setUsername(event.target.value); onValidateInput(event)}}/>
                            </Form.Group>

                            {alert === true ? <h6 style={{ color: "red" }}>Bạn phải nhập đầy đủ thông tin đăng nhập</h6> : null}

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                    <InputGroup className="form-input-box">
                                        <Form.Control
                                            type={password.showPassword ? "text" : "password"}
                                            value={password.password}
                                            onChange={event => {setPassword({...password, password: event.target.value}); onValidateInput(event)}}
                                            placeholder="Mật khẩu"
                                            style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "inherit"}}
                                        />
                                        <InputGroup.Append>
                                            <IconButton style={{color: "#3626EB"}} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                {password.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputGroup.Append>
                                    </InputGroup>
                            </Form.Group>

                            <div align="center" style={{marginTop: "20px"}}>
                                <a className="form-link" style={{fontSize:"16px", fontWeight:"600"}} href="/forgot-password">Quên mật khẩu?</a>
                            </div>

                            <Button type="submit" className="submit-button"> Đăng nhập </Button>

                            <p style={{marginTop: "20px"}}>Hoặc đăng nhập bằng</p>

                            <Container>
                                <Row className="justify-content-around" xs={2}>
                                    <Col>
                                        <Button className="oauth-button">
                                            <i class="fab fa-facebook" style={{color: "#3B5998", marginRight: "12px", fontSize: "24px"}}></i>
                                            Facebook
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className="oauth-button">
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
    );
}