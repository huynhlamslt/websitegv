import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class listtaikhoan extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thông tin tài khoản</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/taikhoan/themtaikhoan">
							<button className="btn btn-success float-right">Thêm tài khoản</button>
						</Link>
					</div>

		          </div>{/* /.container-fluid */}
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid">
						<table className="table table-bordered table-hover table-inverse table-striped">
							<thead className="thead-dark">
								<tr className="h-100">
									<th className="text-center">STT</th>
									<th className="text-center">Tên tài khoản</th>
									<th className="text-center">Nhân viên</th>
									<th className="text-center">Quyền</th>
                                    <th className="text-center">Trạng thái</th>
								</tr>
							</thead>
							<tbody>
								<tr className="">
									<td className="text-center">1</td>
									<td className="text-center">1</td>
									<td className="text-center">1</td>
                                    <td className="text-center">1</td>
                                    <td className="text-center">1</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		);
	}
}
export default listtaikhoan;
