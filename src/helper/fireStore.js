import firebase from 'firebase';
import 'firebase/firestore';
import config from '../config';
firebase.initializeApp(config);

var database = firebase.firestore();

class FireStore {
  constructor() {
    this.todoCollections = database.collection('todos');
    this.createBatch();
    this.lastTodo = undefined;
  }
  createBatch = () => {
    this.batch = database.batch();
  };
  readTodos = async payload =>
    await this.todoCollections
      .orderBy('createTime', 'desc')
      .startAfter(this.lastTodo ? this.lastTodo.createTime : 1000000000000000)
      .limit(payload.step)
      .get()
      .then(querySnapshot => {
        const todos = [];
        querySnapshot.forEach(doc => {
          todos.push({ id: doc.id, ...doc.data() });
          this.lastTodo = doc.data();
        });
        return todos;
      });

  addTodo = async todo =>
    await this.todoCollections
      .add(todo)
      .then(docRef => docRef)
      .catch(error => error);
  editTodo = async todo =>
    await this.todoCollections.doc(todo.id).update({
      todo: todo.todo,
      completed: todo.completed
    });
  deleteTodo = async todo => await this.todoCollections.doc(todo.id).delete();
  completeAll = async ({ todos }) => {
    todos.forEach(todo => {
      this.batch.update(this.todoCollections.doc(todo.id), { completed: true });
    });
    this.batch.commit();
    this.createBatch();
  };
  deleteCompleted = async ({ todos }) => {
    todos.forEach(todo => {
      this.batch.delete(this.todoCollections.doc(todo.id));
    });
    this.batch.commit();
    this.createBatch();
  };
}
export default new FireStore();
