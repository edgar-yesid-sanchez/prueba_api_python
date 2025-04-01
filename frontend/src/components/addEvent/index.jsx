import { useState } from 'react';
import { useHome } from '../home/useHome';
import './addEvent.css'

function AddEvent() {

  const _useHome = useHome()
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    fecha: '',
    gestion: '',
    estado: "Pendiente por revisar"
  });
  const [isLoading, setIsLoading] =useState(false)

  const [formError, setFormError] = useState(false)

  const handleFormSubmit = async (e) => {
    if(isLoading) return
    e.preventDefault();
    if(!formData.nombre || !formData.descripcion || !formData.tipo || !formData.fecha ){
      setFormError(true);
      return
    }
    setIsLoading(true)
    const data = {...formData}
    const result = await _useHome.addEvent(data)
    setIsLoading(false)
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <section className="section form-section">
        <h2>Crear Evento</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className="block mb-1">descripcion</label>
            <textarea 
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleFormChange}>
            </textarea>
          </div>
          <div>
            <label className="block mb-1">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className="block mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleFormChange}
            />
          </div>
          {
            formError && (
              <div className='errorAlert'>Completa todos los campos</div>
            )
          }
          {
            isLoading 
            ? <div className="button" >
              Cargando
            </div>
            : <button type="submit" className="button">
              Guardar evento
            </button>
      

          }
        </form>
        </section>
    </>
  )
}

export default AddEvent
