import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
		gioketthuc:'',
		diachilam:'',
		tongtien: '',
		phantramluong: '',
		tienthu: ''
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
		 	tienthu: '',
		 	gio: false,
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

		const ls = await (await fetch(`/gvnhanh/hopdongdk/ptluong/${ngv[0]['idnguoigv']}`)).json();

		const kh = await (await fetch(`/gvnhanh/yeucau/${idLichhen}`)).json();
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

			console.log("hd", this.state)
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
					giolamviec:'',
					gioketthuc:'',
					diachi: kh.diachi,
					dongia: dg.gia,
					tongtien: '',
					phantramluong: ls,
					tienthi: '',
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
		
		//Khai báo biến phần trăm lương
		let ls = null;

		//Lấy đơn giá theo dịch vụ
		const dg = await (await fetch(`/gvnhanh/bangphidv/${phieuthu["iddv"]}`)).json();
		this.setState({
				dongia: dg,
			})		

		//Tạo ngày
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

		//Gán đơn giá cho phiếu thu
		const [idLichhen, idThemhd] = this.props.match.params.id.split('_');
		if(idThemhd === 'new'){
			this.state.phieuthu.dongia = dg.gia;
		}

		//Sự kiện xử lý khi tạo mới
		if(idThemhd === 'new'){

			//Kiểm tra không cho chọn ngày đã qua
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

			//Tìm người giúp việc phù hợp với thời gian
			if (this.state.phieuthu["iddv"] && this.state.phieuthu["ngaybatdau"] && this.state.phieuthu["ngayketthuc"]) {
				ngv = await (await fetch(`/gvnhanh/nguoigv/timngv/${dg.idloaidv}/${this.state.phieuthu["ngaybatdau"]}/${this.state.phieuthu["ngayketthuc"]}`)).json();

				if(ngv.length===0){
					confirmAlert({
			          title: 'Thông báo',
			          message: 'Không tìm thấy người giúp việc phù hợp! Vui lòng chọn thời gian khác!',
			          buttons: [
			            {
			              label: 'Đồng ý',
			              onClick: this.setState({
										phieuthu:{
											ngayketthuc: '',
											ngaybatdau: '',
											iddv: this.state.phieuthu["iddv"],
											diachilam: this.state.phieuthu["diachilam"],
											dongia: this.state.phieuthu["dongia"],
											giolamviec: this.state.phieuthu["giolamviec"],
											gioketthuc: this.state.phieuthu["gioketthuc"]
										}
									})
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
				else{
					this.setState({
						nguoiGVs:ngv
					})

					ls = await (await fetch(`/gvnhanh/hopdongdk/ptluong/${ngv[0]['idnguoigv']}`)).json();
					this.setState({
						tienthu: ls,
						
					})
					this.state.phieuthu.phantramluong = ls;
					console.log("luong", this.state.phieuthu.phantramluong)
				}
			}

			//Xử lý sự kiện nếu đặt dịch vụ theo giờ
			if(dg.donvitinh === 'Giờ'){
				this.setState({
					phieuthu:{
						ngayketthuc: this.state.phieuthu["ngaybatdau"],
						ngaybatdau: this.state.phieuthu["ngaybatdau"],
						iddv: this.state.phieuthu["iddv"],
						diachilam: this.state.phieuthu["diachilam"],
						dongia: this.state.phieuthu["dongia"],
						giolamviec: this.state.phieuthu["giolamviec"],
						gioketthuc: this.state.phieuthu["gioketthuc"],

					}
				})

				if(this.state.phieuthu["giolamviec"] && this.state.phieuthu["gioketthuc"]){
					if(this.state.phieuthu["giolamviec"] >= this.state.phieuthu["gioketthuc"]){
						alert("Giờ kết thúc không được nhỏ hơn giờ làm việc");
						this.setState({
							phieuthu:{
								ngayketthuc: this.state.phieuthu["ngaybatdau"],
								ngaybatdau: this.state.phieuthu["ngaybatdau"],
								iddv: this.state.phieuthu["iddv"],
								diachilam: this.state.phieuthu["diachilam"],
								dongia: this.state.phieuthu["dongia"],
								giolamviec: this.state.phieuthu["giolamviec"],
								gioketthuc: ''
							}
						})
					}

					const d1  = new Date('2020-12-12 ' + this.state.phieuthu["giolamviec"]);
					const time1 = d1.getTime();
					const d2  = new Date('2020-12-12 ' + this.state.phieuthu["gioketthuc"]);
					const time2 = d2.getTime();
					const minus = (d2-d1)/3600000;
					console.log("gio", minus)

					this.setState({
						phieuthu:{
							ngayketthuc: this.state.phieuthu["ngayketthuc"],
							ngaybatdau: this.state.phieuthu["ngaybatdau"],
							iddv: this.state.phieuthu["iddv"],
							diachilam: this.state.phieuthu["diachilam"],
							dongia: this.state.phieuthu["dongia"],
							giolamviec: this.state.phieuthu["giolamviec"],
							gioketthuc: this.state.phieuthu["gioketthuc"],
							tongtien: minus * dg.gia,
							phantramluong: ls,
							tienthu: (100-ls)*minus*dg.gia/100
						}		
					})

					console.log("tien gio", this.state.phieuthu['phantramluong'])
					
				}
				
			}

			//Xử lý sự kiện nếu đặt dịch vụ theo ngày
			else{
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
								dongia: this.state.phieuthu["dongia"],
								giolamviec: this.state.phieuthu["giolamviec"],
								gioketthuc: this.state.phieuthu["gioketthuc"]
							}
							
						})
					}

					// let ds = Date.parse(this.state.phieuthu['ngaybatdau']);
					// let de = Date.parse(this.state.phieuthu['ngayketthuc'])
					// let diff = de-ds;
					// let dd = diff/ (1000 * 60 * 60 * 24)

					const date1 = new Date(this.state.phieuthu['ngaybatdau']);
					const date2 = new Date(this.state.phieuthu['ngayketthuc']);
					const diffTime = Math.abs(date2 - date1);
					const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

					// console.log("ngay", diffDays);

					this.setState({
							phieuthu:{
								ngayketthuc: this.state.phieuthu["ngayketthuc"],
								ngaybatdau: this.state.phieuthu["ngaybatdau"],
								iddv: this.state.phieuthu["iddv"],
								diachilam: this.state.phieuthu["diachilam"],
								dongia: this.state.phieuthu["dongia"],
								giolamviec: this.state.phieuthu["giolamviec"],
								gioketthuc: this.state.phieuthu["gioketthuc"],
								tongtien: diffDays * dg.gia,
								phantramluong: this.state.phieuthu["phantramluong"],
								tienthu: (100-this.state.phieuthu["phantramluong"])*diffDays * dg.gia/100
							}
							
						})
					//this.state.phieuthu['tongtien'] = diffDays * dg.gia;
					//console.log("tien", this.state.phieuthu)
				}
			}
	
		}

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
		this.state.hdthue.trangthai = "Đã đặt";
		this.state.phieuthu.idhdthue = idLichhen;

		// console.log("it",hdthue)
		// console.log("pt", phieuthu)

		if(idThemhd==='new'){
			let today = new Date();
			let year = today.getFullYear();
			let month = today.getMonth()+1;
			let date = today.getDate();
			if (month < 10) 
		        month = '0' + month;
		    if (date < 10) 
		        date = '0' + date;
			this.state.hdthue.ngaythue = year+'-'+month+'-'+date;
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

			

			// await fetch(`/gvnhanh/lichhen/capnhat/${idLichhen}`, {
			// 	method:'PUT',
			// 	headers: {
			// 		'Accept': 'application/json',
			// 		'Content-Type': 'application/json'
			// 	}
			// });

			await fetch(`/gvnhanh/yeucau/trangthai/${idLichhen}`, {
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

		console.log("hd", hdthue);
		console.log("pt", phieuthu);
		console.log("kh", khachhang);

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

							                {dongia.donvitinh==='Giờ' ? 
							                	<div class="form-row">
								                  	<div className="col">
									                	<div className="form-group ">
										                    <label for="exampleInputPassword1">Giờ làm việc</label>
										                    <input type="time" className="form-control col-md-10" name="giolamviec" id="giolamviec" value={phieuthu.giolamviec || ''}
															onChange={this.handleChange}/>
										                 </div>
										            </div>
										            <div className="col">
										                 <div className="form-group ">
										                    <label for="exampleInputPassword1">Giờ kết thúc</label>
										                    <input type="time" className="form-control col-md-10 " name="gioketthuc" id="gioketthuc" value={phieuthu.gioketthuc || ''}
										                    onChange={this.handleChange} />
										                  </div>
										            </div>
								                </div> : null
							            	}
						                  						                      
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
														onChange={this.handleChange} disabled/>
													<div class="input-group-append">
													    <span class="input-group-text">VNĐ /</span>
													    <span class="input-group-text">{dongia.donvitinh}</span>
													</div>
												</div>
							                 </div>

							                 <div className="form-group">
							                    <label for="exampleInputPassword1">Tổng giá</label>
							                    <div class="input-group">
								                    <input type="number" className="form-control" name="tongtien" id="tongtien" value={phieuthu.tongtien || ''}
														onChange={this.handleChange} disabled/>
													<div class="input-group-append">
													    <span class="input-group-text">VNĐ</span>
													</div>
												</div>
							                 </div>

							                 <div className="form-group">
							                    <label for="exampleInputPassword1">Tiền nộp lại</label>
							                    <div class="input-group">
								                    <input type="number" className="form-control" name="tienthu" id="tienthu" value={phieuthu.tienthu || ''}
														onChange={this.handleChange} disabled/>
													<div class="input-group-append">
													    <span class="input-group-text">VNĐ</span>
													</div>
												</div>
							                 </div>		

							                </div>
				                		</div>
				                	</div>

				                <div className="card-footer d-flex justify-content-center">
				                  <button type="submit" className="btn btn-primary ">Save</button>
				                  {idThemhd==='new'?<Link to="/yeucau"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>
				              		: <Link to="/hdthue"><button type="submit" className="btn btn-danger ml-4">Cancel</button></Link>}
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
