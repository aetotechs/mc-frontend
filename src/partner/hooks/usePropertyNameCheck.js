// usePropertyNameCheck.js
import { useState, useCallback } from 'react';
import api_urls from '../../client/utils/resources/api_urls';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const checkPropertyName = async (name) => {
  try {
    const response = await fetch(api_urls.listings.check_property_name(name));
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error checking property name:', error);
    return false;
  }
};

export const usePropertyNameCheck = () => {
  const [nameStatus, setNameStatus] = useState('');

  const handleNameCheck = useCallback(
    debounce(async (value) => {
      if (value.length > 0) {
        const exists = await checkPropertyName(value);
        setNameStatus(exists ? 'This name is already taken' : 'Name is available');
      } else {
        setNameStatus('');
      }
    }, 300),
    []
  );

  return { nameStatus, handleNameCheck };
};