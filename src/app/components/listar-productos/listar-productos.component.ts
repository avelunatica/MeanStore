import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 🔹 Importamos RouterModule para que funcione routerLink

@Component({
  selector: 'app-listar-productos',
  standalone: true, // 🔹 Indicar que este compoñente é standalone
  imports: [RouterModule], // 🔹 Importamos RouterModule para habilitar routerLink
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent { }
