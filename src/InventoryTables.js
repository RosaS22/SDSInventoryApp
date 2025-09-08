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

  // Initial data (mocked or can fetch from API)
  useEffect(() => {
    setSeasonings([
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
    setSweetenings([ { name: 'Vanilla Bean', jarQty: '', bulkQty: '' },
      { name: 'Salted Caramel', jarQty: '', bulkQty:''},
      { name: 'Brown Sugar-Cinnamon', jarQty: '', bulkQty: '' },
      { name: 'Chocolate', jarQty: '', bulkQty: '' },
      { name: 'Strawberry', jarQty: '', bulkQty: '' },
      { name: 'Coconut', jarQty: '', bulkQty: '' },
      { name: 'Lemon', jarQty: '', bulkQty: '' },
      { name: 'Pumpkin Spice', jarQty: '', bulkQty: '' },
      { name: 'Peppermint', jarQty: '', bulkQty: '' },
      { name: 'UBM', jarQty: '', bulkQty: '' },
      { name: 'Gluten Free UBM', jarQty: '', bulkQty: '' },]);
    setMiscItems([{ name: 'CookBooks', Qty: '',  },
      { name: 'Spice Spinners', Qty: '',  },]);
    setSamplers([{ name: 'Seasoning Sampler', Qty: '' },
      { name: 'Sweet Sampler', Qty: ''},
      { name: 'Sugar-Free Sweet Sampler', Qty: ''}]);
    setLoading(false);
  }, []);

  // Fetch saved inventory records from MongoDB
  const fetchRecords = async () => {
    try {
      const res = await axios.get('/api/saveInventory');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching saved records:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e, table, index, field, setTable) => {
    const value = e.target.value;
    const updated = [...table];
    updated[index][field] = value;
    setTable(updated);
  };

  const handleSubmit = async () => {
    const record = { date, note, seasonings, sweetenings, miscItems, samplers };
    try {
      const res = await axios.post('/api/saveInventory', record);
      console.log(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      fetchRecords(); // refresh saved records display
      return true;
    } catch (err) {
      console.error('Error saving inventory:', err);
      return false;
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
        {/* Seasonings */}
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

        {/* Sweetenings */}
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

        {/* Misc Items */}
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

        {/* Samplers */}
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

      {/* Display saved records */}
      <div style={{ marginTop: '40px' }}>
        <h2>Saved Records</h2>
        {records.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          records.map((rec, i) => (
            <div key={i} style={{ border: '1px solid #865A26', padding: '10px', marginBottom: '10px' }}>
              <strong>Date:</strong> {rec.date} <br />
              <strong>Note:</strong> {rec.note} <br />
              <strong>Seasonings:</strong> {JSON.stringify(rec.seasonings)} <br />
              <strong>Sweetenings:</strong> {JSON.stringify(rec.sweetenings)} <br />
              <strong>Misc Items:</strong> {JSON.stringify(rec.miscItems)} <br />
              <strong>Samplers:</strong> {JSON.stringify(rec.samplers)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryTables;
