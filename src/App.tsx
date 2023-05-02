
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainView } from './layouts/views/main.view/main.view';
import { AuthenticationView } from './layouts/views/auth/auth.view';
import { DashBoardView } from './layouts/views/dashboard/dashboard.view';
import React, { ReactNode, useState } from 'react';
import { ProtectedRoute } from './lib/guard/jwt.guard.validation/authentication.guard';
import { AuthenticationFunction } from './lib/guard/jwt.guard.validation/authentication.validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FunctionComponent<any> = () => {
  const { evaluationFn } = new AuthenticationFunction();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/dashboard' element={
              <ProtectedRoute evaluationFn={evaluationFn} errorChildren={<AuthenticationView />}>
                <DashBoardView />
              </ProtectedRoute>
            } />
            <Route path='/authentication/login' element={<AuthenticationView />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </header>
    </div>
  );
}

export default App;
