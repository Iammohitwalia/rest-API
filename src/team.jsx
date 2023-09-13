import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TeamGridComponent = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://strixdevelopment.net/wp-json/wp/v2/team?per_page=100')
      .then(response => {
        const teamDataWithImages = response.data.map(async member => {
          if (member.featured_media && member.featured_media !== 0) {
            const imageResponse = await axios.get(member._links['wp:featuredmedia'][0].href);
            member.image = imageResponse.data.media_details.sizes.medium.source_url;
          }
          return member;
        });

        Promise.all(teamDataWithImages).then(completed => {
          setTeamData(completed);
          setLoading(false); // Set loading to false after data is fetched
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <>
    <div className="hero-section bg-dark text-light py-5">
    <Container>
      <Row>
        <Col>
          <h1>Our Team</h1>
        </Col>
      </Row>
    </Container>
  </div>
    <Container>
      <Row>
        {loading && Array.from({ length: 4 }).map((_, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <div className="team-member loading">
              <div className="loading-shimmer"></div>
            </div>
          </Col>
        ))}
        {teamData.map(member => (
          <Col key={member.id} sm={6} md={4} lg={3}>
            <div className="team-member">
              <div className="overlay">
              <Link to={`/team/${member.id}`}><h4>{member.title.rendered}</h4></Link>
                <p>{member.acf.position}</p>
              </div>
              {member.image && (
                <Image src={member.image} alt={member.title.rendered} fluid thumbnail />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default TeamGridComponent;
