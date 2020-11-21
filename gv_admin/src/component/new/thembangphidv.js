import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class thembangphidv extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thêm phí dịch vụ</h1>
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
				                    <label for="exampleInputEmail1">Tên loại dịch vụ</label>
				                    <input type="" className="form-control" id="exampleInputEmail1" placeholder=""/>
				                  </div>
				                  <div className="form-group">
				                    <label for="exampleInputEmail1">Tên dịch vụ</label>
				                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
				                  </div>
				                  <div className="form-group">
				                    <label for="exampleInputPassword1">Chi tiết</label>
				                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
				                  </div>
				                  <div className="form-group">
				                    <label for="exampleInputPassword1">Giá</label>
				                    <div className="input-group">
				                      <div className="custom-file col-md-2">
				                        <input type="number" min="0" name="gia" id="gia" className="form-control text-center"/>
				                      </div>
				                      <div className="input-group-append">
				                        <span className="input-group-text">VNĐ</span>
				                      </div>
				                    </div>
				                  </div>
				                  <div className="form-group">
								    <label for="exampleFormControlSelect1">Đơn vị tính</label>
								    <select className="form-control col-md-2" id="exampleFormControlSelect1">
								      <option>Giờ</option>
								      <option>Ngày</option>
								      <option>Tháng</option>
								      <option>Năm</option>
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
				
				

				{/*<table className="table table-striped">
					<thead className="thead-dark mx-auto">
						<tr className>
							<th scope="col" className="text-center align-middle">Mã loại</th>
							<th scope="col" className="text-justify align-middle">Tên loại</th>
							<th scope="col" className="text-center align-middle">Giới thiệu</th>
             
							<th />
						</tr>
					</thead>
					<tbody>
						{loaidvList}
					</tbody>
				</table> */}
			</div>
		);
	}
}
export default withRouter(thembangphidv);
