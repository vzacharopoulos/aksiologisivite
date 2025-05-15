import React, { useState, useEffect } from 'react';

function GetShift() {
  const [currentShift, setCurrentShift] = useState('');

  useEffect(() => {
    const updateShift = () => {
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= 6 && currentHour < 14) {
        setCurrentShift('πρωινη');
      } else if (currentHour >= 14 && currentHour < 22) {
        setCurrentShift('απογευματινη');
      } else {
        setCurrentShift('νυχτερινη'); // Or any other designation for the remaining hours
      }
    };

    // Update the shift initially
    updateShift();

    // Optionally, update the shift every minute (or any desired interval)
    const intervalId = setInterval(updateShift, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return currentShift;
}


export default GetShift;