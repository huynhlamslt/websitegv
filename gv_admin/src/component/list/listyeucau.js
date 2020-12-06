import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link
} from "react-router-dom";

class listyeucau extends Component{

	constructor(props){
		super(props);
		this.state = {
			ycs:[],
			isLoading: true,
			item:[],
			sortTrangthai: 0,
			sortNgaylam: 0,
		};
		this.remove = this.remove.bind(this);
		this.sortByTrangthaiAsc = this.sortByTrangthaiAsc.bind(this);
		this.sortByTrangthaiDesc = this.sortByTrangthaiDesc.bind(this);
		this.sortByNgaylamAsc = this.sortByNgaylamAsc.bind(this);
		this.sortByNgaylamDesc = this.sortByNgaylamDesc.bind(this);
	}

	componentDidMount(){
		this.setState({isLoading: true});

		fetch('gvnhanh/yeucau')
			.then(response => response.json())
			.then(data => this.setState({
				ycs: data,
				isLoading: false
			}));
	}

	sortByTrangthaiAsc() {
      let yc = this.state.ycs.sort((a,b) => (a.trangthai.localeCompare(b.trangthai)));
      this.setState({
        ycs: yc,
        sortTrangthai: 0,
      })
      console.log("sort", this.state);
    }

    sortByTrangthaiDesc() {
      let yc = this.state.ycs.sort((a, b) => (b.trangthai.localeCompare(a.trangthai)));
      this.setState({
        ycs: yc,
        sortTrangthai: 1,
      })
       console.log("sort", this.state);
    }

    sortByNgaylamAsc() {
      let yc = this.state.ycs.sort((a,b) => (a.ngaylam.localeCompare(b.ngaylam)));
      this.setState({
        ycs: yc,
        sortNgaylam: 0,
      })
      console.log("sort", this.state);
    }

    sortByNgaylamDesc() {
      let yc = this.state.ycs.sort((a, b) => (b.ngaylam.localeCompare(a.ngaylam)));
      this.setState({
        ycs: yc,
        sortNgaylam: 1,
      })
       console.log("sort", this.state);
    }

	async remove(id){
		await fetch(`/gvnhanh/yeucau/${id}`,{
			method: 'DELETE',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let updateYeucau = [...this.state.ycs].filter(i => i.idyc !== id);
			this.setState({ycs: updateYeucau});
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


	render(){

		const {ycs, isLoading, sortTrangthai, sortNgaylam} = this.state;

		if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }


        const ycList = ycs.map((yc,index) =>{
        	return <tr key={yc.idyc}>
				<td className="text-center">{index+1}</td>
				<td className="text-center">{yc.hoten}</td>
				<td className="text-center">{yc.sdt}</td>
				 <td className="text-center">{yc.diachi}</td>
                <td className="text-center">
                	{this.formatter.format(Date.parse(yc.ngaylam))}
                	
                </td>
                <td className="text-center">{yc.congviec}</td>
                <td className="text-center">{yc.trangthai}</td>
                <td className="text-center">
                	<div class="btn-group" role="group" aria-label="Basic example">

                    {yc.trangthai==='Chưa duyệt'? <Link to={"/lichhen/"+ `${yc.idyc}_new`}>
						  <button type="button" class="btn btn-outline-primary" title="Cập nhật">
						  	<i className="fas fa-calendar-check" />
						  </button>	</Link> : null}

					  <button type="button" class="btn btn-outline-danger" onClick={this.handleClick.bind(this,yc.idyc)} title="Xóa">
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
		                <h1 className="m-0">Danh sách yêu cầu</h1>
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
									<th className="text-center align-middle" scope="col">STT</th>
									<th className="text-center align-middle">Họ tên KH</th>
									<th className="text-center align-middle">SĐT</th>
									<th className="text-center align-middle">Địa chỉ</th>
									<th className="text-center align-middle">Ngày làm {' '}
										{sortNgaylam===1?
					                      <i className="fas fa-arrow-alt-circle-up text-info pointer" onClick={this.sortByNgaylamAsc}/>
					                      :<i className="fas fa-arrow-alt-circle-down text-info pointer" onClick={this.sortByNgaylamDesc}/>
					                    }
									</th>
									<th className="text-center align-middle">Chi tiết công việc</th>
									<th className="text-center align-middle">Trạng thái {' '}
										{sortTrangthai===1?
					                      <i className="fas fa-arrow-alt-circle-up text-info pointer" onClick={this.sortByTrangthaiAsc}/>
					                      :<i className="fas fa-arrow-alt-circle-down text-info pointer" onClick={this.sortByTrangthaiDesc}/>
					                    }
									</th>
									<th className="text-center align-middle"></th>
								</tr>
							</thead>
							<tbody>
								{ycList}
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		);
	}
}
export default listyeucau;
