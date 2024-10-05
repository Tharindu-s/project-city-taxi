import React, { useEffect, useState } from "react";

interface Driver {
  id: number;
  name: string; // Adjust based on your driver properties
  location: string; // Adjust based on how you want to display the location
}

const DriverList: React.FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `/api/drivers?latitude=${latitude}&longitude=${longitude}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data: Driver[] = await response.json();
        setDrivers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Drivers</h2>
      {drivers.length === 0 ? (
        <p>No drivers available nearby.</p>
      ) : (
        <ul>
          {drivers.map((driver) => (
            <li key={driver.id}>
              <p>{driver.name}</p>
              <p>Location: {driver.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DriverList;
