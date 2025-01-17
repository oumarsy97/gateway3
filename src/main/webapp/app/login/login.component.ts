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
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <!-- Logo -->
        <div class="logo-container">
          <img
            src="https://design-sprint.com/wp-content/uploads/2021/11/logo-design-sprint-sonatel.svg"
            alt="Sonatel"
            class="logo"
          />
        </div>

        <!-- Titre -->
        <h1 class="login-title">Connexion</h1>

        <!-- Formulaire -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Username -->
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              class="form-control"
              id="username"
              formControlName="username"
              placeholder="Nom d'utilisateur"
            />

          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
              placeholder="Mot de passe"
            />

          </div>

          <!-- Remember me -->
          <div class="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              formControlName="rememberMe"
              class="custom-checkbox"
            />
            <label for="rememberMe">Se souvenir de moi</label>
          </div>

          <!-- Submit button -->
          <button type="submit" class="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .logo-container {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      max-width: 150px;
      height: auto;
    }

    .login-title {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
      margin-bottom: 2rem;
      color: #000;
    }

    .form-group {
      margin-bottom: 1.5rem;
      position: relative;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #000;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: #009688;
    }

    .remember-me {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      gap: 0.5rem;
    }

    .custom-checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid #dee2e6;
    }

    .login-button {
      width: 100%;
      padding: 0.875rem;
      background-color: #ff6600;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .login-button:hover {
      background-color: #ff5500;
    }

    /* Responsive adjustments */
    @media (max-width: 480px) {
      .login-card {
        padding: 1.5rem;
      }
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
    }else {
      console.error('Form is invalid');
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
      return;
    }
  }
}
