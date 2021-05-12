import React from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import styled from 'styled-components'
import '../index.css';
import { Link } from 'react-router-dom';
import { setNick } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '20px 0 10px 0',
      width: '100%'
    },
  },
}));

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const userNick = useSelector(state => state.getNick);

  const handleSaveNick = event => {
    dispatch(setNick(event.target.value));
  }

  return (
    <Container className={classes.root}>
      <Paper elevation={3}>
        <PaperContainer>
          <Title>MultiplicateIt !</Title>
          <TextField onChange={handleSaveNick} id="outlined-basic" label="Nick" variant="outlined" size={"small"} defaultValue={userNick} />
          <p>Choose difficulty:</p>
          <DifficultyContainer className='buttonsContainer'>
            <Link to={userNick ? '/easy' : '#'}>
              <Button disabled={!userNick.length} variant="contained">Easy</Button>
            </Link>
            <Link to={userNick ? '/normal' : '#'}>
              <Button disabled={!userNick.length} variant="contained" color="primary">Normal</Button>
            </Link>
            <Link to={userNick ? '/hard' : '#'}>
              <Button disabled={!userNick.length} variant="contained" color="secondary">Hard</Button>
            </Link>
          </DifficultyContainer>
        </PaperContainer>
      </Paper>
    </Container>
  );
};

export default Dashboard;
