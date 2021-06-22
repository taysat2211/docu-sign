import React from 'react';
import { useState, useEffect } from 'react';
import config from '../../config/default.json';
import './User.css';
import Info from './Info';
import UpdateInfo from './UpdateInfo';
import axios from 'axios';

const access_token = localStorage.getItem('access_token');

export default function User() {
  const [userInfo, setUserInfo] = useState([]);
  const [show, setShow] = useState(true);

  const imageHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.set('image', file);
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

  useEffect(() => {
    getUser();
  }, [show]);

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
            <img src='/img_avatar.png' className='avatar-user' />
            <input
              type='file'
              name='image'
              accept='image/*'
              multiple={false}
              onChange={imageHandler}
            />
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
