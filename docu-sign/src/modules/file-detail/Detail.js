import React, { useState } from 'react';
import '../file-detail/Details.css';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Detail = () => {
	const [ numPages, setNumPages ] = useState(null);
	const [ pageNumber, setPageNumber ] = useState(1);

	const [modalEnable, setModalEnable] = useState(false);

	function showModal(){
		setModalEnable(!modalEnable);
	}

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
					<button className="primary-button">
						<i class="fas fa-paper-plane" /> Gởi yêu cầu ký hợp đồng
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-2 bg-gray">
					<p>Tác vụ</p>
					<div class="list-group">
						<a href="#" className="list-group-item list-group-item-action active" aria-current="true">
							<i className="fas fa-pen-fancy" style={{ marginRight: '1em' }} />
							Thêm chữ ký
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							<i className="fas fa-stamp" style={{ marginRight: '1em' }} />
							Thêm dấu mộc
						</a>
					</div>
				</div>
				<div className="col-sm-8 px-3 py-3">
					<Document
					file="/example.pdf" onLoadSuccess={onDocumentLoadSuccess} >
						<Page pageNumber={pageNumber}/>
					</Document>
					<p>
						Page {pageNumber} of {numPages}
					</p>
				</div>
				<div className="col-sm-2 bg-gray">
					Lịch sử thay đổi
				</div>
			</div>
		</div>
	);
};
export default Detail;
