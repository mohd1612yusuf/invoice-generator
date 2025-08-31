import React from 'react';

const ItemTable = ({ items, updateItem, removeItem, addItem }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Items</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2 text-left">Qty</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input 
                    type="number" 
                    value={item.qty} 
                    onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                    className="w-full p-1 border rounded"
                    min="1"
                  />
                </td>
                <td className="border p-2">
                  <input 
                    type="number" 
                    value={item.price} 
                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    className="w-full p-1 border rounded"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="border p-2">₹{(item.qty * item.price).toFixed(2)}</td>
                <td className="border p-2">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        onClick={addItem}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default ItemTable;