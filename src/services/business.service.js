import API_URL from './url';
export const BusinessService={
    hierarchy,
    hierarchyList,
    BtHierarchList,
    saveBusinessData,
    selectedBTList
};


async function hierarchy(hierarchy) {
    // Default options are marked with *
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization':'Bearer '+getJWTToken() },
        body: JSON.stringify(hierarchy)
    };
    const response = await fetch(API_URL+`/business/hierarchy`, requestOptions);
    return response.json(); // parses JSON response into native JavaScript objects
  };
  async function hierarchyList(type){
      console.log("getJWTToken>>"+getJWTToken());
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 'Access-Control-Allow-Origin': '*','Authorization':'Bearer '+getJWTToken() },
    };
    const response =  await fetch(API_URL+'/business/business-hierarchy?type='+type,requestOptions);
    return response.json();
 }
 async function BtHierarchList(){

  const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*','Authorization':'Bearer '+getJWTToken() },
  };
  const response =  await fetch(API_URL+'/business/business-territory',requestOptions);
  return response.json();
}
  
  function getJWTToken(){
    return  localStorage.getItem('Token');
 }

 async function saveBusinessData(data) {
  // Default options are marked with *
  const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization':'Bearer '+getJWTToken() },
      body: JSON.stringify(data)
  };
  const response = await fetch(API_URL+`/business/save-business-territory`, requestOptions);
  return response.text(); // parses JSON response into native JavaScript objects
};

async function selectedBTList(parentId){

  const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*','Authorization':'Bearer '+getJWTToken() },
  };
  const response =  await fetch(API_URL+'/business/business-territory/'+parentId,requestOptions);
  return response.json();
}
