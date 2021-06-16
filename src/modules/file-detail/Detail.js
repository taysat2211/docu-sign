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
import useDraggable from '../../components/useDraggable'
import {getContract} from '../../axios/contract';
// import PDFViewer from 'pdf-viewer-reactjs';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Detail = () => {
	const [ numPages, setNumPages ] = useState(null);
	const [ pageNumber, setPageNumber ] = useState(1);

	const [ isSignatureModalShow, setIsSignatureModalShow ] = useState(false);
	const [ isSendFileModalShow, setIsSendFileModalShow ] = useState(false);

	const [pos,setPos] = useState({x: 0, y : 0});

	const [fileInfo, setFileInfo] = useState({});

	const partnerInfo = useRef({});

	const [ user, setUser ] = useState({
		name: 'Nguyễn Ngọc Hiển',
		email: 'ngochien123@gmail.com',
		phone: 'xxxxxx123',
		avatar: '/img_avatar.png',
		sign: ''
	});

	let contractId = useParams();

	let signPad = useRef({});

	const clearSign = () => {
		signPad.current.clear();
	};

	const saveSign = () => {
		let data = signPad.current.toDataURL();
		setUser({ ...user, sign: data });
		console.log(user.sign);
	};

	const showSign = () => {
		signPad.current.fromDataURL(user.sign);
	};

	const hideModel = () => {
		setIsSendFileModalShow(false);
		setIsSignatureModalShow(false);
	};

	const showInfoModal = () => {
		setIsSignatureModalShow(true);
	};
	const onDragStart = (e) =>{
		setPos({x: e.screenX - e.currentTarget.getBoundingClientRect().left, y: e.screenY - e.currentTarget.getBoundingClientRect().top});
		
	}
	const onDrop = (e) =>{
		
	}

	const allowDrop = (e) => {
		e.preventDefault();
	}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	useEffect(async()=>{
		
		 let data = await getContract(contractId.id);

		 setFileInfo(data.data.data);
		 
	},[])

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
							onMouseDown={e=>{
								onDragStart(e);
							}}
							// onMouseMove={e=>{
							// 	onDraging(e)
							// }}
							
						>
							<i className="fas fa-pen-fancy" style={{ marginRight: '1em' }}/>
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
							file="https://cdn2.hubspot.net/hub/453343/file-2434679007-pdf/pdf/speech.pdf"
						/>
					</div>
					<Document file="data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==" onLoadSuccess={onDocumentLoadSuccess} >
						<Page pageNumber={pageNumber} />
					</Document>
					{/* <embed src="https://drive.google.com/file/d/1IhiWiJ3mGIXTnXO5iN43EgVHtz8gZ72j/preview" style={{width:"100%",height: "100vh"}}> */}
					{/* </embed> */}
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
							<SignaturePad ref={signPad} canvasProps={{ className: 'sign' }} />
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
