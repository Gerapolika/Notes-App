import '../style/modal.scss';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ImageUploading from "react-images-uploading";
import PropTypes from 'prop-types';
import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { addTodo, updateTodo, addImage, deleteImg } from '../store/TodoSlice';
import italicIcon from "../images/icon-italic.png"
import boldIcon from "../images/icon-bold.png"
import imgIcon from "../images/icon-add-image.png"
import deleteIcon from "../images/delete-icon.png"

const Modal = ({ isVisible = false, id, onClose }) => {

  Modal.propTypes = {
    isVisible: PropTypes.bool,
    id: PropTypes.string,
    onClose: PropTypes.func,
  }

  const { register, handleSubmit, reset } = useForm();
  const [isSubmit, setIsSubmit] = useState(false)
  const [text, setText] = useState('')
  const [italic, setItalic] = useState(false)
  const [bold, setBold] = useState(false)

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const [deletesImages, setDeletedImages] = useState([])

  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    if (id.length > 0) {
      const todo = todos.find(el => el.id === id).todo
      id.length > 0 ? setText(todo) : setText('')
    } else {
      setText('')
    }
  }, [id])

  //creating image urls from firestore and reset images array
  useEffect(() => {
    setImages([])
    if (id.length > 0) {
      const imgArr = todos.find(el => el.id === id).img
      imgArr.map(el => {
        getDownloadURL(ref(storage, el))
          .then((url) => setImages(prevImages => [
            ...prevImages,
            { data_url: url, file: { name: el.replace('Images/', '') } }
          ]))
        return false;
      })
    } else {
      setImages([])
    }
  }, [id])

  useEffect(() => {
    if (id.length > 0) {
      const italic = todos.find(el => el.id === id).italic
      setItalic(italic)
      const bold = todos.find(el => el.id === id).bold
      setBold(bold)
    }
  }, [id])

  useEffect(() => {
    reset({
      data: 'todo'
    })
  }, [isSubmit])

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });


  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        setImages([])
        onClose();
        break;
      default:
    }
  };

  const dispatch = useDispatch();

  const getImg = (imageList) => {
    setImages(imageList);
  };

  const onSubmit = () => {
    //existing note
    if (id.length > 0) {
      dispatch(updateTodo({ text, italic, bold, id: id }))
      images.map(item => {
        dispatch(addImage({ url: item.data_url, name: item.file.name, id: id }))
      })
      deletesImages.map(item => {
        dispatch(deleteImg({ url: item.data_url, name: item.name, id: item.id }))
      })
    } else {
      //non-existing note
      const newId = new Date().toISOString()
      dispatch(addTodo({ text, italic, bold, id: newId }))
      images.map(item => {
        dispatch(addImage({ url: item.data_url, name: item.file.name, id: newId }))
      })
    }
    setIsSubmit(prevIsSubmit => !prevIsSubmit)
    onClose();
  }

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="icons-contain">
            {/* cursive */}
            <div>
              <button className="text-style-icon"
                onClick={(e) => { setItalic(prevItalic => !prevItalic); e.preventDefault() }}
              >
                <img src={italicIcon} alt="italicIcon" />
              </button>
            </div>

            {/* bold */}
            <div>
              <button className="text-style-icon"
                onClick={(e) => { setBold(prevBold => !prevBold); e.preventDefault() }}
              >
                <img src={boldIcon} alt="boldIcon" />
              </button>
            </div>

            {/* addImage */}
            <ImageUploading
              multiple
              value={images}
              onChange={getImg}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              acceptType={["jpg"]}
            >
              {({
                // imageList,
                onImageUpload,
                // onImageRemoveAll,
                // onImageUpdate,
                // onImageRemove,
                // isDragging,
                dragProps
              }) => (
                <div className="upload__image-wrapper">
                  <div>
                    <button className="text-style-icon"
                      onClick={(e) => { onImageUpload(); e.preventDefault() }}
                      {...dragProps}
                    >
                      <img src={imgIcon} alt="imgIcon" />
                    </button>
                  </div>
                </div>
              )}
            </ImageUploading>

            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>

          {/* textarea */}
          <div className="modal-texarea">
            <textarea id="control"
              className={
                `modal-todo 
                ${italic ? "italic" : ""}
                ${bold ? "bold-text" : ""}`
              }
              {...register('todo', {
                required: true,
                minLength: 1,
              })}
              placeholder="Что запланируем?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
            </textarea >
          </div>

          {/* images */}
          <figure className="images">
            {images.map((image, index) =>
              <div key={index} className="image-item">
                <img className='img' src={image.data_url} alt="" />
                <div >
                  {/* delete image */}
                  <button className="delete-img"
                    onClick={() => {
                      setDeletedImages(prevDeletedImages => [
                        ...prevDeletedImages,
                        {
                          id: id,
                          data_url: image.data_url,
                          name: image.file.name
                        }
                      ])
                      setImages(images.filter(el => el.data_url !== image.data_url))
                    }}>
                    <img src={deleteIcon} alt="deleteIcon" />
                  </button>
                </div>
              </div>
            )}
          </figure>

          <div className="submit-button">
            <button type="submit" className="button">
              Сохранить заметку
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Modal