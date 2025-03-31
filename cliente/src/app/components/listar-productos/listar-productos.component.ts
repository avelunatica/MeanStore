import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, CrearProductoComponent, FormsModule],
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  mostrandoFormulario = false;
  idProductoEditar: string | null = null;
  campoOrden: string = '';         
  ordenAscendente: boolean = true; 
  
  // 🔹 Variables para o filtro
  campoFiltro: string = "_id"; // Campo de filtro por defecto
  valorFiltro: string = ""; // Valor de busca


  
  constructor(private _productoService: ProductoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getProductos(); // 🔹 Cargar todos os produtos ao iniciar a páxina
  }
  
  getProductos() {
    this._productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.listProductos = data;
        this.productosFiltrados = data;
      },
      error: (error) => {
        console.error("❌ Erro ao obter produtos:", error);
        this.toastr.error('Erro ao cargar os produtos', 'Erro');
      }
    });
  }


  ordenarPorCampo(campo: string): void {
      if (this.campoOrden === campo) {
        // Se se volve a facer clic no mesmo campo, invertimos a orde
        this.ordenAscendente = !this.ordenAscendente;
      } else {
        // Se é un novo campo, ordeamos de forma ascendente
        this.campoOrden = campo;
        this.ordenAscendente = true;
      }
    
      this.productosFiltrados.sort((a, b) => {
        let valorA = (a as any)[campo];
        let valorB = (b as any)[campo];

        // Convertir a string e pasar a lowercase se é string
        if (typeof valorA === 'string') valorA = valorA.toLowerCase();
        if (typeof valorB === 'string') valorB = valorB.toLowerCase();

        if (valorA < valorB) return this.ordenAscendente ? -1 : 1;
        if (valorA > valorB) return this.ordenAscendente ? 1 : -1;
        return 0;
      });
    }
    

  
  filtrarProductos() {
    if (!this.campoFiltro || !this.valorFiltro) {
      return this.getProductos(); // 🔹 Se non hai filtro, carga todos os produtos
    }
  
    this._productoService.getProductos(this.campoFiltro, this.valorFiltro).subscribe({
      next: (data: Producto[]) => {
        this.listProductos = data;
        this.productosFiltrados = data;
      },
      error: (error) => {
        if (error.status === 404) {
          this.listProductos = [];
          this.productosFiltrados = [];
        } else if (error.status === 400) {
          this.toastr.warning('O ID introducido non é válido', 'Aviso');
          this.listProductos = [];
          this.productosFiltrados = [];
        } else {
          console.error("❌ Erro ao obter produtos:", error);
          this.toastr.error('Erro ao cargar os produtos', 'Erro');
        }
      }
    });
  }

  /**
   * Edita un produto polo seu ID
   */
  editarProducto(id: string | undefined) {
    if (!id) return;
    this.idProductoEditar = id;
    this.mostrandoFormulario = true;
  }

  /**
   * Elimina un produto polo seu ID
   */
  eliminarProducto(id: string | undefined) {
    if (!id) return;
    
    this._productoService.eliminarProducto(id).subscribe(
      () => {
        this.toastr.error('O produto foi eliminado con éxito', 'Produto eliminado');
        this.filtrarProductos(); // Recarga os produtos despois de eliminar
      },
      (error) => {
        console.error("Erro ao eliminar produto:", error);
        this.toastr.error('Erro ao eliminar o produto', 'Erro');
      }
    );
  }

  /**
   * Mostra o formulario para crear un novo produto
   */
  crearProducto() {
    this.idProductoEditar = null;
    this.mostrandoFormulario = true;
  }

  /**
   * Volve á lista de produtos
   */
  volverAListar() {
    this.mostrandoFormulario = false;
    this.filtrarProductos();
  }
}
