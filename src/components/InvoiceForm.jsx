import React, { useState } from 'react';
import ItemTable from './ItemTable';
import InvoiceModal from './InvoiceModal';

const InvoiceForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashier, setCashier] = useState('');
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([{ id: 1, name: '', qty: 1, price: 1 }]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', qty: 1, price: 1 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = (subtotal * tax) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  const resetForm = () => {
    setInvoiceNumber(prev => prev + 1);
    setItems([{ id: Date.now(), name: '', qty: 1, price: 1 }]);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Invoice Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Number</label>
          <input 
            type="number" 
            value={invoiceNumber} 
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input 
            type="text" 
            value={new Date().toLocaleDateString()} 
            readOnly
            className="w-full p-2 border rounded bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cashier</label>
          <input 
            type="text" 
            value={cashier} 
            onChange={(e) => setCashier(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <input 
            type="text" 
            value={customer} 
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <ItemTable 
        items={items}
        updateItem={updateItem}
        removeItem={removeItem}
        addItem={addItem}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax (%)</label>
          <input 
            type="number" 
            value={tax} 
            onChange={(e) => setTax(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input 
            type="number" 
            value={discount} 
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="text-right mb-6">
        <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
        <div>Tax: ₹{taxAmount.toFixed(2)}</div>
        <div>Discount: ₹{discountAmount.toFixed(2)}</div>
        <div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
      </div>

      <button 
        onClick={() => setShowModal(true)}
        className="w-full bg-green-500 text-white py-3 rounded text-lg font-medium"
      >
        Preview Invoice
      </button>

      <InvoiceModal 
        showModal={showModal}
        setShowModal={setShowModal}
        invoiceData={{
          invoiceNumber,
          cashier,
          customer,
          items,
          subtotal,
          taxAmount,
          discountAmount,
          total
        }}
        onReset={resetForm}
      />
    </div>
  );
};

export default InvoiceForm;