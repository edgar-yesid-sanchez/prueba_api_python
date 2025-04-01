import { useState, useEffect, useContext } from 'react'
import './Home.css'
import { useHome } from './useHome';
import AddEvent from '../addEvent'
import EdditEvent from '../editEvent'
import { HomeContext } from '../../context/HomeContext';
function HomeUI() {

  const { eventList } = useContext(HomeContext)
  const _useHome = useHome();

  useEffect(() => {
    _useHome.fetchListEvents()
  },[])

  return (
    <>
       <div className='header'>
        <h1>Api eventos</h1>
        <div className="header-actions">
          <select
            className="select"
            onChange={(e) => _useHome.setFilterEvents(e.target.value)}
            defaultValue=""
          >
            <option value="todos">Todos los eventos</option>
            <option value="Requiere gestion">Requiere gestión</option>
            <option value="Sin gestion">Sin gestión</option>
          </select>

          <button className='button' onClick={() => _useHome.validateFilterList()}>
            Buscar eventos
          </button>

          <button className='button' onClick={() => _useHome.openAddEvent()}>
            Crear evento
          </button>
        </div>
      </div>

      { 
        _useHome.isLoading
        ?  <h2>Cargando...</h2>
        : <div className="container">
          {/* Lista de eventos */}
          
          <section className="section1 w-1/2">
            <ul className="space-y-4">
              {eventList.map((event) => (
               <li key={event.id} className="event-item">
                 <p className="event-title">{event.nombre}</p>
               <div className="event-info-container">
                 <p className="event-info">{event.descripcion}</p>
                 <p className="event-info">{event.tipo}</p>
               </div>
               <div className="event-info-container">
                 <p className="event-info">{event.fecha}</p>
                 <p className="event-info">{event.estado} / {event.gestion}</p>
               </div>
               <div className="event-actions">
                 <button
                   onClick={() => _useHome.openEditEvent(event)}
                   className="btn btn-edit"
                 >
                   Editar
                 </button>
                 <button
                   onClick={() => _useHome.deleteEvent(event.id)}
                   className="btn btn-delete"
                 >
                   Eliminar
                 </button>
               </div>
             </li>
              ))}
            </ul>
          </section>
    
          {/* Formulario de edición */}
          {_useHome.isAdd && (
            <section className='section2'>
              <AddEvent />
            </section>
          )}
          {_useHome.isEdit && (
            <section className='section2'>
              <EdditEvent />
            </section>
          )}
        </div>
      }
    </>
  )
}

export default HomeUI
