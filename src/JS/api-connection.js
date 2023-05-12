var url_base = "http://localhost:8080/";
var login = "mateus";
var senha = "1234";


async function loginApi() {  
var url= "";
  console.log(sessionStorage.getItem('dt_crt'));

  if(sessionStorage.getItem('dt_crt') == null)
  {
    
    url = url_base + "api/auth/login";
  } else
  {
    var diffMs = (new Date() - new Date(sessionStorage.getItem('dt_crt'))); // milliseconds between now & Christmas
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    console.log("Day Dif "+ diffMins);

    if(diffMins < 6)
    {

      console.log(sessionStorage.getItem('Uid'));
      console.log(sessionStorage.getItem('Token'));
      console.log(sessionStorage.getItem('RefreshToken'));
      console.log(sessionStorage.getItem('dt_crt'));  

      return "OK";
    }
    else 
    {      
      
      return resetToken();
    }
    
  }
    

    const data = {
      username: login,
      password: senha
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Erro ao fazer a requisição à API");
    }
    const jsonResponse = await response.json();      

    sessionStorage.setItem("Uid" , jsonResponse.userID);
    sessionStorage.setItem("Token", jsonResponse.accessToken);
    sessionStorage.setItem("RefreshToken", jsonResponse.refreshT);
    sessionStorage.setItem("dt_crt", new Date());

    console.log(sessionStorage.getItem('Uid'));
    console.log(sessionStorage.getItem('Token'));
    console.log(sessionStorage.getItem('RefreshToken'));
    console.log(sessionStorage.getItem('dt_crt'));  


    return "OK";
  }


  async function resetToken() 
  {

    const url = url_base + "api/auth/token";
    console.log("resetTko");

    const data = {
      refreshT: sessionStorage.getItem('RefreshToken')      
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Erro ao fazer a requisição à API");
    }
    const jsonResponse = await response.json();      

    sessionStorage.setItem("Uid" , jsonResponse.userID);
    sessionStorage.setItem("Token", jsonResponse.accessToken);
    sessionStorage.setItem("RefreshToken", jsonResponse.refreshT);
    sessionStorage.setItem("dt_crt", new Date());

    console.log(sessionStorage.getItem('Uid'));
    console.log(sessionStorage.getItem('Token'));
    console.log(sessionStorage.getItem('RefreshToken'));
    console.log(sessionStorage.getItem('dt_crt'));  


    return "OK";
    
  }



  async function loginWithToken(usuario,senha) {
    const url = url_base+"api/topdata/users/logar";
    const data = {
      username: usuario,
      password: senha,
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem('Token')
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      return "Usuario ou Senha Incorretos";
    }
  
    const jsonResponse = await response.json();


 
      sessionStorage.setItem("UserLgd" , jsonResponse.id);
      sessionStorage.setItem("Nome", jsonResponse.nome);
      sessionStorage.setItem("email", jsonResponse.email);
      sessionStorage.setItem("profId", jsonResponse.profile_id);      
    

   



    return jsonResponse;
  }

