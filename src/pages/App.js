import React, { useState, useEffect } from 'react';
export default function App(props) {
	const [turtles, setTurtles] = useState([]);
	const [singleTurtle, setTurtle] = useState({
		name: '',
		role: ''
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/turtles'); // <===== Postman Query
				const data = await response.json(); // Receive data turn it into a js object or array
				setTurtles(data); // Store that JS Object or Array
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	// const handleDelete = (id) => {
	//   const newBlogs = blogs.filter(blog => blog.id !== id)
	//   setBlogs(newBlogs);
	// }

	const handleDelete = id => {
		try {
			const response = await fetch('/api/turtles', {
				method: 'DELETE'
			}
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify(singleTurtle)
			// });
			// const data = await response.json();
			// console.log(data)
			console.log('id', id);
			// const newTurtles = turtles.splice(id, 1);
			const newTurt = turtles.filter(turtles => turtles.id !== id);
			setTurtles(newTurt);
			// console.log('new turtle', newTurtles);
		  catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/turtles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleTurtle)
			});
			const data = await response.json();
			setTurtles([...turtles, data]);
			setTurtle({
				name: '',
				role: ''
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = e => {
		setTurtle({ ...singleTurtle, [e.target.id]: e.target.value });
	};
	return (
		<div className="AppPage">
			This is the {props.page} page
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="name"
					value={singleTurtle.name}
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
						<div>
							<li key={turtle._id}>
								The turtle is named {turtle.name} and its role is {turtle.role}
							</li>
							<button>Update Turtle</button>
							<button onClick={() => handleDelete(turtle._id)}>
								Delete Turtle
							</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
}

//doing opposite. taking JS object and turn it back to ugly string (in handleClick
//e.preventDefault(); //prevents us from reloading the whole page
//const data = await response.json(); //sends us baack the turtle we careated
