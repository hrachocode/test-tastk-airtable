// import React from 'react';
// import './App.css';
// import Funcone from './admin/funcone';

// function App() {
//   const users = [
//     {
//       name: "Karen",
//       age: 23
//     },
//     {
//       name: "Sona",
//       lastname: "Zohrabyan",
//       age: 28,
//     }
//   ]
//   console.log(users[0]);
//   return (
//     <div className="App">
//       <Funcone users={users}/>
//     </div>
//   );
// }

// export default App;




import React, {useState} from 'react';
import './App.css';
import Select from './components/select';

const users = [
  {
    id: 0,
    name: "Yerevan",
  },
  {
    id: 1,
    name: "Gyumri",
  },
  {
    id: 2,
    name: "Ijevan",
  },
  {
    id: 3,
    name: "Dilijan",
  },
  {
    id: 4,
    name: "Goris",
  },
]

function App() {
  const [selectedCities, setSelectedLanguages] = useState([])
 
  return (
    <div className="App">
      <Select value={selectedCities} options={users} onChange={(v) => setSelectedLanguages(v)}/>
    </div>
  );
}

export default App;
