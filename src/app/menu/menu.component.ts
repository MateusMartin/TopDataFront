import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TabelaMenu } from 'src/Models/TabelaMenu.model';
import { ApiCalls } from '../ApiCalls';
import { Profile } from 'src/Models/Profile.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
 dadosTabela: TabelaMenu[] =[];
 profiles: Profile[] = [];
 selectedProfile: string = "";
 filtroNome: string = "";
 filtroEmail: string = ""
 userLogado: string = localStorage.getItem('UserNome') ?? ""
 itemsPorPagina = 5; // Quantidade de itens por página
 paginaAtual = 1; // Página atual

 constructor(private cdr: ChangeDetectorRef,private apiCall: ApiCalls,private router: Router) {}


  async ngOnInit(): Promise<void> {

    const idLogdao = localStorage.getItem('UserId') ?? "";
    
    if(idLogdao == "" || idLogdao == "0")
    {
      this.router.navigate(['']);
    }


    this.carregarDadosTabela(null,null,null);


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


  async carregarDadosTabela(nome: string | null,email: string | null,profile: string | null): Promise<void> {
    await this.apiCall.login();


    this.apiCall.carregarUsuarios(nome,email,profile).subscribe(
      (response: TabelaMenu[]) => {
        console.log(response);
        this.dadosTabela = response;
      },
      (error) => {
        console.error(error);
      }
    );
   
  }

  async filtrar()
  {
    const nome = this.filtroNome === "" ? null : this.filtroNome;
    const email = this.filtroEmail === "" ? null : this.filtroEmail;
    const profile = this.selectedProfile === "" ? null : this.selectedProfile;

    await this.carregarDadosTabela(nome,email,profile);

    this.cdr.detectChanges();
  }


  logout()
  {
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserProfile');
    localStorage.removeItem('UserNome');
    this.router.navigate(['']);
  }


}
