import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import {useDispatch, useSelector} from "react-redux";
import {getTodosAsync} from "../redux/todoSlice";

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos );
	useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch])
	return (
		<ul>
			{todos.map((todo) => (
				<div key={todo.id}>
					<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
				</div>
			))}
		</ul>
	);
};

export default TodoList;
