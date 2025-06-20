import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Game {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  component: React.ComponentType;
}

// Memory Game Component
const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🎈', '🎨', '🎭', '🎪', '🎯', '🎲', '🧸', '🎁'];

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => index);
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(true);
  };

  const flipCard = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstEmoji = emojis[cards[first] % emojis.length];
      const secondEmoji = emojis[cards[second] % emojis.length];

      if (firstEmoji === secondEmoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => {
            Alert.alert('Congratulations!', `You won in ${moves + 1} moves!`);
          }, 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameTitle}>Memory Game</Text>
        <Text style={styles.gameSubtitle}>Find matching pairs!</Text>
        {gameStarted && (
          <Text style={styles.movesCounter}>Moves: {moves}</Text>
        )}
      </View>

      {!gameStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={initializeGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cardGrid}>
          {cards.map((cardIndex, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            const emoji = emojis[cardIndex % emojis.length];
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.card, isFlipped && styles.cardFlipped]}
                onPress={() => flipCard(index)}>
                <Text style={styles.cardText}>
                  {isFlipped ? emoji : '?'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={initializeGame}>
        <MaterialIcons name="refresh" size={20} color="white" />
        <Text style={styles.resetButtonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

// Math Quiz Component
const MathQuiz = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    let correctAnswer: number;
    let questionText: string;

    if (operation === '+') {
      correctAnswer = num1 + num2;
      questionText = `${num1} + ${num2} = ?`;
    } else {
      if (num1 >= num2) {
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2} = ?`;
      } else {
        correctAnswer = num2 - num1;
        questionText = `${num2} - ${num1} = ?`;
      }
    }

    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== correctAnswer && wrong >= 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setQuestion(questionText);
    setAnswer(correctAnswer);
    setOptions(allOptions);
  };

  const startGame = () => {
    setScore(0);
    setTotal(0);
    setGameStarted(true);
    generateQuestion();
  };

  const selectAnswer = (selectedAnswer: number) => {
    const newTotal = total + 1;
    const newScore = selectedAnswer === answer ? score + 1 : score;
    
    setTotal(newTotal);
    setScore(newScore);

    if (selectedAnswer === answer) {
      Alert.alert('Correct!', 'Well done! 🎉');
    } else {
      Alert.alert('Oops!', `The correct answer was ${answer}. Try the next one! 😊`);
    }

    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameTitle}>Math Quiz</Text>
        <Text style={styles.gameSubtitle}>Test your math skills!</Text>
        {gameStarted && (
          <Text style={styles.scoreCounter}>Score: {score}/{total}</Text>
        )}
      </View>

      {!gameStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quizContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => selectAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={startGame}>
        <MaterialIcons name="refresh" size={20} color="white" />
        <Text style={styles.resetButtonText}>New Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

// Color Game Component
const ColorGame = () => {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  const colors = [
    { name: 'red', color: '#FF6B6B' },
    { name: 'blue', color: '#4ECDC4' },
    { name: 'green', color: '#95E1A3' },
    { name: 'yellow', color: '#FFA726' },
    { name: 'purple', color: '#BA68C8' },
    { name: 'orange', color: '#FF8A65' },
    { name: 'pink', color: '#F48FB1' },
    { name: 'teal', color: '#4DB6AC' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      Alert.alert('Time\'s Up!', `Final Score: ${score} points! 🎉`);
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft, score]);

  const generateColorChallenge = () => {
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    const target = shuffledColors[0];
    const options = shuffledColors.slice(0, 4);
    
    setTargetColor(target.name);
    setColorOptions(options.map(c => c.name));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    setGameActive(true);
    generateColorChallenge();
  };

  const selectColor = (selectedColor: string) => {
    if (!gameActive) return;

    if (selectedColor === targetColor) {
      setScore(score + 1);
      generateColorChallenge();
    }
  };

  const getColorValue = (colorName: string) => {
    return colors.find(c => c.name === colorName)?.color || '#000';
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameTitle}>Color Game</Text>
        <Text style={styles.gameSubtitle}>Tap the correct color!</Text>
        {gameStarted && (
          <View style={styles.gameStats}>
            <Text style={styles.scoreCounter}>Score: {score}</Text>
            <Text style={styles.timeCounter}>Time: {timeLeft}s</Text>
          </View>
        )}
      </View>

      {!gameStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.colorGameContainer}>
          <View style={styles.targetColorContainer}>
            <Text style={styles.targetColorText}>Find: {targetColor.toUpperCase()}</Text>
          </View>
          
          <View style={styles.colorOptionsContainer}>
            {colorOptions.map((colorName, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorOption, { backgroundColor: getColorValue(colorName) }]}
                onPress={() => selectColor(colorName)}
                disabled={!gameActive}>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={startGame}>
        <MaterialIcons name="refresh" size={20} color="white" />
        <Text style={styles.resetButtonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      id: 1,
      title: 'Memory Game',
      description: 'Test your memory by finding matching pairs of emojis!',
      icon: 'psychology',
      color: '#FF6B6B',
      component: MemoryGame,
    },
    {
      id: 2,
      title: 'Math Quiz',
      description: 'Practice addition and subtraction with fun questions!',
      icon: 'calculate',
      color: '#4ECDC4',
      component: MathQuiz,
    },
    {
      id: 3,
      title: 'Color Game',
      description: 'Quick! Tap the correct color before time runs out!',
      icon: 'palette',
      color: '#96CEB4',
      component: ColorGame,
    },
  ];

  const selectGame = (game: Game) => {
    setSelectedGame(game);
  };

  const goBackToMenu = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.gameHeader, { backgroundColor: selectedGame.color }]}>
          <TouchableOpacity style={styles.backButton} onPress={goBackToMenu}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.selectedGameTitle}>{selectedGame.title}</Text>
        </View>
        <GameComponent />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fun Games</Text>
        <Text style={styles.headerSubtitle}>Choose a game and let's play together!</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { backgroundColor: game.color }]}
              onPress={() => selectGame(game)}
              activeOpacity={0.8}>
              <MaterialIcons name={game.icon as any} size={48} color="white" />
              <Text style={styles.gameCardTitle}>{game.title}</Text>
              <Text style={styles.gameCardDescription}>{game.description}</Text>
              <View style={styles.playButton}>
                <MaterialIcons name="play-arrow" size={24} color={game.color} />
                <Text style={[styles.playButtonText, { color: game.color }]}>Play</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>How to Play</Text>
          <View style={styles.instructionItem}>
            <MaterialIcons name="touch-app" size={20} color="#4ECDC4" />
            <Text style={styles.instructionText}>Tap on any game card to start playing</Text>
          </View>
          <View style={styles.instructionItem}>
            <MaterialIcons name="emoji-events" size={20} color="#FF6B6B" />
            <Text style={styles.instructionText}>Complete challenges to earn points</Text>
          </View>
          <View style={styles.instructionItem}>
            <MaterialIcons name="refresh" size={20} color="#96CEB4" />
            <Text style={styles.instructionText}>Use the refresh button to restart anytime</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#45B7D1',
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  gamesGrid: {
    gap: 15,
  },
  gameCard: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  gameCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  gameCardDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 15,
    lineHeight: 20,
  },
  playButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  instructionsSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 12,
    flex: 1,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 15,
  },
  selectedGameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    padding: 20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  gameSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 5,
  },
  startButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 30,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#95A5A6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  movesCounter: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
  },
  card: {
    width: (width - 80) / 4,
    height: (width - 80) / 4,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  cardFlipped: {
    backgroundColor: '#E8F4FD',
  },
  cardText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  scoreCounter: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  quizContainer: {
    marginTop: 30,
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: (width - 60) / 2,
    backgroundColor: '#4ECDC4',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeCounter: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '600',
  },
  colorGameContainer: {
    marginTop: 30,
  },
  targetColorContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  targetColorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: (width - 60) / 2,
    height: 80,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});