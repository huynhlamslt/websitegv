import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";

class listtuyendung extends Component{

	constructor(props) {
        super(props);
        this.state = {
          ngvs: [], 
          isLoading: true,
          item: [],
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('gvnhanh/nguoigv/tuyendung')
          .then(response => response.json())
          .then(data => this.setState({ngvs: data, isLoading: false}));
    }

     async remove(id) {
        await fetch(`/gvnhanh/nguoigv/${id}`, {
          method: 'DELETE',
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

		const {ngvs, isLoading} = this.state;

		if (isLoading) {
            return <p className="text-primary align-middle text-center">
                    <i className="fas fa-spinner fa-pulse fa-4x fa-fw" />
                    Loading...
                  </p>;
        }

        const ngvList = ngvs.map((ngv, index) => {
	          return <tr key={ngv.idnguoigv}>
	            <th scope="row" className="text-center">{index+1}</th>
	            <td className="text-center">{ngv.hoten}</td>
	            <td className="text-center">{this.formatter.format(Date.parse(ngv.ngaysinh))}</td>
	            <td className="text-center">{ngv.sdt}</td>
	            <td className="text-center">{ngv.quequan}</td>
	            <td className="text-center">

	            	<div className="btn-group" role="group" aria-label="Basic example">
	                	<Link to={"/nguoigv/"+ngv.idnguoigv+`_new`}>
						  <button type="button" className="btn btn-outline-primary" title="Cập nhật">
						  	<i className="fas fa-pencil-alt" />
						  </button>
						</Link>

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
									<th className="text-center" scope="col">STT</th>
									<th className="text-center">Họ tên</th>
									<th className="text-center">Ngày sinh</th>
									<th className="text-center">SĐT</th>
									<th className="text-center">Quê quán</th>
									<th className="text-center"></th>
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
export default listtuyendung;
