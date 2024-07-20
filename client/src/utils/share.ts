export const handleShare = async (
  title: string,
  location: string,
  date: string
) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: `Check out this appointment: ${title} at ${location} on ${date}`,
        url: window.location.href,
      });
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    alert('Web Share API is not supported in your browser.');
  }
};
