import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const handleCode = async (code: string | null) => {
  if(code) {
    console.log('happen');
    const { data } = await axios.post('/api/auth/token', { code })
    console.log(data);
    const { accessToken, refreshToken } = data
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
  }
}



function App() {
  useEffect(() => {
    const params = (new URL(document.location.toString())).searchParams;
    const code = params.get('code')
    handleCode(code)
    // window.history.pushState({}, document.title, window.location.pathname)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://routines.com/auth/realms/client/protocol/openid-connect/auth?response_type=code&client_id=web&redirect_uri=http://routines.com"
          >
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
