'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Car, 
  MapPin, 
  Navigation, 
  DollarSign, 
  Phone, 
  Star, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Search,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { 
  DataStore, 
  GrabOrder, 
  GrabDriver, 
  GrabTariff, 
  SEED_VILLAGES,
  VillageLandmark 
} from '@/lib/data-store';

export default function CustomerDashboardPage() {
  const [villages] = useState<VillageLandmark[]>(SEED_VILLAGES);
  const [pickupId, setPickupId] = useState<string>(SEED_VILLAGES[0].id);
  const [destinationId, setDestinationId] = useState<string>(SEED_VILLAGES[1].id);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'QRIS'>('CASH');
  const [customerName, setCustomerName] = useState('Ibu Wati');
  const [customerPhone, setCustomerPhone] = useState('0812-9988-3344');

  const [tariff, setTariff] = useState<GrabTariff>(DataStore.getTariff());
  const [calculatedDistance, setCalculatedDistance] = useState(3.2);
  const [estimatedFare, setEstimatedFare] = useState(0);

  const [activeOrder, setActiveOrder] = useState<GrabOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<GrabOrder[]>([]);
  const [availableDrivers, setAvailableDrivers] = useState<GrabDriver[]>([]);
  
  // Rating Modal state
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [reviewText, setReviewText] = useState('Sangat memuaskan, driver ramah dan berkendara aman.');

  useEffect(() => {
    const t = DataStore.getTariff();
    setTariff(t);
    setAvailableDrivers(DataStore.getDrivers().filter(d => d.isOnline));
    setOrderHistory(DataStore.getOrders());
  }, []);

  // Calculate fare dynamically
  useEffect(() => {
    const p = villages.find(v => v.id === pickupId);
    const d = villages.find(v => v.id === destinationId);
    if (p && d) {
      // Haversine formula approximation for Cikancung distance
      const latDiff = Math.abs(p.lat - d.lat);
      const lngDiff = Math.abs(p.lng - d.lng);
      const dist = Math.max(1.2, Math.round((Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111) * 10) / 10);
      setCalculatedDistance(dist);

      const distanceFare = Math.round(dist * tariff.pricePerKm);
      const total = Math.max(tariff.minFare, tariff.baseFare + distanceFare + tariff.serviceFee);
      setEstimatedFare(total);
    }
  }, [pickupId, destinationId, tariff, villages]);

  // Order Ride Action & Matching Simulation
  const handleBookRide = () => {
    const p = villages.find(v => v.id === pickupId);
    const d = villages.find(v => v.id === destinationId);
    if (!p || !d) return;

    if (p.id === d.id) {
      alert('Lokasi penjemputan dan tujuan tidak boleh sama.');
      return;
    }

    const distanceFare = Math.round(calculatedDistance * tariff.pricePerKm);
    
    // Create new order
    const created = DataStore.createOrder({
      customerName,
      customerPhone,
      pickupName: `${p.name} (${p.villageName})`,
      pickupLat: p.lat,
      pickupLng: p.lng,
      destinationName: `${d.name} (${d.villageName})`,
      destinationLat: d.lat,
      destinationLng: d.lng,
      distanceKm: calculatedDistance,
      baseFare: tariff.baseFare,
      distanceFare,
      serviceFee: tariff.serviceFee,
      totalFare: estimatedFare,
      paymentMethod,
    });

    setActiveOrder(created);

    // Simulate driver matching steps
    setTimeout(() => {
      // Pick first online driver
      const driver = availableDrivers[0] || DataStore.getDrivers()[0];
      const updatedOrders = DataStore.getOrders().map(o => {
        if (o.id === created.id) {
          return {
            ...o,
            orderStatus: 'DRIVER_ASSIGNED' as const,
            driverId: driver.id,
            driverName: driver.name,
            driverPhone: driver.whatsapp,
            driverPlate: driver.plateNumber,
            driverVehicle: `${driver.vehicleBrand} (${driver.vehicleColor})`
          };
        }
        return o;
      });
      DataStore.saveOrders(updatedOrders);
      setActiveOrder(updatedOrders.find(o => o.id === created.id) || null);
    }, 3000);
  };

  // Simulate Progress Order Steps
  const advanceOrderStatus = () => {
    if (!activeOrder) return;
    const statuses: GrabOrder['orderStatus'][] = [
      'SEARCHING_DRIVER',
      'DRIVER_ASSIGNED',
      'DRIVER_ON_THE_WAY',
      'DRIVER_ARRIVED',
      'TRIP_STARTED',
      'TRIP_COMPLETED'
    ];

    const currentIndex = statuses.indexOf(activeOrder.orderStatus);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      const updated = { ...activeOrder, orderStatus: nextStatus };
      if (nextStatus === 'TRIP_COMPLETED') {
        updated.paymentStatus = 'PAID';
        setShowRatingModal(true);
      }
      
      const all = DataStore.getOrders().map(o => o.id === activeOrder.id ? updated : o);
      DataStore.saveOrders(all);
      setActiveOrder(updated);
      setOrderHistory(all);
    }
  };

  // Save Rating
  const handleSaveRating = () => {
    if (!activeOrder) return;
    const all = DataStore.getOrders().map(o => {
      if (o.id === activeOrder.id) {
        return { ...o, rating: starRating, review: reviewText };
      }
      return o;
    });
    DataStore.saveOrders(all);
    setOrderHistory(all);
    setShowRatingModal(false);
    setActiveOrder(null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Car className="w-4 h-4" />
              <span>PORTAL PEMESANAN CUSTOMER</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">Grab KT Cikancung</h1>
            <p className="text-xs text-slate-400">Driver Asli Anggota Karang Taruna Kecamatan Cikancung Terverifikasi</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-300 font-bold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{availableDrivers.length} Driver Online</span>
            </span>
          </div>
        </div>
      </section>

      {/* Booking Dashboard Section */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Booking Form & Active Order Status */}
          <div className="lg:col-span-7 space-y-6">
            
            {!activeOrder ? (
              /* FORM PEMESANAN */
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="font-extrabold text-lg text-white">Pesan Perjalanan Grab KT</h2>
                    <p className="text-xs text-slate-400">Pilih titik asal dan tujuan wilayah Kecamatan Cikancung</p>
                  </div>
                  <Car className="w-8 h-8 text-emerald-400 opacity-60" />
                </div>

                <div className="space-y-4 text-xs">
                  
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Nama Pemesan</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Nomor WhatsApp</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  {/* Pickup Dropdown */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lokasi Penjemputan *</span>
                    </label>
                    <select
                      value={pickupId}
                      onChange={(e) => setPickupId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:border-emerald-500"
                    >
                      {villages.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} — {v.villageName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Destination Dropdown */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center space-x-1">
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      <span>Lokasi Tujuan *</span>
                    </label>
                    <select
                      value={destinationId}
                      onChange={(e) => setDestinationId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:border-amber-500"
                    >
                      {villages.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} — {v.villageName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5 pt-2">
                    <label className="font-bold text-slate-300">Metode Pembayaran</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CASH')}
                        className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                          paymentMethod === 'CASH'
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Tunai (Cash)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('QRIS')}
                        className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                          paymentMethod === 'QRIS'
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>QRIS / Non-Tunai</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Fare Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Estimasi Jarak</span>
                    <span className="font-bold text-slate-200">{calculatedDistance} KM</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Tarif Dasar + Jarak</span>
                    <span className="text-slate-200">Rp {(tariff.baseFare + Math.round(calculatedDistance * tariff.pricePerKm)).toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Biaya Layanan Pemuda</span>
                    <span className="text-slate-200">Rp {tariff.serviceFee.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white">Total Estimasi Biaya</span>
                    <span className="font-black text-xl text-emerald-400">
                      Rp {estimatedFare.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Action Submit */}
                <button
                  onClick={handleBookRide}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-emerald-950/50 hover:scale-[1.01] transition-all"
                >
                  <Car className="w-5 h-5" />
                  <span>Pesan Grab KT Sekarang</span>
                </button>

              </div>
            ) : (
              /* ACTIVE TRIP TRACKING STATE */
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-6">
                
                {/* Header & Status Indicator */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-500/30">
                      STATUS PERJALANAN AKTIF
                    </span>
                    <h2 className="font-black text-xl text-white mt-1.5">{activeOrder.orderCode}</h2>
                  </div>

                  <button
                    onClick={() => setActiveOrder(null)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Radar / Step Indicator */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3 relative overflow-hidden">
                  
                  {activeOrder.orderStatus === 'SEARCHING_DRIVER' && (
                    <div className="py-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto pulsing-radar">
                        <Search className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="font-extrabold text-lg text-white">Mencari Driver Terdekat...</h3>
                      <p className="text-xs text-slate-400">Sistem sedang mencocokkan perjalanan Anda dengan driver Karang Taruna online.</p>
                    </div>
                  )}

                  {activeOrder.orderStatus !== 'SEARCHING_DRIVER' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-xs font-black text-emerald-400 uppercase">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{activeOrder.orderStatus.replace(/_/g, ' ')}</span>
                      </div>

                      {/* Driver Card Info */}
                      {activeOrder.driverName && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-500/40 bg-slate-950 shrink-0">
                              <img
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80"
                                alt={activeOrder.driverName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm text-white">{activeOrder.driverName}</h4>
                              <p className="text-xs text-emerald-400 font-semibold">{activeOrder.driverVehicle} • <span className="text-amber-400 font-bold">{activeOrder.driverPlate}</span></p>
                              <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-0.5">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span>4.9 (Driver Karang Taruna Terverifikasi)</span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={`https://wa.me/${activeOrder.driverPhone?.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 shadow-md"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Hubungi</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Manual Step Advancer for Demo Simulation */}
                  <div className="pt-2">
                    <button
                      onClick={advanceOrderStatus}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs hover:bg-amber-500/30 transition-colors"
                    >
                      Simulasi Lanjut Status Perjalanan (Demo Step →)
                    </button>
                  </div>

                </div>

                {/* Route Details */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Jemput:</span>
                      <p className="font-bold text-white">{activeOrder.pickupName}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Navigation className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Tujuan:</span>
                      <p className="font-bold text-white">{activeOrder.destinationName}</p>
                    </div>
                  </div>
                </div>

                {/* Total Fare Receipt */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">Total Pembayaran ({activeOrder.paymentMethod})</span>
                    <p className="font-black text-lg text-emerald-400">Rp {activeOrder.totalFare.toLocaleString('id-ID')}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    activeOrder.paymentStatus === 'PAID' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {activeOrder.paymentStatus}
                  </span>
                </div>

              </div>
            )}

          </div>

          {/* Right Panel: Simulated Interactive Map & Order History */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Map Visual Simulator */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">Visual Peta Perjalanan Cikancung</span>
                <span className="text-[10px] text-emerald-400 font-semibold">• Live GPS Simulated</span>
              </div>

              <div className="w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <iframe
                  title="Live Route Map"
                  src="https://maps.google.com/maps?q=-7.0195,107.8105&z=14&output=embed"
                  className="w-full h-full border-0 opacity-75"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Order History */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
                Riwayat Perjalanan Terakhir
              </h3>

              <div className="space-y-3 text-xs">
                {orderHistory.slice(0, 4).map((ord) => (
                  <div key={ord.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400">{ord.orderCode}</span>
                      <span className="text-slate-500">{ord.createdAt}</span>
                    </div>
                    <p className="text-slate-300 font-semibold line-clamp-1">{ord.pickupName} → {ord.destinationName}</p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Driver: {ord.driverName || 'Ojek Pemuda'}</span>
                      <span className="font-bold text-white">Rp {ord.totalFare.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* RATING & REVIEW MODAL */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 text-center shadow-2xl">
            
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-xl text-white">Perjalanan Selesai!</h3>
              <p className="text-xs text-slate-400">Bagaimana pengalaman perjalanan Anda bersama Driver Karang Taruna?</p>
            </div>

            {/* Star Selector */}
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setStarRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-8 h-8 ${star <= starRating ? 'fill-amber-400' : 'opacity-30'}`} />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tulis ulasan Anda untuk driver..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={handleSaveRating}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg"
            >
              Kirim Rating & Selesaikan
            </button>

          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
