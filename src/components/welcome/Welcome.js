import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import CompanyInfo from '../Company/CompanyInfo';
import Hierarchy from '../Business Territory/Hierarchy';
import BusinessComponent from '../Business Territory/BusinessComponent';
const menuItems = [
    {
        'menu': 'Company Info',
        'url': 'company-info'
    },{
        'menu': 'Business Hierarchy',
        'url': 'business-hierarchy'
    },{
        'menu':'Business Territory',
        'url':'business-territory'
    }
];
class Welcome extends Component {

    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            userName: user.userName,
            menus: JSON.parse(localStorage.getItem('menus'))
        }
        this.logout = this.logout.bind(this);
        this.onMenuChange = this.onMenuChange.bind(this);
    }
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('menus');
        this.props.history.push('/');
    }
    onMenuChange(menu) {

        for (let i = 0; i < menuItems.length; i++) {
            let menuItem = menuItems[i];
            if (menuItem['menu'] === menu) {
                this.props.history.push("/app/" + menuItem['url']);
                break;
            }
        }
    }
    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <a className="navbar-brand">Welcome :<span style={{ color: 'red' }}>{this.state.userName}</span></a>

                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => this.logout()}>Logout</button>

                    </nav>
                </div>
                <div className="row container">
                    <div style={{ width: '300px', height: '100%' }}>
                        <nav className="navbar navbar-light bg-light">

                            <div className="accordion" id="accordionExample">
                                {this.state.menus.map((menuGrp, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <div className="card-header" id="headingOne">
                                                <h2 className="mb-0">
                                                    <button className="btn  btn-block text-left" type="button" data-toggle="collapse" data-target={`#` + index} aria-expanded="true" aria-controls="collapseOne">
                                                        {menuGrp.groupName}
                                                    </button>
                                                </h2>
                                            </div>

                                            <div id={index} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className="list-group-item">
                                                    {menuGrp.menuLinks.map((menu, index1) => {
                                                        return (
                                                            <div key={index1}>
                                                                <a onClick={() => this.onMenuChange(menu.menuItem)}>{menu.menuItem}<br /></a>
                                                                <br />

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>

                        </nav>
                    </div>
                    <div style={{ marginLeft:'20px',width:'70%' }}>
                        <Switch>
                            <Route path="/app/company-info" component={CompanyInfo} />
                            <Route path="/app/business-hierarchy" component={Hierarchy} />
                            <Route path="/app/business-territory" component={ BusinessComponent}/>
                        </Switch>
                    </div>

                </div>
            </div>
        )
    }
}

export default Welcome
