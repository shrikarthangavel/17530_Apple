import React, { useEffect, useState } from 'react';

// Function to fetch available units of a specified hardware set
const getAvailableHardware = async (name) => {
  try {
    const response = await fetch(`/hardware/${name}/available`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available hardware:', error);
    return null;
  }
};

// Main component to display the availability of a hardware set
const HardwareComponent = ({ hardwareName }) => {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const availableUnits = await getAvailableHardware(hardwareName);
      setAvailable(availableUnits);
    };

    fetchData();
  });

  return (
    <div>
      <h1>{hardwareName}</h1>
      {available !== null ? (
        <p>Available Units: {available}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HardwareComponent;