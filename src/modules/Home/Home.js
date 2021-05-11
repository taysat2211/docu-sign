import React, { useState } from 'react';
import '../Home/Home.css';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Home = () => {
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
		  <div className="row">
			<div className="col-sm-2 bg-cl dash_height">
				<p id="bestsign_01">BestSign</p>
				<a name="" id="upload_01" class="btn btn-primary" href="#" role="button">Tải lên hợp đồng</a>
				<i id="listcontractcustom"class="fas fa-h3"> Danh mục hợp đồng</i>
				
				<div class="list-group bg-cl fluit" >
					<a href="#" className="list-group-item list-group-item-action " aria-current="false">
						<i className="fas fa-folder-minus" style={{ marginRight: '1em' }} />
							Đã nhận
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
				<i id="account_custom" class="fas fa-h3"> Tài khoản</i>
				
				<div class="list-group" >
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
			<div id="Head"  className="col-sm-10 bg-cl">
			
			<div   className="row">
			    <div className="input-group">
						<div id="formcustom" className="form-outline">
							<input id="search-focus" type="search" id="form1" className="form-control" />
							<label className="form-label" for="form1"></label>
						</div>
						<button id="bt_01" type="button" className="btn btn-primary">
							<i className="fas fa-search"></i>
						</button>
						<div className="HelloText">
							Xin chào!
							<br/>
          					Cao Phương Đức
						</div>
						<img src="img_avatar.png" alt="Avatar" className="avatar"></img>
				</div>					
			</div>			
			<div class="row">
				<i id="ctr_1"class="fas fa-h1">Hợp đồng đã nhận</i>
			</div>
            <div class="row mg">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
				<a name="" id="" class="btn bg-cl" href="#" role="button">Tất cả(20)</a>
				</div>
				

				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
				<a name="" id="" class="btn bg-cl" href="#" role="button">Đang xử lý(10)</a>
				</div>

				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
				<a name="" id="" class="btn" href="#" role="button">Hoàn tất(10)</a>
				</div>


				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button">
				<a name="" id="" class="btn" href="#" role="button">Thất bại(2)</a>
				</div>
			</div>		

	<table class="table table-striped">
    <thead>
      <tr>
        <th>		
			<div class="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
				</div>
					<div className="col-sm-2">
						Tất cả
					</div>
				</div>
		</th>
        <th>Trạng thái</th>
        <th>Tổng số 10 hợp đồng</th>
		
      </tr>
    </thead>
    <tbody bg-cl>
      <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>			
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="signed">Đã ký 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>		
		</td>	
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>		
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="waiting">Chờ ký 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>				
		</td>		
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>			
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="fail">Đã hủy 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>		
		</td>	
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>	
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="signed">Đã ký 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>		
		</td>		
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>	
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
        <td className="signed">Đã ký 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>		
		</td>
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>	
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="signed">Đã ký 2/5/2021</td>
        <td>		
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>		
		</td>	
      </tr>
	  <tr>
        <td>
			<div className="row">
			<div className="col-sm-1">
				<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
			</div>
			<div className="col-sm-3">
				<div>
				<Document file="/sample.pdf" >
					<Page pageNumber={1}/>
				</Document>
				</div>
			</div>	
				<div className="col-sm-3">
					<h6> Hợp đồng mua bán </h6>
					<h6> Muaban.pdf-100kb </h6>
					<h6> From:nva@gmail.com </h6>
				</div>
			</div>
		</td>
		<td className="signed">Đã ký 2/5/2021</td>
        <td>			
		<div class="row">
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-edit marg"></i>
						Xem
					</a>
				</div>
				<div className="col-sm-1 but_td">
					<a name="" id="" class="btn btn-primary" href="#" role="button">
						<i class="fas fa-ellipsis-h marg"></i>
						Khác
					</a>
				</div>			
			</div>	
		</td>
      </tr>
    </tbody>
  </table>	
		</div>

     </div>
</div>
	);
};
export default Home;
