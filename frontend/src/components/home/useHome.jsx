import { useState, useContext } from "react";
import { useAPI } from "../../services/useAPI";
import { HomeContext } from "../../context/HomeContext";

export const useHome = () => {
  const { getRequest, deleteRequest,postRequest,putRequest } = useAPI();
  const {setEditingEvent, setEventList} = useContext(HomeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [filterEvents, setFilterEvents] = useState('todos');

  // Optenert la lista completa de productos
  const fetchListEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`/eventos/list`);
      const data = await response.json();
      console.log(data)
      setEventList(data || []);
    } catch (err) {
      console.error(err)
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener evento
  const getEvent = async (id) => {
    try {
      const data = await getRequest("/eventos",{ id })
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Crear evento
  const addEvent = async (eventData) => {
    try {
      const data = await postRequest("/eventos/create",eventData);
      fetchListEvents();
      if(data){
        alert("evento agregado")
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Editar evento
  const editEvent = async (id,body) => {
    try {
      const data = await putRequest(`/eventos/update/${id}`,{}, body);
      if(data){
        alert("evento actulizado")
        fetchListEvents();
      }
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Eliminar evento
  const deleteEvent = async (id) => {
    try {
      const data = await deleteRequest(`/eventos/delete/${id}`,{});
      fetchListEvents();
      if(data){
        alert("evento eliminado")
      }
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Filtrar eventos revisados
  const getFilterEvents = async (gestion) => {
    try {
      setIsLoading(true)
      const response = await getRequest(`/eventos/revisados/${gestion}`);

      if (response.status === 204) {
        console.log("No hay eventos con esa gestión.");
        alert("No se encontraron eventos")
      } else if (response.ok) {
        const data = await response.json();
        console.log(data)
        setEventList(data || []);
      } else {
        console.error("Error:", response.status);
      }

    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false)
    }
  };

  
  const validateFilterList =()=>{
    if(filterEvents == 'todos'){
      fetchListEvents()
    }else{
      getFilterEvents(filterEvents)
    }
  }



  const openEditEvent = (data) => {
    // let _isEdit = !isEdit
    console.log(data)
    setIsAdd(false)
    setEditingEvent(data);
    setIsEdit(true)
  }
  const openAddEvent = () => {
    console.log("open add for")
    setIsEdit(false)
    setIsAdd(true)
  }

  return {
    fetchListEvents,
    getEvent,
    editEvent,
    addEvent,
    deleteEvent,
    openEditEvent,
    openAddEvent,
    getFilterEvents,
    validateFilterList,
    setFilterEvents,
    isLoading,
    isEdit,
    isAdd,
  };
};
