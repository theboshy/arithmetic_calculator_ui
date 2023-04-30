
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainView } from './layouts/views/main.view/main.view';
import { AuthenticationView } from './layouts/views/auth/auth.view';
import { DashBoardView } from './layouts/views/dashboard/dashboard.view';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/authentication' element={<AuthenticationView />} />
            <Route path='/dashboard' element={<DashBoardView />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
