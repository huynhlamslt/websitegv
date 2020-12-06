import React, {Component} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom"; 

class themhdthue extends Component{

	emptyHdthue = {
		idkh: '',
		idnguoigv: '',
		idnv: '',
		ngaythue: '',
		trangthai: ''
	};
	emptyPhieuthu = {
		idhdthue:'',
		iddv: '',
		dongia:'',
		ngaybatdau:'',
		ngayketthuc:'',
		giolamviec:'',
		diachilam:''
	};
	emptyKhachhang = {
		hoten: '',
		sdt: '',
		diachi: '',
		trangthai: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			hdthue: this.emptyHdthue,
			phieuthu: this.emptyPhieuthu,
			khachhang: this.emptyKhachhang,
		 	DVs:[],
		 	nhanViens:[],
		 	nguoiGVs:[],
		 	khs:[],
		 	dongia:[],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	async componentDidMount() {
		const [idLichhen, idThemhd] = this.props.match.params.id.split('_');

		const dv = await (await fetch(`/gvnhanh/bangphidv`)).json();
		this.setState({
				DVs: dv
			})

		const nv = await (await fetch(`/gvnhanh/nhanvien`)).json();
		this.setState({
				nhanViens: nv
			})

		const ngv = await (await fetch(`/gvnhanh/nguoigv`)).json();
		this.setState({
				nguoiGVs: ngv
			})

		const kh = await (await fetch(`/gvnhanh/yeucau/lichhen/${idLichhen}`)).json();
		this.setState({
				khs: kh,
				khachhang:{
					hoten: kh.hoten,
					sdt: kh.sdt,
					diachi: kh.diachi,
					trangthai: 1
				}
			})

		if (idThemhd !== 'new') {
			const hd = await (await fetch(`/gvnhanh/hdthue/${idLichhen}`)).json();
			this.setState({
				hdthue: hd
			})

			const pt = await (await fetch(`/gvnhanh/phieuthudv/${idLichhen}`)).json();
			this.setState({
				phieuthu: pt
			})


			const dg = await (await fetch(`/gvnhanh/bangphidv/${pt.iddv}`)).json();
			this.setState({
				dongia: dg
			})
		}
		else{
			const dg = await (await fetch(`/gvnhanh/bangphidv/${dv[0].iddv}`)).json();
			this.setState({
				dongia: dg,
				phieuthu:{
					idhdthue: idLichhen,
					iddv: dv[0].iddv,
					diachilam: kh.diachi,
					ngaybatdau:'',
					ngayketthuc:'',
					diachi: kh.diachi,
					dongia: dg.gia,
				},
				hdthue:{
					idhdthue:idLichhen,
					idkh: '',
					idnguoigv: '',
					idnv: '',
					ngaythue: '',
					trangthai: ''
				}
			})
		}

		// if (idThemhd === 'new'){
		// 	const dg = await (await fetch(`/gvnhanh/bangphidv/${dv[0].iddv}`)).json();
		// 	this.setState({
		// 		dongia: dg
		// 	})
		// }

		

		//console.log("state", this.state)
	}

	async handleChange(event) {
		let ngv = null;
		const target = event.target;
		const value = target.value;
		const name= target.name;
		let hdthue = {...this.state.hdthue};
		let phieuthu = {...this.state.phieuthu};
		hdthue[name] = value;
		phieuthu[name] = value;
		this.setState({hdthue});
		this.setState({phieuthu}); 
		

		const dg = await (await fetch(`/gvnhanh/bangphidv/${phieuthu["iddv"]}`)).json();
		this.setState({
				dongia: dg
			})

		//console.log("pt", phieuthu);
		//const ldv = await (await fetch(`/gvnhanh/bangphidv/${phieuthu["iddv"]}`)).json();
		
		var months = ["01", "02", "03", "04", "05", "06", "07",
         "08", "09", "10", "11", "12"];

		var d = new Date();

		var namedMonth = months[d.getMonth()];
		let ng;
		if(d.getDate()<10){
			ng = `${d.getFullYear()}-${namedMonth}-0${d.getDate()}`;
		}
		else{
			ng = `${d.getFullYear()}-${namedMonth}-${d.getDate()}`;
		}

		const [idLichhen, idThemhd] = this.props.match.params.id.split('_');
		if(idThemhd === 'new'){
			if(this.state.phieuthu["ngaybatdau"] && this.state.phieuthu["ngaybatdau"]<ng){
					alert("Không được chọn ngày đã qua!");
					this.setState({
						phieuthu:{
							ngayketthuc: this.state.phieuthu["ngayketthuc"],
							ngaybatdau: ng,
							iddv: this.state.phieuthu["iddv"],
							diachilam: this.state.phieuthu["diachilam"],
							dongia: this.state.phieuthu["dongia"]
						}
					})
				}

			if (this.state.phieuthu["iddv"] && this.state.phieuthu["ngaybatdau"] && this.state.phieuthu["ngayketthuc"]) {
				ngv = await (await fetch(`/gvnhanh/nguoigv/timngv/${dg.idloaidv}/${phieuthu["ngaybatdau"]}/${phieuthu["ngayketthuc"]}`)).json();
				this.setState({
					nguoiGVs:ngv
				})
			}
		}

		//console.log("ngv", this.state.nguoiGVs);

		
		
		// this.setState(async () => {
			if (this.state.phieuthu["ngayketthuc"]!=='' && this.state.phieuthu["ngaybatdau"]!==''){
				if(this.state.phieuthu["ngayketthuc"] < this.state.phieuthu["ngaybatdau"]){
					//let start = hdthue["ngaybatdau"];
					alert("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu");
					this.setState({
						phieuthu:{
							ngayketthuc: '',
							ngaybatdau: this.state.phieuthu["ngaybatdau"],
							iddv: this.state.phieuthu["iddv"],
							diachilam: this.state.phieuthu["diachilam"],
							dongia: this.state.phieuthu["dongia"]
						}
						
					})
				}
				// console.log("pt",this.state.phieuthu)
			}
			
		//});
	}

	async handleSubmit(event) {
		event.preventDefault();
		const {hdthue} = this.state;
		const {phieuthu} = this.state;
		const {khachhang} = this.state;
		const {khs} = this.state;
		const [idLichhen, idThemhd] = this.props.match.params.id.split('_');

		if(this.state.hdthue.idnv===''){
			this.state.hdthue.idnv=this.state.nhanViens[0].idnv;
		}
		if(this.state.hdthue.idnguoigv===''){
			this.state.hdthue.idnguoigv=this.state.nguoiGVs[0].idnguoigv;
		}
		this.state.hdthue.idkh = khs.idyc;
		this.state.hdthue.trangthai = "Đã đặt"

		// console.log("it",hdthue)
		// console.log("pt", phieuthu)

		if(idThemhd==='new'){
			let today = new Date();
			this.state.hdthue.ngaythue = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			await fetch('/gvnhanh/hdthue', {
				method:'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hdthue),
			});

			await fetch('/gvnhanh/phieuthudv', {
				method:'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(phieuthu),
			});

			await fetch('/gvnhanh/khachhang', {
				method:'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(khachhang),
			});

			await fetch(`/gvnhanh/lichhen/capnhat/${idLichhen}`, {
				method:'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});
		}
		else{
			await fetch(`/gvnhanh/hdthue/${idLichhen}`, {
				method:'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hdthue),
			});

			await fetch(`/gvnhanh/phieuthudv/${idLichhen}`, {
				method:'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(phieuthu),
			});	
		}

		// console.log("hd", hdthue);
		// console.log("pt", phieuthu);
		// console.log("kh", khachhang);

		this.props.history.push('/hdthue');
	}
	
	render(){

		const [idLichhen, idThemhd] = this.props.match.params.id.split('_');
		const {hdthue} = this.state;
		const {phieuthu} = this.state;
		const {khs} = this.state;
		const {dongia} = this.state;
		//const {loaiDVs} = this.state;
		//console.log("dv",loaiDVs);
		const title = <h1 className="h3 mb-2 text-gray-800 pb-3">{idThemhd ? 'Thêm hợp đồng' : 'Thông tin hợp đồng'}</h1>;

		//this.state.item.idyc = idLichhen;
		// this.state.hdthue.idhdthue = idLichhen;
		// this.state.phieuthu.idhdthue = idLichhen;
		// this.state.phieuthu.dongia = this.state.dongia.gia;
		// phieuthu.diachi = khs.diachi;

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
				                	<div className="row">
				                		<div className="col">
				                			<div className="form-group">
							                    <label for="exampleInputEmail1">Tên khách hàng</label>
							                    <input type="text" className="form-control col-md-12" name="hoten" id="hoten" value={khs.hoten || ''}
												onChange={this.handleChange} disabled/>
							                </div>

							                <div className="form-group">
							                    <label for="exampleInputEmail1">Tên dịch vụ</label>
							                    <select type="text" className="form-control col-md-12" name="iddv" id="iddv" value={phieuthu.iddv || ''}
												onChange={this.handleChange}>
													{this.state.DVs.map((item, index) => (
														<option value={item.iddv}>{item.tendv}</option>
													))}
												</select>
							                </div>
							                  
							                <div class="form-row">
							                  	<div className="col">
								                	<div className="form-group ">
									                    <label for="exampleInputPassword1">Ngày bắt đầu</label>
									                    <input type="date" className="form-control col-md-10" name="ngaybatdau" id="ngaybatdau" value={phieuthu.ngaybatdau || ''}
														onChange={this.handleChange}/>
									                 </div>
									            </div>
									            <div className="col">
									                 <div className="form-group ">
									                    <label for="exampleInputPassword1">Ngày kết thúc</label>
									                    <input type="date" className="form-control col-md-10 " name="ngayketthuc" id="ngayketthu" value={phieuthu.ngayketthuc || ''}
									                    onChange={this.handleChange} />
									                  </div>
									            </div>
							                </div>
						                  						                      
					                        <div className="form-group">
							                    <label for="exampleInputPassword1">Người giúp việc</label>
							                    <select className="form-control col-lg-12" name="idnguoigv" id="idnguoigv" value={hdthue.idnguoigv || ''}
												onChange={this.handleChange}>
													{this.state.nguoiGVs.map((item, index) => (
														<option value={item.idnguoigv}>{item.hoten}</option>
													))}
												</select>
							                </div>				                      
						                   			              							                  							                  									                 							                						                 
				                		</div>

				                		<div className="col">

				                			<div className="form-group">
							                    <label for="exampleInputPassword1">Nhân viên đại diện</label>
							                    <select className="form-control col-lg-12" name="idnv" id="idnv" value={hdthue.idnv || ''}
												onChange={this.handleChange}>
													{this.state.nhanViens.map((item, index) => (
														<option value={item.idnv}>{item.hoten}</option>
													))}
												</select>
							                 </div>
				                			 
							                  <div className="form-group">
							                    <label for="exampleInputPassword1">Địa chỉ làm việc</label>
							                    <input type="text" className="form-control" name="diachilam" id="diachilam" value={phieuthu.diachilam || ''}
							                    onChange={this.handleChange}/>
							                  </div>

							                <div className="form-group">
							                    <label for="exampleInputPassword1">Đơn giá</label>
							                    <div class="input-group">
								                    <input type="number" className="form-control" name="dongia" id="dongia" value={phieuthu.dongia || ''}
														onChange={this.handleChange}/>
													<div class="input-group-append">
													    <span class="input-group-text">VNĐ /</span>
													    <span class="input-group-text">{dongia.donvitinh}</span>
													</div>
												</div>
							                 </div>	

							                </div>
				                		</div>
				                	</div>

				                <div className="card-footer d-flex justify-content-center">
				                  <button type="submit" className="btn btn-primary ">Save</button>
				                  {idThemhd==='new'?<Link to="/lichhen"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>
				              		: <Link to="/hdlaodong"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>}
				              	  {/*<Link to="/hdthue"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>*/}
				                </div>
				             
				              </form>
				            </div>
					</div>
				</div>
				
			</div>
		);
	}
}
export default withRouter(themhdthue);
