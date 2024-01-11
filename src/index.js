import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

(async () => {
  const LD_CLIENTSIDE_ID = process.env.REACT_APP_LD_CLIENTSIDE_ID;
  console.log(LD_CLIENTSIDE_ID);
  const LDProvider = await asyncWithLDProvider({
    clientSideID: LD_CLIENTSIDE_ID,
    context: {
      "kind": "user",
      "key": "user-key-123abc",
      "name": "Your User",
      "email": "user@yourdomain.com"
    },
    options: {
      streaming: true
    }
  });
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <LDProvider>
      <App />
    </LDProvider>,
  );
})();
