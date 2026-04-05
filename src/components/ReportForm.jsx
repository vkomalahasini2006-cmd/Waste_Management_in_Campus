import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { UploadCloud, CheckCircle } from 'lucide-react';
import './ReportForm.css';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    location: '',
    issueType: 'Overflowing Bin',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      let imageUrl = null;

      // 1. Upload Image (if exists)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('waste-images')
          .upload(filePath, imageFile);

        if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('waste-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Insert record into database
      const { error: dbError } = await supabase
        .from('waste_reports')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            department: formData.department,
            location: formData.location,
            issue_type: formData.issueType,
            description: formData.description,
            image_url: imageUrl
          }
        ]);

      if (dbError) throw new Error('Database insertion failed: ' + dbError.message);

      setSuccess(true);
      setFormData({
        fullName: '', email: '', department: '', location: '', issueType: 'Overflowing Bin', description: ''
      });
      setImageFile(null);

    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="report" className="section report-section">
      <div className="container">
        <div className="report-wrapper">
          <div className="report-info">
            <h2>Campus Clean <br/> <span className="text-highlight">Report Form</span></h2>
            <p>Help us maintain our campus by reporting any waste-related issues immediately. Your report will be logged into our central administrative dashboard for quick resolution.</p>
            <div className="info-card">
              <h3>In Case of Emergency</h3>
              <p>For chemical spills or serious hazardous waste incidents, please skip this form and contact Campus Security immediately.</p>
            </div>
          </div>
          
          <div className="report-form-container card">
            {success ? (
              <div className="success-state">
                <CheckCircle size={64} className="success-icon" />
                <h3>Thank You!</h3>
                <p>Your report has been successfully submitted and will be reviewed shortly.</p>
                <button className="btn btn-secondary mt-4" onClick={() => setSuccess(false)}>
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email (Optional)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                  </div>
                </div>

                <div className="form-row">
                   <div className="form-group">
                    <label className="form-label">Department *</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" required placeholder="e.g. Computer Science" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location in Campus *</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" required placeholder="e.g. Block A Cafeteria" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Waste Issue Type *</label>
                  <select name="issueType" value={formData.issueType} onChange={handleChange} className="form-control" required>
                    <option value="Overflowing Bin">Overflowing Bin</option>
                    <option value="Plastic Waste">Plastic Waste</option>
                    <option value="Food Waste">Food Waste</option>
                    <option value="E-Waste">E-Waste</option>
                    <option value="Unclean Area">Unclean Area</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required placeholder="Describe the issue briefly..."></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Image (Optional)</label>
                  <label className="file-upload-wrapper">
                    <UploadCloud size={24} />
                    <span>{imageFile ? imageFile.name : 'Click to upload image'}</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden-file-input" />
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
