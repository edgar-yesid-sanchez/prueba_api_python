import { useEffect, useState, useContext } from 'react';
import { useHome } from '../home/useHome';
import { HomeContext } from "../../context/HomeContext";
import './editEvent.css'

function EditEvent() {
  const { editingEvent } = useContext(HomeContext);
  
  const _useHome = useHome()
  const [formData, setFormData] = useState(null);
  const [formError, setFormError] = useState(false)
  
  useEffect(()=>{
    const data = {...editingEvent}
    setFormData(data)
  },[editingEvent])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!formData.nombre || !formData.descripcion || !formData.tipo || !formData.fecha ){
      setFormError(true);
      return
    }
    if(formData.estado == "Revisado" && !formData.gestion){
      setFormError(true);
      return
    }

    _useHome.editEvent(formData.id,formData)
  };

  const handleFormChange = (e) => {

    const { name, value } = e.target;
    const data = {...formData};
    data[name] = value;
    setFormData(data);
  };

  if(formData == null) return
  return (
    <>
      <section className="section form-section">
        <h2>Aditar Evento</h2>
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
          <div>
            <label className="block mb-1">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleFormChange}
            >
              <option value="Pendiente por revisar">Pendiente por revisar</option>
              <option value="Revisado">Revisado</option>
            </select>
          </div>

          {
            formData.estado == 'Revisado' &&
            <div>
              <label className="block mb-1">Gestion</label>
              <select
                name="gestion"
                value={formData.gestion}
                onChange={handleFormChange}
              >
                <option value="">Indica si requiere gestion</option>
                <option value="Requiere gestion">Requiere gestion</option>
                <option value="Sin gestion">Sin gestion</option>
              </select>
            </div>
          }
         
          {
            formError && (
              <div className='errorAlert'>Completa todos los campos</div>
            )
          }
          <button
            type="submit"
            className="button"
          >
            Actulizar evento
          </button>
        </form>
        </section>
    </>
  )
}

export default EditEvent
