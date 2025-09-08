import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryTables.css';
import SubmitButton from './SubmitButton';

const InventoryTables = () => {
  const [seasonings, setSeasonings] = useState([]);
  const [sweetenings, setSweetenings] = useState([]);
  const [miscItems, setMiscItems] = useState([]);
  const [samplers, setSamplers] = useState([]);

  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const [saved, setSaved] = useState(false); 
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial table data
  useEffect(() => {
    setSeasonings([
      { id: 1, name: 'Alvi\'s Incredible', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 2, name: 'Low Salt Alvi\'s Incredible', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 3, name: 'Alvi\'s Inferno', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 4, name: 'Cajun', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 5, name: 'Chinese', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 6, name: 'Devil\'s Tonic', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 7, name: 'The Real Dill', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 8, name: 'Garlic the Great', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 9, name: 'Indian', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 10, name: 'Italian', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 11, name: 'Jamaican', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 12, name: 'Lemon Pepper', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 13, name: 'Mighty Mesquite', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 14, name: 'Mexican', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 15, name: 'A Moment in Thyme', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 16, name: 'Saltless Wonder', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 17, name: 'Strong A.R.M.', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 18, name: 'Super Strong A.R.M.', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 19, name: 'Thai', jarQty: '', bulkQty: '', refillQty: '' },
      { id: 20, name: 'Tiki Teriyaki', jarQty: '', bulkQty: '', refillQty: '' },
    ]);

    setSweetenings([
      { id: 1, name: 'Vanilla Bean', jarQty: '' },
      { id: 2, name: 'Salted Caramel', jarQty: '' },
      { id: 3, name: 'Brown Sugar-Cinnamon', jarQty: '' },
      { id: 4, name: 'Chocolate', jarQty: '' },
      { id: 5, name: 'Strawberry', jarQty: '' },
      { id: 6, name: 'Coconut', jarQty: '' },
      { id: 7, name: 'Lemon', jarQty: '' },
      { id: 8, name: 'Pumpkin Spice', jarQty: '' },
      { id: 9, name: 'Peppermint', jarQty: '' },
      { id: 10, name: 'UBM', jarQty: '' },
      { id: 11, name: 'Gluten Free UBM', jarQty: '' },
    ]);

    setMiscItems([
      { id: 1, name: 'CookBooks', Qty: '' },
      { id: 2, name: 'Spice Spinners', Qty: '' },
    ]);

    setSamplers([
      { id: 1, name: "Seasoning Sampler", Qty: '' },
      { id: 2, name: "Sweet Sampler", Qty: '' },
      { id: 3, name: "Sugar-Free Sweet Sampler", Qty: '' },
    ]);

    setLoading(false);
  }, []);

  // Fetch saved inventory records
  const fetchRecords = async () => {
    try {
      const res = await axios.get('/api/saveInventory');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching records:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Input change handler
  const handleInputChange = (e, table, index, field, setTable) => {
    const value = e.target.value;
    const updated = [...table];
    updated[index][field] = value;
    setTable(updated);
  };

  // Submit handler
  const handleSubmit = async () => {
    const record = { date, note, seasonings, sweetenings, miscItems, samplers };

    try {
      await axios.post('/api/saveInventory', record, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      fetchRecords(); // refresh saved records
    } catch (err) {
      console.error('Error saving record:', err);
      alert('Failed to save. Check console for errors.');
    }
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h1>Inventory Entry</h1>

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

      <div className="tables-container">
        {/* Seasonings Table */}
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
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="text"
                      value={item.jarQty}
                      onChange={(e) => handleInputChange(e, seasonings, index, 'jarQty', setSeasonings)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.bulkQty}
                      onChange={(e) => handleInputChange(e, seasonings, index, 'bulkQty', setSeasonings)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.refillQty}
                      onChange={(e) => handleInputChange(e, seasonings, index, 'refillQty', setSeasonings)}
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
              </tr>
            </thead>
            <tbody>
              {sweetenings.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="text"
                      value={item.jarQty}
                      onChange={(e) => handleInputChange(e, sweetenings, index, 'jarQty', setSweetenings)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Misc Items Table */}
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
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="text"
                      value={item.Qty}
                      onChange={(e) => handleInputChange(e, miscItems, index, 'Qty', setMiscItems)}
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
              {samplers.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="text"
                      value={item.Qty}
                      onChange={(e) => handleInputChange(e, samplers, index, 'Qty', setSamplers)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SubmitButton handleSubmit={handleSubmit} />

      {saved && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '20px' }}>Saved successfully!</p>}

      {/* Saved records display */}
       <div className="saved-records">
        {records.length === 0 ? <p>No records yet.</p> :
          records.map((rec, i) => (
            <div key={i} className="record-card">
              <h3>Record #{i + 1}</h3>
              <div><strong>Date:</strong> {rec.date}</div>
              <div><strong>Note:</strong> {rec.note}</div>

              {/* Seasonings */}
               <div>
                <strong>Seasonings:</strong>
                <ul>
                  {rec.seasonings.map((item, idx) => (
                    <li key={idx}>{item.name} - Jar: {item.jarQty}, Bulk: {item.bulkQty}, Refills: {item.refillQty}</li>
                  ))}
                </ul>
              </div>
              
              {/* Sweetenings */}
               <div>
                <strong>Sweetenings:</strong>
                <ul>
                  {rec.sweetenings.map((item, idx) => (
                    <li key={idx}>{item.name} - Jar: {item.jarQty}</li>
                  ))}
                </ul>
              </div>

              {/* Misc Items */}
              <div>
                <strong>Misc Items:</strong>
                <ul>
                  {rec.miscItems.map((item, idx) => (
                    <li key={idx}>{item.name} - Qty: {item.Qty}</li>
                  ))}
                </ul>
              </div>

              {/* Samplers */}
              <div>
                <strong>Samplers:</strong>
                <ul>
                  {rec.samplers.map((item, idx) => (
                    <li key={idx}>{item.name} - Qty: {item.Qty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InventoryTables;
