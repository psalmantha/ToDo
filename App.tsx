import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import NewTaskModal from './NewTask';

function App(): React.JSX.Element {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<{ id: number, title: string, description: string, finished: boolean, originalIndex: number, timestamp: string }[]>([]);
  const [taskIdCounter, setTaskIdCounter] = useState(0);

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, []);

  const handleAddTask = (title: string, description: string) => {
    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ', ' + currentDate;
    const newTask = {
      id: taskIdCounter,
      title,
      description,
      finished: false,
      originalIndex: tasks.length, 
      timestamp,
    };
    setTasks([...tasks, newTask]);
    setTaskIdCounter(taskIdCounter + 1);
  };

  const handleCheck = (taskId: number, isChecked: boolean) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, finished: isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleCheckAll = () => {
    const updatedTasks = tasks.map(task => ({ ...task, finished: true }));
    setTasks(updatedTasks);
  };

  const handleUncheckAll = () => {
    const updatedTasks = tasks.map(task => ({ ...task, finished: false }));
    setTasks(updatedTasks);
  };

  const renderTaskItem = ({ item }: { item: { id: number, title: string, description: string, finished: boolean, originalIndex: number, timestamp: string } }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => handleCheck(item.id, !item.finished)}>
        <View style={item.finished ? styles.finishedCircle : styles.activeCircle}></View>
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <Text style={item.finished ? styles.finishedTaskTitle : styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskTimestamp}>Today, {item.timestamp}</Text>
      </View>
    </View>
  );

  const filterTasks = () => {
    const activeTasks = tasks.filter(task => !task.finished);
    const finishedTasks = tasks.filter(task => task.finished);
    if (selectedFilter === 'All') {
      return [...activeTasks, ...finishedTasks];
    } else if (selectedFilter === 'Active') {
      return activeTasks;
    } else {
      return finishedTasks;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Menu */}
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.inactiveMenuText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.activeMenuText}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.inactiveMenuText}>Notes</Text>
        </TouchableOpacity>
      </View>

      {/* Task Section */}
      <View style={styles.taskSection}>
        <View style={styles.taskHeader}>
          <View>
            <Text style={styles.taskTitle}>My Tasks</Text>
            <Text style={styles.taskDate}>{currentDate}</Text>
          </View>

          <TouchableOpacity style={styles.newTaskButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.newTaskButtonText}>+ New Task</Text>
          </TouchableOpacity>
        </View>

        {/* Task Filters */}
        <View style={styles.filterSection}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'All' && styles.selectedFilterButton]}
            onPress={() => setSelectedFilter('All')}
          >
            <Text style={selectedFilter === 'All' ? styles.selectedFilterText : styles.filterText}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Active' && styles.selectedFilterButton]}
            onPress={() => setSelectedFilter('Active')}
          >
            <Text style={selectedFilter === 'Active' ? styles.selectedFilterText : styles.filterText}>Active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Finished' && styles.selectedFilterButton]}
            onPress={() => setSelectedFilter('Finished')}
          >
            <Text style={selectedFilter === 'Finished' ? styles.selectedFilterText : styles.filterText}>Finished</Text>
          </TouchableOpacity>
        </View>

        {/* Check All / Uncheck All Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCheckAll}>
            <Text style={styles.actionButtonText}>Check All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleUncheckAll}>
            <Text style={styles.actionButtonText}>Uncheck All</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <FlatList
          data={filterTasks()}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id.toString()}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
        />
      </View>

      {/* Modal for New Task */}
      <NewTaskModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
<<<<<<< HEAD
  topMenu: {
=======
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
>>>>>>> 970959c486dcd9292e2c71b3ae2e04a4599bf7ea
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    backgroundColor: '#F8F8F8',
  },
  menuButton: {
    paddingVertical: 10,
  },
  activeMenuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  inactiveMenuText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  taskSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  myTasksTitle: { // Style for the title "My Tasks"
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 5,
  },
  newTaskButton: {
    backgroundColor: '#E6F0FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  newTaskButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  selectedFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  selectedFilterText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  taskList: {
    flexGrow: 1,
  },
  taskListContent: {
    paddingHorizontal: 10,
  },
  taskItem: {
    backgroundColor: '#F1F5FB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetails: {
    paddingLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    color: '#545454',
  },
  finishedTaskTitle: { // Style for finished task titles
    fontSize: 16,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  taskTimestamp: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 5,
  },
  activeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B0B0B0',
  },
  finishedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4A90E2',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  actionButton: {
    backgroundColor: '#E6F0FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});




export default App;
