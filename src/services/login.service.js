import API_URL from './url';
export const loginService={
    login
};


async function login(name,pwd) {
    // Default options are marked with *
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ userName:name, password:pwd })
    };
    const response = await fetch(API_URL+`/login/authenticate`, requestOptions);
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  
 