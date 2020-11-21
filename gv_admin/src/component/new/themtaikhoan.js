import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class themtaikhoan extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thêm nhân viên</h1>
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
				                  <div className="form-group">
				                    <label for="exampleInputEmail1">Họ tên nhân viên</label>
											<select className="form-control col-md-8">
						                    	
						                    </select>				                  
						          </div>

						          <div className="form-group">
				                    <label for="exampleInputEmail1">Tên tài khoản</label>
									<input type="text" className="form-control col-md-8" id="exampleInputEmail1" placeholder=""/>						                  
						          </div>

						          <div className="form-group">
				                    <label for="exampleInputEmail1">Mật khẩu</label>
									<input type="text" className="form-control col-md-8" id="exampleInputEmail1" placeholder=""/>						                  
						          </div>

						          <div className="form-group">
				                    <label for="exampleInputEmail1">Nhập lại mật khẩu</label>
									<input type="text" className="form-control col-md-8" id="exampleInputEmail1" placeholder=""/>						                  
						          </div>

						          <div className="form-group">
				                    <label for="exampleInputEmail1">Quyền</label>
										<select className="form-control col-md-4">
					                    	<option>Admin</option>
					                    	<option>Nhân viên</option>
					                    </select>				                  
						          </div>
				                </div>
				               

				                <div className="card-footer">
				                  <button type="submit" className="btn btn-primary">Save</button>
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
export default withRouter(themtaikhoan);
