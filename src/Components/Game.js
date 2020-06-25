import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components'
import '../index.css';
import GameLogic from './GameLogic';

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
  min-height: 400px;
  min-width: 400px;
  position: relative;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid grey;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: slateblue;
`;

const TopbarInfo = styled.div`
  font-size: 13px;
  color: lightcoral;
  font-weight: bold;
`;

const settings = [
  { id: 0, type: 'easy', time: 15, timeMultiply: 6.6, maxPoints: 10, rounds: 10 },
  { id: 1, type: 'normal', time: 10, timeMultiply: 10, maxPoints: 10, rounds: 15 },
  { id: 2, type: 'hard', time: 5, timeMultiply: 20, maxPoints: 10, rounds: 5 }
]

const Game = props => {
  const currentSetting = settings.findIndex(x => x.type === props.match.params.difficulty);
  const [currenRound, setCurrenRound] = useState(1);

  const updateRound = round => {
    setCurrenRound(round);
  }

  return (
    <Container>
      <Paper elevation={3}>
        <Topbar>
          <TopbarInfo>{props.match.params.difficulty.toUpperCase()}</TopbarInfo>
          <Title>MultiplicateIt !</Title>
          <TopbarInfo>{`${currenRound}/${settings[currentSetting].rounds}`}</TopbarInfo>
        </Topbar>
        <PaperContainer>
          <GameLogic settings={settings[currentSetting]} round={currenRound} updateRound={updateRound} />
        </PaperContainer>
      </Paper>
    </Container>
  );
};

export default Game;
