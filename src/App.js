import Header from './Header';
import MemeGenerator from './MemeGenerator';
import './App.css';
import React  from 'react';
function App() {
  return (
    <div>
      <Header/>
      <MemeGenerator/>
    </div>
  );
}

const PORT = process.env.PORT || 4000
App.listen(PORT, function() {
  console.log("Servidor escuchando en el puerto",PORT)

 });
export default App;