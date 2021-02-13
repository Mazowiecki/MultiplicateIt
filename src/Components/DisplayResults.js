import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import '../index.css';

const DisplayResults = props => {
  let { results, settings } = props;
  const [totalPoints, setTotalPoints] = useState(0);
  const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    generateResults();
  }, [props]);

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
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}><></></Grid>
        <Grid item xs={3}><p>Operation</p></Grid>
        <Grid item xs={3}><p>Result</p></Grid>
        <Grid item xs={3}><p>Points</p></Grid>
        {displayResults.map((result, index) => (
          <>
            <Grid item xs={3}><p>{`Operation nr ${index+1}:`}</p></Grid>
            <Grid item xs={3}><p>{`${result.numberOne} * ${result.numberTwo}`}</p></Grid>
            <Grid item xs={3}><p className={(result.false ? 'false' : '')}>{result.false ? result.userResult === -1 ? 'no result': <><del>{result.userResult}</del> {result.numberOne * result.numberTwo}</> : `   ${result.userResult}`}</p></Grid>
            <Grid item xs={3}><p>{`   ${result.points}`}</p></Grid>
          </>
        ))}
      </Grid>
      <p>{`All points: ${totalPoints}`}</p>
    </>
  );
};

export default DisplayResults;
