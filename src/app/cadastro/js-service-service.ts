import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JSService {
  url_base = "http://localhost:8080/";
  login = "mateus";
  senha = "1234";

  async loginApi() {
    // Implementação do método loginApi
  }

  async resetToken() {
    // Implementação do método resetToken
  }

  async loginWithToken(usuario: string, senha: string) {
    // Implementação do método loginWithToken
  }
}