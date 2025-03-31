export enum DurezaLapiz {
  H = "H",
  HB = "HB",
  B = "B",
  F = "F",
}

export enum GrosorLapiz {
  GROSOR_03 = 0.3,
  GROSOR_05 = 0.5,
  GROSOR_07 = 0.7
}

export enum ColorLapiz {
  NEGRO = "negro",
  BLANCO = "blanco",
  ROJO = "rojo",
  AZUL = "azul",
  VERDE = "verde",
  AMARILLO = "amarillo",
  NARANJA = "naranja",
  MORADO = "morado",
  ROSA = "rosa",
  GRIS = "gris"
}



export class Producto {
  _id?: string;
  marca: string;
  tipo_de_lapiz: string;
  dureza: DurezaLapiz;
  grosor: GrosorLapiz;
  color: ColorLapiz;
  precio: number;
  cantidad: number; 

  constructor(marca: string, tipo_de_lapiz: string, dureza: DurezaLapiz, grosor: GrosorLapiz, color: ColorLapiz, precio: number, cantidad: number) {
      this.marca = marca;
      this.tipo_de_lapiz = tipo_de_lapiz;
      this.dureza = dureza;
      this.grosor = grosor;
      this.color = color;
      this.precio = precio;
      this.cantidad = cantidad;
  }
}
