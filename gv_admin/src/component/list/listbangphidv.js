import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

class listbangphidv extends Component{

	
	render(){
		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Bảng phí dịch vụ</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/bangphidv/thembangphidv">
							<button className="btn btn-success float-right">Thêm phí dịch vụ</button>
						</Link>
					</div>

		          </div>{/* /.container-fluid */}
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid">
						<table className="table table-bordered table-hover table-inverse table-striped">
							<thead className="thead-dark">
								<tr className="d-flex h-100">
									<th className="col-1 text-center">Mã số</th>
									<th className="col-3 text-center">Tên loại DV</th>
									<th className="col-3 text-center">Tên DV</th>
									<th className="col-3 text-center">Chi tiết</th>
									<th className="col-1 text-center">Giá</th>
									<th className="col-1 text-center">Đơn vị</th>
								</tr>
							</thead>
							<tbody>
								<tr className="d-flex h-100">
									<td className="col-1 text-center">1</td>
									<td className="col-3 text-center">1</td>
									<td className="col-3 text-center">1</td>
									<td className="col-3 text-center">1</td>
									<td className="col-1 text-center">1</td>
									<td className="col-1 text-center">1</td>
								</tr>
								{/*<tr>
									<td>2</td>
									<td>2</td>
									<td>2</td>
								</tr>
								<tr>
									<td>1</td>
									<td>1</td>
									<td>1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>2</td>
									<td>2</td>
								</tr>*/}
							</tbody>
						</table>
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
export default listbangphidv;
