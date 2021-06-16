import React, { createRef, useState, useEffect } from 'react';
import './Home.css';
import { Document, Page } from 'react-pdf';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import {uploadContract, createStore, } from '../../axios/contract';
import { useContext } from 'react';
import AppContext from '../../components/appContext';
import { useHistory } from 'react-router';
import {getSingleContract,getAllContracts} from '../../axios/contract';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Home = () => {
	const history = useHistory();

	const [ numPages, setNumPages ] = useState(null);

	const [ modalEnable, setModalEnable ] = useState(false);

	const [ listFile, setListFile ] = useState([]);

	const [ contract, setContract ] = useState({});

	const fileUpload = createRef();

	const formData = new FormData();
	formData.append('contract', null);

	const { previewLink, setLink, fileId, setFileId } = useContext(AppContext);

	function showModal(){
		setModalEnable(!modalEnable);
	}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const onChangeHandler = async (event) => {
		//console.log(event.target.files[0]);
		formData.set('contract', event.target.files[0]);
		const response = await uploadContract(formData);
		//console.log(response.data.data);
		
		if (response.data.data) {
			const uploadedContract = response.data.data;
			localStorage.setItem('fileId', uploadedContract.id)
			// setFileId(response.data.data.id);
			// setLink('gg link updated');
			// console.log(fileId);
			// console.log(previewLink);
			const contractId = localStorage.getItem('fileId');
			const res = await getSingleContract(contractId);
			//console.log(res);
			const getContractPublicLink = localStorage.setItem('contractPublicLink', res.data.data.publicLink)
			history.push('/file/detail/' + uploadedContract.id);
		}
		//console.log(response);
	};

	const onClickHandler = (event) => {
		event.preventDefault();
		fileUpload.current.click();
	};

	useEffect(async () => {
		let data = await getAllContracts();
		setListFile(data.data.data);
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-2 bg-cl dash_height" style={{ paddingTop: '20px' }}>
					<p id="bestsign_01">BestSign</p>

					<a id="upload_01" class="btn btn-primary" role="button" onClick={onClickHandler}>
						<i class="fas fa-file-upload" style={{ marginRight: '10px' }} /> Tải lên hợp đồng
					</a>
					<input
						id="inputFile"
						ref={fileUpload}
						onChange={onChangeHandler}
						type="file"
						style={{ display: 'none' }}
						// multiple={false}
					/>
					<i id="listcontractcustom" class="fas fa-h3">
						{' '}
						Danh mục hợp đồng
					</i>

					<div class="list-group bg-cl fluit" style={{ marginBottom: '20px' }}>
						<a
							href="#"
							className="list-group-item list-group-item-action d-flex justify-content-between d-flex justify-content-between align-items-center"
							aria-current="false"
						>
							<div class="flex-grow-1 bd-highlight">
								<i class="fas fa-file-alt" style={{ marginRight: '1em' }} />
								Đã nhận
							</div>
							<span class="badge bg-primary rounded-pill">14</span>
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							<i className="fas fa-folder-minus" style={{ marginRight: '1em' }} />
							Đã gửi đi
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							<i className="fas fa-pencil-ruler" style={{ marginRight: '1em' }} />
							Bản nháp
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							<i className="fas fa-trash" style={{ marginRight: '1em' }} />
							Đã xóa
						</a>
					</div>
					<i id="account_custom" class="fas fa-h3">
						{' '}
						Tài khoản
					</i>

					<div class="list-group">
						<a href="#" className="list-group-item list-group-item-action" aria-current="true">
							<i className="fas fa-user" style={{ marginRight: '1em' }} />
							Thông tin
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							<i className="fas fa-sign-out-alt" style={{ marginRight: '1em' }} />
							Đăng xuất
						</a>
					</div>
				</div>

				<div className="col-sm-10 bg-cl" style={{ paddingTop: '20px' }}>
					<div style={{ paddingBottom: '20px' }}>
						<div className="input-group">
							<button
								id="bt_01"
								type="button"
								className="btn btn-primary"
								style={{ backgroundColor: '#3626EB' }}
							>
								<i className="fas fa-search" />
							</button>
							<div id="formcustom" className="form-outline">
								<input id="search-focus" type="search" id="form1" className="form-control" />
								<label className="form-label" for="form1" />
							</div>

							<div className="HelloText">
								Xin chào!
								<br />
								Cao Phương Đức
							</div>
							<img src="img_avatar.png" alt="Avatar" className="avatar" />
						</div>
					</div>

					<div className="contract-list">
						<div>
							<i id="ctr_1" className="fas fa-h1">
								Hợp đồng đã nhận
							</i>
						</div>
						<div className="row" style={{ marginBottom: '30px' }}>
							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
								<a name="" id="" className="btn bg-cl" href="#" role="button">
									Tất cả (20)
								</a>
							</div>

							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
								<a name="" id="" class="btn bg-cl" href="#" role="button">
									Đang xử lý (10)
								</a>
							</div>

							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
								<a name="" id="" class="btn" href="#" role="button">
									Hoàn tất (10)
								</a>
							</div>

							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
								<a name="" id="" class="btn" href="#" role="button">
									Thất bại (2)
								</a>
							</div>
						</div>
						<table class="table table-hover">
							<thead>
								<tr>
									<th>
										<div class="row">
											<div className="col-sm-1">
												<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
											</div>
											<div className="col-sm-2">Tất cả</div>
										</div>
									</th>
									<th>Trạng thái</th>
									<th>Tổng số 10 hợp đồng</th>
								</tr>
							</thead>
							<tbody bg-cl>
								{listFile.length <= 0 ? (
									<p>Chưa có file hiển thị</p>
								) : (
									listFile.map((item) => {
										return(
											<tr>
											<td>
												<div className="row">
													<div className="col-sm-1">
														<input
															type="checkbox"
															id="vehicle1"
															name="vehicle1"
															value="Bike"
														/>
													</div>
													<div className="col-sm-3">
														<div>
															<Document file="/sample.pdf">
																<Page pageNumber={1} />
															</Document>
														</div>
													</div>
													<div className="col-sm-3" style={{marginLeft: "10px"}}>
														<h6><strong>{item.contractName}</strong></h6>
														<h6> {item.description} </h6>
														<h6> From: {item.fromUser} </h6>
													</div>
												</div>
											</td>
											<td className="signed">{item.status} {item.updatedAt}</td>
											<td>
												<div class="row">
													<div className="col-sm-1 but_td" style={{ marginRight: '60px' }}>
														<Button
															class="btn btn-primary"
															href={`/file/detail/${item.contractId}`}
														>
															<i class="fas fa-edit marg" />
															Xem
														</Button>
													</div>
													<div className="col-sm-1 but_td">
														<a name="" id="" class="btn btn-primary" href="#" role="button">
															<i class="fas fa-ellipsis-h marg" />
															Khác
														</a>
													</div>
												</div>
											</td>
										</tr>
										)	
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
