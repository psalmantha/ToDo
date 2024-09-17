import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (taskTitle: string, taskDescription: string, dueDate: string) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ visible, onClose, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOk = () => {
    if (taskTitle && taskDescription && dueDate) {
      onSubmit(taskTitle, taskDescription, dueDate.toLocaleDateString());
      setTaskTitle('');
      setTaskDescription('');
      setDueDate(new Date());
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline={true}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dueDateText}>Due Date: {dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.okButton} onPress={handleOk}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    marginBottom: 20,
  },
  dueDateText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
  },
  okButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  cancelText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  okText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default NewTaskModal;
