import React, { Component } from 'react'
import {BusinessService} from '../../services/business.service';
export class Hierarchy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hierarchy: {
                name: '',
                parent: ''
            },
            hierarchyList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addHierarchy = this.addHierarchy.bind(this);
    }
    componentDidMount(){
        BusinessService.hierarchyList('BT').then(res=>{
            this.setState({hierarchyList:JSON.parse(JSON.stringify(res))},()=>{
                console.log(this.state.hierarchyList)
            });
        })
    
        
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ hierarchy: { ...this.state.hierarchy, [name]: value } });
    }
    addHierarchy() {
        //this.state.hierarchyList.push(this.state.hierarchy);
        this.setState({
            hierarchy: {
                name: '',
                parent: ''
            },
            hierarchyList: [...this.state.hierarchyList, this.state.hierarchy]
        }, () => {
            console.log(JSON.stringify(this.state.hierarchyList))
        })
    }
    saveHierarchy(){
        BusinessService.hierarchy({'hierarchy':this.state.hierarchyList});
    }
    render() {
        return (
            <div>
                <h3>Business Hierarchy</h3><br />
                <button type="submit" class="btn btn-primary" style={{width:'80px',float:'right',marginTop:'-50px'}} onClick={()=>this.saveHierarchy()}>Save</button>
                <div className="row col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" value={this.state.hierarchy.name}
                                name="name" onChange={this.handleChange} />

                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="form-group">
                            <label htmlFor="dateFormat">Parent Hierarchy</label>
                            <select className="form-control" id="dateFormat" value={this.state.hierarchy.parent}
                                name="parent" onChange={this.handleChange}>
                                <option value="">Select</option>
                                {this.state.hierarchyList.map(hierarchy => {
                                    return <option value={hierarchy.name}>{hierarchy.name}</option>;
                                })}

                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-6">

                        <button className="btn btn-primary" style={{ marginTop: '30px' }} value="Add"
                            onClick={() => this.addHierarchy()}>Add</button>
                    </div>
                </div>
                <div>
                    <table class="table table-bordered">
                        <thead>
                            <tr style={{backgroundColor:'#7952b3',color:'white'}}>

                                <th scope="col">Hierarchy</th>
                                <th scope="col">Parent Hierarchy</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.hierarchyList.length==0?'No Records':''}
                            {this.state.hierarchyList.map(hr => {
                                return (<tr key={hr.id}>
                                    <td>{hr.name}</td>
                                    <td>{hr.parentName}</td>
                                    <td></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Hierarchy
