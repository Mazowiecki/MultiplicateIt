import React, { useEffect, useState } from 'react';
import { Grid, Tabs, Tab, Paper, Typography, Box, Button } from '@material-ui/core';
import '../index.css';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DisplayResults = props => {
  let { results, settings } = props;
  const [totalPoints, setTotalPoints] = useState(0);
  const [displayResults, setDisplayResults] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const userNick = useSelector(state => state.getNick);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    generateResults();
  }, [results]);

  const getLeaderBoard = () => {
    fetch('http://localhost:5000/leaderBoard', {
      crossDomain: true,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(res => {
        setLeaderBoardData(res.data);
      });
  };

  const putLeaderBoard = (points) => {
    fetch('http://localhost:5000/putLeaderBoard', {
      crossDomain: true,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: userNick,
        points: points
      })
    })
      .then(res => {
        getLeaderBoard();
      });
  }

  const generateResults = () => {
    let points = 0;
    for (const result of results) {
      if (settings.difficulty === 'easy') {
        if ((result.numberOne * result.numberTwo) == result.userResult) {
          result.points = 10;
        } else {
          result.points = 0;
          result.false = true
        }
      } else if (settings.difficulty === 'normal') {
        if ((result.numberOne * result.numberTwo) == result.userResult) {
          if (result.time % 2 === 0) {
            result.points = result.time;
          } else {
            result.points = result.time++;
          }
        } else {
          result.points = 0;
          result.false = true
        }
      } else {
        if ((result.numberOne * result.numberTwo) == result.userResult) {
          result.points = result.time * 2;
        } else {
          result.points = 0;
          result.false = true
        }
      }
      points += result.points;
    }
    setDisplayResults(results);
    setTotalPoints(points);
    putLeaderBoard(points);
  }

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Results" />
          <Tab label="LeaderBoard" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={3}><></></Grid>
          <Grid item xs={3}><p>Operation</p></Grid>
          <Grid item xs={3}><p>Result</p></Grid>
          <Grid item xs={3}><p>Points</p></Grid>
          {displayResults.map((result, index) => (
            <>
              <Grid item xs={3}><p>{`Operation nr ${index+1}:`}</p></Grid>
              <Grid item xs={3}><p>{`${result.numberOne} * ${result.numberTwo}`}</p></Grid>
              <Grid item xs={3}><p className={(result.false ? 'false' : '')}>{result.false ? result.userResult === -1 ? 'no result': <p><del>{result.userResult}</del> {result.numberOne * result.numberTwo}</p> : `   ${result.userResult}`}</p></Grid>
              <Grid item xs={3}><p>{`   ${result.points}`}</p></Grid>
            </>
          ))}
        </Grid>
        <p>{`All points: ${totalPoints}`}</p>
        <Link to={'/'}>
          <Button size='medium' variant="outlined" color="primary">Home</Button>
        </Link>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}><p>Nick</p></Grid>
          <Grid item xs={6}><p>Points</p></Grid>
          {leaderBoardData?.map((result, index) => (
            <>
              <Grid item xs={6}><p>{result.nick}</p></Grid>
              <Grid item xs={6}><p>{result.points}</p></Grid>
            </>
          ))}
        </Grid>
        <Link to={'/'}>
          <Button size='medium' variant="outlined" color="primary">Home</Button>
        </Link>
      </TabPanel>
    </>
  );
};

export default DisplayResults;
