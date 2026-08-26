import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Save,
  X,
  Plus,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { fetchOrdersFromSupabase, upsertOrderToSupabase } from '../../lib/supabase';

const ORDER_STATUS_OPTIONS = [
  'Order Confirmed & Payment Verified',
  'Handcrafted at Atelier & Quality Inspected',
  'Dispatched via Express Courier',
  'Delivered to Customer'
];

export default function AdminOrdersTab({ formatPrice, showToast }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [statusDraft, setStatusDraft] = useState('');
  const [trackingDraft, setTrackingDraft] = useState('');
  const [carrierDraft, setCarrierDraft] = useState('DHL Express Luxury Courier');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data } = await fetchOrdersFromSupabase();
      if (data) setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setStatusDraft(order.status || ORDER_STATUS_OPTIONS[0]);
    setTrackingDraft(order.tracking_number || '');
    setCarrierDraft(order.carrier || 'DHL Express Luxury Courier');
  };

  const handleSaveOrder = async () => {
    if (!editingOrder) return;
    const updated = {
      ...editingOrder,
      status: statusDraft,
      tracking_number: trackingDraft.trim(),
      carrier: carrierDraft.trim(),
      updated_at: new Date().toISOString()
    };

    const { data } = await upsertOrderToSupabase(updated);
    if (data) {
      setOrders(prev => prev.map(o => (o.id === editingOrder.id ? updated : o)));
      showToast(`Order ${editingOrder.id} updated successfully.`);
      setEditingOrder(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    const q = searchQuery.toLowerCase();
    return (
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
      (o.email && o.email.toLowerCase().includes(q)) ||
      (o.tracking_number && o.tracking_number.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search orders by ID, Client name, AWB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-secondary/30 bg-[#fff9fd] text-xs focus:outline-none focus:ring-2 focus:ring-royal-violet/30"
          />
        </div>

        <button
          onClick={loadOrders}
          disabled={loading}
          className="px-4 py-2 rounded-xl border border-secondary/30 bg-[#fff9fd] hover:bg-surface-container text-xs font-semibold text-stone-700 flex items-center gap-2 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-secondary/20 space-y-3">
            <Package className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-serif text-lg text-primary font-medium">No Orders Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Customer inquiries received via the WhatsApp checkout or order lookup system will be listed here.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isBeingEdited = editingOrder && editingOrder.id === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-secondary/20 shadow-subtle space-y-4 transition-all hover:border-royal-violet/40"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-base text-primary">{order.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-royal-violet/10 text-royal-violet border border-royal-violet/20 text-[10px] uppercase tracking-wider font-semibold">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recent'}</span>
                    
                    {!isBeingEdited ? (
                      <button
                        onClick={() => handleEditClick(order)}
                        className="ml-2 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Update Status & Tracking</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="ml-2 p-1 text-stone-400 hover:text-stone-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Edit Form if active */}
                {isBeingEdited ? (
                  <div className="p-4 rounded-xl bg-[#fff9fd] border border-royal-violet/30 space-y-3 animate-fade-in">
                    <div className="text-xs font-semibold uppercase tracking-wider text-royal-violet">
                      Update Order Status & Dispatch Info
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-stone-600">Fulfillment Status</label>
                        <select
                          value={statusDraft}
                          onChange={(e) => setStatusDraft(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-secondary/30 bg-white text-xs font-medium"
                        >
                          {ORDER_STATUS_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-stone-600">Carrier / Courier</label>
                        <input
                          type="text"
                          value={carrierDraft}
                          onChange={(e) => setCarrierDraft(e.target.value)}
                          placeholder="e.g. DHL Express"
                          className="w-full px-3 py-2 rounded-lg border border-secondary/30 bg-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-stone-600">Air Waybill / Tracking #</label>
                        <input
                          type="text"
                          value={trackingDraft}
                          onChange={(e) => setTrackingDraft(e.target.value)}
                          placeholder="e.g. DHL-EX-994820194US"
                          className="w-full px-3 py-2 rounded-lg border border-secondary/30 bg-white text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingOrder(null)}
                        className="px-3 py-1.5 rounded-lg border border-secondary/30 text-xs font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveOrder}
                        className="px-4 py-1.5 rounded-lg bg-royal-violet text-white text-xs font-semibold hover:bg-royal-violet/90 flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save & Push to Customer Lookup</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Order Details Summary */
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
                    <div className="sm:col-span-4 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">Client & Delivery</span>
                      <div className="font-semibold text-stone-900">{order.customer_name}</div>
                      <div className="text-stone-600">{order.email || order.phone}</div>
                      <div className="text-stone-500 text-[11px] leading-relaxed">{order.delivery_address}</div>
                    </div>

                    <div className="sm:col-span-5 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">Pieces Ordered</span>
                      <div className="space-y-1">
                        {(order.items || []).map((item, i) => (
                          <div key={i} className="flex justify-between items-center bg-surface-container-low px-2.5 py-1 rounded-lg">
                            <span className="text-stone-800 font-medium">{item.name} {item.style ? `(${item.style})` : ''}</span>
                            <span className="text-stone-500">x{item.quantity} • {formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-3 space-y-1 border-t sm:border-t-0 sm:border-l border-surface-container-highest pt-2 sm:pt-0 sm:pl-4">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">Dispatch Info</span>
                      <div className="text-stone-800 font-medium flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-royal-violet" />
                        <span>{order.carrier || 'DHL Express'}</span>
                      </div>
                      <div className="font-mono text-stone-600 text-[11px]">
                        AWB: {order.tracking_number || 'Pending'}
                      </div>
                      <div className="font-sans font-bold text-sm text-primary pt-1 tabular-nums">
                        Total: {formatPrice(order.total_amount || 0)}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
