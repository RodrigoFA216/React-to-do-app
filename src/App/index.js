import React from 'react';
import {AppUI} from './AppUI'

// const defaultTodos = [
//   { text: 'Traer Elementos de la DB', completed: true },
//   { text: 'Implementar React Hooks', completed: false },
//   { text: 'Bailar el patito Juan', completed: true },
//   { text: 'LALALALAA', completed: false },
// ];

function useLocalStorage(itemName){
  const localStorageItem = localStorage.getItem(itemName);
  let parsedTodos;
  
  if(!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify([]));
    parsedTodos = [];
  }else{
    parsedTodos = JSON.parse(localStorageItem);
  }
  const [todos, setTodos] = React.useState(parsedTodos);
  const saveTodos=(newTodos)=>{
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos);
  }
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1');


  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  
  

  const completeTodo = (text)=>{
    const todoIndex = todos.findIndex(todo=>todo.text===text);
    const newTodos=[...todos];

    newTodos[todoIndex].completed=true;
    saveTodos(newTodos);
  }
  const deleteTodo = (text)=>{
    const todoIndex = todos.findIndex(todo=>todo.text===text);
    const newTodos=[...todos];

    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;