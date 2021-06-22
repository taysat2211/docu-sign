import React, { createRef, useState, useEffect } from 'react';
import './Home.css';
import { Document, Page } from 'react-pdf';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { uploadContract, createStore } from '../../axios/contract';
import { useContext } from 'react';
import AppContext from '../../components/appContext';
import { useHistory } from 'react-router';
import { getSingleContract, getContracts } from '../../axios/contract';
import EmptyFileList from '../../components/emptyFileList/EmptyFilesList';
import prettyBytes from 'pretty-bytes';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Home = () => {
  const history = useHistory();

  const [numPages, setNumPages] = useState(null);

  const [modalEnable, setModalEnable] = useState(false);

  const [listFile, setListFile] = useState({ contracts: [] });

  const [contract, setContract] = useState({});

  const [filter, setFilter] = useState({ type: 'receiver' });

  const [filterButtons, setFilterButtons] = useState([
    {
      id: 1,
      name: 'Tất cả',
      className: 'col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button',
    },
    {
      id: 2,
      name: 'Đang xử lý',
      className: 'col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button',
    },
    {
      id: 3,
      name: 'Hoàn tất',
      className: 'col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button',
    },
    {
      id: 4,
      name: 'Thất bại',
      className: 'col-xs-2 col-sm-2 col-md-2 col-lg-2 bg-cl cus_button',
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Đã nhận',
      icon: 'fas fa-file-alt',
      className:
        'list-group-item list-group-item-action d-flex justify-content-between d-flex justify-content-between align-items-center',
    },
    {
      id: 2,
      name: 'Đã gửi đi',
      icon: 'fas fa-folder-minus',
      className:
        'list-group-item list-group-item-action d-flex justify-content-between d-flex justify-content-between align-items-center',
    },
    {
      id: 3,
      name: 'Bản nháp',
      icon: 'fas fa-pencil-ruler',
      className:
        'list-group-item list-group-item-action d-flex justify-content-between d-flex justify-content-between align-items-center',
    },
    {
      id: 4,
      name: 'Đã xóa',
      icon: 'fas fa-trash',
      className:
        'list-group-item list-group-item-action d-flex justify-content-between d-flex justify-content-between align-items-center',
    },
  ]);

  const [activeButton, setActiveButton] = useState(1);

  const [activeCategory, setActiveCategory] = useState(1);

  const fileUpload = createRef();

  const formData = new FormData();
  formData.append('contract', null);

  const { previewLink, setLink, fileId, setFileId } = useContext(AppContext);

  function showModal() {
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
      localStorage.setItem('fileId', uploadedContract.id);
      // setFileId(response.data.data.id);
      // setLink('gg link updated');
      // console.log(fileId);
      // console.log(previewLink);
      const contractId = localStorage.getItem('fileId');
      const res = await getSingleContract(contractId);
      //console.log(res);
      const getContractPublicLink = localStorage.setItem(
        'contractPublicLink',
        res.data.data.publicLink
      );
      history.push('/file/detail/' + uploadedContract.id);
    }
    //console.log(response);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    fileUpload.current.click();
  };

  const onFilterButtonClickHandler = (id) => {
    setActiveButton(id);
    switch (id) {
      case 1:
        const cloneFilter = filter;
        if (cloneFilter.status) delete cloneFilter.status;
        setFilter(cloneFilter);
        break;
      case 2:
        break;
      case 3:
        setFilter({ ...filter, status: 'unsigned' });
        break;
      case 3:
        break;
      default:
        break;
    }
    console.log(filter);
  };

  const onCategoryClickHandler = async (id) => {
    setActiveCategory(id);
    setActiveButton(1);
    let cloneFilter;
    switch (id) {
      case 1:
        cloneFilter = { ...filter, type: 'receiver' };
        break;
      case 2:
        cloneFilter = { ...filter, type: 'sender' };
        break;
      case 3:
        cloneFilter = null;
        break;
      default:
        break;
    }
    setFilter(cloneFilter);

    // const contracts = await getContracts(filter);
    // console.log(contracts);
    // if (contracts.data.data !== null) setListFile(contracts.data.data);
  };

  useEffect(async () => {
    const data = await getContracts(filter);
    console.log(data.data.data);
    if (data.data.data !== null) setListFile(data.data.data);
    // console.log(listFile);
  }, []);

  useEffect(async () => {
    const contracts = await getContracts(filter);
    console.log(contracts);
    if (contracts.data.data !== null) setListFile(contracts.data.data);
    // console.log(filter);
  }, [filter]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div
          className='col-sm-2 bg-cl dash_height'
          style={{ paddingTop: '20px' }}
        >
          <p id='bestsign_01'>BestSign</p>

          <a
            id='upload_01'
            class='btn btn-primary'
            role='button'
            onClick={onClickHandler}
          >
            <i class='fas fa-file-upload' style={{ marginRight: '10px' }} /> Tải
            lên hợp đồng
          </a>
          <input
            id='inputFile'
            ref={fileUpload}
            onChange={onChangeHandler}
            type='file'
            style={{ display: 'none' }}
            // multiple={false}
          />
          <i id='listcontractcustom' class='fas fa-h3'>
            Danh mục hợp đồng
          </i>

          <div
            class='list-group bg-cl fluit'
            style={{ marginTop: '10px', marginBottom: '20px' }}
          >
            {categories.map((category) => {
              return (
                <a
                  key={category.id}
                  className={
                    category.className +
                    (activeCategory === category.id ? ' active' : '')
                  }
                  onClick={() => onCategoryClickHandler(category.id)}
                >
                  <div className='flex-grow-1 bd-highlight'>
                    <i
                      className={category.icon}
                      style={{ marginRight: '1em' }}
                    />
                    {category.name}
                  </div>
                  <span class='badge bg-primary rounded-pill'>14</span>
                </a>
              );
            })}
          </div>

          <i id='account_custom' class='fas fa-h3'>
            Tài khoản
          </i>

          <div class='list-group'>
            <a
              href='/user'
              className='list-group-item list-group-item-action'
              aria-current='true'
            >
              <i className='fas fa-user' style={{ marginRight: '1em' }} />
              Thông tin
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
              <i
                className='fas fa-sign-out-alt'
                style={{ marginRight: '1em' }}
              />
              Đăng xuất
            </a>
          </div>
        </div>

        <div className='col-sm-10 bg-cl' style={{ paddingTop: '20px' }}>
          <div style={{ paddingBottom: '20px' }}>
            <div className='input-group'>
              <button
                id='bt_01'
                type='button'
                className='btn btn-primary'
                style={{ backgroundColor: '#3626EB' }}
              >
                <i className='fas fa-search' />
              </button>
              <div id='formcustom' className='form-outline'>
                <input
                  id='search-focus'
                  type='search'
                  id='form1'
                  className='form-control'
                />
                <label className='form-label' for='form1' />
              </div>

              <div className='HelloText'>
                Xin chào!
                <br />
                Cao Phương Đức
              </div>
              <img src='img_avatar.png' alt='Avatar' className='avatar' />
            </div>
          </div>

          <div className='contract-list'>
            <div>
              <p id='ctr_1' className='fas fa-h1'>
                Hợp đồng
              </p>
            </div>
            {listFile.contracts.length === 0 ? (
              <EmptyFileList onClickCallback={onClickHandler} />
            ) : (
              <>
                <div className='row' style={{ marginBottom: '30px' }}>
                  {filterButtons.map((filterButton) => {
                    return (
                      <div
                        key={filterButton.id}
                        className={
                          filterButton.className +
                          (filterButton.id === activeButton ? ' active' : '')
                        }
                      >
                        <a
                          className='btn bg-cl'
                          role='button'
                          onClick={() =>
                            onFilterButtonClickHandler(filterButton.id)
                          }
                        >
                          {filterButton.name}
                        </a>
                      </div>
                    );
                  })}
                </div>
                <table class='table table-hover'>
                  <thead>
                    <tr>
                      <th>
                        <div class='row'>
                          <div className='col-sm-1'>
                            <input
                              type='checkbox'
                              id='vehicle1'
                              name='vehicle1'
                              value='Bike'
                            />
                          </div>
                          <div className='col-sm-2'>Tất cả</div>
                        </div>
                      </th>
                      <th>Trạng thái</th>
                      <th>Tổng số 10 hợp đồng</th>
                    </tr>
                  </thead>
                  <tbody bg-cl>
                    {listFile.contracts.map((item) => {
                      return (
                        <tr key={item.contractId}>
                          <td>
                            <div className='row'>
                              <div className='col-sm-1'>
                                <input
                                  type='checkbox'
                                  id='vehicle1'
                                  name='vehicle1'
                                  value='Bike'
                                />
                              </div>
                              <div className='col-sm-3'>
                                <div>
                                  <Document file='/sample.pdf'>
                                    <Page pageNumber={1} />
                                  </Document>
                                </div>
                              </div>
                              <div
                                className='col-sm-7'
                                style={{ marginLeft: '10px' }}
                              >
                                <h6 className='contract-name'>
                                  {item.contractName}
                                </h6>
                                <h6 className='contract-desc'>
                                  Kích cỡ: {prettyBytes(+item.size)}{' '}
                                </h6>
                                {activeCategory === 1 ? (
                                  <h6 className='contract-desc'>
                                    {' '}
                                    Từ: {item.fromUser}{' '}
                                  </h6>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-sm'>
                                {item.status === 'signed' ? (
                                  <h6 className='contract-status-success'>
                                    Đã ký hoàn tất
                                  </h6>
                                ) : item.status === 'unsigned' ? (
                                  <h6 className='contract-status-pending'>
                                    Chờ ký hợp đồng
                                  </h6>
                                ) : (
                                  <h6 className='contract-status-fail'>
                                    Hủy hợp đồng
                                  </h6>
                                )}
                                <h6 className='contract-desc'>
                                  {item.updatedAt}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='row justify-content-end'>
                              <div
                                className='col-sm-3 but_td'
                                style={{ marginRight: '50px' }}
                              >
                                <Button
                                  class='btn btn-primary contract-action-button'
                                  href={`/file/detail/${item.contractId}`}
                                >
                                  <i class='fas fa-edit marg' />
                                  Xem HĐ
                                </Button>
                              </div>
                              <div className='col-sm-3 but_td'>
                                <Button class='btn btn-primary contract-action-button'>
                                  <i class='fas fa-ellipsis-h marg' />
                                  Khác
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
