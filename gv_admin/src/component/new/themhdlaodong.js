import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class themhdlaodong extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thêm loại dịch vụ</h1>
		              </div>
		              
		            </div>

		          </div>
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid col-md-12">
						 <div className="card card-primary">
				           {/* <div className="card-header">
				                <h3 className="card-title">Thêm loại dịch vụ</h3>
				            </div>*/}
				             
				             <form>				             
				                <div className="card-body">
				                	<div className="row">
				                		<div className="col">
				                			<div className="form-group">
							                    <label for="exampleInputEmail1">Họ tên</label>
							                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
							                </div>
							                  
							                <div class="form-row">
							                  	<div className="col">
								                	<div className="form-group ">
									                    <label for="exampleInputPassword1">Ngày sinh</label>
									                    <input type="date" className="form-control col-md-10" id="exampleFormControlTextarea1"/>
									                 </div>
									            </div>
									            <div className="col">
									                 <div className="form-group ">
									                    <label for="exampleInputPassword1">Giới tính</label>
									                    <select className="form-control col-md-10 " id="exampleFormControlSelect1">
													      <option>Nam</option>
													      <option>Nữ</option>
													      <option>Khác</option>
													    </select>
									                  </div>
									            </div>
							                </div>

						                    <div className="form-row">
						                      <div className="col">
						                        <div className="form-group">
								                    <label for="exampleInputPassword1">Số điện thoại</label>
								                    <input type="text" className="form-control col-lg-10" id="exampleInputEmail1" placeholder=""/>
								                </div>
						                      </div>
						                      <div className="col">
						                         <div className="form-group">
								                    <label for="exampleInputPassword1">CMND</label>
								                    <input type="text" className="form-control col-lg-10" id="exampleInputEmail1" placeholder=""/>
								                 </div>
						                      </div>
						                    </div>				              							                  							                  			
							                  <div className="form-group">
							                    <label for="exampleInputPassword1">Kinh nghiệm</label>
							                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
							                  </div>
							                  <div className="form-group">
							                    <label for="exampleInputPassword1">Địa chỉ</label>
							                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
							                  </div>
				                		</div>

				                		<div className="col">
				                			 <div className="form-group">
							                    <label for="exampleInputPassword1">Họ tên nhân viên</label>
							                    <select className="form-control" id="exampleFormControlSelect1">
							                    </select>
							                  </div>
							                  <div className="form-group">
							                    <label for="exampleInputPassword1">Tình trạng sức khỏe</label>
							                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
							                  </div>
							                   <div className="form-group">
							                    <label for="exampleInputPassword1">Dịch vụ đăng ký</label>
							                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
							                  </div>
							                  <div class="form-row">
							                      <div class="col">
							                        <div className="form-group">
									                    <label for="exampleInputPassword1">Ngày ký hợp đồng</label>
									                    <input type="date" className="form-control " id="exampleInputEmail1" placeholder=""/>
									                </div>
							                      </div>
							                      <div class="col">
								                    <div className="form-group">
									                    <label for="exampleInputPassword1">Ngày hết hạn</label>
									                    <input type="date" className="form-control" id="exampleInputEmail1" placeholder=""/>
									                </div>
							                      </div>
							                    </div>							         
							                  <div className="form-group">
							                    <label for="exampleInputPassword1">Phần trăm lương</label>
							                    <div class="input-group mb-3 col-md-6">
												  <input type="number" className="form-control" />
												  <div class="input-group-append">
												    <span class="input-group-text" id="basic-addon2">%</span>
												  </div>
												</div>
							                  </div>
							                </div>
				                		</div>
				                	</div>

				                <div className="card-footer d-flex justify-content-center">
				                  <button type="submit" className="btn btn-primary ">Save</button>
				                  <button type="submit" className="btn btn-danger ml-4">Cancel</button>
				                </div>
				             
				              </form>
				            </div>
					</div>
				</div>
				
			</div>
		);
	}
}
export default withRouter(themhdlaodong);
