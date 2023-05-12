import { Component, OnInit } from '@angular/core';
import { ApiCalls } from '../ApiCalls';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email: string = "";
  password: string = "";


  constructor(private http: HttpClient, private apiCall: ApiCalls,private router: Router) {}

  async ngOnInit(): Promise<void> {    

    const idLogdao = localStorage.getItem('UserId') ?? "";
    
    if(idLogdao != "" && idLogdao != "0")
    {
      this.router.navigate(['/menu']);
    }


    
        

  }


  async logar()
  {
    if(this.email == "")
    {
      Swal.fire({
        title: "Preencha o campo email",
        icon: "error",
        confirmButtonText: "OK"
      })   

      return false;
    }

    if(this.password == "")
    {
      Swal.fire({
        title: "Preencha o senha",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    }

    await this.apiCall.login();     


    const ret = await this.apiCall.logarSistema(this.email,this.password);

    if(ret != "Logado")
    {
      Swal.fire({
        title: "Usuario ou Senha Incorretos",
        icon: "error",
        confirmButtonText: "OK"
      })   
    } else
    {
      this.router.navigate(['/menu']);
    }

    return false;
  }
  

}
