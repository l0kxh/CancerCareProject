import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { data } from "../../Data/cancerTodayData";
import { useSelector } from "react-redux";

const AnimatedPieChart = Animated.createAnimatedComponent(PieChart);

const CancerToday = () => {
  const { darkMode } = useSelector((state) => state.userReducer);
  const [animation] = useState(new Animated.Value(0));
  const [pieChartData, setPieChartData] = useState([]);
  const [styles, setStyles] = useState(getStyles(darkMode));
  useEffect(() => {
    setStyles(getStyles(darkMode));
    generateRandomColors();
    animateChart();
  }, [darkMode]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomColors = () => {
    const randomColors = data.map(() => getRandomColor());
    setPieChartData(
      data.map((item, index) => ({
        key: item.Cancer,
        value: item.percent,
        svg: { fill: randomColors[index] },
      }))
    );
  };

  const animateChart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.mainContainer}>
      <AnimatedPieChart
        style={{ height: 300, transform: [{ rotate }] }}
        data={pieChartData}
        innerRadius="50%"
        padAngle={0.0}
      />
    </View>
  );
};

const getStyles = (darkMode) => {
  return StyleSheet.create({
    mainContainer: { 
        height:"100%",
        paddingTop: 50 ,
        backgroundColor:darkMode ? "#000" : "#fff"
    },
  });
};
export default CancerToday;
