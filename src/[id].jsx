import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const TeamMemberDetail = () => {
  const [teamMember, setTeamMember] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://strixdevelopment.net/wp-json/wp/v2/team/${id}`);
        const mediaResponse = await axios.get(response.data._links['wp:featuredmedia'][0].href);
        const imageUrl = mediaResponse.data.source_url;
        setTeamMember({ ...response.data, imageUrl });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <div className="team-member-detail">
        <h2>{teamMember.title?.rendered}</h2>
        {teamMember.imageUrl && (
          <img
            src={teamMember.imageUrl}
            alt={teamMember.title?.rendered}
          />
        )}
      </div>
    </Container>
  );
};

export default TeamMemberDetail;
