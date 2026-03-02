"use client";

import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AdminContext.Provider value={{ user, setUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}