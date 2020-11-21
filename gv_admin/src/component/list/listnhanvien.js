import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import CurrencyFormat from 'react-currency-format';
import {
  Link,
  withRouter
} from "react-router-dom";


class listnhanvien extends Component{

	emptyItem = {
		sapxep: '',
	};

	constructor(props){
		super(props);
		this.state = {
			nvs:[],
			isLoading: true,
			item:[],
		};
		this.remove = this.remove.bind(this);
		
		this.currencyFormat = this.currencyFormat.bind(this);
	}

	componentDidMount(){
		this.setState({isLoading: true});

		fetch('gvnhanh/nhanvien')
			.then(response => response.json())
			.then(data => this.setState({
				nvs: data,
				isLoading: false
			}));
	}

	async remove(id){
		await fetch(`/gvnhanh/nhanvien/${id}`,{
			method: 'DELETE',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let updateNhanvien = [...this.state.nvs].filter(i => i.idnv !== id);
			this.setState({nvs: updateNhanvien});
		});
	}

	handleClick(id){
      confirmAlert({
          title: 'Cảnh báo',
          message: 'Bạn chắc chắn muốn xóa',
          buttons: [
            {
              label: 'Đồng ý',
              onClick: ()=> this.remove(id)
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

    formatter = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "2-digit"
        });	

    numberFormat = new Intl.NumberFormat('en-IN', {
	    style: 'currency',
	    currency: 'VND'
	  });

    currencyFormat(num){
		   return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +' VNĐ'
		}
	
	render(){

		const {nvs, isLoading} = this.state;
		const {item} = this.state;


        if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

        const nvList = nvs.map(nv =>{
        	return <tr key={nv.idnv}>
						<td className="text-center">{nv.idnv}</td>
						<td className="text-center">{nv.hoten}</td>
						<td className="text-center">{nv.gioitinh}</td>
                        <td className="text-center">
                        	{this.formatter.format(Date.parse(nv.ngaysinh))}
                        	
                        </td>
                        <td className="text-center">{nv.sdt}</td>
                        <td className="text-center">{nv.cmnd}</td>
                        <td className="text-center">
                        	{/*<CurrencyFormat value={nv.luong} displayType={'text'} thousandSeparator={true}/>*/}
                        	{this.currencyFormat(nv.luong)}
                        </td>
                        <td className="text-center">
                        	<div class="btn-group" role="group" aria-label="Basic example">
	                        	<Link to={"/nhanvien/"+nv.idnv}>
								  <button type="button" class="btn btn-outline-primary" title="Cập nhật">
								  	<i className="fas fa-pencil-alt" />
								  </button>
								</Link>

							  <button type="button" class="btn btn-outline-danger" onClick={this.handleClick.bind(this,nv.idnv)} title="Xóa">
							  	<i className="fas fa-trash" />
							  </button>
							</div>                       	
                        </td>
					</tr>

        });

		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">Thông tin nhân viên</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/nhanvien/themnhanvien">
							<button className="btn btn-success float-right">Thêm nhân viên</button>
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
									<th className="text-center">Mã NV</th>
									<th className="text-center">Họ tên</th>
									<th className="text-center">Giới tính</th>
									<th className="text-center">Ngày sinh</th>
                                    <th className="text-center">SĐT</th>
                                    <th className="text-center">CMND</th>
                                    <th className="text-center">Lương</th>
                                    <th className="text-center"></th>
								</tr>
							</thead>
							<tbody>
								
								{nvList}
								
							</tbody>
						</table>
					</div>
				</div>

				{/*<section className="content">
				  <div className="container-fluid">
				    <div className="row">
				      <div className="col-12">
				        <div className="card">
				          <div className="card-header">
				            <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
				          </div>
				          
				          <div className="card-body">
				            <table id="example2" className="table table-bordered table-hover">
				              <thead>
				                <tr>
				                    <th className="text-center">Mã NV</th>
									<th className="text-center">Họ tên</th>
									<th className="text-center">Giới tính</th>
									<th className="text-center">Ngày sinh</th>
                                    <th className="text-center">SĐT</th>
                                    <th className="text-center">CMND</th>
                                    <th className="text-center">Lương</th>
                                    <th className="text-center"></th>
				                </tr>
				              </thead>
				              <tbody>
				                	{nvList}
				              </tbody>
				              <tfoot>
				                <tr>
				                  <th>Rendering engine</th>
				                  <th>Browser</th>
				                  <th>Platform(s)</th>
				                  <th>Engine version</th>
				                  <th>CSS grade</th>
				                </tr>
				              </tfoot>
				            </table>
				          </div>
				         
				        </div>
				        
				      </div>
				     
				    </div>
				   
				  </div>
				
				</section>*/}

				
			</div>
		);
	}
}
export default listnhanvien;
