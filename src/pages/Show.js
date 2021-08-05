import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [turtle, setTurtle] = useState([]);
	const nameInput = useRef(null);
	const roleInput = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/turtles/${props.match.params.id}`);
				const data = await response.json();
				setTurtle(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/turtles/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					role: roleInput.current.value
				})
			});
			const data = await response.json();
			setTurtle(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="ShowPage">
			{Object.keys(turtle).length ? (
				<>
					<h3>{turtle.name}</h3>
					<h3>{turtle.role}</h3>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					id="name"
					ref={nameInput}
					defaultValue={turtle.name}
				/>
				<input
					type="text"
					id="role"
					ref={roleInput}
					defaultValue={turtle.role}
				/>
				<input type="submit" value="Update Turtle" />
			</form>
		</div>
	);
}
