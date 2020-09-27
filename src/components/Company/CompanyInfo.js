import React, { Component } from 'react'

class CompanyInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyName: '',
            dateFormat: 'dd-MM-yyyy',
            decimalPoints: 1,
            address: '',
            logo: '',
            password: {
                passwordType: 'alphanumeric',
                upperCase:false,
                lowerCase:false,
                specialcharacters:false,
                numeric:false,
                passwordMin:0,
                passwordMax:0,
                passwordExpiry:0,
                passwordAlert:0,
                pwdUnRepeat:0,
                maxLoginAttempts:0,
                accountLockTime:0

            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            console.log("call back>>" + this.state);
        });
    }
    passwordHandle(e) {
        const { name, value } = e.target;
        this.setState({ password: { ...this.state.password, [name]: value } }, () => {
            console.log('password' + JSON.stringify(this.state));
        });
    }
    render() {
        return (
            <div>
                <h2>Company Info</h2>
                <br />
                <button type="submit" class="btn btn-primary" style={{width:'80px',float:'right',marginTop:'-50px'}}>Save</button>
                <form noValidate="novalidate">
                    <div className="row col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <label htmlFor="company">Company Name</label>
                                <input type="text" className="form-control" id="company" value={this.state.companyName}
                                    name="companyName" onChange={this.handleChange} />

                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <label htmlFor="dateFormat">Date Format</label>
                                <select className="form-control" id="dateFormat" value={this.state.dateFormat}
                                    name="dateFormat" onChange={this.handleChange}>
                                    <option value="dd-MM-yyyy">DD-MM-YYYY</option>
                                    <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                                    <option value="MM-dd-yyyy">MM-dd-YYYY</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea className="form-control" id="address" value={this.state.address}
                                    name="address" onChange={this.handleChange} />

                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                                <label htmlFor="decimalPoints">Decimal Points</label>
                                <select className="form-control" id="decimalPoints" value={this.state.decimalPoints}
                                    name="decimalPoints" onChange={this.handleChange}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <a class="btn  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Password Policy
        </a>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne">
                        <div class="card-body">
                            <div className="row col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="passwordType">Password Type*</label>
                                        <select className="form-control" id="passwordType" value={this.state.password.passwordType}
                                            name="passwordType" onChange={this.passwordHandle}>
                                            <option value="alphanumeric">AplhaNumeric</option>
                                            <option value="numeric">Numeric</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label>Password Combination*</label>
                                        <div>
                                            <input type="checkbox" name="upperCase" value="upperCase" onChange={this.passwordHandle}></input>
                                            <label> UpperCase</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="lowerCase" value="lowerCase" onChange={this.passwordHandle}></input>
                                            <label>LowerCase</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="numeric" value="numeric" onChange={this.passwordHandle}></input>
                                            <label>Numeric</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="specialcharacters" value="specialcharacters" onChange={this.passwordHandle}></input>
                                            <label>Special Characters(@,#,$,%)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="pwdmin">Password Minimum</label>
                                        <input type="number" className="form-control" min="0" id="pwdmin" value={this.state.password.passwordMin}
                                            name="passwordMin" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="pwdmax">Password Maximum</label>
                                        <input type="number" className="form-control" min="0" id="pwdmax" value={this.state.password.passwordMax}
                                            name="passwordMax" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="pwdexp">Password Expiry(Days)</label>
                                        <input type="number" className="form-control" min="0" id="pwdexp" value={this.state.password.passwordExpiry}
                                            name="passwordExpiry" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                            </div>


                            <div className="row col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-4 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="pwdalert">Password Alert Notifications</label>
                                        <input type="number" className="form-control" min="0" id="pwdalert" value={this.state.password.passwordAlert}
                                            name="passwordAlert" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="pwdunrepeatable">UnRepeatable Password</label>
                                        <input type="number" className="form-control" min="0" id="pwdunrepeatable" value={this.state.password.pwdUnRepeat}
                                            name="pwdUnRepeat" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="maxpwdat">Max Login Attempts</label>
                                        <input type="number" className="form-control" min="0" id="maxpwdat" value={this.state.password.maxLoginAttempts}
                                            name="maxLoginAttempts" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-xs-6">
                                    <div className="form-group">
                                        <label htmlFor="acctime">Account Lock Time(sec)</label>
                                        <input type="number" className="form-control" min="0" id="acctime" value={this.state.password.accountLockTime}
                                            name="accountLockTime" onChange={this.passwordHandle} />

                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyInfo
