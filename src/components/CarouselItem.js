import React, { useState, useEffect } from 'react';

const CarouselItem = ({ category }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Track loading status
  const baseUrl = 'https://foodish-api.com/api/images/';

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`${baseUrl}${category}`);
        const data = await response.json();
        setImageUrl(data.image);
        setIsLoading(false); // Stop loading once the image is fetched
      } catch (error) {
        console.error('Error fetching image URL:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchImageUrl();
  }, [category]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <img src={imageUrl} className="d-block w-100" alt={category} style={{ width: '900px', height: '700px', objectFit: 'cover' }} />
      )}
    </div>
  );
};

export default CarouselItem;
