import React, { useState } from 'react';
import '../file-detail/Details.css';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ControlPanel from '../../components/ControlPanel'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Detail = () => {
	const [ numPages, setNumPages ] = useState(null);
	const [ pageNumber, setPageNumber ] = useState(1);

	const [scale, setScale] = useState(1.0);

	const [ partnerEmail, setPartnerEmail ] = useState(null);
	const [ docTitle, setDocTitle ] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div className="container-fluid">
			<div className="row bg-gray" style={{ height: '50px' }}>
				<div className="col-sm-2 border-end d-flex align-items-center">
					<a href="/storage" className="align-middle back-space">
						<i class="fas fa-arrow-left" />
						<span style={{ marginLeft: '10px' }}>Quay lại</span>
					</a>
				</div>
				<div className="col-sm-10 d-flex justify-content-between align-items-center px-5">
					<p>Hợp đồng lao động.pdf</p>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#sendRequest"
					>
						<i class="fas fa-paper-plane" /> Gởi yêu cầu ký hợp đồng
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-2 bg-gray">
					<p>Tác vụ</p>
					<div class="list-group">
						<button className="list-group-item list-group-item-action">
							<i className="fas fa-pen-fancy" style={{ marginRight: '1em' }} />
							Thêm chữ ký
						</button>
						<button className="list-group-item list-group-item-action">
							<i className="fas fa-stamp" style={{ marginRight: '1em' }} />
							Thêm dấu mộc
						</button>
					</div>
				</div>
				<div className="col-sm-8 px-3 py-3 file-content">
					<div id="fileControll">
						<ControlPanel
							scale={scale}
							setScale={setScale}
							numPages={numPages}
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							file="/assets/docs/file-sample.pdf"
						/>
					</div>
					<Document file="/example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
						<Page pageNumber={pageNumber} />
					</Document>
					<p>
						Page {pageNumber} of {numPages}
					</p>
				</div>
				<div className="col-sm-2 bg-gray">Lịch sử thay đổi</div>
			</div>
			<div
				className="modal fade"
				id="sendRequest"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">
								Gởi yêu cầu ký hợp đồng
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
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
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-primary"
								onClick={(documentTitle, email) => {
									this.setPartnerEmail(email);
									this.setDocTitle(documentTitle);
									console.log(this.docTitle + ' ' + this.partnerEmail);
								}}
							>
								Gởi yêu cầu
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Detail;
