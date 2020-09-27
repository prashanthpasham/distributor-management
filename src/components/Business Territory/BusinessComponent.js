import React, { Component } from 'react'
import { BusinessService } from '../../services/business.service';
class BusinessComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hierarchyList: [],
            hierarchy: {
                'parentBusinessId': 0,
                'masterLookupId': 0,
                'businessName': ""
            },
            dialog:"none"
        }
        this.addData = this.addData.bind(this);
        this.onBsSelection = this.onBsSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.closeDialog=this.closeDialog.bind(this);
    }
    componentDidMount() {
        BusinessService.BtHierarchList().then(res => {
            this.setState({ hierarchyList: JSON.parse(JSON.stringify(res)) }, () => {
                console.log(this.state.hierarchyList)
            });
        })


    }
    openAddDialog(bt) {
       
        if (bt['parentId'] == 0 || this.state.hierarchy.parentBusinessId > 0) {
            this.setState({hierarchy:{...this.state.hierarchy,'masterLookupId': bt['id'] },'dialog':"block" });
            
        } else {
            alert("Please Select value in " + bt['parentName']);
        }
    }
    addData() {
       
        if (this.state.hierarchy.businessName.trim().length > 0) {

            BusinessService.saveBusinessData(this.state.hierarchy).then(res => {
                this.closeDialog();
                alert(res);
            })
        } else {
            alert("please provide name");
        }

    }
    onBsSelection(event) {
      let data=  event.target.value.split("@");
           
            let dataList=this.state.hierarchyList;
            dataList.forEach(lookup=>{
                 if(lookup.id>eval( data[0])){
                     lookup.items=[];
                 }
             });
          
        this.setState({ 'hierarchyList':dataList, hierarchy: { ...this.state.hierarchy,'parentBusinessId': data[1] } }
        ,()=>{
            BusinessService.selectedBTList(this.state.hierarchy.parentBusinessId).then(res => {
              
                let data=JSON.parse(JSON.stringify(res));
                let list=this.state.hierarchyList;
             list.forEach(lookup=>{
                  if(lookup.id==data.masterLookupId){
                      lookup.items=data.items;
                  }
              });
              this.setState({'hierarchyList':list});
            })
        });
       
    }
    handleChange(e) {
        this.setState({ hierarchy: { ...this.state.hierarchy,'businessName': e.target.value.trim() } });
    }
    closeDialog(){
        this.setState({'dialog':"none" });
    }
    render() {
        return (
            <div className="col-md-12">
                <h3>Business Territory SetUp</h3><br />
                {this.state.hierarchyList.map(hr => {
                    return (<div className="col-md-3" style={{ display: 'inline-block' }}>
                        <label>{hr.name}</label>
                        <select  className="form-control" value={hr.selectedvalue} onChange={this.onBsSelection}>
                            {hr.items.map(item => { return (<option key={item.id} value={item.bsid}>{item.name}</option>) })}
                        </select>
                        <br/>
                        <button className="btn btn-primary" onClick={() => this.openAddDialog(hr)}>Add</button>
                        <button className="btn btn-success" style={{ marginLeft: '10px' }} onClick={() => this.openAddDialog(hr)}>Edit</button>
                    </div>)
                })}

              <div className="modal  in" style={{display:this.state.dialog}}>
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">
                        <div className="modal-header">
                          
                            <h4 className="modal-title">Business Territory</h4>
                        </div>
                        <div className="modal-body">
                            <label>Name *</label>
                            <input type="text" className="form-control" value={this.state.hierarchy.businessName} onChange={this.handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={this.addData}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={this.closeDialog}>Close</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default BusinessComponent
