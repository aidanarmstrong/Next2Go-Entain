import axios from 'axios';

export const getAPIData = async () => {
  try {
    const response = await axios.get('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=40', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error) {
    console.log('Error fetching api data:', error);
    throw error;
  }
};

export const formatElapsedTime = (elapsedTime: number) => {
  const seconds = Math.floor(elapsedTime / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};