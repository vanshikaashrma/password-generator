import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ColorModeScript,
  useToast,
  Heading,
  ColorModeProvider,
  useColorMode,
  CSSReset,
  IconButton,
} from '@chakra-ui/react';
import './App.css';
import ToggleButton from './components/ToggleButton';
import { FaMoon, FaSun } from 'react-icons/fa';
import PasswordGenerator from './password'; // Import the PasswordGenerator component

function App() {

  return (
    <ChakraProvider>
      <ToggleButton />
      {/* ... (existing code) */}
      <Box textAlign="center" margin="20px">
        <Heading as="h1" size="xl" mb="4">
          Password Generator
        </Heading>

        {/* Include the PasswordGenerator component */}
        <PasswordGenerator />

        {/* ... (existing code) */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
