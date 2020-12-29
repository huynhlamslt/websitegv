import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";
// import CurrencyFormat from 'react-currency-format';

class themnguoigv extends Component{

	emptyItem = {
		hoten: '',
		gioitinh: '',
		ngaysinh: '',
		sdt: '',
		cmnd: '',
		kinhnghiem: '',
		quequan:'',
		dvdangky:'',
		hinhanh: '',
		del: '', 
		hopdong: '',
		hinhanh: '',
	};

	constructor(props) {
		super(props);
		this.state = {
			item: this.emptyItem,
			dichVus:[],
			dvdangky:'',
			upload: '',
			picture: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleChangePhone = this.handleChangePhone.bind(this);
		// this.getBase64 = this.getBase64.bind(this);
		// this.changeImage = this.changeImage.bind(this);
	}

	async componentDidMount() {
		const [update, them] = this.props.match.params.id.split('_');
		if (update !== 'new') {
			const ngv = await (await fetch(`/gvnhanh/nguoigv/${update}`)).json();
			this.setState({
				item: ngv,
				picture: ngv.hinhanh
			});
		}
	}

	async handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name= target.name;
		let item = {...this.state.item};
		item[name] = value;
		this.setState({item});
	}

	async handleSubmit(event) {
		event.preventDefault();

		const {item, picture} = this.state;
		if(this.state.item.gioitinh===''){
			this.state.item.gioitinh='Nam';	
		}
		this.state.item.del=0;
		if(this.state.item.hopdong!==1){
			this.state.item.hopdong=0;
		}
		this.state.item.ungtuyen=0;
		this.state.item.hinhanh = picture;
		await fetch('/gvnhanh/nguoigv', {
			method: (item.id) ? 'PUT' : 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		});
		this.props.history.push('/nguoigv');
	}

	onImageChange = (event) => {
	    if (event.target.files && event.target.files[0]) {
	      let img = event.target.files[0];
	      this.setState({
	      	picture: URL.createObjectURL(img)
	      })
	    }
    }

	render(){

		const {item, picture} = this.state;
		const title = <h1 className="h3 mb-2 text-gray-800 pb-3">{item.idnguoigv ? 'Cập nhật người giúp việc' : 'Thêm người giúp việc'}</h1>;
		const [update, them] = this.props.match.params.id.split('_');

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
				                    <input type="text" className="form-control col-md-10" name="hoten" id="hoten" value={item.hoten || ''} 
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
				                    <label for="exampleInputEmail1">Quê quán</label>
				                    <input type="text" className="form-control col-md-10" name="quequan" id="quaquan" value={item.quequan || ''} 
				                    onChange={this.handleChange} placeholder="" required/>
				                  </div>

				                  <div className="form-group">
					                    <label for="exampleInputPassword1">Hình ảnh</label>
					               		<input type="file" className="form-control-file" id="customFile" onChange={this.onImageChange} accept="image/*"/>
										<div className="previewProfilePic" >
							                <img className="playerProfilePic_home_tile w-25 h-25" src={picture} alt=""/>
							            </div>
					              </div>
				                 
				                </div>
				               

				                <div className="card-footer">
				                  <button type="submit" className="btn btn-primary">Save</button>
				                  {them==='new'? <Link to="/tuyendung"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>
				              	  : <Link to="/nguoigv"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>}
				                </div>
				              </form>
				            </div>
					</div>
				</div>
			
			</div>
		);
	}
}
export default withRouter(themnguoigv);
