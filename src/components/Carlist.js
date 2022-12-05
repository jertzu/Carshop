import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Carlist() {
    const [car, setCar] = React.useState({brand: "", model: "", color: "", fuel: "", year: "", price: ""});
    const [cars, setCars] = React.useState([]);
    const gridRef = React.useRef();

    React.useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
      }

    const deleteCar = () => { 
        if (gridRef.current.getSelectedNodes().length > 0) {
            setCars(cars.filter((car, index) =>     
            index !== gridRef.current.getSelectedNodes()[0].childIndex))
        } else {
            alert ('Select row first');
        }
    }

    const addCar = (event) => {
        event.preventDefault();
        setCars([...cars, car]);
    }

    const columns = [
        {headerName: "Brand", field: "brand", sortable: true, filter: true, editable: true},
        {headerName: "Model", field: "model", sortable: true, filter: true, editable: true},
        {headerName: "Color", field: "color", sortable: true, filter: true, editable: true},
        {headerName: "Fuel", field: "fuel", sortable: true, filter: true, editable: true},
        {headerName: "Year", field: "year", sortable: true, filter: true, editable: true},
        {headerName: "Price", field: "price", sortable: true, filter: true, editable: true}
    ]

    return (
        <div>
            <div>
                <form onSubmit={addCar}>
                    <ul>
                        <li>
                            <label>Brand:</label>
                            <input type="text" name="brand" value={car.brand} onChange={inputChanged} />
                        </li>
                        <li>
                            <label>Model:</label>
                            <input type="text" name="model" value={car.model} onChange={inputChanged} />
                        </li>
                        <li>
                            <label>Color:</label>
                            <input type="text" name="color" value={car.color} onChange={inputChanged} />
                        </li>
                        <li>
                            <label>Fuel:</label>
                            <input type="text" name="fuel" value={car.fuel} onChange={inputChanged} />
                        </li>
                        <li>
                            <label>Year:</label>
                            <input type="text" name="year" value={car.year} onChange={inputChanged} />
                        </li>
                        <li>
                            <label>Price:</label>
                            <input type="text" name="price" value={car.price} onChange={inputChanged} />
                        </li>
                        <input type="submit" value="Add" />
                    </ul>
                </form>
            </div>
            
            <div className="ag-theme-material" style={{height: "500px", width: "100%"}}>
                <button onClick={deleteCar} style={{height: "50px", width: "150px"}}>Delete</button>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowSelection="single"
                    rowData={cars}
                    columnDefs={columns}>
                </AgGridReact>
            </div>
        </div>
    )
}