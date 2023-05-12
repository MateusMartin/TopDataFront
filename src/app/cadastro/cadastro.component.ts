import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiCalls } from '../ApiCalls';
import { Profile } from 'src/Models/Profile.models';
import { CadastroModel } from 'src/Models/Cadastro.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';






@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  profiles: Profile[] = [];
  cadastroModel!: CadastroModel;
  

  firstName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  selectedProfile: string = "";
  

  constructor(private http: HttpClient, private apiCall: ApiCalls,private router: Router) {}

  async ngOnInit(): Promise<void> {    

    console.log("init Login Request");
    var result = await this.apiCall.login();
  
    const test = sessionStorage.getItem('Token') ?? '';    
    this.apiCall.chamarAPIComToken(test).subscribe(
      (response: Profile[]) => {
        console.log(response);
        this.profiles = response;
      },
      (error) => {
        console.error(error);
      }
    );

   
    //console.log(this.profiles);

    
    
 


  }

  async cadastro()
  {

    if(this.firstName == "")
    {      
      Swal.fire({
        title: "Preencha o campo Nome",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    } 

    else if (this.password == "" || this.confirmPassword == "")
    {
           
      Swal.fire({
        title: "Preencha o campo senha e confirmação de senha",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    }

    else if( this.password != this.confirmPassword)
    {      
      Swal.fire({
        title: "As senhas não coencidem",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    }

    else if(this.email == "")
    {   
      Swal.fire({
        title: "preecha o campo E-mail",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    }

    else if(this.selectedProfile == "")
    {
      Swal.fire({
        title: "Selecione um perfil",
        icon: "error",
        confirmButtonText: "OK"
      })   
      return false;
    }

      this.cadastroModel = 
      {
        nome: this.firstName,
        email: this.email,
        senha: this.password,
        profile_id: parseInt(this.selectedProfile)

      };
      

      console.log("cadastrando")
      const str = await this.apiCall.cadastrar(this.cadastroModel)      

      if(str == "Sucesso")
      {
        
        Swal.fire({
          title: "Sucesso ao Cadastrar",
          icon: "success",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {            
            console.log("Ação executada após clicar em OK");
            this.router.navigate(['']);
          }
        });
        
      }else 
      {
        Swal.fire({
          title: "Erro ao Cadastrar",
          icon: "error",
          confirmButtonText: "OK"
        })       
      }


      
    return false;
  }

  


}

