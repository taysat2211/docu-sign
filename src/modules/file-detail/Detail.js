import React, { useState, useRef, useEffect } from 'react';
import '../file-detail/Details.css';
import { Button, Modal, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import Signature from '../../components/Signature';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ControlPanel from '../../components/ControlPanel';
import './Details.css';
import Draggable from 'react-draggable';
import { getContract} from '../../axios/contract';

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

	useEffect(() => {
		async function fetchData() {
			var data = await getContract(contractId);
			setFileInfo(data.data.data);
			// console.log(data.data.data.download);
			// downloadFile(data.data.data.download);
		}
		fetchData();
	}, [contractId]);

	return (
		<div className="container-fluid">
			<div className="row bg-gray" style={{ height: '50px' }}>
				<div className="col-sm-2 border-end d-flex align-items-center">
					<a href="/home" className="align-middle back-space">
						<i class="fas fa-arrow-left" />
						<span style={{ marginLeft: '10px' }}>Quay lại</span>
					</a>
				</div>
				<div className="col-sm-10 d-flex justify-content-between align-items-center px-5">
					<p>Hợp đồng lao động.pdf</p>
					<Button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							setIsSendFileModalShow(true);
						}}
					>
						<i class="fas fa-paper-plane" /> Gởi yêu cầu ký hợp đồng
					</Button>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-2 bg-gray">
					<p>Tác vụ</p>
					<div class="list-group">
						<Button
							className="list-group-item list-group-item-action"
							onClick={() => {
								showInfoModal();
							}}
							draggable="true"
							onMouseDown={(e) => {
								onDragStart(e);
							}}
							// onMouseMove={e=>{
							// 	onDraging(e)
							// }}
						>
							<i className="fas fa-pen-fancy" style={{ marginRight: '1em' }} />
							Thêm chữ ký
						</Button>
						<div className="list-group-item list-group-item-action">
							<i className="fas fa-stamp" style={{ marginRight: '1em' }} />
							Thêm dấu mộc
						</div>
					</div>
				</div>
				<div className="col-sm-8 px-3 py-3 file-content">
					<div id="fileControll">
						<ControlPanel
							numPages={numPages}
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							// file={fileInfo.publicLink}
						/>
					</div>

					{/* <embed src="https://drive.google.com/file/d/1XXOovw8h96zCIpZrkV3-9eGLwK6uzUWo/preview" width="800" height="500"/> */}
					<Document file={`https://cors-anywhere.herokuapp.com/${fileInfo.download}`} onLoadSuccess={onDocumentLoadSuccess}>
						<Page pageNumber={pageNumber} />
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
				<div className="col-sm-2 bg-gray">Lịch sử thay đổi</div>
			</div>

			<Modal
				show={isSignatureModalShow}
				onHide={() => {
					hideModel();
				}}
				animation={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title style={{ margin: 'auto' }}>Thông tin người ký</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-row">
						<Image src={user.avatar} roundedCircle style={{ width: '15vh', height: '15vh' }} />
						<div className="info">
							<h3>{user.name}</h3>
							<p>
								<i className="fas fa-envelope" /> {user.email}
							</p>
							<p>
								<i className="fas fa-phone-volume" /> {user.phone}
							</p>
						</div>
					</div>
					<div className="signature">
						<p>Chữ ký</p>
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
						Clear Signature
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							saveSign();
						}}
					>
						Save Changes
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							showSign();
						}}
					>
						Show Signature
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={isSendFileModalShow} onHide={() => hideModel()} animation={false} centered>
				<Modal.Header closeButton>
					<Modal.Title>Gởi yêu cầu ký hợp đồng</Modal.Title>
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
								placeholder="Nhập tiêu đề"
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
								placeholder="Nhập email người ký"
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => hideModel()}>
						Close
					</Button>
					<Button variant="primary" onClick={() => hideModel()}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default Detail;
