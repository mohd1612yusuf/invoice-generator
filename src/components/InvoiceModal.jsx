import React from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const InvoiceModal = ({ showModal, setShowModal, invoiceData, onReset }) => {
  const { invoiceNumber, cashier, customer, items, subtotal, taxAmount, discountAmount, total } = invoiceData;

  const downloadPDF = () => {
    const element = document.getElementById('invoice');
    toPng(element).then((dataUrl) => {
      const pdf = new jsPDF();
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        pdf.addImage(img, 'PNG', 10, 10, 190, 0);
        pdf.save(`invoice-${invoiceNumber}.pdf`);
      };
    });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div id="invoice" className="p-6">
          <h1 className="text-2xl font-bold text-center mb-4">INVOICE</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>Invoice #: {invoiceNumber}</div>
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Cashier: {cashier}</div>
            <div>Customer: {customer}</div>
          </div>
          <table className="w-full border-collapse border mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-left">Qty</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.qty}</td>
                  <td className="border p-2">₹{item.price.toFixed(2)}</td>
                  <td className="border p-2">₹{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
            <div>Tax: ₹{taxAmount.toFixed(2)}</div>
            <div>Discount: ₹{discountAmount.toFixed(2)}</div>
            <div className="text-xl font-bold border-t pt-2">Total: ₹{total.toFixed(2)}</div>
          </div>
        </div>
        <div className="p-4 border-t flex gap-2">
          <button 
            onClick={downloadPDF}
            className="flex-1 bg-blue-500 text-white py-2 rounded"
          >
            Download PDF
          </button>
          <button 
            onClick={onReset}
            className="flex-1 bg-green-500 text-white py-2 rounded"
          >
            New Invoice
          </button>
          <button 
            onClick={() => setShowModal(false)}
            className="flex-1 bg-gray-500 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;