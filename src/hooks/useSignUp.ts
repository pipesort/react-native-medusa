import { useState } from 'react';
import { BASE_URL } from '@app/constants/url';

const useSignUp = () => {
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailExists, setEmailExists] = useState(false);

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/store/auth/${email}`);
      const data = await response.json();

      return data.exists;
    } catch (err) {
      console.error('Error checking user existence:', err);
      throw err; // Re-throw to handle it in the signUp function
    }
  };

  const signUp = async (email, password, fullName) => {
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' '); // Form the last name
    setLoading(true);

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setError('Email already exists.');
        setEmailExists(true);
        return;
      }

      const response = await fetch(`${BASE_URL}/store/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up.');
      }

      const { customer } = await response.json();
      if (customer && customer.id) {
        setCustomerId(customer.id);
      } else {
        throw new Error('User created but ID not retrieved.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
    } finally {
      setLoading(false);
      setEmailExists(false);
    }
  };

  return {
    signUp,
    customerId,
    loading,
    error,
    emailExists,
  };
};

export default useSignUp;
