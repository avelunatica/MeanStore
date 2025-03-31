import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnChanges {
  @Input() id: string | null = null;  
  @Output() volver = new EventEmitter<void>();  

  productoForm: FormGroup;
  titulo = 'Crear producto';
  durezas: string[] = ['H', 'HB', 'B', 'F'];
  grosor: number[] = [0.3, 0.5, 0.7];
  color: string[] = ['azul', 'verde', 'amarillo'];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      marca: ['', Validators.required],
      tipo_de_lapiz: ['', Validators.required],
      dureza: ['', Validators.required],
      grosor: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]], 
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          marca: data.marca,
          tipo_de_lapiz: data.tipo_de_lapiz,
          dureza: data.dureza || '',
          grosor: data.grosor || '',
          color: data.color,
          precio: data.precio,
          cantidad: data.cantidad || 0, 
        });
      });
    } else {
      this.titulo = 'Crear producto';
      this.productoForm.reset();
      this.productoForm.patchValue({ dureza: '', grosor: '', color: '', cantidad: 0 });
    }
  }

  agregarProducto(): void {
 
    if (this.productoForm.invalid) {
      this.toastr.warning("Por favor, completa todos los campos.", "Formulario incompleto");
      return;
    }
    const PRODUCTO: Producto = this.productoForm.value;

    if (this.id) {
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(() => {
        this.toastr.info("El producto fue actualizado con éxito!", "Producto actualizado!");
        this.volver.emit();  
      });
    } else {
      this._productoService.guardarProducto(PRODUCTO).subscribe(() => {
        this.toastr.success("El producto fue registrado con éxito!", "Producto registrado!");
        this.volver.emit();  
      });
    }
  }
}
