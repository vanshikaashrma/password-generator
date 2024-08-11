import React, { useState } from 'react';
import { Box, Input, Checkbox, Button, Progress, Text, Flex, IconButton, useClipboard,InputGroup, InputRightElement} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';
import './App.css';

const generatePassword = (length, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars) => {
  let chars = '';

  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) chars += '0123456789';
  if (includeSpecialChars) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?/';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const { hasCopied, onCopy } = useClipboard(password);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars);
    setPassword(newPassword);
    setShowPassword(false); // Hide the password when generating a new one
    setCopied(false); // Reset copied status
  };

  const handleCopyToClipboard = () => {
    onCopy();
    setCopied(true);
  };

  const passwordStrength = zxcvbn(password).score;

  return (
    <Box p="4" maxW="420px" mx="auto">
      <div mb="4" align="left">
        <label>Password Length:</label>
        <Input
          type="number"
          value={length}
          mr="2"
          w="60px"
          onChange={(e) => setLength(Math.max(1, Math.min(50, parseInt(e.target.value, 10))))}
        />
      </div>
      <Flex mb="4" flexDir="column">
        <Checkbox mb="2" isChecked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)}>
          Include Uppercase
        </Checkbox>
        <Checkbox mb="2" isChecked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)}>
          Include Lowercase
        </Checkbox>
        <Checkbox mb="2" isChecked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)}>
          Include Numbers
        </Checkbox>
        <Checkbox mb="2" isChecked={includeSpecialChars} onChange={() => setIncludeSpecialChars(!includeSpecialChars)}>
          Include Special Characters
        </Checkbox>
      </Flex>
      <Button mb="4" onClick={handleGeneratePassword}>
        Generate Password
      </Button>
      <Button mb="4" onClick={handleCopyToClipboard} isDisabled={!password}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </Button>
      <Flex mb="4" align="center">
      <Text marginRight="2">Strength:</Text><Progress value={passwordStrength * 25} max="100" width="80%" mb="0" />
      </Flex>
      <Flex mb="4" align="center" flexWrap="nowrap">
  <Text marginRight="0">Generated Password:</Text>
  <InputGroup>
    <Input
      type={showPassword ? 'text' : 'password'}
      readOnly
      value={password}
      paddingRight="2.5rem"
    />
    <InputRightElement width="4rem">
      <IconButton
        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
        onClick={() => setShowPassword(!showPassword)}
      />
    </InputRightElement>
  </InputGroup>
</Flex>

    </Box>
  );
};

export default PasswordGenerator;
