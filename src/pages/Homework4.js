import React from 'react';
import { Progress } from 'reactstrap';
import 'animate.css';

class Homework4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: '',
      images: [],
      currentImageIndex: 0,
      accordionOpen: false,
      selectedDate: null,
      loadedImages: 0,
      loadingMessage: 'Loading',
      activeFilter: 'all',
      clickedImageIndex: null
    };
    this.loadingInterval = null;
  }

  componentDidMount() {
    this.loadingInterval = setInterval(() => {
      this.setState(prevState => {
        const dotCount = prevState.loadingMessage.split('.').length - 1;
        const newLoadingMessage = dotCount < 9 ? prevState.loadingMessage + '.' : 'Loading';
        return { loadingMessage: newLoadingMessage };
      });
    }, 500);

    fetch('http://localhost:3001/data/gallery.json')
      .then(response => response.json())
      .then(data => {
        clearInterval(this.loadingInterval);
        this.setState({ gallery: data.gallery, images: data.images });
      });
  }

  componentWillUnmount() {
    clearInterval(this.loadingInterval);
  }

  handlePreviousImage = () => {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + prevState.images.length) % prevState.images.length
    }));
    const img = document.querySelector('.animate__animated');
    img.classList.remove('animate__fold');
    setTimeout(() => {
      void img.offsetWidth;
      img.classList.add('animate__fold');
    }, 0);
  }

  handleNextImage = () => {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % prevState.images.length
    }));
    const img = document.querySelector('.animate__animated');
    img.classList.remove('animate__fold');
    setTimeout(() => {
      void img.offsetWidth;
      img.classList.add('animate__fold');
    }, 0);
  }

  handleSliderChange = event => {
    this.setState({ currentImageIndex: event.target.value });
  }

  handleAccordionToggle = () => {
    this.setState(prevState => ({ accordionOpen: !prevState.accordionOpen }));
  }

  handleDateChange = event => {
    this.setState({ selectedDate: event.target.value });
  }

  handleImageClick = index => {
    this.setState({ currentImageIndex: index, clickedImageIndex: index });
  }

  handleImageLoad = () => {
    this.setState(prevState => ({ loadedImages: prevState.loadedImages + 1 }));
  }

  handleFilterChange = event => {
    this.setState({ activeFilter: event.target.value });
  }

  render() {
    const { gallery, images, currentImageIndex, accordionOpen, selectedDate, loadedImages, loadingMessage, activeFilter} = this.state;
    const progressValue = images.length > 0 ? (loadedImages / images.length) * 100 : 0;
    const imageTypes = [...new Set(images.map(image => image.type))];
    const filteredImages = activeFilter === 'all' ? images : images.filter(image => image.type === activeFilter);
    return (
      <div>
        <style>
          {`
            .smooth-animation {
              animation-duration: 5s;
            }
          `}
        </style>
        {images.length === 0 ? (
          <div>{loadingMessage}</div>
        ) : (
          <>
            <h1>{gallery}</h1>
            <div>
              <label htmlFor="imageTypeFilter">Filter by type:</label>
              <select id="imageTypeFilter" onChange={this.handleFilterChange} value={activeFilter}>
                <option value="all">All</option>
                {imageTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <Progress value={progressValue} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {filteredImages.map((image, index) => (
                <div key={index} style={{ margin: '0 10px' }}>
                  <img src={image.file} alt={image.name} style={{ width: '150px' }} onLoad={this.handleImageLoad} />
                </div>
              ))}
            </div>
            {images.length > 0 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                  <img
                    src={images[currentImageIndex].file}
                    alt={images[currentImageIndex].name}
                    style={{ width: '300px' }}
                    className="animate__animated animate__flipInX smooth-animation"
                  />
                  <div style={{ marginTop: '10px' }}>
                    <button onClick={this.handlePreviousImage}>Left</button>
                    <button onClick={this.handleNextImage}>Right</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <input type="range" min="0" max={images.length - 1} value={currentImageIndex} onChange={this.handleSliderChange} />
                </div>
                <div style={{  display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                  <button onClick={this.handleAccordionToggle}>Accordion</button>
                  {accordionOpen && (
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                      {images.map((image, index) => (
                        <li key={index} style={{ margin: '10px 0' }}>
                          <img src={image.file} alt={image.name} style={{ width: '150px', cursor: 'pointer' }} onClick={() => this.handleImageClick(index)} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{  display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <input type="date" onChange={this.handleDateChange} />
                  {selectedDate && <p>You have selected the date: {selectedDate}</p>}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}


export default Homework4;