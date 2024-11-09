import './App.css';
import Header from "./Header";
import { Fragment } from 'react';
import ImageUploader from "./ImageUploader"

function App() {
  return (
    <Fragment>
        <Header />
        <div className="min-h-screen px-10 sm:px-60 sm:pt-10" >
          <ImageUploader />
        </div>
    </Fragment>
  );
}

export default App;
