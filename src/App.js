import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addTodo,
	removeTodo,
	removeAllTodo,
	updateTodoStatus,
	EditTodo,
} from "./redux/todoReducer";
import "./App.css";
import Todolist from "./components/Todos/todolist";
import Form from "./components/Form/Form";

function App() {
	const itemList = useSelector((state) => state.todoList.todos);
	const dispatch = useDispatch();
	const [item, setItem] = useState("");
	const [date, setDate] = useState("");
	const [edit, setEdit] = useState(0);
	const [newValue, setNewValue] = useState("");
	const [newDate, setNewDate] = useState("");

	const addItem = (event) => {
		setItem(event.target.value);
	};

	const handleDate = (event) => {
		setDate(event.target.value);
	};

	const updateItemList = () => {
		if (item !== "") {
			if (date === "") {
				const currentDate = new Date().toLocaleDateString();
				dispatch(
					addTodo({
						id:
							itemList.length === 0 ? 1 : itemList[itemList.length - 1].id + 1,
						value: item,
						date: currentDate,
						isCompleted: false,
					})
				);
			} else {
				dispatch(
					addTodo({
						id:
							itemList.length === 0 ? 1 : itemList[itemList.length - 1].id + 1,
						value: item,
						date: date,
						isCompleted: false,
					})
				);
			}
		}
		setItem("");
		setDate("");
	};

	const deletItem = (id) => {
		dispatch(removeTodo(id));
	};

	const deleteAllItems = () => {
		dispatch(removeAllTodo());
	};

	const handleChange = (todo) => {
		dispatch(updateTodoStatus(todo));
	};

	const handleNewValue = (event) => {
		setNewValue(event.target.value);
	};

	const handleNewDate = (event) => {
		setNewDate(event.target.value);
	};
  
	const handleEnableEditing = (id, value, date) => {
		setEdit(id);
    setNewValue(value);
    setNewDate(date);
	};


	const handleEdit = (todo) => {
		if (newValue !== "") {
			todo.value = newValue;
		}
		if (newDate !== "") {
			todo.date = newDate;
		}
		dispatch(EditTodo(todo));
		setEdit(false);
		setNewValue("");
		setNewDate("");
	};

	return (
		<>
			<div className="App">
				<br />
				<h1 className="App__heading">To Do List</h1>
				<br />
				<Form
					value={item}
					date={date}
					addItem={addItem}
					updateItemList={updateItemList}
					handleDate={handleDate}
				/>
				<br />
				<ol className="App__list">
					{itemList.map((todo, index) => {
						return (
							<Todolist
								key={index}
								id={todo.id}
								value={todo.value}
								status={todo.isCompleted}
								deleteItem={deletItem}
								handleChange={handleChange}
								handleEdit={handleEdit}
								date={todo.date}
								edit={edit}
								setEdit={setEdit}
								newValue={newValue}
								setNewValue={setNewValue}
								handleNewValue={handleNewValue}
								handleNewDate={handleNewDate}
                handleEnableEditing={handleEnableEditing}
							/>
						);
					})}
				</ol>
				<br />
				<div className="App__deleteAll">
					<button className="App__deleteAll__btn" onClick={deleteAllItems}>
						Delete All Todos
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
