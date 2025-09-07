import React, { useState } from 'react';
import './InventoryTables.css'; // Import the CSS file
import SubmitButton from './SubmitButton';

const InventoryTables = () => {
  const [seasonings, setSeasonings] = useState([
    { name: "Alvi's Incredible", jarQty: '', bulkQty: '', refillQty: '' },
    { name: "Low Salt Alvi's Incredible", jarQty: '', bulkQty: '', refillQty: '' },
    { name: "Alvi's Inferno", jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Cajun', jarQty: '', bulkQty: '', refillQty: '' },
    { name: 'Chinese', jarQty: '', bulkQty: '', refillQty: '' },
    { name: "Devil's Tonic", jarQty: '', bulkQty: '', refillQty: '' },
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
    { name: 'Vanilla Bean', jarQty: '' },
    { name: 'Salted Caramel', jarQty: '' },
    { name: 'Brown Sugar-Cinnamon', jarQty: '' },
    { name: 'Chocolate', jarQty: '' },
    { name: 'Strawberry', jarQty: '' },
    { name: 'Coconut', jarQty: '' },
    { name: 'Lemon', jarQty: '' },
    { name: 'Pumpkin Spice', jarQty: '' },
    { name: 'Peppermint', jarQty: '' },
    { name: 'UBM', jarQty: '' },
    { name: 'Gluten Free UBM', jarQty: '' },
  ]);

  const [miscItems, setMiscItems] = useState([
    { name: 'CookBooks', Qty: '' },
    { name: 'Spice Spinners', Qty: '' },
  ]);

  const [samplers, setSamplers] = useState([
    { name: 'Seasoning Sampler', Qty: '' },
    { name: 'Sweet Sampler', Qty: '' },
    { name: 'Sugar-Free Sweet Sampler', Qty: '' },
  ]);


  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const handleInputChange = (e, table, setTable, index, field) => {
    const value = e.target.value;
    const updatedTable = [...table];
    updatedTable[index][field] = value;
    setTable(updatedTable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date,
      note,
      seasonings,
      sweetenings,
      miscItems,
      samplers,
    };
    localStorage.setItem('inventoryData', JSON.stringify(data));
    alert('Data saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inventory Entry</h1>
      <div className="note-section">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Note:
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      {/* Seasonings Table */}
      <h2>Seasonings</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Jar Qty</th>
            <th>Bulk Qty</th>
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
                  onChange={(e) =>
                    handleInputChange(e, seasonings, setSeasonings, index, 'jarQty')
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.bulkQty}
                  onChange={(e) =>
                    handleInputChange(e, seasonings, setSeasonings, index, 'bulkQty')
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sweetenings Table */}
      <h2>Sweetenings</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Jar Qty</th>
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
                  onChange={(e) =>
                    handleInputChange(e, sweetenings, setSweetenings, index, 'jarQty')
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Misc Items Table */}
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
                  value={item.Qty}
                  onChange={(e) =>
                    handleInputChange(e, miscItems, setMiscItems, index, 'Qty')
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Samplers Table */}
      <h2>Samplers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {samplers.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={item.Qty}
                  onChange={(e) =>
                    handleInputChange(e, samplers, setSamplers, index, 'Qty')
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <SubmitButton />
    </form>
  );
};

export default InventoryTables;
