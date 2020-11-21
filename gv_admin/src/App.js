import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar';
import Sidebar from './component/sidebar';
import Dashboard from './component/dashboard';
import Footer from './component/footer';
import Listloaidv from './component/list/listloaidv';
import Listbangphidv from './component/list/listbangphidv';
import Listnguoigv from './component/list/listnguoigv';
import Listtuyendung from './component/list/listtuyendung';
import Listhdlaodong from './component/list/listdhlaodong';
import Listkhachhang from './component/list/listkhachhang';
import Listyeucau from './component/list/listyeucau';
import Listlichhen from './component/list/listlichhen';
import Listhdthue from './component/list/listhdthue';
import Listnhanvien from './component/list/listnhanvien';
import Listtaikhoan from './component/list/listtaikhoan';
import Themloaidv from './component/new/themloaidv';
import Thembangphidv from './component/new/thembangphidv';
import Themhdlaodong from "./component/new/themhdlaodong";
import Themnhanvien from "./component/new/themnhanvien";
import Themtaikhoan from "./component/new/themtaikhoan";

import Upload from "./component/Register.js";

class App extends Component {
  
  render(){

      return (
        <Router>
        <body className="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
            
            {/*navbar*/}
            <Navbar />

           {/* <!-- Main Sidebar Container -->*/}
           <Sidebar />

            <Switch>
                {/*Dashboard*/}
                <Route path="/" component={Upload} exact />
            </Switch> 
                     
            <Switch>
                {/*Dashboard*/}
                <Route path="/dashboard" component={Dashboard} exact />
            </Switch> 

            <Switch>
                {/*Loại dịch vụ*/}
                <Route path="/loaidv" component={Listloaidv} exact />
           </Switch>

            <Switch>
                {/*Loại dịch vụ*/}
                <Route path="/loaidv/:id" component={Themloaidv} exact />
           </Switch>

           <Switch>
                {/*Bảng phí dịch vụ*/}
                <Route path="/bangphidv" component={Listbangphidv} exact />
           </Switch>

           <Switch>
                {/*Thêm bảng phí dịch vụ*/}
                <Route path="/bangphidv/thembangphidv" component={Thembangphidv} exact />
           </Switch>

           <Switch>
                {/*Người giúp việc*/}
                <Route path="/nguoigv" component={Listnguoigv} exact />
           </Switch>

           <Switch>
                {/*Danh sách tuyển dụng*/}
                <Route path="/tuyendung" component={Listtuyendung} exact />
           </Switch>

           <Switch>
                {/*Danh sách hợp đồng lao động*/}
                <Route path="/hdlaodong" component={Listhdlaodong} exact />
           </Switch>

           <Switch>
                {/*Thêm hợp đồng lao động*/}
                <Route path="/hdlaodong/themhdlaodong" component={Themhdlaodong} exact />
           </Switch>

           <Switch>
                {/*Danh sách khách hàng*/}
                <Route path="/khachhang" component={Listkhachhang} exact />
           </Switch>

           <Switch>
                {/*Danh sách yêu cầu*/}
                <Route path="/yeucau" component={Listyeucau} exact />
           </Switch>

           <Switch>
                {/*Danh sách lịch hẹn*/}
                <Route path="/lichhen" component={Listlichhen} exact />
           </Switch>

           <Switch>
                {/*Danh sách hợp đồng thuê dịch vụ*/}
                <Route path="/hdthue" component={Listhdthue} exact />
           </Switch>

           <Switch>
                {/*Danh sách nhân viên*/}
                <Route path="/nhanvien" component={Listnhanvien} exact />
           </Switch>

           <Switch>
                {/*Thêm nhân viên*/}
                <Route path="/nhanvien/:id" component={Themnhanvien} exact />
           </Switch>

           <Switch>
                {/*Danh sách tài khoản*/}
                <Route path="/taikhoan" component={Listtaikhoan} exact />
           </Switch>

            <Switch>
                {/*Thêm tài khoản*/}
                <Route path="/taikhoan/themtaikhoan" component={Themtaikhoan} exact />
           </Switch>

           {/*Footer*/}
           <Footer />

        </div>
        </body>
        </Router>
      );
  }
  
}

export default App;