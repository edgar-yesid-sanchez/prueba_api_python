import React from "react";
import { useState } from "react";

const HomeContext = React.createContext();

function  HomeProvider({ children }){
  const [editingEvent, setEditingEvent] = useState({});
  const [eventList, setEventList] = useState([]);

  return (
    <HomeContext.Provider value={{ editingEvent, setEditingEvent, eventList ,setEventList }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };

