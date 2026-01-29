import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'შეავსე სწორად ყველა ველი.';
      return;
    }
    const { email, password } = this.form.value;

    this.auth.signup(email!, password!).subscribe(ok => {
      if (!ok) {
        this.error = 'Signup failed.';
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
