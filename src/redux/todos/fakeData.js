let newDate = new Date().getTime();
const timeDiff = 100000;
const count = 20;
const todoData = [];
for (var i = 0; i < count; i++) {
  newDate -= timeDiff;
  todoData.push({
    id: newDate,
    todo: `Demo Todo ${count - i}`,
    createTime: newDate,
    completed: i % 3 === 0
  });
}
const getNodeIndex = lastTodo => {
  let index = 0;
  if (!lastTodo) return 0;
  todoData.forEach((todo, i) => {
    if (todo.id === lastTodo.id) {
      index = i + 1;
    }
  });
  return index;
};
const getFakeTodo = (number, lastTodo) => {
  const index = getNodeIndex(lastTodo);
  const indexLast = number + index > count ? count : number + index;
  const todos = [];
  for (let i = index; i < indexLast; i++) {
    todos.push(todoData[i]);
  }
  return todos;
};
export { getFakeTodo };
export default todoData;
