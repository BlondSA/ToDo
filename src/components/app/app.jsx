import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import "./app.css";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 1;

  state = {
    filter: `all`,
    term: ``,
    todoData: [
      this.createTodoItem(`Drink coffee`),
      this.createTodoItem(`Make Awesome App`),
      this.createTodoItem(`Have a lunch`),
    ],
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  handleAddItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  handleDeteleItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  handleToggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  handleToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.handleToggleProperty(todoData, id, `important`),
      };
    });
  };

  handleToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.handleToggleProperty(todoData, id, `done`),
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case `all`:
        return items;
      case `active`:
        return items.filter((item) => !item.done);
      case `done`:
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  handleSearchChange = (term) => {
    this.setState({ term });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.handleSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.handleFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.handleDeteleItem}
          onToggleImportant={this.handleToggleImportant}
          onToggleDone={this.handleToggleDone}
        />
        <ItemAddForm onItemAdd={this.handleAddItem} />
      </div>
    );
  }
}
