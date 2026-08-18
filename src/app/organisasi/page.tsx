'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Award,
  ChevronDown,
  User,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { DataStore, OrgMember, OrgCategory } from '@/lib/data-store';

export default function OrganisasiPage() {
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<{ name: string; members: OrgMember[] } | null>(null);

  useEffect(() => {
    // Get members from DataStore sorted by sortOrder
    const list = DataStore.getMembers().filter(m => m.status === 'ACTIVE');
    list.sort((a, b) => a.sortOrder - b.sortOrder);
    setMembers(list);
  }, []);

  const pembinaList = members.filter(m => m.category === 'PEMBINA_PENASIHAT');
  const mpktList = members.filter(m => m.category === 'MPKT');
  const harianList = members.filter(m => m.category === 'PENGURUS_HARIAN');
  const bidangList = members.filter(m => m.category === 'BIDANG');

  // Find Ketua Karang Taruna
  const ketua = harianList.find(m => m.isLeader || m.role.toLowerCase().includes('ketua karang taruna'));
  const harianOthers = harianList.filter(m => m.id !== ketua?.id);

  // Group Bidang by Division Name
  const divisionsMap: { [key: string]: OrgMember[] } = {};
  bidangList.forEach((m) => {
    const divName = m.division || 'Bidang Lainnya';
    if (!divisionsMap[divName]) {
      divisionsMap[divName] = [];
    }
    divisionsMap[divName].push(m);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Users className="w-4 h-4" />
            <span>BAGAN STRUKTUR ORGANISASI RESMI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            STRUKTUR ORGANISASI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              KARANG TARUNA KECAMATAN CIKANCUNG
            </span>
          </h1>

          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs sm:text-sm tracking-widest uppercase">
            MASA BAKTI 2025–2030
          </div>

          <p className="text-slate-300 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed pt-2">
            Jajaran Pembina, Penasihat, MPKT, Pengurus Harian, serta Ketua & Anggota Bidang-Bidang Khusus Karang Taruna Kecamatan Cikancung, Kabupaten Bandung.
          </p>

        </div>
      </section>

      {/* HIERARCHICAL ORGANIZATIONAL CHART AREA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* TINGKAT 1: PEMBINA & PENASIHAT */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/30">
              PEMBINA & PENASIHAT
            </span>
            <p className="text-xs text-slate-400">Masa Bakti 2025–2030</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {pembinaList.map((m) => (
              <MemberCard key={m.id} member={m} onClick={() => setSelectedMember(m)} />
            ))}
          </div>

          <div className="w-0.5 h-10 bg-gradient-to-b from-emerald-500 to-amber-500 mx-auto" />
        </div>

        {/* TINGKAT 2: MAJELIS PERTIMBANGAN KARANG TARUNA (MPKT) */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/30">
              MAJELIS PERTIMBANGAN KARANG TARUNA (MPKT)
            </span>
            <p className="text-xs text-slate-400">Masa Bakti 2025–2030</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {mpktList.map((m) => (
              <MemberCard key={m.id} member={m} onClick={() => setSelectedMember(m)} />
            ))}
          </div>

          <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-emerald-500 mx-auto" />
        </div>

        {/* TINGKAT 3: PENGURUS HARIAN - KETUA */}
        {ketua && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-lg">
                PENGURUS HARIAN — KETUA UMUM
              </span>
            </div>

            <div 
              onClick={() => setSelectedMember(ketua)}
              className="p-8 rounded-3xl bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-400/80 shadow-2xl shadow-emerald-950/80 max-w-md w-full text-center space-y-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300 relative group"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-400 shadow-2xl bg-slate-950 relative">
                {ketua.photo && ketua.showPhoto !== false ? (
                  <img
                    src={ketua.photo}
                    alt={ketua.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-emerald-400">
                    <User className="w-14 h-14" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-black text-2xl text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {ketua.name}
                </h3>
                <p className="text-emerald-400 text-sm font-bold">{ketua.role}</p>
                <p className="text-slate-400 text-xs mt-1">Karang Taruna Kecamatan Cikancung</p>
              </div>

              {ketua.bio && (
                <p className="text-slate-300 text-xs line-clamp-2 italic pt-2 border-t border-slate-800">
                  "{ketua.bio}"
                </p>
              )}

              <div className="pt-2 text-[11px] font-bold text-amber-400 flex items-center justify-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Klik untuk Detail Profil</span>
              </div>
            </div>

            <div className="w-0.5 h-10 bg-emerald-500 my-2" />
          </div>
        )}

        {/* TINGKAT 4: PENGURUS HARIAN LAINNYA */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 bg-slate-900 px-3.5 py-1 rounded-full border border-slate-800">
              PENGURUS HARIAN (WAKIL KETUA, SEKRETARIS & BENDAHARA)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {harianOthers.map((m) => (
              <MemberCard key={m.id} member={m} onClick={() => setSelectedMember(m)} />
            ))}
          </div>

          <div className="w-0.5 h-12 bg-slate-800 mx-auto" />
        </div>

        {/* TINGKAT 5: BIDANG-BIDANG KHUSUS (TAMPIL KETUA BIDANG — KLIK UNTUK LIHAT ANGGOTA) */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest">
              BIDANG-BIDANG KHUSUS ORGANISASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Koordinator & Anggota Bidang Kerja (Masa Bakti 2025–2030)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Klik pada kartu Ketua Bidang di bawah ini untuk melihat daftar seluruh Anggota Bidang terkait.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(divisionsMap).map((divName, idx) => {
              const divMembers = divisionsMap[divName];
              const leader = divMembers.find(m => m.isLeader || m.role.toLowerCase().includes('ketua bidang')) || divMembers[0];
              const staffCount = divMembers.filter(m => m.id !== leader.id).length;

              return (
                <div 
                  key={divName}
                  onClick={() => setSelectedDivision({ name: divName, members: divMembers })}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 shadow-xl space-y-5 cursor-pointer group hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center font-extrabold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <h3 className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                        {divName}
                      </h3>
                    </div>

                    {/* KETUA BIDANG DISPLAY */}
                    <div className="flex items-center space-x-3.5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400 bg-slate-950 shrink-0 shadow-lg">
                        {leader.photo && leader.showPhoto !== false ? (
                          <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-emerald-400"><User className="w-7 h-7" /></div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40">
                          KETUA BIDANG / KOORDINATOR
                        </span>
                        <h4 className="font-extrabold text-base text-white mt-1 truncate">{leader.name}</h4>
                        <p className="text-xs text-emerald-400 font-medium truncate">{leader.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA CLICK TO SHOW ANGGOTA */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-emerald-400">
                    <span className="flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>{staffCount > 0 ? `👥 Lihat ${staffCount} Anggota Bidang` : 'Lihat Detail Bidang'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ---------------- MODAL DAFTAR ANGGOTA BIDANG (POPUP ON CLICK) ---------------- */}
      {selectedDivision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDivision(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/40">
                STRUKTUR BIDANG KHUSUS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {selectedDivision.name}
              </h2>
              <p className="text-slate-400 text-xs">Masa Bakti 2025–2030 • Karang Taruna Kecamatan Cikancung</p>
            </div>

            {/* KETUA BIDANG HEADER IN MODAL */}
            {(() => {
              const leader = selectedDivision.members.find(m => m.isLeader || m.role.toLowerCase().includes('ketua bidang')) || selectedDivision.members[0];
              const staffMembers = selectedDivision.members.filter(m => m.id !== leader.id);

              return (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/50 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 bg-slate-900 shrink-0">
                      {leader.photo && leader.showPhoto !== false ? (
                        <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-400"><User className="w-8 h-8" /></div>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40">
                        KETUA BIDANG / KOORDINATOR
                      </span>
                      <h3 className="font-extrabold text-base text-white mt-1">{leader.name}</h3>
                      <p className="text-xs text-emerald-400">{leader.role}</p>
                    </div>
                  </div>

                  {/* ANGGOTA BIDANG GRID IN MODAL */}
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Daftar Anggota Bidang ({staffMembers.length} Orang)</span>
                    </h4>

                    {staffMembers.length === 0 ? (
                      <p className="text-slate-400 italic p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        Belum ada anggota staf tambahan yang terdaftar untuk bidang ini.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {staffMembers.map((st) => (
                          <div 
                            key={st.id}
                            className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                              {st.photo && st.showPhoto !== false ? (
                                <img src={st.photo} alt={st.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400"><User className="w-5 h-5" /></div>
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <h5 className="font-bold text-xs text-white truncate">{st.name}</h5>
                              <p className="text-[10px] text-slate-400 truncate">{st.role || 'Anggota Bidang'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setSelectedDivision(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER DETAIL MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 text-center shadow-2xl relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-xl bg-slate-950 relative">
              {selectedMember.photo && selectedMember.showPhoto !== false ? (
                <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-emerald-400">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-xl text-white">{selectedMember.name}</h3>
              <p className="text-emerald-400 font-bold text-sm">{selectedMember.role}</p>
              {selectedMember.division && <p className="text-slate-400 text-xs">{selectedMember.division}</p>}
            </div>

            {selectedMember.bio && (
              <p className="text-slate-300 text-xs italic bg-slate-950 p-3 rounded-2xl border border-slate-800 leading-relaxed">
                "{selectedMember.bio}"
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

// HELPER COMPONENT FOR STANDARD MEMBER CARDS
function MemberCard({ member, onClick }: { member: OrgMember; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 text-center space-y-3 cursor-pointer group hover:scale-[1.02] shadow-lg flex flex-col justify-between"
    >
      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-slate-700 group-hover:border-emerald-400 transition-colors bg-slate-950 relative">
        {member.photo && member.showPhoto !== false ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500"><User className="w-8 h-8" /></div>
        )}
      </div>

      <div className="space-y-0.5">
        <h4 className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-1">{member.name}</h4>
        <p className="text-emerald-400 font-bold text-[11px] line-clamp-1">{member.role}</p>
      </div>
    </div>
  );
}
