import { Component, OnInit } from '@angular/core';
import { ApiCalls } from '../ApiCalls';
import { Profile } from 'src/Models/Profile.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UpdateModel } from 'src/Models/Udate.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  firstName: string = localStorage.getItem('UserNome') ?? "";
  email: string = localStorage.getItem('UserEmail') ?? "";
  password: string = "";
  confirmPassword: string = "";
  selectedProfile: string = localStorage.getItem('UserProfile') ?? "";
  profiles: Profile[] = [];
  userLogado: string = localStorage.getItem('UserNome') ?? "";
  updateModel!: UpdateModel;
 

 



  constructor(private apiCall: ApiCalls,private router: Router) {}

  
  async ngOnInit(): Promise<void> {

    await this.apiCall.login();

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


    
  }
 


  logout()
  {
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserProfile');
    localStorage.removeItem('UserNome');
    this.router.navigate(['']);
  }

  async editar()
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
        title: "Preencha o campo E-mail",
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

      this.updateModel = 
      {
        id: parseInt(localStorage.getItem('UserId') ?? "0"),
        nome: this.firstName,
        email: this.email,
        password: this.password === "" ? null : this.password,
        profile: parseInt(this.selectedProfile)

      };
      

      console.log("cadastrando")
      const str = await this.apiCall.atualizar(this.updateModel)      

      if(str == "Sucesso")
      {
      
        localStorage.setItem('UserEmail', this.email);
        localStorage.setItem('UserProfile', this.selectedProfile);
        localStorage.setItem('UserNome', this.firstName);
        
        Swal.fire({
          title: "Sucesso ao Editar",
          icon: "success",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {            
            console.log("Ação executada após clicar em OK");
            this.router.navigate(['user']);
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
