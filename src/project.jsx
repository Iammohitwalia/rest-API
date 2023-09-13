import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const PortfolioGridComponent = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://strixdevelopment.net/wp-json/wp/v2/portfolio?per_page=100'
        );
        const data = await response.json();

        const portfolioDataWithImages = data.map(async (item) => {
          if (item.featured_media && item.featured_media !== 0) {
            const mediaResponse = await fetch(
              item._links['wp:featuredmedia'][0].href
            );
            const mediaData = await mediaResponse.json();
            const imageUrl = mediaData.source_url;
            item.imageUrl = imageUrl;
          }
          return item;
        });

        const completed = await Promise.all(portfolioDataWithImages);
        setPortfolioData(completed);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-dark text-light py-5">
        <Container>
          <Row>
            <Col>
              <h1>Our Projects</h1>
            </Col>
          </Row>
        </Container>
      </div>


     <Container>
        <Row>
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Col key={index} sm={6} md={4} lg={3}>
                <div className="portfolio-item loading">
                  <div className="loading-shimmer"></div>
                </div>
              </Col>
            ))}
          {portfolioData.map((item) => (
            <Col key={item.id} sm={6} md={4} lg={3}>
              <div className="portfolio-item">
                {item.imageUrl && (
                  <div className="portfolio-image">
                    <div className="overlay">
                      <h4>{item.title.rendered}</h4>
                    </div>
                    <Image src={item.imageUrl} fluid thumbnail />
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PortfolioGridComponent;
