
import { useEffect } from 'react';

function getFirstName({ firstName }) {
  useEffect(() => {
     u=firstName;
      // You can also call a function or update other state here
    }
  , [firstName]); // 👈 this effect runs whenever `firstName` changes

  return u; // or return some JSX
}