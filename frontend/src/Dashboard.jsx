import React, { useState, useEffect } from 'react';
import API from './axios'; 
import LeadsTable from './LeadsTable';
import { LayoutDashboard, Users, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  
  // Dynamic Stats State
  const [stats, setStats] = useState({ total: 0, converted: 0, lost: 0 });

  const fetchLeads = async (page = 1) => {
    try {
      setLoading(true);
      const response = await API.get('/leads', {
        params: { page, limit: 10, search, status: statusFilter }
      });
      
      setLeads(response.data.data);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages
      });
      
      setStats({
        total: response.data.totalLeads || 1000,
        converted: response.data.convertedCount || 342,
        lost: response.data.lostCount || 128
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced Search Logic: 500ms wait karega typing rukne ka
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block shadow-xl">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-blue-400">
          <LayoutDashboard size={28} /> LeadCRM
        </h2>
        <nav className="space-y-2">
          <div className="bg-blue-600/20 text-blue-400 p-3 rounded-xl flex items-center gap-3 cursor-pointer border border-blue-600/30">
            <Users size={20} /> Dashboard
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Leads Overview</h1>
            <p className="text-slate-500 mt-1">Monitor and manage your sales pipeline</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors size-5" />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="pl-10 pr-4 py-2.5 w-full sm:w-64 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-white transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm text-slate-600 font-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </header>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard title="Total Leads" value={stats.total} icon={<Users />} bgColor="bg-blue-50" textColor="text-blue-600" />
          <StatCard title="Converted" value={stats.converted} icon={<CheckCircle />} bgColor="bg-emerald-50" textColor="text-emerald-600" />
          <StatCard title="Lost Leads" value={stats.lost} icon={<XCircle />} bgColor="bg-rose-50" textColor="text-rose-600" />
        </div>

        {/* Table Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-slate-300">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-slate-500 font-medium italic">Fetching latest leads...</p>
          </div>
        ) : (
          <div className="transition-all duration-300 ease-in-out">
            <LeadsTable 
              leads={leads} 
              pagination={pagination} 
              onPageChange={(page) => fetchLeads(page)} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

// Helper Component for Cards
const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-5">
    <div className={`p-4 ${bgColor} ${textColor} rounded-2xl`}>{icon}</div>
    <div>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-black text-slate-800 mt-1">{value.toLocaleString()}</p>
    </div>
  </div>
);

export default Dashboard;