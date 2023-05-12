


async function logarSistema()
{  
  var email = document.getElementById("typeEmailX").value;
  var password = document.getElementById("typePasswordX").value;
  
  if(email == "")
  {
    alert("Informe o E-mail");

    return false;
  }

  if(password == "")
  {

    alert("Informe a senha");

    return false;
  }

  var ret = await loginApi();

  if(ret == 'OK')
  {    

    var TryLogIn = await loginWithToken(email,password);
    
    console.log(TryLogIn);

    if(TryLogIn == "Usuario ou Senha Incorretos")
    {

      alert("Usuario ou Senha Incorretos");

    } else
    {

      alert("logado");

    }


  
  }  else 
  {

    alert("Algo deu errado tente novamente mais Tarde");

  }


 

}