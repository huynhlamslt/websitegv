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

class RegisterStaff extends Component {

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
        trangthai: '',
        del: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            dichVus: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const dv = await (await fetch('/gvnhanh/loaidichvu')).json();
        this.setState({
            dichVus:dv      
        })
        // const {dichVus} = this.state;
        // console.log("dv", this.state.dichVus[0].tenloai);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name= target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});

        // this.setState({[event.target.id]: event.target.value});
        
         // this.setState({
      //     input: event.target.value
      //   });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const {dichVus} = this.state;
        this.state.item.trangthai='false';
        this.state.item.del='false';

        if(this.state.item.dvdangky===''){
            //alert("loi")
            this.state.item.dvdangky= this.state.dichVus[0].tenloai;
        }
        console.log("item", item);

        await fetch('/gvnhanh/nguoigv', {
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

        //this.props.history.push('/home');
        //window.location.reload(false);
    }

    render() {

        const {item} = this.state;
        const {dichVus} = this.state;

        return (
            <div className="container">
                <div className="card bg-light">
                    <article className="card-body mx-auto" style={{maxWidth: '400px'}}>
                    <h4 className="card-title mt-3 text-center">Đăng ký trở thành NHÂN VIÊN 
                    <br />
                        <span style={{color: '#881A7C', width: '50px', fontWeight: 1000}}>
                        GiupViecNhanh.com
                        </span>
                    </h4>
                    <p className="text-center">Các bước chuẩn bị đăng ký</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user" /> </span>
                        </div>
                            <input name="hoten" id="hoten" value={item.hoten ||''} type="text" onChange={this.handleChange}
                            className="form-control" placeholder="Họ tên" type="text" required/>
                        </div>
                        {/* form-group// */}
                        
                        {/* form-group// */}
                        <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                        </div>
                            <input name="quequan" id="quequan" value={item.quequan ||''} onChange={this.handleChange}
                            className="form-control" placeholder="Địa chỉ" type="text" required/>
                            </div>
                        {/* form-group// */}
                        {/* form-group// */} 
                        <div className="title-form-service mb-1">
                        <span>
                            Ngày sinh
                        </span>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user" /> </span>
                            </div>
                            <input name="ngaysinh" id="ngaysinh" value={item.ngaysinh ||''} type="text"onChange={this.handleChange}
                             className="form-control" placeholder="Đặt dịch vụ" type="date" required/>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone" /> </span>
                            </div>
                           
                            <input name="sdt" id="sdt" value={item.sdt ||''} type="text"onChange={this.handleChange}
                             className="form-control" placeholder="Số điện thoại" type="text" 
                             title="Hãy nhập đúng 10 chữ số điện thoại" pattern="[0-9]{10}" required/>
                        </div>
                        {/* form-group// */}
                        <span>
                            Công việc
                        </span>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-building" /> </span>
                            </div>
                            <Input type="select" className="form-control" name="dvdangky" id="dvdangky" value={item.dvdangky ||''} 
                            onChange={this.handleChange} required>
                                {this.state.dichVus.map((item, index) => (
                                    <option value={item.tenloai}>{item.tenloai}</option>
                                ))}*
                            </Input>
                        </div>
                       

                        {/* form-group end.// */}
                       
                        {/* form-group// */}
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">GỬI ĐĂNG KÝ</button>
                        </div>
                        {/* form-group// */}
                        
                    </form>
                    </article>
                </div>
            </div>

        );
    }
}

export default withRouter(RegisterStaff);