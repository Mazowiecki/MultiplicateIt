import React from 'react';
import { Paper, Button } from '@material-ui/core';
import styled from 'styled-components'
import '../index.css';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PaperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: slateblue;
`;

const DifficultyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Dashboard = () => {
  return (
    <Container>
      <Paper elevation={3}>
        <PaperContainer>
          <Title>MultiplicateIt !</Title>
          <p>Choose difficulty:</p>
          <DifficultyContainer className='buttonsContainer'>
            <Link to={'/game/easy'}>
              <Button variant="contained">Easy</Button>
            </Link>
            <Link to={'/game/normal'}>
              <Button variant="contained" color="primary">Normal</Button>
            </Link>
            <Link to={'/game/hard'}>
              <Button variant="contained" color="secondary">Hard</Button>
            </Link>
          </DifficultyContainer>
        </PaperContainer>
      </Paper>
    </Container>
  );
};

export default Dashboard;
