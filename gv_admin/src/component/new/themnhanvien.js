import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class themnhanvien extends Component{

	emptyItem = {
		hoten: '',
		gioitinh: '',
		ngaysinh: '',
		sdt: '',
		cmnd: '',
		luong: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			item: this.emptyItem
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
	}

	async componentDidMount() {
		if (this.props.match.params.id !== 'new') {
			const nv = await (await fetch(`/gvnhanh/nhanvien/${this.props.match.params.id}`)).json();
			this.setState({item: nv});
		}
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name= target.name;
		let item = {...this.state.item};
		item[name] = value;
		this.setState({item});

		//console.log("nv",item);

		// this.setState({[event.target.id]: event.target.value});
		
		 // this.setState({
	  //     input: event.target.value
	  //   });
	}

	async handleSubmit(event) {
		event.preventDefault();

		const {item} = this.state;
		if(this.state.item.gioitinh===undefined){
			this.state.item.gioitinh='Nam';
			
		}
		await fetch('/gvnhanh/nhanvien', {
			method: (item.id) ? 'PUT' : 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		});
		this.props.history.push('/nhanvien');
		
	}

	handleChangePhone(e){
	    if(e.target.value.match("^[a-zA-Z ]*$")!=null) {
	      this.setState({item: e.target.value});
	    }
	  }
	render(){

		const {item} = this.state;
		const title = <h1 className="h3 mb-2 text-gray-800 pb-3">{item.idnv ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}</h1>;

		return(
			<div className="content-wrapper">

				<div className="content-header">
		          <div className="container-fluid">
		            <div className="row mb-2">
		              <div className="col-sm-6">
		                <h1 className="m-0">{title}</h1>
		              </div>
		              
		            </div>

		          </div>
		        </div>

				{/* Page Heading */}
				<div className="content">
					<div className="container-fluid col-md-12">
						 <div className="card card-primary">
				           {/* <div className="card-header">
				                <h3 className="card-title">Thêm loại dịch vụ</h3>
				            </div>*/}
				             
				             <form onSubmit={this.handleSubmit}>
				                <div className="card-body">
				                  <div className="form-group">
				                    <label for="exampleInputEmail1">Họ tên nhân viên</label>
				                    <input type="text" className="form-control" name="hoten" id="hoten" value={item.hoten || ''} 
				                    onChange={this.handleChange} placeholder="" required/>
				                  </div>

				                  <div class="row">
				                    <div class="col">
				                    	<div className="form-group">
						                    <label for="exampleInputPassword1">Giới tính</label>
						                    <select className="form-control col-md-8" name="gioitinh" id="gioitinh" value={item.gioitinh || ''} onChange={this.handleChange}>
						                    	<option>Nam</option>
						                    	<option>Nữ</option>
						                    	<option>Khác</option>
						                    </select>
						                </div>
				                    </div>

				                    <div class="col">
				                    	<div className="form-group">
						                    <label for="exampleInputPassword1">Ngày sinh</label>
		   				                    <input type="date" className="form-control col-md-8" name="ngaysinh" id="ngaysinh" value={item.ngaysinh || ''}
											onChange={this.handleChange} placeholder=""/>
						                  </div>
				                    </div>
				                  </div>
				                  
				                 <div class="row">
				                    <div class="col">
				                    	<div className="form-group">
						                    <label for="exampleInputPassword1">Số điện thoại</label>
						               		<input type="text" className="form-control col-md-8" name="sdt" id="sdt" value={item.sdt || ''}
											onChange={this.handleChange} pattern="[0-9]{10}" placeholder="" title="Hãy nhập đúng 10 chữ số điện thoại"/>
						                </div>
				                    </div>
				                    <div class="col">
				                    	<div className="form-group">
						                    <label for="exampleInputPassword1">CMND</label>
						               		<input type="text" className="form-control col-md-8" name="cmnd" id="cmnd" value={item.cmnd || ''}
											onChange={this.handleChange} pattern="[0-9]{9}" placeholder="" title="Hãy nhập đúng 9 chữ số cmnd"/>
						                </div>
				                    </div>
				                  </div>
				                 
				                  <div className="form-group">
				                    <label for="exampleInputPassword1">Lương</label>
				                    <div class="input-group mb-3 col-md-4">
									  <input type="number" className="form-control" name="luong" id="luong" min="0" value={item.luong || ''}
											onChange={this.handleChange}/>
									  <div class="input-group-append">
									    <span class="input-group-text" id="basic-addon2">VNĐ</span>
									  </div>
									</div>
				                  </div>
				                </div>
				               

				                <div className="card-footer">
				                  <button type="submit" className="btn btn-primary">Save</button>
				                  <Link to="/nhanvien"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>
				                </div>
				              </form>
				            </div>
					</div>
				</div>
			
			</div>
		);
	}
}
export default withRouter(themnhanvien);