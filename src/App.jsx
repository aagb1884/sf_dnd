import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './dndkit/Draggable';
import {Droppable} from './dndkit/Droppable';
import { teams } from './data/arrays';
import Instructions from './components/instructions';
import Nav from './components/nav';

function App() {
  const containers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [order, setOrder] = useState(Array(10).fill(null));
  const [isCorrect, setIsCorrect] = useState(null);
  const [allGuessesMade, setAllGuessesMade] = useState(false);
  const [numCorrectRankings, setNumberCorrectRankings] = useState(0);
 
  const selectedTeamPlayers = selectedTeam ? selectedTeam.players : []
  const selectedTeamName = selectedTeam ? selectedTeam.name : "no-team"

  const handleSelectTeam = (team) => {
    setSelectedTeam(team)
    setPlayers([])
    setOrder(Array(10).fill(null))
    setIsCorrect(null)
    setNumberCorrectRankings(0);
  }
  // checks user has made 10 guesses
  useEffect(() => {
    if (order.every(value => value !== null)) {
      setAllGuessesMade(true);
    } else {
      setAllGuessesMade(false);
    }
  }, [order]);
  
  const getRandomTen = () => {     
    const randomArray = selectedTeamPlayers.sort(() => 0.5 - Math.random())     
    .slice(0, 10)    
    setPlayers(randomArray) 
    setIsCorrect(null)
    setOrder(Array(10).fill(null))
    setNumberCorrectRankings(0);
  }  
  //gets a list of 10 players in random order, then is called in useEffect:
  useEffect(() => {
    if (selectedTeam) {
    getRandomTen();
    }
  }, [selectedTeam]);

  const getSortedTen = () => {
    return [...players].sort((a, b) => a.rank - b.rank);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (over) {
      const newOrder = [...order];
      const droppedIndex = parseInt(over.id) - 1; 
  
      newOrder[droppedIndex] = active.id;
  
      setOrder(newOrder);
    }
  };

  const isIndividualPlayerPlacedCorrectly = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
    return 'NO'

    let correctGuesses = 0;

    for (let i = 0; i <arr1.length; i++) {
    if (arr1[i] === arr2[i])
    correctGuesses += 1 }
    setNumberCorrectRankings(correctGuesses)
}
 
  const checkOrder = () => {
    const sortedIds = getSortedTen().map((player) => player.id);
    const playerIdsInOrder = order.filter((id) => id !== null);
    isIndividualPlayerPlacedCorrectly(sortedIds, playerIdsInOrder);
    setIsCorrect(JSON.stringify(sortedIds) === JSON.stringify(playerIdsInOrder));
  };

  const draggableMarkup = players.map((player) => (
    <Draggable key={player.id} id={player.id} name={player.name}>
      {player.name}
    </Draggable>
  ));

  return (
    <section className={selectedTeamName}>
      <h1 className='title'
      >Top Scorers Quiz</h1>
      <Nav 
      teams={teams} 
      handleSelectTeam={handleSelectTeam}
      getRandomTen={getRandomTen}
      checkOrder={checkOrder}
      allGuessesMade={allGuessesMade}
      setOrder={setOrder}/>
  
      {isCorrect !== null && (
            <div>
              {isCorrect ? (
                <p className='correct'>All correct. Nicely done.</p>
              ) : (
                <p className='wrong'>THAT'S WRONG, YOU FOOL. Though you did get {numCorrectRankings} correct.</p>
              )}
            </div>
          )}
      {!selectedTeam && (
        <>
        <Instructions />
        </>
      )}    
      {selectedTeam && (
        <>
          <h2 className='team-name'>{selectedTeam.name}</h2>
          <div className="dnd-context">
          <DndContext onDragEnd={handleDragEnd}>
              <div className="draggables">
                {draggableMarkup}
              </div>

              <div className="droppables">
              {containers.map((id) => (
                <Droppable key={id} id={id}>
                  <div className="droppable">
                  {order[parseInt(id) - 1] ? (
                  players.find((player) => player.id === order[parseInt(id) - 1]).name
                  ) : (
                    `${id} - Drop here`
                  )}
                  </div>
                </Droppable>
                ))}
              </div>
            </DndContext>
          </div>
          
          
        </>
      )}
    </section>
  );
}

export default App;
