import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [turtles, setTurtles] = useState([]); //in this ex, look back at the index route output in poastman, its an aray, so start it as array
	const [singleTurtle, setTurtle] = useState({
		name: '',
		role: ''
	});
	//updating state, triggers a rerender

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/turtles'); // <===== Postman Query
				const data = await response.json(); // Receive data turn it into a js object or array
				setTurtles(data); // Store that JS Object or Array
			} catch (error) {
				console.error(error);
			}
		})(); //what do these last () do?
	}, []);

	const handleDelete = async id => {
		try {
			const response = await fetch(`/api/turtles/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleTurtle)
			});
			// const newTurt = turtles.splice(id);
			const newTurt = turtles.filter(turtle => turtle._id !== id);
			setTurtles(newTurt);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault(); //prevents us from reloading the whole page
		try {
			const response = await fetch('/api/turtles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' //headers?
				},
				body: JSON.stringify(singleTurtle) //so turning into string just to turn back again?
			}); //doing opposite. taking JS object and turn it back to ugly strin

			const data = await response.json();
			setTurtles([...turtles, data]); //this means adding 'data' to end of bookmark array?
			setTurtle({
				name: '',
				role: ''
			});
		} catch (error) {
			console.error(error); //is this same as console.log?
		}
	};
	const handleChange = e => {
		//why is this not async but handleSubmit is
		setTurtle({ ...singleTurtle, [e.target.id]: e.target.value });
	}; //still not to sure what e.target.id and e.target.value actually does
	//not sure what this does at all even

	return (
		<div className="AppPage">
			This is the {props.page} page{' '}
			{/*where is props and name 'app' coming from*/}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="name"
					value={singleTurtle.name}
					/*placeholder="turtle name"			why not use this instead
					ref={} 			what is ref={}?
					*/
					onChange={handleChange}
				/>
				<input
					type="text"
					id="role"
					value={singleTurtle.role}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</form>
			<ul>
				{turtles.map(turtle => {
					return (
						<li key={turtle._id}>
							The turtle is named {turtle.name} and its role is {turtle.role}
							<button>Update Turtle</button>
							<button
								onClick={() => {
									handleDelete(turtle._id);
								}}
							>
								Delete Turtle
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

// <button onClick={() => handleDelete(turtle._id)}>
//const data = await response.json(); //sends us baack the turtle we careated
