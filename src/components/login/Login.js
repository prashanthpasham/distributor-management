import React, { Component } from 'react'
import './login.css';
import { loginService } from '../../services/login.service';

class Login extends Component {
     
    constructor(props) {
        super(props);

        this.state = {
            userName: 'sysadmin',
            password: '',
            error: ''
        }
        this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount() {
        this.ref.current.focus();
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    login() {
       
        //alert(this.state.userName+"@"+this.state.password);
        loginService.login(this.state.userName, this.state.password).then(data => {
            if (data.result === 'success'){
                localStorage.setItem('menus', JSON.stringify(data.menus));
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('user',JSON.stringify(data.user));
                localStorage.setItem('Token',data.token);
                this.props.history.push('/app');
             } else{
                this.setState({ error: data.error_message,password:'' });
                localStorage.setItem('isLoggedIn',false);
             }
        });
    }
    render() {
        return (
            <div className="loginform">
                <div className="card" >
                    <div className="card-body">
                        <h3>Distributor Management{this.props.spin}</h3>
                        <hr />
                        {this.state.error.length>0? <div className="alert alert-danger" role="alert">
                          {this.state.error}
                        </div>:''}
                        <form noValidate="novalidate">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" ref={this.ref} value={this.state.userName}
                                    name="userName" onChange={this.handleChange} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="password" className="form-control" id="Password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />

                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary form-control"
                                    onClick={() => this.login()}>Login</button>
                            </div>
                            <div className="form-group " style={{ float: 'right' }}>
                                <a  >Forgot Password?</a>

                            </div>
                            <br />
                        </form>

                    </div>

                </div>
            </div>


        )
    }
}

export default Login
