import React, { useState, useRef, useEffect, createRef } from 'react';
import '../file-detail/Details.css';
import { Button, Modal, Image, Form } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import Signature from '../../components/Signature';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ControlPanel from '../../components/ControlPanel';
import './Details.css';
import Draggable from 'react-draggable';
import { getContract, signContract, sendContract, verifyContract, destroyContract} from '../../axios/contract';
import { getUserInfo, } from '../../axios/user';
import Swal from 'sweetalert2';
import Divider from '@material-ui/core/Divider';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Detail = () => {
	const [ numPages, setNumPages ] = useState(null);
	const [ pageNumber, setPageNumber ] = useState(1);

	const [ isSignatureModalShow, setIsSignatureModalShow ] = useState(false);
	const [ isSendFileModalShow, setIsSendFileModalShow ] = useState(false);

	const [ pos, setPos ] = useState({ x: 0, y: 0 });

	const [ fileInfo, setFileInfo ] = useState({});

	const partnerInfo = useRef({});

	const [ user, setUser ] = useState({
		name: 'Nguyễn Ngọc Hiển',
		email: 'ngochien123@gmail.com',
		phone: 'xxxxxx123',
		avatar: '/img_avatar.png',
		sign: ''
	});

	const [ showSignature, setShow ] = useState(false);

	const signPad = useRef({});
	const { contractId } = useParams();

	const [isContractSigned, setIsContractSigned] = useState(false);

	const [mailObject, setMailObject] = useState(
		{
			mail: '',
			subject: ''
		}
	);

	const [isReceivedContractModalShown, setIsReceivedContractModalShown] = useState(false);

	const contractData = new FormData();
	contractData.append('contract', null);

	const [eSignature, setESignature] = useState('');

	const clearSign = () => {
		signPad.current.clear();
	};

	const saveSign = () => {
		const data = signPad.current.toDataURL();
		//console.log(data);
		setUser({ ...user, sign: data });
		//saveSign();
		//console.log(user);
		//console.log(user);
	};

	const showSign = () => {
		//signPad.current.fromDataURL(user.sign);
		//console.log(user.sign)
		setShow(true);
		hideModel();
	};

	const hideModel = () => {
		setIsSendFileModalShow(false);
		setIsSignatureModalShow(false);
		setIsReceivedContractModalShown(false);
	};

	const showInfoModal = () => {
		setIsSignatureModalShow(true);
	};
	const onDragStart = (e) => {
		setPos({
			x: e.screenX - e.currentTarget.getBoundingClientRect().left,
			y: e.screenY - e.currentTarget.getBoundingClientRect().top
		});
	};

	const onDrop = (e) => {};

	const allowDrop = (e) => {
		e.preventDefault();
	};

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const updateContract = async (event) => {
		event.preventDefault();
		// console.log(showSignature);

		if (showSignature) {
			const updatedContract = await signContract(contractId);
			console.log(updatedContract);
			if (!updatedContract.data.data.status) {
				return Swal.fire(
					{
						title: 'Cảnh báo',
						text: 'Đã ký hợp đồng này! Để thêm chữ ký mới, vui lòng hủy hợp đồng và tải lên hợp đồng khác',
						icon: 'warning',
						confirmButtonText: 'Understood'
					}
				)
			}
			setIsContractSigned(true);
			return Swal.fire(
				{
					title: 'Thành công',
					text: 'Ký hợp đồng thành công',
					icon: 'success',
					confirmButtonText: 'Cool'
            	}
			)
		}
		Swal.fire(
			{
				title: 'Thất bại',
				text: 'Chưa thêm chữ ký cho hợp đồng này',
				icon: 'error',
				confirmButtonText: 'OK'
			}
		)
	}

	const onOpenSendContractModalClick = (event) => {
		event.preventDefault();
		if (isContractSigned === false) {
			return Swal.fire(
				{
					title: 'Thất bại',
					text: 'Bạn phải ký hợp đồng trước khi gửi cho đối tác',
					icon: 'error',
					confirmButtonText: 'OK'
				}
			)
		} 
		setIsSendFileModalShow(true);
		
	}

	const onSendContractClick = async (event) => {
		event.preventDefault();
		hideModel();
		const sendingStatus = await sendContract(contractId, mailObject.mail, mailObject.subject);
		console.log(sendingStatus);
		if (!sendingStatus.data.data) {
			return Swal.fire(
				{
					title: 'Cảnh báo',
					text: 'Đang chờ đối tác này ký một hợp đồng khác',
					icon: 'warning',
					confirmButtonText: 'Understood'
				}
			)	
		}
		if (!sendingStatus.data.data.status) {
			return Swal.fire(
				{
					title: 'Thất bại',
					text: 'Email không tồn tại',
					icon: 'error',
					confirmButtonText: 'OK'
				}
			)
		}
		Swal.fire(
			{
				title: 'Thành công',
				text: 'Hợp đồng đã được gửi đi cho đối tác',
				icon: 'success',
				confirmButtonText: 'Cool'
			}
		)
	}

	const verifyContractClick = (event) => {
		event.preventDefault();
		setIsReceivedContractModalShown(true);
	}

	const onUploadedContractChange = (event) => {
		event.preventDefault();
		contractData.set('contract', event.target.files[0]);
	}

	const onFormsubmit = async (event) => {
		event.preventDefault();
		hideModel();
		console.log(eSignature);
		contractData.append('signature', eSignature);
		contractData.append('email', fileInfo.recived.emailSender);
		console.log(contractData);
		const verification = await verifyContract(contractData);
		console.log(verification);
	}

	const onDestroyContractClick = (event) => {
		event.preventDefault();
		console.log(fileInfo.status);
		// const destruction = await destroyContract(contractId);
	}

	useEffect(async () => {
		const user = await getUserInfo();
		const userInfo = user.data;
		setUser({name: userInfo.lastname + ' ' + userInfo.firstname, email: userInfo.email, phone: userInfo.phoneNumber, avatar: '/img_avatar.png', sign: ''});
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await getContract(contractId);
			console.log(data);
			setFileInfo(data.data.data);
			// console.log(data.data.data.download);
			// downloadFile(data.data.data.download);
		}
		fetchData();
	}, [contractId, isContractSigned]);

	useEffect(async () => {
		console.log(fileInfo);
		// if (fileInfo.type === 'receiver') {
		// 	const verification = await verifyContract(fileInfo.contractId, signature, email);
		// 	console.log(verification);
		// }
		if (fileInfo.status === 'signed') {
			return setIsContractSigned(true);
		}
		setIsContractSigned(false);
	}, [fileInfo]);

	const cors = 'https://cors-anywhere.herokuapp.com/';

	return (
		<div className="container-fluid bg-color">
			<div className="row" style={{ height: 'max-content' }}>
				<div className="col-sm-2 border-bottom d-flex align-items-center p-3">
					<a href="/home" className="align-middle back-ref">
						<i class="fas fa-arrow-left" />
						<span style={{ marginLeft: '10px' }}>Quay lại</span>
					</a>
					
				</div>
				<div className="col-sm-10 d-flex justify-content-between align-items-center border-start border-bottom">
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-sm-8'>
								<h1 id='contract-name'>Hợp đồng lao động.pdf</h1>
								{fileInfo.type !== 'receiver' ? null : 
									<>
										<h6>Từ: </h6>
										<h6>Người ký: </h6>
									</>
								}
							</div>
							<div className='col-sm-4 d-flex justify-content-around align-items-center'>
								<select class="form-select mr-3" aria-label="Default select example">
									<option value="1" selected disabled>Chờ ký hợp đồng</option>
									<option value="2" disabled>Đã ký hoàn tất</option>
									<option value="3">Hủy hợp đồng</option>
								</select>
								<Button
									type="button"
									className="btn btn-primary"
									onClick={updateContract}>
									<i class="fas fa-check-square" style={{marginRight: '10px'}}/> 
									Lưu và cập nhật
								</Button>
								
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-2 pt-3">
					<p>Tác vụ</p>
					<div class="list-group">
						<Button
							className="list-group-item list-group-item-action"
							onClick={showInfoModal}
							draggable="true"
							onMouseDown={(e) => {onDragStart(e);}}>
							<i className="fas fa-pen-fancy" style={{ marginRight: '1em' }} />
							Thêm chữ ký
						</Button>
						<Button className="list-group-item list-group-item-action mb-4">
							<i className="fas fa-stamp" style={{ marginRight: '1em' }} />
							Thêm dấu mộc
						</Button>
						<Button className="list-group-item list-group-item-action border-top">
							<i class="fas fa-history" style={{ marginRight: '1em' }}/>
							Hoàn tác
						</Button>
						{fileInfo.type === 'sender' ? 
							<Button
								className="list-group-item list-group-item-action"
								onClick={onDestroyContractClick}>
								<i class="fas fa-window-close" style={{marginRight: '1em'}}></i>
								Hủy hợp đồng
							</Button>
							:
							(
								fileInfo.type === 'receiver' ? 
								<Button
									className="list-group-item list-group-item-action"
									onClick={verifyContractClick}>
									<i class="fas fa-clipboard-check" style={{marginRight: '1em'}}></i>
									Xác minh hợp đồng
								</Button>
								:
								<div>
									<Button
										className="list-group-item list-group-item-action"
										onClick={onOpenSendContractModalClick}>
										<i class="fas fa-paper-plane" style={{marginRight: '1em'}}/> 
										Gửi hợp đồng
									</Button>
								</div>
							)
						}
					</div>
				</div>
				<div className="col-sm-8 px-3 py-3 file-content">
					<div id="fileControl">
						<ControlPanel
							numPages={numPages}
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							// file={fileInfo.publicLink}
						/>
					</div>

					<Document file={cors + fileInfo.download} onLoadSuccess={onDocumentLoadSuccess}>
						<Page pageNumber={pageNumber} style={{border: ''}}/>
							{showSignature === true ? (
								<Draggable>
									<img src={user.sign} alt="Signature" />
								</Draggable>
							) : null}
					</Document>
					<p>
						Page {pageNumber} of {numPages}
					</p>
				</div>
				<div className="col-sm-2 px-3 py-3">
					<p>Lịch sử thay đổi</p>
				</div>
			</div>

			<Modal show={isReceivedContractModalShown}
				onHide={hideModel}
				animation={false}
				centered>
					<Modal.Header closeButton>
						<Modal.Title style={{ margin: 'auto' }} onChange={(e) => {onUploadedContractChange(e)}}>Thông tin hợp đồng nhận qua email</Modal.Title>
					</Modal.Header>
					<Form onSubmit={onFormsubmit}>
						<Modal.Body>
							
							<Form.Group>
								<Form.File id="" label="Tải lên hợp đồng" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Chữ ký điện tử</Form.Label>
								<Form.Control type='input' onChange={(e) => {setESignature(e.target.value)}}/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="primary"
								type='submit'>
								Xác minh
							</Button>
						</Modal.Footer>
					</Form>
			</Modal>

			<Modal
				show={isSignatureModalShow}
				onHide={() => {
					hideModel();
				}}
				animation={false}
				centered>
				<Modal.Header closeButton>
					<Modal.Title style={{ margin: 'auto' }}>Thông tin người ký</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-row">
						<Image src={user.avatar} roundedCircle style={{ width: '15vh', height: '15vh' }} />
						<div className="info">
							<h3>{user.lasttname + ' ' + user.firstname}</h3>
							<div>
								<i className="fas fa-envelope" /> {user.email}
							</div>
							<div>
								<i className="fas fa-phone-volume" /> {user.phoneNumber}
							</div>
						</div>
					</div>
					<div className="signature">
						<p>Chữ ký: </p>
						<div className="signatureArea">
							<SignaturePad ref={signPad} />
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							clearSign();
						}}
					>
						Xóa chữ ký
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							saveSign();
						}}
					>
						Lưu chữ ký
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							showSign();
						}}
					>
						Hiển thị chữ ký
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={isSendFileModalShow} onHide={() => hideModel()} animation={false} centered>
				<Modal.Header closeButton>
					<Modal.Title>Gửi yêu cầu ký hợp đồng</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">
								Tiêu đề văn bản
							</label>
							<input
								type="text"
								className="form-control"
								id="documentTitle"
								required={true}
								placeholder="Nhập tiêu đề email"
								onChange={(event) => {setMailObject({ ...mailObject, subject: event.target.value})}}
							/>
						</div>
						<div className="mb-3">
							<label for="email" className="form-label">
								Email 
							</label>
							<input
								type="email"
								class="form-control"
								id="email"
								required={true}
								placeholder="Nhập email đối tác ký hợp đồng"
								onChange={(event) => {setMailObject({ ...mailObject, mail: event.target.value})}}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => hideModel()}>
						Close
					</Button>
					<Button variant="primary" onClick={(event) => {onSendContractClick(event)}}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
};
export default Detail;
