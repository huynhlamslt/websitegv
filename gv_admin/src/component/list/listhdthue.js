import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";
import ReactPaginate from "react-paginate";

class listhdthue extends Component{

	constructor(props){
		super(props);
		this.state = {
			hdthues:[],
			DVs:[],
			phieuthus:[],
			ngvs:[],
			yeucaus:[],
			serach:'',
			currentPage: 1,
			pageSize: 6,
			totalColumns: 0,
			search: '',
			isLoading: true,
		};
		this.remove = this.remove.bind(this);
		this.currencyFormat = this.currencyFormat.bind(this);	
		this.paging = this.paging.bind(this);
		this.searchChange = this.searchChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
	}

	async componentDidMount(){
		this.setState({isLoading: true});

		const hdthue = await (await fetch(`/gvnhanh/hdthue/`)).json();
		const DV = await (await fetch('/gvnhanh/bangphidv')).json();
		const phieuthu = await (await fetch('/gvnhanh/phieuthudv')).json();
		const ngv = await (await fetch('/gvnhanh/nguoigv')).json();
		const yeucau = await (await fetch('/gvnhanh/yeucau')).json();
		this.setState({
				hdthues: hdthue,
				DVs: DV,
				phieuthus: phieuthu,
				ngvs: ngv,
				yeucaus: yeucau,
				search: '',
				isLoading: false,
		})
		this.paging(hdthue);
	}

	paging(list){
		const pageSize = this.state.pageSize;
		const temp = list.slice(0, pageSize);
		this.setState({
			hdthues: temp,
			totalColumns: Math.ceil(list.length / pageSize),
		})
	}

	async handlePaging({ selected }){

		// (current - 1 ) = selected| * size lấy : size row
		const { pageSize } = this.state;
		const list = await (await fetch(`/gvnhanh/hdthue/`)).json();

		//myFish.splice(2, 1); // xóa 1 phần tử từ vị trí 2
		const start = selected * pageSize;
		// size = 6, vị trí 1 bắt đầu từ 0 đến 5
		// size = 6, vị trí 2 bắt đầu từ 6 đến 11
		const end = start + pageSize;

		const newList = list.slice(start, end)

		this.setState({
			hdthues: newList,
			currentPage: selected + 1,
		})
	}

	async remove(id){
		await fetch(`/gvnhanh/hdthue/${id}`,{
			method: 'DELETE',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let updateHdThue = [...this.state.hdthues].filter(i => i.idhdthue !== id);
			this.setState({hdthues: updateHdThue});
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

	formatter = new Intl.DateTimeFormat("en-GB", {
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit"
	    });

	async searchChange(event){
		const target = event.target;
		const value = target.value;
		const name= target.name;
		let item = {...this.state.search};
		item = value;
		if(item===''){
			this.componentDidMount()
		}
		this.setState({
			search: item
		});
		
	}
	async searchSubmit(event){
		event.preventDefault();
		const pageSize = this.state["pageSize"];
		const search = this.state.search;
		const find = await(await fetch(`gvnhanh/hdthue/find/${search}`)).json();
		this.setState({
			hdthues: find,
			totalColumns: Math.ceil(find.length / pageSize)
		})
		
	}

	render(){

		const {hdthues, phieuthus, DVs, ngvs, yeucaus, isLoading, pageSize, currentPage, totalColumns, search} = this.state;
		//console.log("dv", DVs)

		if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

        const hdthueList = hdthues.map(hdthue =>{
        	return <tr key={hdthue.idhdthue}>
						<td className="text-center">{hdthue.idhdthue}</td>
						<td className="text-center">
							{phieuthus.map(pt=>{
	                        	if(pt.idhdthue===hdthue.idhdthue)
	                        		return DVs.map(dv=>{
	                        			if(dv.iddv===pt.iddv)
	                        				return dv.tendv
	                        		})
	                        		
	                        })}
						</td>
						<td className="text-center">
							{yeucaus.map(yc=>{
                        		if(yc.idyc===hdthue.idkh)
                        			return yc.hoten
                        	})}						
						</td>
                        <td className="text-center">
                        	{ngvs.map(ngv=>{
	                        	if(ngv.idnguoigv===hdthue.idnguoigv)
	                        		return ngv.hoten
	                        })}
                        </td>
                        <td className="text-center">
	                        {phieuthus.map(pt=>{
	                        	if(pt.idhdthue===hdthue.idhdthue)
	                        		return this.formatter.format(Date.parse(pt.ngaybatdau))
	                        })}
                        </td>
                        <td className="text-center">
                        	{phieuthus.map(pt=>{
	                        	if(pt.idhdthue===hdthue.idhdthue)
	                        		return this.formatter.format(Date.parse(pt.ngayketthuc))
	                        })}
                        </td>
                        <td className="text-center">
                        	<div class="btn-group" role="group" aria-label="Basic example">
	                        	<Link to={"/hdthue/"+hdthue.idhdthue}>
								  <button type="button" class="btn btn-outline-primary" title="Cập nhật">
								  	<i className="fas fa-pencil-alt" />
								  </button>
								</Link>

							  {/*<button type="button" class="btn btn-outline-danger" onClick={this.handleClick.bind(this,hdthue.idhdthue)} title="Xóa">
							  	<i className="fas fa-trash" />
							  </button>*/}
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
		                <h1 className="m-0">Danh sách hợp đồng thuê dịch vụ</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

					 <div className="pb-2 pt-2">      
			            <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">				  
						  <div className="input-group">
						  	<form className="form-inline" onSubmit={this.searchSubmit}>
						  	  <div className="input-group">
								  <input className="form-control" type="search" placeholder="Nhập tên cần tìm..." 
								  onChange={this.searchChange} aria-label="Search" />
								  <div className="input-group-append">
								    <button className="btn bg-secondary rounded-right" type="submit">
				                      <i className="fas fa-search" />
				                    </button>
								  </div>
							  </div>
							 </form>
						  </div>
						</div>		
					</div>		           

		          </div>{/* /.container-fluid */}
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid">
						<table className="table table-bordered table-hover table-inverse table-striped">
							<thead className="thead-dark">
								<tr className="">
									<th className="text-center" scope="col">Mã HĐ</th>
									<th className="text-center" scope="col">Dịch vụ</th>
									<th className="col-2 text-center">Họ tên KH</th>
									<th className="col-2 text-center">Họ tên NGV</th>
									<th className="text-center">Ngày làm</th>
									<th className="text-center">Ngày kết thúc</th>
									<th className="text-center"></th>
								</tr>
							</thead>
							<tbody>
								{hdthueList}
							</tbody>
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
		            </div>
				</div>
				
			</div>
		);
	}
}
export default listhdthue;
