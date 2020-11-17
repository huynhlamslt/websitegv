import React, { Component } from 'react';
import { AvForm, AvField, ValidatingFormGroup } from 'availity-reactstrap-validation';

import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

import {
 BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { 
    Button, 
    Container, 
    Form, FormGroup, 
    Input, 
    Label, 
    FormFeedback, FormText, 
    InputGroup, InputGroupAddon } from 'reactstrap';

class RegisterServiceContain extends Component {

    emptyItem = {
        hoten: '',
        sdt: '',
        diachilamviec: '',
        ngaylam: '',
        congviec:'',
        trangthai: 'Chưa duyệt',
        dichvu:''
    };

    emptyKh = {
        hoten: '',
        sdt: '',
        diachi:'',
        trangthai:''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            dichVus: [],
            khachhang: this.emptyKh,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const dv = await (await fetch(`/gvnhanh/loaidichvu/${this.props.match.params.id}`)).json();
        this.setState({
            dichVus:dv      
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name= target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});

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

        this.setState({item}, async () => {
            if(this.state.item["ngaylam"] && this.state.item["ngaylam"]<ng){
                alert("Không được chọn ngày đã qua!");
                this.setState({
                    item:{
                        hoten: this.state.item["hoten"],
                        sdt: this.state.item["sdt"],
                        diachilamviec: this.state.item["diachilamviec"],
                        ngaylam: '',
                        congviec: this.state.item["congviec"],
                        trangthai: 'Chưa duyệt',
                        dichvu: this.state.item["dichvu"],
                    }
                })
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const {khachhang} = this.state;

        const sv = await (await fetch(`/gvnhanh/khachhang/service/${item["sdt"]}`)).json();
        if(sv===true){
           confirmAlert({
              title: 'Cảnh báo!',
              message: 'Khách hàng không được đặt dịch vụ do đã vi phạm quy định. Liên hệ với công ty để biết thêm chi tiết!',
              buttons: [
                {
                  label: 'OK',
                  onClick: () => this.props.history.push("/contact")
               
                }
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

            // this.setState({
            //     khachhang:{
            //         hoten: this.state.item["hoten"],
            //         sdt: this.state.item["sdt"],
            //         diachi: this.state.item["diachilamviec"],
            //         trangthai: false,
            //     }
            // })
            this.state.khachhang.hoten = item["hoten"];
            this.state.khachhang.sdt = item["sdt"];
            this.state.khachhang.diachi = item["diachilamviec"];
            this.state.khachhang.trangthai = false;
            console.log("kh", khachhang);

            await fetch('/gvnhanh/khachhang', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khachhang),

            });

            await fetch('/gvnhanh/yeucau', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            });
          
            confirmAlert({
              title: 'Yêu cầu thành công!',
              message: 'Nhân viên công ty sẽ liên lạc với bạn trong 24h.',
              buttons: [
                {
                  label: 'OK',
                  onClick: () => window.location.reload(false)
               
                }
              ],
               childrenElement: () => null,
                closeOnClickOutside: true,
                closeOnEscape: true,
                willUnmount: () => null,
                onClickOutside: () => null,
                onKeypressEscape: () => null
            });
        }

    }
    render() {
        

        const {item} = this.state;
        const {dichVus} = this.state;
        this.state.item.dichvu = this.state.dichVus.tenloai;
        return (
            <div>
                <div className="container">
                    <h1 className="mt-4 mb-3">
                    <span style={{color: '#fc9e26'}}>
                    Đặt lịch 
                    </span>
                    <small>
                    {/*<span style={{color: '#fb8533'}}>
                        {dichVus.tenloai}
                    </span>*/}
                    </small>
                </h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Trang chủ</a>
                        </li>
                        <li className="breadcrumb-item active"> {dichVus.tenloai}</li>
                    </ol>
                    <div className="row">
                        <div className="col-md-5">
                            
                            <img className="img-fluid rounded mb-3 mb-md-0" src={dichVus.anh} alt="" />
                          
                        </div>
                        <div className="col-md-7">
                            <form onSubmit={this.handleSubmit}>
                                {/* form-khachhang */}
                                <div className="title-form-service">
                                    <span style={{fontWeight: 700}}>
                            Tên khách hàng 
                            <label htmlFor style={{color: 'red'}}>*</label>
                        </span>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                    </div>
                                    <input name="hoten" id="hoten" value={item.hoten ||''} className="form-control" 
                                    placeholder="Nhập tên khách hàng" type="text"onChange={this.handleChange} required/>
                                </div>
                                {/* ket thuc form-khách hàng */} {/* form-sodienthoai */}
                                <div className="title-form-service">
                                    <span style={{fontWeight: 700}}>
                            Số điện thoại 
                            <label htmlFor style={{color: 'red'}}>*</label>
                        </span>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                    </div>
                                    <input name="sdt" id="sdt" value={item.sdt ||''} className="form-control" 
                                    placeholder="Nhập số điện thoại " type="text" onChange={this.handleChange} 
                                    title="Hãy nhập đúng 10 chữ số điện thoại" pattern="[0-9]{10}" required/>
                                </div>
                                {/* ket thuc form-khách hàng */} {/* form-dia chi */}
                                <div className="title-form-service">
                                    <span style={{fontWeight: 700}}>
                            Địa chỉ 
                            <label htmlFor style={{color: 'red'}}>*</label>
                        </span>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                    </div>
                                    <input name="diachilamviec" id="diachilamviec" value={item.diachilamviec ||''} className="form-control" 
                                    placeholder="Nhập địa chỉ" type="text" onChange={this.handleChange} required/>
                                </div>
                                {/* ket thuc form-diachi */} {/* form-thoigian */}
                                <div className="title-form-service">
                                    <span style={{fontWeight: 700}}>
                            Chọn thời gian làm
                            <label htmlFor style={{color: 'red'}}>*</label>
                        </span>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                    </div>
                                    <input name="ngaylam" id="ngaylam" value={item.ngaylam ||''} className="form-control" 
                                    placeholder="Đặt dịch vụ" type="date" onChange={this.handleChange} required/>
                                </div>
                                {/* ket thuc form-tgian */} {/* form-mota */}
                                <div className="title-form-service">
                                    <span style={{fontWeight: 700}}>
                            Chi tiết công việc
                            <label htmlFor style={{color: 'red'}}>*</label>
                        </span>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                    </div>
                                    <textarea className="form-control" rows={5} name="congviec" id="congviec" 
                                    value={item.congviec ||''} onChange={this.handleChange} required/>
                                </div>
                                {/* ket thuc form-mota */} {/* form-submit// */}
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Đặt dịch vụ</button>
                                </div>
                            </form>
                        </div>
                        {/* /.row */}
                        <hr /> {/* card.// */}
                    </div>
                    {/* /.container */}
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterServiceContain);