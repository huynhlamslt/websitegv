import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class listloaidv extends Component{

	constructor(props){
		super(props);
		this.state = {
			loaidvs:[],
			isLoading: true,
			item:[],
		};
		this.remove = this.remove.bind(this);
	}

	componentDidMount(){
		this.setState({isLoading: true});

		fetch('gvnhanh/loaidv')
			.then(response => response.json())
			.then(data => this.setState({
				loaidvs: data,
				isLoading: false
			}));
	}

	async remove(id){
		await fetch(`/gvnhanh/loaidv/${id}`,{
			method: 'DELETE',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let updateLoaidv = [...this.state.loaidvs].filter(i => i.idloaidv !== id);
			this.setState({loaidvs: updateLoaidv});
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

	render(){

		const {loaidvs, isLoading} = this.state;
		const {item} = this.state;


        if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

        const loaidvList = loaidvs.map(loaidv =>{
        	return <tr className="h-100" key={loaidv.idloaidv}>
						<td className="col-1 text-center align-middle">{loaidv.idloaidv}</td>
						<td className="col-3 align-middle">{loaidv.tenloai}</td>
						<td className="col-7 text-justify">{loaidv.gioithieu}</td>
                        <td className="col-1 text-center align-middle">
                        	<div class="btn-group" role="group" aria-label="Basic example">
	                        	<Link to={"/loaidv/"+loaidv.idloaidv}>
								  <button type="button" class="btn btn-outline-primary" title="Cập nhật">
								  	<i className="fas fa-pencil-alt" />
								  </button>
								</Link>

							  <button type="button" class="btn btn-outline-danger" onClick={this.handleClick.bind(this,loaidv.idloaidv)} title="Xóa">
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
		                <h1 className="m-0">Loại dịch vụ</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/loaidv/new">
							<button className="btn btn-success float-right">Thêm dịch vụ</button>
						</Link>
					</div>

		          </div>{/* /.container-fluid */}
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid">
						<table className="table table-bordered table-hover table-inverse table-striped">
							<thead className="thead-dark">
								<tr className="">
									<th className="col-1 text-center">Mã loại</th>
									<th className="col-3 text-center">Tên loại</th>
									<th className="col-7 text-center">Giới thiệu</th>
									<th className="col-1 text-center"></th>
								</tr>
							</thead>
							<tbody>
								{loaidvList}
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
export default listloaidv;
