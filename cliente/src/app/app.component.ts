// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'cliente';
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListarProductosComponent, CrearProductoComponent], // 🔹 Engadimos os compoñentes e CommonModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cliente';
  vista: 'listar' | 'crear' | 'editar' = 'listar'; // 🔹 Controlamos a vista manualmente
  productoId: string | null = null;

  cambiarVista(novaVista: 'listar' | 'crear' | 'editar', id?: string) {
    this.vista = novaVista;
    this.productoId = id || null;
  }
}
