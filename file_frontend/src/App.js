import React from 'react';
import Interface from './components/main/Interface'
import { Provider } from 'react-redux'
import store from './Store'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Interface />
      </div>
    </Provider>
  );
}

export default App;
