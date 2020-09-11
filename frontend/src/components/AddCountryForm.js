import React, { useState, Fragment } from 'react'

const AddCountryForm = props => {
	const initialFormState = { }
	const [ country, setCountry ] = useState(initialFormState)
	const handleInputChange = event => {
		try{
			const { name, value } = event.target
			setCountry({ ...country, [name]: value })
			}catch(error) {
				console.log(error);
				alert("Error");
			}
	}
	const handleOnSubmit = event => {
		event.preventDefault()
		try{
			if (!country.name || !country.capital) {
				alert("Invalid Input");
			}
			else {
				props.addCountry(country)
				setCountry(initialFormState)
			}
		}catch (error) {
			console.log(error);
		}
	}

	return (
		<Fragment>
		<form
			onSubmit={handleOnSubmit}
		>
			<label>Name</label>
			<input type="text" name="name" value={country.name} onChange={handleInputChange} />
			<p>
				<label>Capital</label>
				<input type="text" name="capital" value={country.capital} onChange={handleInputChange} />
			</p>
			<p>
				<button>Add new country</button>
			</p>
		</form>
		</Fragment>
	)
}

export default AddCountryForm