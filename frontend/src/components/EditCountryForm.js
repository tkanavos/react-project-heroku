import React, { useState, useEffect } from 'react'

const EditCountryForm = props => {
  const {updateCountry} = props;
  const [ country, setCountry ] = useState(props.currentCountry)
  useEffect(
    () => {
      setCountry(props.currentCountry)
    },
    [ props ]
  )
  const handleInputChange = event => {
    try{
      const { name, value } = event.target
      setCountry({ ...country, [name]: value })
    }catch (error) {
      console.log(error);
      alert("Error");
      }
  }
  
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        updateCountry(country.id, country)
      }}>
      <label>Name</label>
      <input type="text" name="name" value={country.name} onChange={handleInputChange} />
      <p>
        <label>Capital</label>
        <input type="text" name="capital" value={country.capital} onChange={handleInputChange} />
      </p>
      <p>
        <button>Update Country</button>
        <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
        </button>
      </p>
    </form>
  )
}

export default EditCountryForm