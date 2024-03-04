import React, { useEffect, useState } from 'react';

const TestFaas = () => {
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const IMAGE_BACKEND_URL = import.meta.env.VITE_REACT_APP_IMAGE_BACKEND_URL;
    //const localurl = 'http://localhost:3000';

    async function fetchFiles() {
      try {
        const response = await fetch(`${IMAGE_BACKEND_URL}/list-files`, {
          method: 'GET',
        });
        if (response.ok) {
          const filesData = await response.json();
          setFiles(filesData);
        } else {
          console.error('Failed to fetch files.');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    useEffect(() => {
      fetchFiles();
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
        const response = await fetch(`${IMAGE_BACKEND_URL}/process-image`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Image uploaded successfully!');
            fetchFiles();
        } else {
            console.error('Failed to upload image.');
        }
        } catch (error) {
        console.error('Error uploading image:', error);
        }
    };



  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Test Upload Dropbox</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Immagine
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Salva
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Files in Dropbox:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.isFolder ? (
                <span className="font-bold">{file.name}</span>
              ) : (
                <a href={file.sharedLink} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestFaas;
