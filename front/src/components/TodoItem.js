import React from 'react';
import { useDispatch } from "react-redux";
import { toggleCompleteAsync, deleteTodoAsync } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const handleCompleteClick = () => {
		dispatch(toggleCompleteAsync({
			id,
			completed: !completed,
		}))
	}
	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({	id }))
	}
	return (
		<li>
			<div>
				<span>
					<input type='checkbox'
								 onChange={handleCompleteClick}
								 checked={completed}>
					</input>
					{title}
				</span>
				<button
						onClick={handleDeleteClick}
				>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
