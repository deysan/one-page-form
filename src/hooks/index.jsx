import React, { useContext, useEffect, useState } from 'react';

import { client } from '../config';

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const getUsers = (page) => {
    setLoading(true);
    client.get(`users?page=${page}&count=6`).then((response) => {
      setTotalPage(response.total_pages);
      setUsers(response.users);
      setTimeout(() => setLoading(false), 500);
    });
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  return (
    <UsersContext.Provider
      value={{
        users,
        currentPage,
        totalPage,
        setCurrentPage,
        getUsers,
        isLoading
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
