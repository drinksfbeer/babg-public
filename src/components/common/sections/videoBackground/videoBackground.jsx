import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const VideoBackground = ({
  videoUrl,
  // mobileFallBackImage,
  height,
  content,
}) => (
  <section
    className="react-player-container"
    style={{
      height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // margin: '40px 0px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        zIndex: 20,
        height,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
      }}
    />
    <ReactPlayer
      url={videoUrl}
      style={{
        position: 'absolute',
        zIndex: 10,
      }}
      width="100%"
      height={height}
      playing
      loop
      muted
      controls={false}
    />

    <div
      style={{
        zIndex: '99999999999999',
        padding: '10px 50px',
        color: 'white',
      }}// eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </section>
);

VideoBackground.propTypes = {
  videoUrl: PropTypes.string,
  height: PropTypes.string,
  content: PropTypes.string,
};

VideoBackground.defaultProps = {
  videoUrl: 'https://vimeo.com/273754283',
  height: '100vh',
  content: '<p>Content Body</p>',
};

export default VideoBackground;
