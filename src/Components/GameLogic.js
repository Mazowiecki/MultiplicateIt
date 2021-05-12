import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import '../index.css';
import { setResult, setTime, setOne, setTwo } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayResults from './DisplayResults';

const useStyles = makeStyles((theme) => ({
  root: {
    '&': {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    },
    '& > button': {
      marginTop: '20px'
    },
    '& .MuiTextField-root': {
      width: 100,
      '& input': {
        fontSize: '25px!important',
        fontWeight: '700',
        textAlign: 'center!important'
      }
    },
  },
}));

const Counter = styled.div`
  font-size: 200px;
  color: #f08080;
  font-weight: bold;
`;

const TimeLeft = styled.p`
  font-size: 20px;
  color: lightcoral;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 300px;
  z-index: 2;
`;

const TaskContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StartButton = styled(Button)`
  margin-bottom: 10px;
`;


export const GameLogic = props => {
  let { settings, round, updateRound } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showStart, setShowStart] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  let [counter, setCounter] = useState(3);
  let [answerTimeDisplay, setAnswerTimeDisplay] = useState(settings.time);
  let answerTime = settings.time;
  const [showTask, setShowTask] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userResult, setUserResult] = useState('');
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [finalResults, setFinalResults] = useState([]);
  const getOne = useSelector(state => state.getOne);
  const getTwo = useSelector(state => state.getTwo);
  const getTime = useSelector(state => state.getTime);
  const getResult = useSelector(state => state.getResult);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    let roundHelper = round;
    if (showResults) {
      roundHelper++;
    }
    if ((finalResults.length != roundHelper -1)) {
      setFinalResults(finalResults => [...finalResults, { numberOne: getOne, numberTwo: getTwo, userResult: -1, time: null }]);
    }
    setUserResult('');
  }, [round, showResults]);

  const startCounter = () => {
    setShowCounter(true);
    setCounter(counter--);
    const interval = setInterval(() => {
      if (counter === 0) {
        setShowCounter(false);
        clearInterval(interval);
        startAnswerCounter();
      }
      setCounter(counter--);
    }, 1000);
  }

  const startAnswerCounter = () => {
    updateRound(round++);
    answerTime = settings.time;
    createTask();
    setShowTask(true);
    setAnswerTimeDisplay(answerTime);
    dispatch(setTime(answerTime));
    answerTime--;
    const answerInterval = setInterval(() => {
      setAnswerTimeDisplay(answerTime);
      dispatch(setTime(answerTime));
      if (answerTime <= 0) {
        nextRound(answerInterval);
      } else {
        answerTime--;
      }
    }, 1000);
  }

  const nextRound = (interval) => {
    clearInterval(interval);
    if (round !== settings.rounds + 1) {
      setDisabledSubmit(false);
      startAnswerCounter();
    } else {
      setShowTask(false);
      setShowResults(true);
    }
  }

  const handleChangeInput = event => {
    const { value } = event.target;
    const result = value.slice(0, 2);
    setUserResult(result);
    dispatch(setResult(result));
  }

  const createTask = () => {
    const one = Math.floor(Math.random() * 10) + 1;
    const two = Math.floor(Math.random() * 10) + 1;
    dispatch(setOne(one));
    dispatch(setTwo(two));
    setNumberOne(one);
    setNumberTwo(two);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setFinalResults(finalResults => [...finalResults, {numberOne: getOne, numberTwo: getTwo, userResult: getResult, time: getTime}]);
    setDisabledSubmit(true);
  }


  return (
    <div className={classes.root}>
      { showStart ?
        <>
          <StartButton size='large' onClick={() => {setShowStart(false); startCounter();}} variant="contained" color="secondary">Start</StartButton>
          <Link to={'/'}>
            <Button size='small' variant="outlined" color="primary">Home</Button>
          </Link>
        </>
        : null }
      { showCounter ? <Counter>{counter}</Counter> : null}
      { showTask ?
        <>
          <Content>
            <TimeLeft>{answerTimeDisplay}</TimeLeft>
            <p className='operation'> {`${numberOne} * ${numberTwo}`}</p>
            <TaskContent>
              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField className='input' required id="standard-basic" maxLength="2" value={userResult} onChange={handleChangeInput}/>
                <Button disabled={disabledSubmit} type="submit" variant="outlined">Save</Button>
              </form>
            </TaskContent>
          </Content>
          <CircularProgress className="progress" variant="determinate" value={answerTimeDisplay * settings.timeMultiply} />
        </>
        : null }
      { showResults ? <DisplayResults results={finalResults} settings={settings}/> : null }
    </div>
  );
}
