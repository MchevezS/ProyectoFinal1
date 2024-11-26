import React from 'react';
import Navbar from './Navbar';
const CardPregunta = () => {
  return (
    <div className="mx-0 mx-sm-auto">
      <div className="card">
          <form className="px-4" action="">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example1"
              />
              <label className="form-check-label" htmlFor="radio3Example1">
                Muy bien
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example2"
              />
              <label className="form-check-label" htmlFor="radio3Example2">
               Bien
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example3"
              />
              <label className="form-check-label" htmlFor="radio3Example3">
                Más o menos
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example4"
              />
              <label className="form-check-label" htmlFor="radio3Example4">
                Mal
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example5"
              />
              <label className="form-check-label" htmlFor="radio3Example5">
                Muy mal
              </label>
            </div>
            <p className="text-center">
              <strong>¿Qué podemos mejorar?</strong>
            </p>
            <div className="form-outline mb-4">
              <textarea
              placeholder='Retroalimentacion'
                className="form-control"
                id="form4Example3"
                rows={4}
                defaultValue={""}
              />
           
            </div>
          </form>
        </div>
        <div className="card-footer text-end">
         
        </div>
      </div>
  );
};

export default CardPregunta;
