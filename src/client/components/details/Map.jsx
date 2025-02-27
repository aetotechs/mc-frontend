import React, { useState, useEffect } from 'react';

const Map = ({ lat, lng }) => {
  const [location, setLocation] = useState({ lat, lng });

  useEffect(() => {
    if (!lat || !lng) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, [lat, lng]);

  const mapSrc = `https://maps.google.com/maps?height=300&hl=en&q=${location.lat},${location.lng}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <iframe
      zoom="14"
      src={mapSrc}
      title="Google Map"
      className='w-full h-full'
    />
  );
};

export default Map;
