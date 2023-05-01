
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainView } from './layouts/views/main.view/main.view';
import { AuthenticationView } from './layouts/views/auth/auth.view';
import { DashBoardView } from './layouts/views/dashboard/dashboard.view';
import React, { ReactNode, useState } from 'react';
import { ProtectedRoute } from './lib/guard/authentication.guard';
import { AuthenticationFunction } from './lib/guard.validation/authentication.validator';



const App: React.FunctionComponent<any> = () => {
  const { evaluationFn } = new AuthenticationFunction();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/dashboard' element={
              <ProtectedRoute evaluationFn={evaluationFn} errorChildren={<MainView />}>
                <DashBoardView />
              </ProtectedRoute>
            } />
            <Route path='/authentication/login' element={<AuthenticationView />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
