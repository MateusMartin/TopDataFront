import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/Models/Profile.models';
import { Observable } from 'rxjs';
import { CadastroModel } from 'src/Models/Cadastro.model';
import { TabelaMenu } from 'src/Models/TabelaMenu.model';
import { UpdateModel } from 'src/Models/Udate.model';

@Injectable({
  providedIn: 'root'
})


export class ApiCalls {

    Profiles: Profile[] = [];

    private apiUrl = 'http://localhost:8080/api';
    private apiUser = 'mateus';
    private apiPassWord = '1234';
    data: any;
    url: any;
    refreshT = sessionStorage.getItem('RefreshToken') ?? "";
  
    constructor(private http: HttpClient) {}
  
    async login() {
      
      const stringDate = sessionStorage.getItem('dt_crt') ?? ""
      


      if(stringDate != ""){
        const date1: Date = new Date(stringDate);
        const date2: Date = new Date();      

        const diffInMilliseconds: number = date2.getTime() - date1.getTime();
        const diffInMinutes: number = Math.floor(diffInMilliseconds / (1000 * 60));

        if(diffInMinutes < 6)
        {

          return "OK";
        } else 
        {

          this.url = `${this.apiUrl}/auth/token`;

          this.data = {
            refreshT : this.refreshT,
            
          };
        }



      }

      else {
      this.url = `${this.apiUrl}/auth/login`;

      
      
      
      this.data = {
        username: this.apiUser,
        password: this.apiPassWord
      };

    }
    
      try {
        const response = await this.http.post(this.url, this.data).toPromise();
        const jsonResponse = response as any;            
    
        sessionStorage.setItem('Uid', jsonResponse.userID);
        sessionStorage.setItem('Token', jsonResponse.accessToken);
        sessionStorage.setItem('RefreshToken', jsonResponse.refreshT);
        sessionStorage.setItem('dt_crt', new Date().toString());    
    
        return 'OK';
      } catch (error) {
        throw new Error('Erro ao fazer a requisição à API');
      }
    }
    
    
    chamarAPIComToken(token: string): Observable<Profile[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        return this.http.get<Profile[]>(this.apiUrl+'/topdata/users/profile', { headers });
      }




      async cadastrar(cadastroModel: CadastroModel) : Promise<String> {
      
        const stringDate = sessionStorage.getItem('dt_crt') ?? ""            
  
        this.url = `${this.apiUrl}/topdata/users/registrar`;      
        
        this.data = {
          nome: cadastroModel.nome,
          profile: {
              id: cadastroModel.profile_id,
              Nome: ""
          },
          email : cadastroModel.email,
          password: cadastroModel.senha
      
      }          
        try {
          const response = await this.http.post(this.url, this.data, 
            {
              headers: 
              {                
                'Authorization': `Bearer ${sessionStorage.getItem('Token')}`
              }

            }).toPromise();
          const jsonResponse = response as any;          
          
          if(jsonResponse.id != 0)
          {

            return "Sucesso";
          } else 
          {

            return "Erro";
          }


          
        } catch (error) {
          return 'Erro ao fazer a requisição à API';
        }
      }





      async atualizar(updateModel: UpdateModel) : Promise<String> {
      
        const stringDate = sessionStorage.getItem('dt_crt') ?? ""            
  
        this.url = `${this.apiUrl}/topdata/users/update`;      
     
        try {
          const response = await this.http.post(this.url, updateModel, 
            {
              headers: 
              {                
                'Authorization': `Bearer ${sessionStorage.getItem('Token')}`
              }

            }).toPromise();
          const jsonResponse = response as any;          
          console.log(jsonResponse);
          if(jsonResponse.menssagem == "Usuario alterado com sucesso")
          {

            return "Sucesso";
          } else 
          {

            return "Erro";
          }


          
        } catch (error) {
          
          return 'Erro ao fazer a requisição à API';
        }
      }




      async logarSistema(email: String, senha: String) : Promise<String> {
      
        const stringDate = sessionStorage.getItem('dt_crt') ?? ""            
  
        this.url = `${this.apiUrl}/topdata/users/logar`;                     
        
        this.data = 
        {
          username: email,
          password: senha
        }                      

        console.log(this.data);
        try {
          const response = await this.http.post(this.url, this.data, 
            {
              headers: 
              {                
                'Authorization': `Bearer ${sessionStorage.getItem('Token')}`
              }

            }).toPromise();
          const jsonResponse = response as any;     
          
          console.log(jsonResponse);
          if(jsonResponse.menssagem == "Usuario ou Senha Incorretos")
          {
            return jsonResponse.menssagem;

          } 
          else 
          {
            localStorage.setItem('UserId', jsonResponse.id);
            localStorage.setItem('UserEmail', jsonResponse.email);
            localStorage.setItem('UserProfile', jsonResponse.profile_Id);
            localStorage.setItem('UserNome', jsonResponse.nome);
            return "Logado";
          }                                
          
        } catch (error) {          
          return 'Erro ao fazer a requisição à API';
        }
      }




      carregarUsuarios(nome: string | null, email: string | null, profile: string | null): Observable<TabelaMenu[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem('Token')}`
        });

        
      
        const body = {
          nome: nome,
          email: email,
          profile: profile
        };
      
        return this.http.post<TabelaMenu[]>(`${this.apiUrl}/topdata/users/buscar`, body, { headers });
      }



    


  
}

  