import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [tokens, setTokens] = useState({ accessToken: '', refreshToken: '' });

  console.log(tokens.accessToken);
  

  const handleCode = async (code: string | null) => {
    if (code) {
      const { data } = await axios.post("/api/auth/token", { code });
      const { accessToken, refreshToken } = data;
      setTokens({ accessToken, refreshToken })
    }
  };

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    // handleCode(code);
    // window.history.pushState({}, document.title, window.location.pathname)
  }, []);

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        accessToken: <br /> <code style={{ whiteSpace: 'nowrap'}}>{tokens.accessToken}</code>
        <br />
        refreshToken: <br /> 
        <code>{tokens.refreshToken}</code>
        </p>
        <a
          className="App-link"
          href="http://routines.com/auth/realms/users/protocol/openid-connect/auth?response_type=code&client_id=web&redirect_uri=https://routines.com"
        >
          Login
        </a>

      </header>

    </div>
  );
}

export default App;
