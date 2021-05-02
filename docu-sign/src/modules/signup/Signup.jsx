import React from 'react'
import { useState } from 'react';
import {Form, Button, Container, Row, Col, InputGroup} from 'react-bootstrap'
import {IconButton, Input, InputAdornment} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Swal from 'sweetalert2';
import '../login/Login.css';

export default function Signup() {
    const [accounts, setAccounts] = useState([
        {
            email: 'admin',
            password: 'admin'
        },
    ]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({
        password: '',
        showPassword: false
    });
    const [confirmPassword, setConfirmPassword] = useState({
        confirmPassword: '',
        showConfirmPassword: false
    });

    const [alert, setAlert] = useState(false);
    const [same, setSame] = useState(true);


    function handleClickShowPassword () {
        setPassword({ ...password, showPassword: !password.showPassword });
    }

    function handleClickShowConfirmPassword () {
        setConfirmPassword({ ...confirmPassword, showConfirmPassword: !confirmPassword.showConfirmPassword });
    }
      
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    function onFormSubmit (event) {
        event.preventDefault();
        if (email === '') {
            return setAlert(true);
        }
        if (password.password === '' || confirmPassword.confirmPassword === '') {
            return setAlert(true);
        }
        else {
            if (password.password !== confirmPassword.confirmPassword) {
                return setSame(false);
            }
        }
        
        setAlert(false);
        setSame(true);

        accounts.push({
            email: email,
            password: password.password
        });

        setAccounts(accounts);
    }

    function onValidateInput(event) {
        if (event.target.value === '') setAlert(true)
        else setAlert(false);
    }

    return (
        <div style={{textAlign:"left"}}>
            
            <Container className="login-container"  style={{paddingBottom: "200px", marginLeft: "157px"}}>
                <Row xs={1} md={2} className="justify-content-md-between">
                    <Col>
                        <Form className="login-form" onSubmit={onFormSubmit}>
                            <Form.Group>
                                <h3 className="form-name">
                                    Đăng ký
                                </h3>
                                <p className="form-text">
                                    Đã có tài khoản? <a href="/" className="form-link">Đăng nhập ngay</a>
                                </p>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Control className="form-input-box" value={email} placeholder="Nhập email" onChange={event => {setEmail(event.target.value); onValidateInput(event)}}/>
                            </Form.Group>

                            {alert === true ? <h6 style={{ color: "red" }}>Bạn phải nhập đầy đủ thông tin đăng ký</h6> : null}

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                    <InputGroup className="form-input-box">
                                        <Form.Control
                                            type={password.showPassword ? "text" : "password"}
                                            value={password.password}
                                            onChange={event => setPassword({...password, password: event.target.value})}
                                            placeholder="Nhập mật khẩu"
                                            style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "inherit", backgroundColor: "#FFFFFF, 8%"}}
                                        />
                                        <InputGroup.Append>
                                            <IconButton style={{color: "#3626EB", backgroundColor: "#FFFFFF, 8%"}} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                {password.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputGroup.Append>
                                    </InputGroup>
                            </Form.Group>

                            <Form.Group style={{marginTop:"16px", marginBottom:"0"}}>
                                    <InputGroup className="form-input-box">
                                        <Form.Control
                                            type={confirmPassword.showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword.confirmPassword}
                                            onChange={event => setConfirmPassword({...confirmPassword, confirmPassword: event.target.value})}
                                            placeholder="Nhập lại mật khẩu"
                                            style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "inherit", backgroundColor: "#FFFFFF, 8%"}}
                                        />
                                        <InputGroup.Append>
                                            <IconButton style={{color: "#3626EB", backgroundColor: "#FFFFFF, 8%"}} onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword}>
                                                {confirmPassword.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputGroup.Append>
                                    </InputGroup>
                            </Form.Group>

                            {same === false ? <h6 style={{ color: "red", marginTop: "16px"}}>Mật khẩu và mật khẩu nhập lại không giống nhau</h6> : null}

                            <Button type="submit" className="submit-button" style={{marginBottom: "30px"}}> Đăng ký tài khoản </Button>

                            <Form.Group>
                                <p className="form-text">
                                    Bằng việc đăng ký tài khoản là bạn đã đồng ý với <a href="/" className="form-link" style={{fontSize: "16px"}}>Điều khoản sử dụng & chính sách bảo mật</a> của BestSign
                                </p>
                            </Form.Group>
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


