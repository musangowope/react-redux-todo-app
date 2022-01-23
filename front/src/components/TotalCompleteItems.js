import React from 'react';
import {useSelector} from "react-redux";

const TotalCompleteItems = () => {
	const completedTodos = useSelector(state => state.todos.filter(todo => todo.completed).length);
	return <h4>Total Complete Items: {completedTodos}</h4>;
};

export default TotalCompleteItems;
