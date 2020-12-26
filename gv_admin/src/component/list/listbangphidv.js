import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";

import ReactPaginate from "react-paginate";
import "./phantrang.css";

class listbangphidv extends Component{

	constructor(props){
		super(props);
		this.state = {
			bpdvs:[],
			isLoading: true,
			item:[],
			loaiDVs:[],
			currentPage: 1,
			pageSize: 6,
			totalColumns: 0
		};
		//this.findTenloaidv = this.findTenloaidv.bind(this);
		//this.find = this.find.bind(this);
		this.remove = this.remove.bind(this);
		this.currencyFormat = this.currencyFormat.bind(this);	
	}

	async componentDidMount(){
		const { pageSize } = this.state
		this.setState({isLoading: true});

		const bangphi = await (await fetch(`/gvnhanh/bangphidv/`)).json();
		const temp = bangphi.slice(0, pageSize);
		const loaiDV = await (await fetch('/gvnhanh/loaidv')).json();
		this.setState({
			bpdvs: temp,
			loaiDVs: loaiDV,
			isLoading: false,
			totalColumns: Math.ceil(bangphi.length / pageSize)
		})
	}

	async remove(id){
		await fetch(`/gvnhanh/bangphidv/${id}`,{
			method: 'DELETE',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let updateBangphidv = [...this.state.bpdvs].filter(i => i.iddv !== id);
			this.setState({bpdvs: updateBangphidv});
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

    currencyFormat(num){
		   return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +' VNĐ'
		}

	handlePaging = async ({ selected }) => {

		// (current - 1 ) = selected| * size lấy : size row
		const { pageSize } = this.state;
		const list = await (await fetch(`/gvnhanh/bangphidv/`)).json();

		//myFish.splice(2, 1); // xóa 1 phần tử từ vị trí 2
		const start = selected * pageSize;
		// size = 6, vị trí 1 bắt đầu từ 0 đến 5
		// size = 6, vị trí 2 bắt đầu từ 6 đến 11
		const end = start + pageSize;

		const newList = list.slice(start, end)

		this.setState({
			bpdvs: newList,
			currentPage: selected + 1,
		})
	}

	render(){

		const {bpdvs, isLoading, loaiDVs, pageSize, currentPage, totalColumns } = this.state;

        if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

        const bpdvList = bpdvs.map(bpdv =>{
        	return <tr key={bpdv.idbpdv} className="">
						<td className="text-center">{bpdv.iddv}</td>
						<td className="text-center">
						{loaiDVs.map(loaidv =>{
							if(loaidv.idloaidv===bpdv.idloaidv){
								return loaidv.tenloai
							}
						})}</td>
						<td className="text-center">{bpdv.tendv}</td>
                        <td className="text-center">{bpdv.mota}</td>
                        <td className="text-center">{this.currencyFormat(bpdv.gia)}</td>
                        <td className="text-center">{bpdv.donvitinh}</td>
                        <td className="text-center">
                        	<div class="btn-group" role="group" aria-label="Basic example">
	                        	<Link to={"/bangphidv/"+bpdv.iddv}>
								  <button type="button" class="btn btn-outline-primary" title="Cập nhật">
								  	<i className="fas fa-pencil-alt" />
								  </button>
								</Link>

							  <button type="button" class="btn btn-outline-danger" onClick={this.handleClick.bind(this,bpdv.iddv)} title="Xóa">
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
		                <h1 className="m-0">Bảng phí dịch vụ</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/bangphidv/new">
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
								<tr className="">
									<th className="text-center my-auto">Mã số</th>
									<th className=" text-center align-middle">Tên loại DV</th>
									<th className=" text-center align-middle">Tên DV</th>
									<th className=" text-center align-middle">Chi tiết</th>
									<th className="text-center align-middle">Giá</th>
									<th className="text-center align-middle">Đơn vị</th>
									<th className="text-center"></th>
								</tr>
							</thead>
							<tbody>
								{bpdvList}
							</tbody>

							<div className="row">
								
							</div>

						</table>
					</div>

					<div className="container-fluid ">
		                <div className="Page navigation example d-flex justify-content-center">
							<ReactPaginate
								containerClassName="paging-container"
								pageClassName="paging-container__item"
								activeClassName="paging-container__item active"
								previousClassName="paging-container__item previous"
								nextClassName="paging-container__item next"
								pageLinkClassName="link"
								previousLabel={<span>{'<'}</span>}
								nextLabel={<span>{'>'}</span>}
								marginPagesDisplayed={currentPage}
								onPageChange={this.handlePaging.bind(this)}
								pageRangeDisplayed={pageSize}
								pageCount={totalColumns} />
				 		</div>
		            </div>{/* /.container-fluid */}
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
