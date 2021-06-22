import React from 'react';
import { useState, useEffect } from 'react';
import config from '../../config/default.json';
import axios from 'axios';
import {} from 'react-bootstrap';

import './UpdateInfo.css';

const access_token = localStorage.getItem('access_token');
export default function Info(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumb, setPhoneNumb] = useState('');
  const Submit = async (e) => {
    if (
      firstName === '' ||
      lastName === '' ||
      address === '' ||
      phoneNumb === ''
    ) {
      alert('Info invalid, please try again');
    } else {
      props.setShow(true);
      const axiosConfig = {
        headers: {
          authorization: `Bear ${access_token}`,
        },
      };
      await axios.patch(
        `${config.backendBaseURL}/users/me`,
        {
          firstName,
          lastName,
          address,
          phoneNumber: phoneNumb,
          email: props.email,
        },
        axiosConfig
      );
    }

    e.preventDefault();
  };

  const handleChangeNumber = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumb(value);
  };
  useEffect(() => {}, []);
  return (
    <div className='update-info'>
      <form className='form' onSubmit={Submit}>
        <div className='form-user'>
          <label htmlFor='firstName'>FirstName: </label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='form-user'>
          <label htmlFor='lastName'>LastName: </label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='form-user'>
          <label htmlFor='phoneNumber'>Phone: </label>
          <input type='text' value={phoneNumb} onChange={handleChangeNumber} />
        </div>
        <div className='form-user'>
          <label htmlFor='address'>Address: </label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>OK</button>
        </div>
      </form>
    </div>
  );
}
