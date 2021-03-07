import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost}) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState('');
  let mediaPrefix = ''
  let mediaChanged = false
  const mediaOnchange = (e) => {
    mediaPrefix = e.target.files[0].name;
    mediaChanged = true;
    setMedia(e.target.files[0]);
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <p className="post-salutation">Say Something...</p>
        {/* <p>{name}</p> */}
      </div>
      <form
        className='form my-1'
        encType='multipart/form-data'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('text', text);
          formData.append('media', media);
          addPost(formData);
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          className="post-textarea"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="image-upload">
          <div>
          <label for="file-input">
            {/* <img src="" height="20px" width="20px"/> */}
            <i class="fas fa-paperclip"> Add Media</i>
            {mediaChanged && (
              <span>{mediaPrefix}</span>
            )}
            {console.log(mediaPrefix)}
          </label>
          <input
          type='file'
          filename='media'
          id="file-input"
          className="hidden-input"
          // value={media}
          onChange={mediaOnchange}
        />
          </div>
        <div>
          <input type='submit' className='btn post-submit right-align' value='Post' />
        </div>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(PostForm);
