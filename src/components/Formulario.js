import React, { Fragment, useState } from "react";
import { calculatrTotal } from "../helpers";

const Formulario = (props) => {
  const {
    cantidad,
    guardarCantidad,
    plazo,
    guardarPlazo,
    guardarTotal,
    guardarCargando,
  } = props;

  //definir state
  const [error, guardarError] = useState(false);

  const calcularPrestamos = (e) => {
    e.preventDefault();

    //validar
    if (cantidad === 0 || plazo === "") {
      guardarError(true);
    }

    //eliminar el error previo
    guardarError(false);

    // habilitar spinner
    guardarCargando(true);

    setTimeout(() => {
      //realizar cotizacion
      const total = calculatrTotal(cantidad, plazo);

      //una vez calculado, guardatTotal
      guardarTotal(total);

      //desahabilitar el spinner
      guardarCargando(false);
    }, 2000);
  };

  return (
    <Fragment>
      {" "}
      <form onSubmit={calcularPrestamos}>
        <div className="row">
          <div>
            <label>Cantidad Prestamo</label>
            <input
              className="u-full-width"
              type="number"
              placeholder="Ejemplo: 3000"
              onChange={(e) => guardarCantidad(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Plazo para Pagar</label>
            <select
              className="u-full-width"
              onChange={(e) => guardarPlazo(parseInt(e.target.value))}>
              <option value="">Seleccionar</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
          <div>
            <input
              type="submit"
              value="Calcular"
              className="button-primary u-full-width"
            />
          </div>
        </div>
      </form>
      {error ? <p className="error">Todos los campos son obligatorios</p> : null}
    </Fragment>
  );
};

export default Formulario;
