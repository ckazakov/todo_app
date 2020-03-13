import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddButton from "../add-button";

import "./app.css";

export default class App extends Component {
  myid = 1;

  state = {
    todoData: [
      this.createTodoItem("fever - жар\\температура"),
      this.createTodoItem("ant - муравей"),
      this.createTodoItem("tail - хвост"),
      this.createTodoItem("rope - веревка"),
      this.createTodoItem("pull - тянуть"),
    ],
    term: "",
    filter: "all"
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.myid++
    };
  }

  addTask = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const elementsWere = [...todoData, newItem];

      return {
        todoData: elementsWere
      };
    });
  };

  DeleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onSearchChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items,filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item=> !item.done);
      case 'done':
        return items.filter(item=> item.done);
      default:
        return items;   
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.DeleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <AddButton addTask={this.addTask} />
      </div>
    );
  }
}
