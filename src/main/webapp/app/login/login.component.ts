// src/main/webapp/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import {
  LoginService
} from "./login.service";

@Component({
  selector: 'jhi-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgbModule],
  template: `
    <div class="container mt-5  ">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Connexion</h2>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Nom d'utilisateur</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    formControlName="username"
                    placeholder="Entrez votre nom d'utilisateur"
                  />
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    formControlName="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe">
                    Se souvenir de moi
                  </label>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border-radius: 10px;
    }

    .btn-primary {
      padding: 0.75rem;
    }
  `]

})
export default class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;

      this.loginService
        .login({
          username,
          password,
          rememberMe
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
    }
  }
}
