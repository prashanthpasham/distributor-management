import React, { Component } from 'react'
import { BusinessService } from '../../services/business.service';
class BusinessComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hierarchyList: [],
            hierarchy: {
                'parentLookupId': 0,
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
       let flag=true;
       let parentBusinessId=0;
       if (bt['parentId'] >0){
       this.state.hierarchyList.forEach(lookup=>{ 
        if(lookup.id==bt.parentId){
           if(lookup.selectedValue!=lookup.id+"@0"){
            parentBusinessId=lookup.selectedValue.split("@")[1];
              flag=true;
           }else{
               flag=false;

           }
        }
       });
    }
        if (bt['parentId'] == 0 || flag) {
            this.setState({hierarchy:{...this.state.hierarchy,'masterLookupId': bt['id'],'parentBusinessId':parentBusinessId },'dialog':"block" });
            
        } else {
            alert("Please select any value in " + bt['parentName']);
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
    onBsSelection(event,obj) {
      let data=  event.target.value.split("@");
           obj['selectedValue']=event.target.value;
            let dataList=this.state.hierarchyList;
            dataList.forEach(lookup=>{
               
                 if(lookup.id>eval( data[0])){
                    lookup['selectedValue']=lookup.id+"@0";
                     lookup.items=[];
                 }
             });
          
        this.setState({ 'hierarchyList':dataList}
        ,()=>{
            BusinessService.selectedBTList(data[1]).then(res => {
              
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
                        <select  className="form-control" value={hr.selectedValue} onChange={(event)=>this.onBsSelection(event,hr)}>
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
