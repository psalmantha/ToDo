import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

function App(): React.JSX.Element {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState<{ id: number, text: string, originalIndex: number }[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<{ id: number, text: string, originalIndex: number }[]>([]);
  const [taskIdCounter, setTaskIdCounter] = useState(0);
  const [currentDate, setCurrentDate] = useState({ day: '', fullDate: '' });

  useEffect(() => {
    const date = new Date();
  
    // Format the full date to be like "24 Sept"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Get the day of the week (e.g., "Sat")
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    setCurrentDate({ day: dayOfWeek, fullDate: formattedDate });
  }, []);
  
  

  const addTask = () => {
    if (inputTask.length > 0) {
      const newId = taskIdCounter;
      const newIndex = tasks.length;
      setTasks([...tasks, { id: newId, text: inputTask, originalIndex: newIndex }]);
      setTaskIdCounter(newId + 1);
      setInputTask('');
    }
  };

  const handleCheck = (taskId: number, isChecked: boolean) => {
    if (isChecked) {
      const taskToMove = tasks.find(task => task.id === taskId);
      if (taskToMove) {
        setFinishedTasks([...finishedTasks, { ...taskToMove, originalIndex: taskToMove.originalIndex }]);
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    } else {
      const taskToMove = finishedTasks.find(task => task.id === taskId);
      if (taskToMove) {
        const updatedTasks = [...tasks, { ...taskToMove, originalIndex: taskToMove.originalIndex }];
        updatedTasks.sort((a, b) => a.originalIndex - b.originalIndex);
        setTasks(updatedTasks);
        setFinishedTasks(finishedTasks.filter(task => task.id !== taskId));
      }
    }
  };

  const renderItem = ({ item }: { item: { id: number, text: string, originalIndex: number } }) => (
    <View style={styles.taskItem}>
      <CheckBox
        value={false}
        onValueChange={() => handleCheck(item.id, true)}
        style={styles.checkbox}
      />
      <Text style={styles.taskText}>{item.text}</Text>
    </View>
  );

  const renderFinishedItem = ({ item }: { item: { id: number, text: string, originalIndex: number } }) => (
    <View style={styles.taskItem}>
      <CheckBox
        value={true}
        onValueChange={() => handleCheck(item.id, false)}
        style={styles.checkbox}
      />
      <Text style={styles.finishedTaskText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.date}>
          <Text style={styles.boldDay}>{currentDate.day}</Text>, {currentDate.fullDate}
        </Text>
        <Text style={styles.headerText}>Hi, Farah!</Text>
        <Text style={styles.subHeaderText}>Another to-do?</Text>
      </View>


      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.bodyText}>LIST A TASK</Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder='Type your to-do here'
            value={inputTask}
            onChangeText={setInputTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksContainer}>
          <Text style={styles.bodyText}>YOUR TASKS</Text>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.taskList}
            contentContainerStyle={styles.taskListContent}
          />
        </View>

        {finishedTasks.length > 0 && (
          <View style={styles.finishedTasksContainer}>
            <Text style={styles.bodyText}>FINISHED TASKS</Text>
            <FlatList
              data={finishedTasks}
              renderItem={renderFinishedItem}
              keyExtractor={item => item.id.toString()}
              style={styles.taskList}
              contentContainerStyle={styles.taskListContent}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  date: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#545454',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  boldDay: {
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#D5E7FF',
    padding: 40,
    paddingTop: 60,
    paddingBottom: 80,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#263263',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#56618E',
    marginTop: 5,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    marginTop: -50,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 3,
    color: '#333',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#F7F7F7',
    paddingLeft: 15,
    fontSize: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tasksContainer: {
    flex: 1,
    marginBottom: 25,
  },
  finishedTasksContainer: {
    flex: 1,
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#F1F5FB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#545454',
    paddingLeft: 5,
  },
  addButton: {
    backgroundColor: '#D9D9D9',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#545454',
  },
  taskList: {
    flexGrow: 1,
  },
  taskListContent: {
    paddingHorizontal: 10,
  },
  checkbox: {
    padding: 0,
    marginRight: 0,
  },
  finishedTaskText: {
    fontSize: 16,
    color: '#8C8C8C',
    textDecorationLine: 'line-through',
  }
});

export default App;
