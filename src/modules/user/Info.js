import React from 'react';
import './Info.css';

export default function Info({ editInfo, userInfo }) {
  return (
    <div className='list-info'>
      <div className='info-detail'>
        <h4>UserName: </h4>
        <label className='label-info'>{userInfo.username}</label>
      </div>
      <div className='info-detail'>
        <h4>FirstName: </h4>
        <label className='label-info'>{userInfo.firstName}</label>
      </div>
      <div className='info-detail'>
        <h4>LastName: </h4>
        <label className='label-info'>{userInfo.lastName}</label>
      </div>
      <div className='info-detail'>
        <h4>PhoneNumber: </h4>
        <label className='label-info'>{userInfo.phoneNumber}</label>
      </div>
      <div className='info-detail'>
        <h4>Address: </h4>
        <label className='label-info'>{userInfo.address}</label>
      </div>
      <button onClick={editInfo}>Edit</button>
    </div>
  );
}
