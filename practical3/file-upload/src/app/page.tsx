"use client"

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

// ✅ Dropzone is now OUTSIDE the main component
const Dropzone = ({ onDrop, maxSize, accept, setFilePreview }) => {
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive, 
    fileRejections 
  } = useDropzone({ 
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (file.type.startsWith('image/')) {
          const previewUrl = URL.createObjectURL(file);
          setFilePreview({
            url: previewUrl,
            name: file.name,
            type: file.type
          });
        } else if (file.type === 'application/pdf') {
          setFilePreview({
            name: file.name,
            type: file.type
          });
        } else {
          setFilePreview(null);
        }
      }
    },
    maxSize,
    accept,
    multiple: false
  });
  
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-red-500">
      {file.name} - {errors.map(e => e.message).join(', ')}
    </li>
  ));

  return (
    <div className="mt-1">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer text-center ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <div>
            <p>Drag & drop a file here, or click to select</p>
            <p className="text-sm text-gray-500 mt-1">
              (Only JPEG, PNG, and PDF files under 5MB are accepted)
            </p>
          </div>
        )}
      </div>
      {fileRejectionItems.length > 0 && (
        <ul className="mt-2">{fileRejectionItems}</ul>
      )}
    </div>
  );
};

// ✅ Main component
export default function FileUploadForm() {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
  
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const onSubmit = async (data) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('name', data.name);

      console.log('Uploading file:', data.file[0].name, 'Type:', data.file[0].type);

      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentage);
        }
      });

      setUploadResult({
        success: true,
        message: 'File uploaded successfully!',
        data: response.data
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: error.response?.data?.error || 'Upload failed'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">File Upload Form</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        
        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">Your Name:</label>
          <input 
            id="name"
            type="text" 
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded" 
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        
        {/* File upload field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload File:</label>
          <Controller
            name="file"
            control={control}
            rules={{ 
              required: 'File is required',
              validate: {
                fileSize: files => !files?.[0] || files[0].size <= MAX_FILE_SIZE || 
                  'File size must be less than 5MB',
                fileType: files => !files?.[0] || ACCEPTED_FILE_TYPES.includes(files[0].type) || 
                  'Only JPEG, PNG, and PDF files are accepted'
              }
            }}
            render={({ field: { onChange } }) => (
              <Dropzone 
                onDrop={acceptedFiles => onChange(acceptedFiles)}
                maxSize={MAX_FILE_SIZE}
                accept={{
                  'image/jpeg': ['.jpg', '.jpeg'],
                  'image/png': ['.png'],
                  'application/pdf': ['.pdf']
                }}
                setFilePreview={setFilePreview}
              />
            )}
          />
          {errors.file && <p className="text-red-500 mt-1">{errors.file.message}</p>}
        </div>
        
        {/* Preview section */}
        {filePreview && (
          <div className="mb-4">
            <h3 className="font-medium mb-1">Preview:</h3>
            <div className="border rounded p-2">
              {filePreview.type?.startsWith('image/') ? (
                <img
                  src={filePreview.url}
                  alt={filePreview.name}
                  className="max-w-full h-auto max-h-40 rounded"
                />
              ) : filePreview.type === 'application/pdf' ? (
                <div className="py-2 px-3 bg-gray-100 rounded flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                  </svg>
                  <span>{filePreview.name}</span>
                </div>
              ) : (
                <div>File selected: {filePreview.name}</div>
              )}
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <button 
          type="submit" 
          disabled={isUploading}
          className={`w-full p-2 text-white rounded ${
            isUploading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
        
        {/* Progress bar */}
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-1 text-sm">{uploadProgress}%</p>
          </div>
        )}
        
        {/* Upload result */}
        {uploadResult && (
          <div className={`mt-4 p-3 rounded ${
            uploadResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p>{uploadResult.message}</p>
            {uploadResult.success && uploadResult.data?.filename && (
              <p className="text-sm mt-1">Uploaded as: {uploadResult.data.filename}</p>
            )}
          </div>
        )}

      </form>
    </div>
  );
}