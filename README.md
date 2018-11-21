This project was bootstrapped with [Create React App(CRA)](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Running the Application](#running-the-application)
- [Stack](#stack)
- [Architecture](#architecture)
- [Tests](#tests)
- [CSS](#css)
- [Modeling](#modeling)
- [Level States](#level-states)

## Running the Application

1. Clone the repo
2. Install with ```yarn install```
3. Run with ```yarn start```
4. Test with ```yarn test```

## Stack

This app is built using a fork of Create React App(CRA) that supports TypeScript. This application is written in TypeScript and tested using Jest and Enzyme.

## Architecture

The CRA boilerplate renders an App.tsx file and in that we render a ```<Game />``` component that is the root of our business logic. The component strucutre is as follows:

Game
  - GameHeader: renders the heading and gloabl information about the game.
  - GameLevel: renders various level states.
    - LevelReady: renders hidden tiles.
    - LevelPreview: animates tiles showing them briefly.
    - LevelPlaying: plays the level itself.
    - LevelFinished: animates tiles moving out of screen and loops back to LevelReady.

## Tests

The application is fully tested. I mostly test first, but in some cases I test after the fact. Regardless, my philosophy on unit-testing is simple: the describe and it blocks should tell a simple story of what the component does, and each test should only test for equality, or the occasional function to be called. Sometimes if a component would have a small minor piece of functionality that doesn't merit testing, I will explicitly ignore it from coverage.

## CSS

I use SASS and LESS on projects often, but in this case it wasn't necessary yet. The CSS I use is simple [BEM](http://getbem.com/introduction/) syntax. It provides a really simple way to encapsulate functionality and write predictable markup. In looking at my BEM CSS, it should be possible to predict the markup that will be rendered.

## Modeling

The ```<Game />``` component uses a ```MemoryGameRecord``` as a simple front-end model. Right now it just keeps track of the user's level, but in the future it could be expanded to help persist data with a server or supply more advanced game behaviors such as providing a time limit for levels. Other models could be brough in to separate conerns as necessary.

## Level States

The states that ```<GameLevel />``` render are the heart of the application. A game of memory consists of various states that transition back and forth to each other.

The initial level is ```<LevelReady />``` which is a blank board waiting to start being played. Once the user starts to play, it transitions to a ```<LevelPreivew />``` where they get to see the tiles. This state has custom animations showing the tiles. Once the preview is done, we transition to ```<LevelPlaying />``` which clones the board and plays the game. There is are two quirks in LevelPlaying. Normally when I update state I re-copy all my data (something I learned from my Immutable.js days :-), however in this component, the boardCopy item on state updates its values in place, and I don't re-copy the state. When writing the code to duplicate state, it seemed unncessarily verbose, with no real gain given the context of a small application. But generally as a rule I would avoid in-place mutations on state data. The second quirk is that two tests in LevelPlaying aren't passing. I believe it has to do with an issue around Jests timers. Finally, once the level is complete we transition to ```<LevelFinished />```, which animates the tiles off the screen and then increments the level and transitions us back to LevelReady.




