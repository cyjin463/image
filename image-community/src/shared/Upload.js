import React from "react";
import {  Button } from "../elements";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

const Upload = (props) => {
    const fileInput = React.useRef();
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);

    const selectFile = (e) => {

       const reader = new FileReader();
       const file = fileInput.current.files[0];

       reader.readAsDataURL(file);

       reader.onloadend = () => {
           dispatch(imageActions.setPreview(reader.result));
       }
    }

    const uploadFB = () => {

        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
 };


    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB} text="업로드" ></Button>
        </React.Fragment>
    )
}

export default Upload;