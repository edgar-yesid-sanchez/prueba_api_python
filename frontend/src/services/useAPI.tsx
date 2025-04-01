
export const useAPI = () => {
  const baseUrl = 'http://127.0.0.1:5000'

  const getRequest = async (endpoint:string, queryParams: Record<string, string> = {}) =>{

    try{
      const url = new URL(`${baseUrl}${endpoint}`);
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
      
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { 
          "Content-Type": "application/json" 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response;
    }catch (error) {
      console.error("Error en getRequest:", error);
      throw error;
    }
  }

  const postRequest = async (endpoint: string, body: string ) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (response.status !== 201) {
        throw new Error(`Error en la solicitud POST: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error en postRequest:", error);
      throw error;
    }
  };

  const putRequest = async (endpoint: string, queryParams: Record<string, string> = {} ,body: string) => {
    try {
     
      const url = new URL(`${baseUrl}${endpoint}`);
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud PUT: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en putRequest:", error);
      throw error;
    }
  };

  const deleteRequest = async (endpoint: string, queryParams: Record<string, string> = {}) => {
    try {
     
      const url = new URL(`${baseUrl}${endpoint}`);
      // Agregar parametros de consulta al URL si existen
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
  
      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud DELETE: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en deleteRequest:", error);
      throw error;
    }
  };
  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,

  };
};
