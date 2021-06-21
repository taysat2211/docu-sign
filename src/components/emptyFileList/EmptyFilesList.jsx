import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './EmptyFileList.css';

function EmptyFileList (props) {
    const  {onClickCallback} = props;
    return (
        <>
           <Container className='empty-file-list-container'>
                <Row>
                    <Col>
                        <img src='/empty_filelist.png' alt='no-files' className='empty-file-list-image'/> 
                        <p id='img-caption' className='empty-file-list-text'>Bạn chưa nhận được yêu cầu kí hợp đồng nào</p> 
                        <p className='empty-file-list-text'>Bắt đầu trải nghiệm ký hợp đồng điện tử  bằng cách bấm vào nút dưới đây</p> 
                        <a id="upload_btn" class="btn btn-primary" role="button" onClick={event => { onClickCallback(event) }}>
						    <i class="fas fa-file-upload" style={{ marginRight: '10px' }}/> Tải lên hợp đồng
					    </a>
                    </Col>
                </Row>
           </Container>
        </>
    )
}

export default EmptyFileList;