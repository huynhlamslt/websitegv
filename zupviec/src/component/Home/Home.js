import React, { Component } from 'react';

import {
 BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="container">
              <h1 className="my-4">
                <span style={{color: '#858484'}} className="mr-2">
                  Hãy để 
                </span>
                <span style={{color: '#fc9e26'}} className="mr-2">
                  cuộc sống của bạn
                </span>
                <span style={{color: '#fb8533'}}>
                  thảnh thơi hơn!
                </span>
              </h1>
              {/* Marketing Icons Section */}
              <div className="row mb-3"> 
                <div className="col-sm-4 pricing">
                  <div className="card mb-5 mb-lg-0">
                    <div className="card-body">
                      <h1 className="card-title text-center namepk1">Chuyên nghiệp <br /> Tận tâm</h1>
                      <img src="image/info1.png" className="rounded mx-auto d-block" alt="Chuyên nghiệp - Tận tâm" />
                      <hr />
                      <ul className="fa-ul">
                        <li>
                          Với đội ngũ chăm sóc khách hàng tận tình chu đáo 24/7
                        </li>              
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 pricing">
                  <div className="card mb-5 mb-lg-0">
                    <div className="card-body">
                      <h5 className="card-title text-center namepk2">Giá cả rõ ràng minh bạch</h5>
                      <img src="image/info2.jpg" className="rounded mx-auto d-block" alt="Chuyên nghiệp - Tận tâm" style={{width: '77px', height: '80px'}} />
                      <hr />
                      <ul className="fa-ul">
                        <li>
                          <span className="fa-li"><i className="fas fa-check" />
                            Chi phí rõ ràng, hiển thị đầy đủ các khoản tiền ngay trên website
                          </span>                  
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 pricing">
                  <div className="card mb-5 mb-lg-0">
                    <div className="card-body">
                      <h5 className="card-title text-center namepk3">Đa dạng các <br /> dịch vụ</h5>
                      <img src="image/info3.jpg" className="rounded mx-auto d-block" alt="Chuyên nghiệp - Tận tâm" style={{width: '77px', height: '80px'}} />
                      <hr />
                      <ul className="fa-ul">
                        <li>
                          <span className="fa-li"><i className="fas fa-check" />
                            Các dịch vụ vệ sinh nhà cửa cho đến chăm sóc người bệnh ...
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.row */}
              {/* Portfolio Section */}
              <h2 className="my-4">
                <span style={{color: '#fc9e26'}}>
                  Các loại
                </span>
                <span style={{color: '#fb8533'}}>
                  dịch vụ
                </span>
              </h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid rounded mb-3 mb-md-0" src="image/gvgd.jpg" alt="" style={{width: '100px', height: '100px'}} />
                    </div> 
                    <div className="col-md-9">
                      <span style={{fontWeight: 500, color: '#FD0948'}}>
                        GIÚP VIỆC GIA ĐÌNH
                      </span>
                      <br />
                      <p style={{textAlign: 'justify'}}><strong>Giúp việc gia đình</strong> là dịch vụ không thể thiếu cho các ông bố, bà mẹ trong xã hội hiên đại ngày nay.
                      </p>
                    </div> 
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid rounded mb-3 mb-md-0" src="image/csmvb.jpg" alt="" style={{width: '100px', height: '100px'}} />
                    </div> 
                    <div className="col-md-9">
                      <span style={{fontWeight: 500, color: '#FD0948'}}>
                        CHĂM SÓC MẸ VÀ BÉ
                      </span>
                      <br />
                      <p style={{textAlign: 'justify'}}><strong>Tìm việc làm trông trẻ</strong> hiện nay được nhiều người biết đến với mong muốn cải thiện cuộc sống và tìm một công việc ổn định.
                      </p>
                    </div> 
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid rounded mb-3 mb-md-0" src="image/csng.jpg" alt="" style={{width: '100px', height: '100px'}} />
                    </div> 
                    <div className="col-md-9">
                      <span style={{fontWeight: 500, color: '#FD0948'}}>
                        CHĂM SÓC NGƯỜI GIÀ
                      </span>
                      <br />
                      <p style={{textAlign: 'justify'}}><strong>Dịch vụ chăm sóc người già</strong> là việc rất hệ trọng trong mỗi gia đình. Công việc đòi hỏi người chăm sóc vừa phải có lòng kính trọng đối với người già, vừa phải có thời gian, am hiểu tâm lý người già mới có thể làm tốt việc chăm sóc, phụng dưỡng.
                      </p>
                    </div> 
                  </div>
                  <br />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid rounded mb-3 mb-md-0" src="image/gvnt.jpg" alt="" style={{width: '100px', height: '100px'}} />
                    </div> 
                    <div className="col-md-9">
                      <span style={{fontWeight: 500, color: '#FD0948'}}>
                        GIÚP VIỆC NGÀY TẾT
                      </span>
                      <br />
                      <p style={{textAlign: 'justify'}}><strong>Giúp việc Tết</strong> từ lâu đã trở thành nhu cầu của nhiều gia đình hiện đại. Bởi vì khối lượng công việc dọn nhà ngày Tết, mua sắm, nấu ăn… là quá nhiều.
                      </p>
                    </div> 
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid rounded mb-3 mb-md-0" src="image/csng.jpg" alt="" style={{width: '100px', height: '100px'}} />
                    </div> 
                    <div className="col-md-9">
                      <span style={{fontWeight: 500, color: '#FD0948'}}>
                        CHĂM SÓC NGƯỜI BỆNH
                      </span>
                      <br />
                      <p style={{textAlign: 'justify'}}><strong>Chăm sóc bệnh nhân</strong> giữa cuộc sống quá nhiều việc phải lo toan, áp lực là điều không phải ai cũng làm được.
                      </p>
                    </div> 
                  </div>
                </div>
              </div>
              {/* /.row */}
              {/* Features Section */}
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="my-4">
                    <span style={{color: '#fc9e26'}}>
                      Đặc biệt <span></span>
                    </span>
                    <span style={{color: '#fb8533'}}>
                      dịch vụ tổng vệ sinh
                    </span>
                  </h2>
                  <p>Đội ngũ nhân viên Tổng vệ sinh sẽ tiến hành các công việc sau:</p>
                  <ul>
                    <li>
                      <strong>Hút, quét bụi và lau sàn</strong>
                    </li>
                    <li>Quét bụi, quét mạng nhện trần nhà</li>
                    <li>Vệ sinh tường nhà (quét bụi hoặc lau)</li>
                    <li>Phủi bụi rèm cửa, vệ sinh cửa ra vào, cửa sổ</li>
                    <li>Phủi bụi, lau chùi bề mặt bàn ghế, tủ kệ, các vật dụng, đồ trang trí... </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <img className="img-fluid rounded" src="image/allService.jpg" alt="" />
                </div>
                <div className="col-md-6">
                  <Link to="/dichvu/1" className="btn btn-lg btn-secondary btn-block ">Đặt ngay</Link>
                </div>
              </div>
              {/* Call to Action Section */}
              <hr />
            </div>

        );
    }
}

export default Home;