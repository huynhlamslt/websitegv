import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";

class listnguoigv extends Component{

	  constructor(props) {
        super(props);
        this.state = {
          ngvs: [], 
          isLoading: true,
          item: [],
          sortDate: 0,
          sortHopDong: 0,
        };
        //this.remove = this.remove.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.sortByDateAsc = this.sortByDateAsc.bind(this);
        this.sortByDateDesc = this.sortByDateDesc.bind(this);
        this.sortByHopDongAsc = this.sortByHopDongAsc.bind(this);
        this.sortByHopDongDesc = this.sortByHopDongDesc.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('gvnhanh/nguoigv')
          .then(response => response.json())
          .then(data => this.setState({ngvs: data, isLoading: false}));
    }

    sortByDateAsc() {
      let ngv = this.state.ngvs.sort((a,b) => (a.ngaysinh.localeCompare(b.ngaysinh)));
      this.setState({
        ngvs: ngv,
        sortDate: 0,
      })
      console.log("sort", this.state);
    }

    sortByDateDesc() {
      let ngv = this.state.ngvs.sort((a, b) => (b.ngaysinh.localeCompare(a.ngaysinh)));
      this.setState({
        ngvs: ngv,
        sortDate: 1,
      })
    }

    sortByHopDongAsc() {
      let ngv = this.state.ngvs.sort((a,b) => (a.hopdong - b.hopdong));
      this.setState({
        ngvs: ngv,
        sortHopDong: 0,
      })
      console.log("sort", this.state);
    }

    sortByHopDongDesc() {
        let ngv = this.state.ngvs.sort((a,b) => (b.hopdong - a.hopdong));
        this.setState({
            ngvs: ngv,
            sortHopDong: 1,
        })
        console.log("sort", this.state);
    }

    async remove(id) {
        await fetch(`/gvnhanh/nguoigv/xoa/${id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
           let updateNguoiGV = [...this.state.ngvs].filter(i => i.idnguoigv !== id);
           this.setState({ngvs: updateNguoiGV});
        });
    }

    async handleClick(id){
      confirmAlert({
          title: 'Cảnh báo',
          message: 'Bạn chắc chắn muốn xóa',
          buttons: [
            {
              label: 'Đồng ý',
              onClick: ()=>this.remove(id)
            //   onClick: async ()=> {
            //   await fetch(`/gvnhanh/nguoigv/xoa/${id}`, {
            //                 method:'PUT',
            //                 headers: {
            //                   'Accept': 'application/json',
            //                   'Content-Type': 'application/json'
            //                 }
            //               }).then(() => {
            //            fetch('gvnhanh/nguoigv')
            //           .then(response => response.json())
            //           .then(data => this.setState({ngvs: data, isLoading: false}));
            //     });
            // }
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
          month: "2-digit",
          day: "2-digit"
        });
	
	render(){

		const {ngvs, isLoading, sortDate, sortHopDong} = this.state;

		if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

    const ngvList = ngvs.map(ngv => {
	          return <tr key={ngv.idnguoigv}>
	            <th scope="row" className="text-center">{ngv.idnguoigv}</th>
	            <td className="text-center">{ngv.hoten}</td>
	            <td className="text-center">{ngv.gioitinh}</td>
	            <td className="text-center">{this.formatter.format(Date.parse(ngv.ngaysinh))}</td>
	            <td className="text-center">{ngv.sdt}</td>
	            <td className="text-center">{ngv.cmnd}</td>
	            <td className="text-center">{ngv.quequan}</td>
	            <td className="text-center">

	            	<div className="btn-group" role="group" aria-label="Basic example">
	                	<Link to={"/nguoigv/"+ngv.idnguoigv}>
						  <button type="button" className="btn btn-outline-primary" title="Cập nhật">
						  	<i className="fas fa-pencil-alt" />
						  </button>
						</Link>

						{ngv.hopdong!==1 ? <Link to={"/hdlaodong/" + `${ngv.idnguoigv}_new`}><button type="button" className="btn btn-outline-warning" tag={Link} to={"/hopdongdk/" + `${ngv.idnguoigv}_new`} 
		                title="Hợp đồng"><i className="fas fa-print" /></button></Link>: null}

						<button type="button" className="btn btn-outline-danger" onClick={this.handleClick.bind(this,ngv.idnguoigv)} title="Xóa">
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
		                <h1 className="m-0">Thông tin người giúp việc</h1>
		              </div>{/* /.col */}
		              
		            </div>{/* /.row */}

		            <div className="mb-4 pb-4">
						<Link to = "/nguoigv/new">
							<button className="btn btn-success float-right">Thêm mới</button>
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
									<th className="text-center" scope="col">Mã NGV</th>
									<th className="text-center">Họ tên   
                  </th>
									<th className=" text-center">Giới tính</th>
									<th className="text-center">Ngày sinh {''}
                    {sortDate===1?
                      <i className="fas fa-arrow-alt-circle-up text-info pointer" onClick={this.sortByDateAsc}/>
                      :<i className="fas fa-arrow-alt-circle-down text-info pointer" onClick={this.sortByDateDesc}/>
                    }
                  </th>
									<th className="text-center">SĐT</th>
									<th className=" text-center">CMND</th>
									<th className="text-center">Quê quán</th>
									<th className="text-center">
                     {sortHopDong===1?
                      <i className="fas fa-arrow-alt-circle-up text-info pointer" onClick={this.sortByHopDongAsc}/>
                      :<i className="fas fa-arrow-alt-circle-down text-info pointer" onClick={this.sortByHopDongDesc}/>
                    }
                  </th>
								</tr>
							</thead>
							<tbody>
								{ngvList}
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		);
	}
}
export default listnguoigv;
