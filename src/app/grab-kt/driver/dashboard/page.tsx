'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Power, 
  Car, 
  Star, 
  DollarSign, 
  MapPin, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  XCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { DataStore, GrabDriver, GrabOrder } from '@/lib/data-store';

export default function DriverDashboardPage() {
  const [driver, setDriver] = useState<GrabDriver | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [orders, setOrders] = useState<GrabOrder[]>([]);
  const [activeDriverOrder, setActiveDriverOrder] = useState<GrabOrder | null>(null);

  useEffect(() => {
    const drivers = DataStore.getDrivers();
    if (drivers.length > 0) {
      setDriver(drivers[0]);
      setIsOnline(drivers[0].isOnline);
    }
    setOrders(DataStore.getOrders());
  }, []);

  const toggleOnlineState = () => {
    if (!driver) return;
    const nextState = !isOnline;
    setIsOnline(nextState);
    const updatedDrivers = DataStore.getDrivers().map(d => 
      d.id === driver.id ? { ...d, isOnline: nextState } : d
    );
    DataStore.saveDrivers(updatedDrivers);
  };

  const handleAcceptOrder = (ord: GrabOrder) => {
    const updated = DataStore.getOrders().map(o => {
      if (o.id === ord.id) {
        return {
          ...o,
          orderStatus: 'DRIVER_ON_THE_WAY' as const,
          driverId: driver?.id,
          driverName: driver?.name,
          driverPhone: driver?.whatsapp,
          driverPlate: driver?.plateNumber,
          driverVehicle: `${driver?.vehicleBrand} (${driver?.vehicleColor})`
        };
      }
      return o;
    });
    DataStore.saveOrders(updated);
    setActiveDriverOrder(updated.find(o => o.id === ord.id) || null);
    setOrders(updated);
  };

  const advanceDriverOrderStep = () => {
    if (!activeDriverOrder) return;
    const steps: GrabOrder['orderStatus'][] = [
      'DRIVER_ON_THE_WAY',
      'DRIVER_ARRIVED',
      'TRIP_STARTED',
      'TRIP_COMPLETED'
    ];

    const idx = steps.indexOf(activeDriverOrder.orderStatus);
    if (idx < steps.length - 1) {
      const next = steps[idx + 1];
      const updatedOrder = { ...activeDriverOrder, orderStatus: next };
      if (next === 'TRIP_COMPLETED') {
        updatedOrder.paymentStatus = 'PAID';
      }
      const all = DataStore.getOrders().map(o => o.id === activeDriverOrder.id ? updatedOrder : o);
      DataStore.saveOrders(all);
      setActiveDriverOrder(next === 'TRIP_COMPLETED' ? null : updatedOrder);
      setOrders(all);

      if (next === 'TRIP_COMPLETED' && driver) {
        // Increment trip count
        const updatedDrivers = DataStore.getDrivers().map(d => 
          d.id === driver.id ? { ...d, totalTrips: d.totalTrips + 1 } : d
        );
        DataStore.saveDrivers(updatedDrivers);
      }
    }
  };

  const pendingOrder = orders.find(o => o.orderStatus === 'SEARCHING_DRIVER');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Driver Status */}
      <section className="pt-28 pb-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-slate-950 shrink-0">
              <img
                src={driver?.photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80'}
                alt="Driver Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-xl text-white">{driver?.name || 'Asep Ridwan'}</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-bold">
                  {driver?.driverCode || 'KT-DRV-001'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{driver?.vehicleBrand} • <span className="text-amber-400 font-bold">{driver?.plateNumber}</span></p>
            </div>
          </div>

          {/* ONLINE / OFFLINE TOGGLE BUTTON */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleOnlineState}
              className={`px-6 py-3 rounded-2xl font-black text-xs flex items-center space-x-2 shadow-xl transition-all ${
                isOnline
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-950/60'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>STATUS: {isOnline ? 'ONLINE (SIAP NARI)' : 'OFFLINE'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Driver Dashboard Grid */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Total Pendapatan</span>
            <p className="font-black text-xl text-emerald-400">Rp 185.000</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Perjalanan Selesai</span>
            <p className="font-black text-xl text-white">{driver?.totalTrips || 142} Trip</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Rating Driver</span>
            <div className="flex items-center space-x-1 font-black text-xl text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span>{driver?.rating || 4.9}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Wilayah Posko</span>
            <p className="font-extrabold text-sm text-white truncate">{driver?.village || 'Desa Cikancung'}</p>
          </div>
        </div>

        {/* Incoming Order Notification Pop / Card */}
        {isOnline && pendingOrder && !activeDriverOrder && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-4 animate-in slide-in-from-top-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider animate-pulse">
                ORDER MASUK BARU!
              </span>
              <span className="text-xs text-slate-400 font-bold">{pendingOrder.orderCode}</span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-white font-extrabold text-base">Pemesan: {pendingOrder.customerName}</p>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jemput: <strong>{pendingOrder.pickupName}</strong></span>
              </div>
              <div className="flex items-start space-x-2">
                <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Tujuan: <strong>{pendingOrder.destinationName}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400">Tarif Perjalanan</span>
                <p className="font-black text-lg text-emerald-400">Rp {pendingOrder.totalFare.toLocaleString('id-ID')}</p>
              </div>

              <button
                onClick={() => handleAcceptOrder(pendingOrder)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/60"
              >
                Terima Order Ini
              </button>
            </div>
          </div>
        )}

        {/* Active Trip Driver Controls */}
        {activeDriverOrder && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">PERJALANAN SEDANG BERLANGSUNG</span>
                <h3 className="font-black text-lg text-white">{activeDriverOrder.orderCode}</h3>
              </div>
              <span className="px-3 py-1 rounded bg-slate-800 text-amber-300 font-bold text-xs">
                {activeDriverOrder.orderStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-white font-bold">Pelanggan: {activeDriverOrder.customerName} ({activeDriverOrder.customerPhone})</p>
              <p className="text-slate-300">Jemput: {activeDriverOrder.pickupName}</p>
              <p className="text-slate-300">Tujuan: {activeDriverOrder.destinationName}</p>
              <p className="text-emerald-400 font-bold">Tarif: Rp {activeDriverOrder.totalFare.toLocaleString('id-ID')} ({activeDriverOrder.paymentMethod})</p>
            </div>

            <div className="pt-2">
              <button
                onClick={advanceDriverOrderStep}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg"
              >
                Update Status Perjalanan (Progres Ke Tahap Berikutnya →)
              </button>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}
