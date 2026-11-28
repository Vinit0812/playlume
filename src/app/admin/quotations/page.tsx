"use client";

import { useState } from "react";
import { generateQuotationNumber, formatPrice } from "@/lib/utils";
import {
  FileCheck2,
  Printer,
  Share2,
  Plus,
  Trash2,
  Download,
  Calendar,
  Building2,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface QuotationLineItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export default function QuotationsPage() {
  const [quotationNo, setQuotationNo] = useState(() => generateQuotationNumber());
  const [buyerName, setBuyerName] = useState("Apex Wholesalers LLP");
  const [buyerGst, setBuyerGst] = useState("27AABCU9603R1ZM");
  const [buyerCity, setBuyerCity] = useState("Surat, Gujarat");
  const [buyerPhone, setBuyerPhone] = useState("+91 98765 43210");
  const [freightCharges, setFreightCharges] = useState(1200);
  const [gstRate, setGstRate] = useState(18); // 18% standard GST

  const [items, setItems] = useState<QuotationLineItem[]>([
    {
      id: "1",
      name: "8.5\" Digital LCD Drawing Tablet",
      sku: "PL-TAB-85",
      quantity: 100,
      unitPrice: 75,
    },
    {
      id: "2",
      name: "180 GSM Bio-Washed Combed Cotton T-Shirt",
      sku: "PL-TEX-180",
      quantity: 120,
      unitPrice: 145,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: "New Merchandise Item",
        sku: "PL-GEN-01",
        quantity: 50,
        unitPrice: 100,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.quantity * curr.unitPrice, 0);
  const gstAmount = (subtotal * gstRate) / 100;
  const totalAmount = subtotal + gstAmount + freightCharges;

  const handlePrint = () => {
    window.print();
  };

  const whatsappText = encodeURIComponent(
    `*V&A Global Sourcing COMMERCIAL PROFORMA QUOTATION*
Quotation Ref: ${quotationNo}
Buyer: ${buyerName} (${buyerCity})

Items:
${items.map((it) => `• ${it.name} (${it.sku}): ${it.quantity} pcs @ ₹${it.unitPrice} = ₹${it.quantity * it.unitPrice}`).join("\n")}

Subtotal: ₹${subtotal.toLocaleString()}
GST (${gstRate}%): ₹${gstAmount.toLocaleString()}
Freight / Transport: ₹${freightCharges.toLocaleString()}
*TOTAL COMMERCIAL VALUE: ₹${totalAmount.toLocaleString()}*

Validity: 7 Days from issue date.`
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Commercial Quotation Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">Generate formal proforma invoices with tax and transportation schedules.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Invoice</span>
          </button>
          <a
            href={`https://wa.me/${buyerPhone.replace(/[^0-9]/g, "")}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm shadow-emerald-600/25"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Transmit over WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Quotation Document Frame */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-xs">
        
        {/* Header Ribbon inside Invoice */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-extrabold text-xs flex items-center justify-center">P</div>
              <span className="text-xl font-black text-slate-950">V&A Global Sourcing</span>
            </div>
            <p className="text-slate-500 text-[11px]">B2B Wholesale Trading & Distribution Enterprise</p>
            <p className="text-slate-400 text-[10px]">GSTIN: 27AAAAA0000A1Z5 • Pan-India Commercial Trade</p>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
              PROFORMA QUOTATION
            </span>
            <div className="font-mono text-base font-extrabold text-slate-950">{quotationNo}</div>
            <div className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Bill To / Buyer Details */}
        <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Commercial Consignee (Buyer)</span>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="font-bold text-slate-900 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none w-full text-xs py-0.5"
            />
            <input
              type="text"
              value={buyerCity}
              onChange={(e) => setBuyerCity(e.target.value)}
              className="text-slate-600 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none w-full text-xs py-0.5 mt-1"
            />
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">GST & Destination Contact</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">GSTIN:</span>
              <input
                type="text"
                value={buyerGst}
                onChange={(e) => setBuyerGst(e.target.value)}
                className="font-mono text-slate-900 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none w-full text-xs py-0.5"
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-500">Phone:</span>
              <input
                type="text"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="text-slate-900 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none w-full text-xs py-0.5"
              />
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">Quotation Schedule Items</h3>
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="pb-2">Description & SKU</th>
                  <th className="pb-2 text-right">Quantity</th>
                  <th className="pb-2 text-right">Unit Rate (₹)</th>
                  <th className="pb-2 text-right">Total (₹)</th>
                  <th className="pb-2 text-center w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="py-2.5">
                    <td className="py-2.5 pr-4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].name = e.target.value;
                          setItems(updated);
                        }}
                        className="font-semibold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 outline-none w-full text-xs"
                      />
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].sku = e.target.value;
                          setItems(updated);
                        }}
                        className="text-[10px] text-slate-400 font-mono bg-transparent outline-none w-full"
                      />
                    </td>
                    <td className="py-2.5 text-right">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].quantity = parseInt(e.target.value) || 0;
                          setItems(updated);
                        }}
                        className="font-bold text-slate-900 bg-transparent text-right w-20 border-b border-transparent hover:border-slate-300 focus:border-blue-600 outline-none text-xs"
                      />
                    </td>
                    <td className="py-2.5 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].unitPrice = parseFloat(e.target.value) || 0;
                          setItems(updated);
                        }}
                        className="font-bold text-slate-900 bg-transparent text-right w-20 border-b border-transparent hover:border-slate-300 focus:border-blue-600 outline-none text-xs"
                      />
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-950">
                      ₹{(item.quantity * item.unitPrice).toLocaleString()}
                    </td>
                    <td className="py-2.5 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculations Breakdown */}
        <div className="flex flex-col sm:flex-row justify-between items-start pt-6 border-t border-slate-200 gap-6">
          <div className="space-y-2 text-slate-500 text-[11px] max-w-sm">
            <span className="font-bold text-slate-900 block text-xs">Standard Commercial Terms:</span>
            <p>1. Prices are valid for 7 calendar days from quotation date.</p>
            <p>2. Advance payment required prior to warehouse dispatch.</p>
            <p>3. Goods inspected and dispatched in master packaging cartons.</p>
          </div>

          <div className="w-full sm:w-72 space-y-2.5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Merchandise Subtotal:</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-slate-600 items-center">
              <span>GST ({gstRate}%):</span>
              <span className="font-bold text-slate-900">₹{gstAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-slate-600 items-center">
              <span>Transportation / Freight:</span>
              <input
                type="number"
                value={freightCharges}
                onChange={(e) => setFreightCharges(parseFloat(e.target.value) || 0)}
                className="w-20 text-right bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-950 text-xs">Total Amount:</span>
              <span className="text-lg font-black text-blue-700">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
