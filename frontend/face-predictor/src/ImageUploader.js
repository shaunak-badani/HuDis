import React from 'react';
import ImageUploading from 'react-images-uploading';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Card from '@mui/material/Card';
import ImageModal from './ImageModal';
import axios from "axios";

const BlackButton = styled(Button)({
  color: 'black',
  borderColor: 'black',
  borderWidth: 2,
  '&:hover': {
    backgroundColor: 'black',  // Darker shade for hover effect
    color: 'white',
    borderColor: 'white'
  },
});


const RedButton = styled(Button)({
  color: 'red',
  borderColor: 'red',
  borderWidth: 2,
  '&:hover': {
    backgroundColor: 'red',  // Darker shade for hover effect
    color: 'white',
    borderColor: 'white'
  },
});

const GreenButton = styled(Button)({
  color: 'green',
  borderColor: 'green',
  borderWidth: 2,
  '&:hover': {
    backgroundColor: 'green',  // Darker shade for hover effect
    color: 'white',
    borderColor: 'white'
  },
});

const backendClient = axios.create({
  baseURL: 'http://localhost:5000'
});


const ImageUploader = () => {
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [predictedFace, setPredictedFace] = React.useState(null);

  const maxNumber = 4;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const predict = () => {
    var formData = new FormData();
    formData.append("image", images[0].file);
    console.log(formData);

    backendClient.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setPredictedFace(response.data.prediction);
    })
    .catch((error) => {
      setError(error.response.data.error);
    })
  }

  const [open, setOpen] = React.useState(false);
  const [previewImg, setPreviewImg] = React.useState("");

  const previewImage = (image) => {
    setPreviewImg(image);
    setOpen(true);
    console.log(image);
  }

  const handleClose = () => setOpen(false);
  

  return (
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <Card className="border-2 sm:py-10 rounded-xl h-full">
            {error ? <div className="bg-red-700 sm:mb-5 sm:py-5 flex justify-center text-white"><Typography>Error: {error}</Typography></div> : null}
            <div className="flex items-center justify-center">
            <BlackButton
              disabled={images.length > 0}
              variant="outlined"
              onClick={onImageUpload}
              className="font-bold sm:my-2"
              {...dragProps}
            >
              Upload image
            </BlackButton>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="flex sm:my-4 ">
                {/* <img src={image['data_url']} alt={image.file.name} width="500" /> */}
                <div className="basis-1/12 flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-700 rounded-full" />
                </div>
                <div className="basis-4/12 flex items-center justify-center">
                  <Typography>
                    {image.file.name}
                  </Typography>
                  </div>
                <div>
                  {/* <Button onClick={() => onImageUpdate(index)}>Update</Button> */}
                  <GreenButton variant="outlined" onClick={() => previewImage(image['data_url'])}>Preview</GreenButton>
                  &nbsp;
                  <RedButton variant="outlined" onClick={() => onImageRemove(index)}><DeleteOutlinedIcon /></RedButton>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center">
            {imageList.length > 0 ?
              <Button
              variant="contained"
              onClick={predict}
              className="font-bold sm:my-2"
              {...dragProps}
            >
              Predict!
            </Button>
             : null } 
             </div>
             <ImageModal 
                open={open}
                handleClose={handleClose}
                imageSrc={previewImg} />
              {predictedFace ?
                <div className="sm:my-4 sm:py-4 flex justify-center items-center"
              >
                <Typography variant="h4">{predictedFace}!</Typography>
                </div>
              : null } 
            {/* {images.length ? <RedButton variant="outlined" onClick={onImageRemoveAll}>Remove all images</RedButton> : null} */}
          </Card>
        )}
      </ImageUploading>
  );
}

export default ImageUploader;