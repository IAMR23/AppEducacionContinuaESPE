'use client';

import React, { useEffect, useState } from 'react';

const VideoUploadPage = () => {
  const [videos, setVideos] = useState([]);
  const [careerName, setCareerName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCareerName, setEditCareerName] = useState('');

  useEffect(() => {
    // Recuperar videos de localStorage al montar el componente
    const savedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    setVideos(savedVideos);
  }, []);

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      const newVideos = [...videos, { url: videoURL, career: careerName }];
      setVideos(newVideos);
      localStorage.setItem('videos', JSON.stringify(newVideos));
      setCareerName(''); // Limpiar el campo de nombre de la carrera
    }
  };

  const handleDeleteClick = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    localStorage.setItem('videos', JSON.stringify(newVideos));
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditCareerName(videos[index].career);
  };

  const handleSaveClick = (index) => {
    const newVideos = videos.map((video, i) => (i === index ? { ...video, career: editCareerName } : video));
    setVideos(newVideos);
    localStorage.setItem('videos', JSON.stringify(newVideos));
    setEditIndex(null);
    setEditCareerName('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cargar Videos</h1>
      <input
        type="text"
        value={careerName}
        onChange={(e) => setCareerName(e.target.value)}
        placeholder="Nombre de la carrera"
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleUploadClick}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      />
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {videos.map((video, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              background: 'white',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '5px',
                marginBottom: '10px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                borderRadius: '10px',
              }}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editCareerName}
                  onChange={(e) => setEditCareerName(e.target.value)}
                  style={{ flex: 1, padding: '5px', fontSize: '16px' }}
                />
              ) : (
                <span style={{ flex: 1 }}>{video.career}</span>
              )}
              {editIndex === index ? (
                <button
                  onClick={() => handleSaveClick(index)}
                  style={{
                    marginLeft: '10px',
                    background: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                  }}
                >
                  ✔
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(index)}
                  style={{
                    marginLeft: '10px',
                    background: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                  }}
                >
                  ✎
                </button>
              )}
              <button
                onClick={() => handleDeleteClick(index)}
                style={{
                  marginLeft: '10px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
            </div>
            <video src={video.url} controls style={{ width: '100%', borderRadius: '10px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoUploadPage;
