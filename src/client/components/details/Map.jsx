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

  const mapSrc = `https://maps.google.com/maps?width=100%25&height=300&hl=en&q=${location.lat},${location.lng}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <iframe
      width="100%"
      style={{ flex: 1 }}
      height="100%"
      frameBorder="0"
      scrolling="yes"
      marginHeight="0"
      marginWidth="0"
      src={mapSrc}
      title="Google Map"
    ></iframe>
  );
};

export default Map;
