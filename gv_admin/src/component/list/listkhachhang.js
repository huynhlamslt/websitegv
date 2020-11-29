import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";

class listkhachhang extends Component{

	constructor(props){
		super(props);
		this.state = {
			khs:[],
			isLoading: true,
			item:[],
		};
		this.clickTrue = this.clickTrue.bind(this);
		this.clickFalse = this.clickFalse.bind(this);
	}

	componentDidMount(){
		this.setState({isLoading: true});

		fetch('gvnhanh/khachhang')
			.then(response => response.json())
			.then(data => this.setState({
				khs: data,
				isLoading: false
			}));
	}

    clickTrue(id){
    	confirmAlert({
          title: 'Cảnh báo',
          message: 'Bạn chắc chắn muốn cho phép đặt dịch vụ',
          buttons: [
            {
              label: 'Đồng ý',
              onClick: ()=> {
            		fetch(`/gvnhanh/khachhang/true/${id}`,{
						method: 'PUT',
						headers:{
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					}).then(() => {
	                  fetch('gvnhanh/khachhang')
	                .then(response => response.json())
	                .then(data => this.setState({khs: data, isLoading: false}));
	              });
              	}
            },
            {
              label: 'Không',
           
            },
          ],
           childrenElement: () => null,
            closeOnClickOutside: true,
            closeOnEscape: true,
            willUnmount: () => null,
            onClickOutside: () => null,
            onKeypressEscape: () => null
        });
    }

    clickFalse(id){
    	confirmAlert({
          title: 'Cảnh báo',
          message: 'Bạn chắc chắn muốn cấm đặt dịch vụ',
          buttons: [
            {
              label: 'Đồng ý',
              onClick: ()=> {
            		fetch(`/gvnhanh/khachhang/false/${id}`,{
						method: 'PUT',
						headers:{
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					}).then(() => {
	                  fetch('gvnhanh/khachhang')
	                .then(response => response.json())
	                .then(data => this.setState({khs: data, isLoading: false}));
	              });
              	}
            },
            {
              label: 'Không',
           
            },
          ],
           childrenElement: () => null,
            closeOnClickOutside: true,
            closeOnEscape: true,
            willUnmount: () => null,
            onClickOutside: () => null,
            onKeypressEscape: () => null
        });
    }

	render(){

		const {khs, isLoading} = this.state;

		if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }


        const khList = khs.map(kh =>{
        	return <tr key={kh.idkh}>
				<td className="text-center">{kh.idkh}</td>
				<td className="text-center">{kh.hoten}</td>
				<td className="text-center">{kh.sdt}</td>
				<td className="text-center">{kh.diachi}</td>
                <td className="text-center">
                	{kh.trangthai===1?
                	<button type="button" class="btn btn-outline-success" onClick={this.clickFalse.bind(this,kh.idkh)} title="Được đặt dịch vụ">
					  	<i className="fas fa-check-circle" />
					</button>
					:<button type="button" class="btn btn-outline-danger" onClick={this.clickTrue.bind(this,kh.idkh)} title="Cấm đặt dịch vụ">
					  	<i className="fas fa-times-circle" />
					</button>}
                </td>
                
			</tr>

        });

		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thông tin khách hàng</h1>
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
									<th className="col-1 text-center" scope="col">Mã KH</th>
									<th className="col-2 text-center">Họ tên</th>
									<th className=" text-center">SĐT</th>
									<th className="text-center">Địa chỉ</th>
									<th className="text-center">Trạng thái</th>
								</tr>
							</thead>
							<tbody>
								{khList}
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		);
	}
}
export default listkhachhang;
