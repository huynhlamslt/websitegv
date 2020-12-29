import React, {Component} from 'react';



import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { withGlobalState } from 'react-globally';

import {
 BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";



class loginad extends Component{
	 emptyItem = {
        sdt: '',
        pass: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        
        const target = event.target;
        const value = target.value;
        const name= target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        // let dn=null;
        // event.preventDefault();
        // const target = event.target;
        // const value = target.value;
        // const name= target.name;
        // let item = {...this.state.item};
        // item[name] = value;
        // console.log("link", `/gvnhanh/taikhoan/${item["sdt"]}/${item["pass"]}`);
        // this.setState({item},async()=>{
        //     dn = await (await fetch(`/gvnhanh/taikhoan/${item["sdt"]}/${item["pass"]}`)).json();

        //     console.log("dn", dn);
        //     if(dn===0){
        //         alert("Sai user hoặc password");
        //         this.nameInput.focus();
        //         // this.setState({
        //         //   item:{
        //         //     pass:''
        //         //   } 
        //         // });
        //     }
            // else{
                this.props.setGlobalState({ counter: 1 });
                console.log(this.props)
                this.props.history.push("/dashboard")
        //     }
        // });
    }
    handleClick(){
        this.props.setGlobalState({ counter: 0 });
        //console.log(this.props)
        this.props.history.push("/");
    }

	render(){

		const {item} = this.state;

		return(
			<div className="container">
				{/* Outer Row */}
				<div className="row justify-content-center">
					<div className="col-xl-10 col-lg-12 col-md-9">
						<div className="card o-hidden border-0 shadow-lg my-5">
							<div className="card-body p-0">
								{/* Nested Row within Card Body */}
								<div className="row">
									<div className="col-lg-6 d-none d-lg-block bg-login-image" />
									<div className="col-lg-6">
										<div className="p-5">
											<div className="text-center">
												<h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
											</div>
											<form className="user" onSubmit={this.handleSubmit}>
												<div className="form-group"  >
													<input type="text" name="sdt" id="sdt" value={item.sdt || ''} onChange={this.handleChange}
													className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Username..." />
												</div>
												<div className="form-group">
													<input type="password" name="pass" id="pass" value={item.pass || ''} onChange={this.handleChange}
													className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" 
													ref={(input) => { this.nameInput = input; }}/>
												</div>
												<div className="form-group">
													<div className="custom-control custom-checkbox small">
														<input type="checkbox" className="custom-control-input" id="customCheck" />
														<label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
													</div>
												</div>
												<button type="submit" className="btn btn-primary btn-user btn-block">
													Login
												</button>
											</form>

											
											<hr />
											<div className="text-center">
												<a className="small" href="forgot-password.html">Forgot Password?</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default withGlobalState(withRouter(loginad));