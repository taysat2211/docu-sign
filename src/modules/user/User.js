import React from 'react';
import { useState, useEffect } from 'react';
import config from '../../config/default.json';
import './User.css';
import Info from './Info';
import UpdateInfo from './UpdateInfo';
import axios from 'axios';
const jwt = require('jsonwebtoken');

const access_token = localStorage.getItem('access_token');

export default function User() {
  const [userInfo, setUserInfo] = useState([]);
  const [show, setShow] = useState(true);
  const [avatar, setAvatar] = useState('/img_avatar.png');

  const imageHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    const axiosConfig = {
      headers: {
        'content-type': 'multipart/form-data',
        authorization: `Bear ${access_token}`,
      },
    };
    const response = await axios.post(
      `${config.backendBaseURL}/users/upload`,
      formData,
      axiosConfig
    );
    console.log(response);
  };
  const editInfo = () => {
    setShow((prev) => !show);
  };

  const getUser = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bear ${access_token}`,
      },
    };
    const response = await axios.get(
      `${config.backendBaseURL}/users/me`,
      axiosConfig
    );
    setUserInfo(response.data);
  };

  const handleEditUser = async (data) => {
    setShow(true);
  };

  const checkAvatarUser = async () => {
    const decoded = jwt.decode(access_token, { complete: true });
    const uid = decoded.payload.id;

    try {
      const response = await axios.get(
        `${config.backendBaseURL}/common/profile-image?userId=${uid}`
      );
    } catch (error) {
      console.error('file chua co hinh anh');
      return;
    }
    setAvatar(`${config.backendBaseURL}/common/profile-image?userId=${uid}`);
  };

  useEffect(() => {
    getUser();
    checkAvatarUser();
  }, [show, avatar]);

  return (
    <div className='info-user'>
      <a href='/home' className='align-middle back-space'>
        <i class='fas fa-arrow-left' />
        <span style={{ marginLeft: '10px' }}>Quay lại</span>
      </a>
      <div className='container-user'>
        <div className='flex-container'>
          <div>
            <div>
              <h1>BestSign</h1>
            </div>
            <div className='image-change'>
              <img src={avatar} className='avatar-user' />
              <input
                type='file'
                name='image'
                accept='image/*'
                multiple={false}
                onChange={imageHandler}
              />
            </div>
          </div>

          <div className='container-info'>
            {show ? (
              <Info userInfo={userInfo} editInfo={editInfo} getUser={getUser} />
            ) : (
              <UpdateInfo
                handleEditUser={handleEditUser}
                setShow={setShow}
                email={userInfo.email}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
