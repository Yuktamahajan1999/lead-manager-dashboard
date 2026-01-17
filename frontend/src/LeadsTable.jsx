import React from 'react';
import { ChevronLeft, ChevronRight, Mail, Phone, ExternalLink, SearchX } from 'lucide-react';

const LeadsTable = ({ leads, pagination, onPageChange, loading }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'converted': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'lost': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'new': return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'contacted': return 'bg-amber-50 text-amber-700 border-amber-100'; // Isse ye Yellow/Orange dikhega
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };


  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="flex gap-3 items-center"><div className="h-9 w-9 bg-slate-200 rounded-full"></div><div className="space-y-2"><div className="h-4 bg-slate-200 rounded w-24"></div><div className="h-3 bg-slate-100 rounded w-16"></div></div></div></td>
      <td className="px-6 py-4 space-y-2"><div className="h-3 bg-slate-200 rounded w-32"></div><div className="h-3 bg-slate-100 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
      <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-slate-100 rounded ml-auto"></div></td>
    </tr>
  );

  return (
    <div className="w-full transition-all">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-600">Lead Info</th>
              <th className="px-6 py-4 font-bold text-slate-600">Contact</th>
              <th className="px-6 py-4 font-bold text-slate-600">Status</th>
              <th className="px-6 py-4 font-bold text-slate-600">Source</th>
              <th className="px-6 py-4 font-bold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
            ) : leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono tracking-tighter">#{lead._id.slice(-6).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> {lead.email}</span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400"><Phone size={13} className="text-slate-300" /> {lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider shadow-sm ${getStatusStyles(lead.status)}`}>
                      <span className="h-1 w-1 rounded-full bg-current mr-2 animate-pulse"></span>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                      {lead.source || 'WEB'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-blue-100 rounded-lg shadow-none hover:shadow-sm transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                    <SearchX size={48} strokeWidth={1} className="text-slate-300" />
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm">Try adjusting your filters or search keywords.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between px-2 pb-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Page {pagination.page} / {pagination.totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-blue-50 text-slate-600 disabled:opacity-30 transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="h-10 px-4 flex items-center justify-center bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-200">
            {pagination.page}
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || loading}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-blue-50 text-slate-600 disabled:opacity-30 transition-all active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;