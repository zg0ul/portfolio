// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  // Match patterns like:
  // - https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // - https://youtu.be/dQw4w9WgXcQ
  // - https://youtube.com/shorts/dQw4w9WgXcQ
  // - https://www.youtube.com/embed/dQw4w9WgXcQ
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default getYouTubeVideoId;