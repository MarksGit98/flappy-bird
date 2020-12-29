import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Bird from "./components/bird";
import Obstacles from "./components/obstacles";
export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const gap = 200;
  const obstaclesHeight = (screenHeight - gap) / 2;
  const obstaclesWidth = 60;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + (screenWidth + obstaclesWidth) / 2
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const gravity = 3;
  const obstacleSpeed = 5;
  const randomHeight = 200;
  let gameTimerID;
  let obstaclesLeftTimerID;
  let obstaclesLeftTimerIDTwo;
  // start bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerID = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerID);
      };
    }
  }, [birdBottom]);

  useEffect(() => {
    if (obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimerID = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - obstacleSpeed);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerID);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * randomHeight);
    }
  }, [obstaclesLeft]);

  useEffect(() => {
    if (obstaclesLeftTwo > -obstaclesWidth) {
      obstaclesLeftTimerIDTwo = setInterval(() => {
        setObstaclesLeftTwo(
          (obstaclesLeftTwo) => obstaclesLeftTwo - obstacleSpeed
        );
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerIDTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * randomHeight);
    }
  }, [obstaclesLeftTwo]);

  useEffect(() => {
    if (birdBottom  < (obstaclesNegHeight + obstaclesHeight + obstaclesWidth/2)) || (birdBottom > (obstaclesNegHeight + obstaclesHeight + gap -  ))
  }, [])


  return (
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
      <Obstacles
        color={"green"}
        obstaclesLeft={obstaclesLeft}
        obstaclesHeight={obstaclesHeight}
        obstaclesWidth={obstaclesWidth}
        randomBottom={obstaclesNegHeight}
        gap={gap}
      />
      <Obstacles
        color={"yellow"}
        obstaclesLeft={obstaclesLeftTwo}
        obstaclesHeight={obstaclesHeight}
        obstaclesWidth={obstaclesWidth}
        randomBottom={obstaclesNegHeightTwo}
        gap={gap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
