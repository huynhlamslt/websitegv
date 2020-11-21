import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class listtuyendung extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Danh sách tuyển dụng</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		           

		          </div>{/* /.container-fluid */}
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid">
						<table className="table table-bordered table-hover table-inverse table-striped">
							<thead className="thead-dark">
								<tr className="">
									<th className="col-1 text-center" scope="col">Mã số</th>
									<th className="col-2 text-center">Họ tên</th>
									<th className="text-center">Ngày sinh</th>
									<th className="text-center">SĐT</th>
									<th className="col-3 text-center">Quê quán</th>
								</tr>
							</thead>
							<tbody>
								<tr className="">
									<th className=" text-center">1</th>
									<th className=" text-center">2</th>
									<th className=" text-center">3</th>
									<th className=" text-center">4</th>
									<th className=" text-center">5</th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		);
	}
}
export default listtuyendung;
