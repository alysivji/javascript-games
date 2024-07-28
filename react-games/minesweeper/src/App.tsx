import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import Minesweeper from './components/Minesweeper';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Minesweeper />
      </ChakraProvider>
    </div>
  );
}

export default App;
