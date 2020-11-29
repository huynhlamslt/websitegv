import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Link,
  withRouter
} from "react-router-dom";

class listhdthue extends Component{

	constructor(props){
		super(props);
		this.state = {
			hdthues:[],
			isLoading: true,
			DVs:[],
			phieuthus:[],
			ngvs:[],
			yeucaus:[],

		};
		this.remove = this.remove.bind(this);
		this.currencyFormat = this.currencyFormat.bind(this);	
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
				isLoading: false,
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

	render(){

		const {hdthues, phieuthus, DVs, ngvs, yeucaus, isLoading} = this.state;
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
	                        		return pt.ngaybatdau
	                        })}
                        </td>
                        <td className="text-center">
                        	{phieuthus.map(pt=>{
	                        	if(pt.idhdthue===hdthue.idhdthue)
	                        		return pt.ngayketthuc
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
				</div>
				
			</div>
		);
	}
}
export default listhdthue;
