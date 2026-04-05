import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('waste_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching reports:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved').length;
  const pendingReports = totalReports - resolvedReports;

  // Process data for Issue Types Pie Chart
  const issueTypesCount = reports.reduce((acc, report) => {
    acc[report.issue_type] = (acc[report.issue_type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(issueTypesCount).map(key => ({
    name: key,
    value: issueTypesCount[key]
  }));

  const COLORS = ['#2d6a4f', '#40916c', '#52796f', '#74c69d', '#95d5b2', '#b7e4c7'];

  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="container">
        <h2 className="section-title">Campus Dashboard</h2>
        <p className="section-subtitle">Real-time statistics of waste reports across the campus.</p>

        {loading ? (
          <div className="loading-state">Loading dashboard data...</div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{color: 'var(--color-primary)'}}><AlertCircle size={32} /></div>
                <div className="stat-info">
                  <h3>{totalReports}</h3>
                  <p>Total Reports</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{color: '#f39c12'}}><Clock size={32} /></div>
                <div className="stat-info">
                  <h3>{pendingReports}</h3>
                  <p>Pending Actions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{color: 'var(--color-bin-green)'}}><CheckCircle2 size={32} /></div>
                <div className="stat-info">
                  <h3>{resolvedReports}</h3>
                  <p>Issues Resolved</p>
                </div>
              </div>
            </div>

            <div className="charts-grid mt-4">
              <div className="chart-container card">
                <h3>Issues by Category</h3>
                {pieData.length > 0 ? (
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="no-data">No report data available yet.</p>
                )}
              </div>

              <div className="recent-reports card">
                <h3>Recent Reports</h3>
                {reports.length > 0 ? (
                  <div className="reports-list">
                    {reports.slice(0, 5).map(report => (
                      <div className="report-list-item" key={report.id}>
                        <div className="report-top">
                          <span className="report-type">{report.issue_type}</span>
                          <span className={`status-badge ${report.status.toLowerCase()}`}>{report.status}</span>
                        </div>
                        <p className="report-loc"><MapPinIcon size={14}/> {report.location}</p>
                        <div className="report-date">
                          {new Date(report.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No recent reports.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const MapPinIcon = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default Dashboard;
