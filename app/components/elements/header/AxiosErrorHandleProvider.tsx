'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type AxiosErrorHandleProviderProps = {
  children: React.ReactNode;
};

export const AxiosErrorHandleProvider: React.FC<AxiosErrorHandleProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('エラーがが発生しました')

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error)
        setOpen(true);
        if (error.response.status != 500)
          setErrorMessage(error.response.data.error)
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};