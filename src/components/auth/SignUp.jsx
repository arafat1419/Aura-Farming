import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(formData);
      if (result.success) {
        setSuccess('Pendaftaran berhasil! Anda akan diarahkan ke dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">🏛️</div>
          </div>
          <h2>Daftar Akun Baru</h2>
          <p>Dashboard Asuransi Parametrik Pertanian</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="contoh@kementan.go.id"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Departemen</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Departemen</option>
              <option value="Kementerian Pertanian">Kementerian Pertanian</option>
              <option value="Dinas Pertanian Provinsi">Dinas Pertanian Provinsi</option>
              <option value="Dinas Pertanian Kabupaten">Dinas Pertanian Kabupaten</option>
              <option value="UPTD">UPTD</option>
              <option value="Penyuluh Pertanian">Penyuluh Pertanian</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="position">Jabatan</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Masukkan jabatan"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Ulangi password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Sudah punya akun? <Link to="/signin">Masuk di sini</Link></p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          padding: 1rem;
        }

        .auth-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          width: 100%;
          max-width: 500px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-logo {
          margin-bottom: 1rem;
        }

        .logo-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .auth-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .auth-header p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .error-message {
          color: #dc2626;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          padding: 0.75rem;
          font-size: 0.875rem;
        }

        .success-message {
          color: #059669;
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          padding: 0.75rem;
          font-size: 0.875rem;
        }

        .auth-button {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 0.5rem;
        }

        .auth-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .auth-footer p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .auth-footer a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;