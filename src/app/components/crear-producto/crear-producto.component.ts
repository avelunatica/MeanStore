import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // 🔹 Importa CommonModule para usar *ngIf
import { Producto } from '../../models/producto'
@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(private fb: FormBuilder,
                    private router: Router ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  agregarProducto(event?: Event) {
    if (event) event.preventDefault(); // 🔹 Evita a recarga da páxina
    console.log('✅ Formulario enviado correctamente:', this.productoForm.value);
    const PRODUCTO: Producto ={
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
   
    console.log(PRODUCTO);
    this.router.navigate(['/']);
  }

  onEnterPress(event: Event) {
    event.preventDefault(); // 🔹 Evita que Enter recargue a páxina
    if (this.productoForm.valid && this.submitButton) {
      this.submitButton.nativeElement.click(); // 🔹 Simula un clic no botón "Aceptar"
    }
  }
}
