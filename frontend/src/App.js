import React, { useState, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddCountryForm from './components/AddCountryForm'
import EditCountryForm from './components/EditCountryForm'
import CountryTable from './tables/CountryTable';
import axios from 'axios';
import './App.css'

const App = () => {
	const [countriesData,setCountriesData] = useState([]);
	const initialFormState = { id: null, name: '', capital: '' }
	const [ countries, setCountries ] = useState(countriesData)
	const [ currentCountry, setCurrentCountry ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	const addCountry = async (country) => {
		getData();
	}
	const deleteCountry = async (id) => {
		setEditing(false)
		await axios.delete(`/${id}`);
		getData();
	}
	const updateCountry = async (id, updatedCountry) => {
		setEditing(false)
		console.log(id);
		await axios.put(`/${id}`,updatedCountry);
		getData();
	}
	const getData = async () =>{
		const {data} = await axios.get(`/countries`);
		setCountriesData(data);
		setCountries(data);
	}
	useEffect(()=>{
		getData();
	},[])
	const editRow = async (country) => {
		setEditing(true)
		setCurrentCountry(country)
	}

	return (
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
				  	</li>
					<li>
						<Link to="/about">About</Link>
				  	</li>
				  	<li>
						<Link to="/countries">Countries</Link>
				  	</li>
				</ul>
			</nav>
			
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/countries">
					<div className="container">
						<h1 id = "hed1">Countries App</h1>
						<div className="flex-row">
							<div className="flex-large classleft">
								{editing ? (
								<Fragment>
									<h2>Edit country</h2>
									<EditCountryForm
									editing={editing}
									setEditing={setEditing}
									currentCountry={currentCountry}
									updateCountry={updateCountry}
									/>
								</Fragment>
								) : (
								<Fragment>
									<h2>Add country</h2>
									<AddCountryForm addCountry={addCountry} />
								</Fragment>
								)}
							</div>
							<div className="flex-large classright">
								<h2>View Countries</h2>
								<CountryTable countries={countries} editRow={editRow} deleteCountry={deleteCountry} />
							</div>
						</div>
					</div>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	</Router>
	)

	function Home() {
		return <h1 id = "hed2">Home</h1>;
	  }
	  
	  function About() {
		return <h1 id = "hed3">About</h1>;
	  }
}

export default App