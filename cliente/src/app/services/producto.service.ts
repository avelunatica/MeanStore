import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private url = "http://localhost:4000/api/productos"; // 🔹 URL base da API

  constructor(private http: HttpClient) {}

  /**
   * Obtén a lista de produtos con opción de filtrado no servidor.
   * @param filtro - O campo polo que se quere filtrar (ex: "marca", "tipo_de_lapiz").
   * @param valor - O valor a buscar dentro dese campo.
   * @returns Observable con array de produtos filtrados.
   */
  getProductos(filtro?: string, valor?: string): Observable<Producto[]> {
    let params = new HttpParams();

    if (filtro && valor) {
      params = params.set("filtro", filtro).set("valor", valor);
    }

    console.log("📌 Chamando á API con:", this.url + "?" + params.toString());

    return this.http.get<Producto[]>(this.url, { params });
  }

  /**
   * Elimina un produto polo seu ID.
   * @param id - O ID do produto a eliminar.
   * @returns Observable coa resposta do servidor.
   */
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  /**
   * Garda un novo produto na base de datos.
   * @param producto - Obxecto Produto a gardar.
   * @returns Observable coa resposta do servidor.
   */
  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  /**
   * Obtén os detalles dun produto polo seu ID.
   * @param id - O ID do produto.
   * @returns Observable con un obxecto Produto.
   */
  obtenerProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  /**
   * Edita un produto existente polo seu ID.
   * @param id - O ID do produto a modificar.
   * @param producto - O obxecto coas novas propiedades.
   * @returns Observable coa resposta do servidor.
   */
  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto);
  }
}
