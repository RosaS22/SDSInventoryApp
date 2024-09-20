// src/InventoryTables.js
import React, { useState } from 'react';
import './InventoryTables.css'; //Import the CSS file


const InventoryTables = () => {
  // State to store inventory data
  const [seasonings, setSeasonings] = useState([
    { name: 'Alvi\'s Incredible', jarQty: '', bulkQty: '', refillQty:  '' },
    { name: 'Low Salt Alvi\'s Incredible', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Alvi\'s Inferno', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Cajun', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Chinese', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Devil\'s Tonic', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'The Real Dill', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Garlic the Great', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Indian', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Italian', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Jamaican', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Lemon Pepper', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Mighty Mesquite', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Mexican', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'A Moment in Thyme', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Saltless Wonder', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Strong A.R.M.', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Super Strong A.R.M.', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Thai', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Tiki Teriyaki', jarQty: '', bulkQty: '', refillQty: '' },
  ]);

  const [sweetenings, setSweetenings] = useState([
    { name: 'Vanilla Bean', jarQty: '', bulkQty: '' },
    { name: 'Salted Caramel', jarQty: '', bulkQty:''},
    { name: 'Brown Sugar-Cinnamon', jarQty: '', bulkQty: '' },
    { name: 'Chocolate', jarQty: '', bulkQty: '' },
    { name: 'Strawberry', jarQty: '', bulkQty: '' },
    { name: 'Coconut', jarQty: '', bulkQty: '' },
    { name: 'Lemon', jarQty: '', bulkQty: '' },
    { name: 'Pumpkin Spice', jarQty: '', bulkQty: '' },
    { name: 'Peppermint', jarQty: '', bulkQty: '' },
    { name: 'UBM', jarQty: '', bulkQty: '' },
    { name: 'Gluten Free UBM', jarQty: '', bulkQty: '' },
  ]);

  const [miscItems, setMiscItems] = useState([
    { name: 'CookBooks', Qty: '',  },
    { name: 'Spice Spinners', Qty: '',  },
    // Add more miscellaneous items as needed
  ]);

  const [samplers, setSamplers] = useState([
    { name: 'Seasoning Sampler', Qty: '' },
    { name: 'Sweet Sampler', Qty: ''},
    { name: 'Sugar-Free Sweet Sampler', Qty: ''},
  ]);

  // State for date and notes
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  // Handle input change
  const handleInputChange = (e, table, index, field) => {
    const {value} = e.target;
    const updatedTable = [...table];
    updatedTable[index][field] = value;
    return updatedTable;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordData = { seasonings, sweetenings, miscItems, samplers, date, note };

    try {
      const response = await fetch('/.netlify/functions/saveInventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData),
      });
      const result = await response.json();
      console.log(result.message); // Success message
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Inventory Entry</h1>

      {/* Date and Note Section */}
      <div className="note-section">
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Note:
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>

      {/* Seasonings Table */}
      <div className="tables-container">
        <div>
      <h2>Seasonings</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Jar Qty</th>
            <th>Bulk Qty</th>
            <th>Refills</th>
          </tr>
        </thead>
        <tbody>
          {seasonings.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={item.jarQty}
                  onChange={(e) => setSeasonings(handleInputChange(e, seasonings, index, 'jarQty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.bulkQty}
                  onChange={(e) => setSeasonings(handleInputChange(e, seasonings, index, 'bulkQty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.refillQty}
                  onChange={(e) => setSeasonings(handleInputChange(e, seasonings, index, 'refillQty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Sweetenings Table */}
      <div>
      <h2>Sweetenings</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Jar Qty</th>
            <th>Bulk Qty</th>
          </tr>
        </thead>
        <tbody>
          {sweetenings.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={item.jarQty}
                  onChange={(e) => setSweetenings(handleInputChange(e, sweetenings, index, 'jarQty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.bulkQty}
                  onChange={(e) => setSweetenings(handleInputChange(e, sweetenings, index, 'bulkQty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Miscellaneous Items Table */}
      <div>
      <h2>Miscellaneous Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {miscItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={item.qty}
                  onChange={(e) => setMiscItems(handleInputChange(e, miscItems, index, 'qty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Samplers Table */}
      <div>
      <h2>Samplers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {samplers.map((sampler, index) => (
            <tr key={index}>
              <td>{sampler.name}</td>
              <td>
                <input
                  type="text"
                  value={sampler.qty}
                  onChange={(e) => setSamplers(handleInputChange(e, samplers, index, 'qty'))}
                  style={{ width: '50px', padding: '5px', margin: '5px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Submit Button */}
    </div>
    <div id="button"> 
{/* id to customize button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  );
};

export default InventoryTables;
