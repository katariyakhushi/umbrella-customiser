import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import blueUmbrella from './assets/images/blue-umbrella.png';
import pinkUmbrella from './assets/images/pink-umbrella.png';
import yellowUmbrella from './assets/images/yellow-umbrella.png';

function App() {
  const [currentColor, setCurrentColor] = useState('blue');
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [error, setError] = useState('');
  const [showLogoControls, setShowLogoControls] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.className = 'theme-blue';
  }, []);

  const umbrellaImages = {
    blue: blueUmbrella,
    pink: pinkUmbrella,
    yellow: yellowUmbrella
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
    document.body.className = `theme-${color}`;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PNG or JPG file.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 5MB. Please upload a smaller file.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedLogo(e.target.result);
      setShowLogoControls(true);
      setError('');
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
      setTimeout(() => setError(''), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setUploadedLogo(null);
    setShowLogoControls(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="preview-section">
          <div className="umbrella-container">
            <img src={umbrellaImages[currentColor]} alt="Umbrella" className="umbrella-img" />
            {uploadedLogo && (
              <div className="logo-preview active">
                <img src={uploadedLogo} alt="Logo" className="uploaded-logo" />
              </div>
            )}
            {!uploadedLogo && (
              <div className="logo-indicator">
                <div className="indicator-line"></div>
                <div className="indicator-text">Logo will be added here</div>
              </div>
            )}
          </div>
        </div>
        <div className="customization-section">
          <h1 className="title">Custom Umbrella</h1>
          <div className="color-swatches">
            <button className={`color-swatch ${currentColor === 'blue' ? 'active' : ''}`} onClick={() => handleColorChange('blue')} style={{ backgroundColor: '#3B82F6' }} />
            <button className={`color-swatch ${currentColor === 'pink' ? 'active' : ''}`} onClick={() => handleColorChange('pink')} style={{ backgroundColor: '#EC4899' }} />
            <button className={`color-swatch ${currentColor === 'yellow' ? 'active' : ''}`} onClick={() => handleColorChange('yellow')} style={{ backgroundColor: '#FCD34D' }} />
          </div>
          <div className="customization-info">
            <h2 className="subtitle">Customize your umbrella</h2>
            <p className="description">Upload a logo for an instant preview.</p>
            <p className="file-requirements">.png and .jpg files only. Max file size is 5MB.</p>
          </div>
          <div className="upload-section">
            <input type="file" ref={fileInputRef} accept=".png,.jpg,.jpeg" onChange={handleFileUpload} style={{ display: 'none' }} />
            <button onClick={handleUploadClick} className="upload-btn">
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>UPLOAD LOGO</span>
            </button>
          </div>
          {error && (<div className="error-message show">{error}</div>)}
          {showLogoControls && (
            <div className="logo-controls show">
              <button onClick={handleRemoveLogo} className="secondary-btn">Remove Logo</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;