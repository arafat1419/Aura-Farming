export const farmers = [
  { id: 1, nama: 'Budi Santoso', nik: '3201234567890123', provinsi: 'Jawa Barat', kabupaten: 'Bandung', luas: 1.5, status: 'Aktif', tanggalDaftar: '2024-01-15', kelompokTani: 'Tani Maju' },
  { id: 2, nama: 'Siti Nurhaliza', nik: '3301234567890124', provinsi: 'Jawa Tengah', kabupaten: 'Solo', luas: 2.0, status: 'Aktif', tanggalDaftar: '2024-01-20', kelompokTani: 'Sari Tani' },
  { id: 3, nama: 'Ahmad Wijaya', nik: '3501234567890125', provinsi: 'Jawa Timur', kabupaten: 'Malang', luas: 1.8, status: 'Pending', tanggalDaftar: '2024-02-10', kelompokTani: 'Tani Sejahtera' },
  { id: 4, nama: 'Dewi Lestari', nik: '1271234567890126', provinsi: 'Sumatra Utara', kabupaten: 'Medan', luas: 1.2, status: 'Aktif', tanggalDaftar: '2024-02-15', kelompokTani: 'Harapan Baru' },
  { id: 5, nama: 'Rahman Hidayat', nik: '3201234567890127', provinsi: 'Jawa Barat', kabupaten: 'Bogor', luas: 1.7, status: 'Ditolak', tanggalDaftar: '2024-02-20', kelompokTani: 'Tani Makmur' },
  { id: 6, nama: 'Fatimah Zahra', nik: '3301234567890128', provinsi: 'Jawa Tengah', kabupaten: 'Semarang', luas: 1.9, status: 'Aktif', tanggalDaftar: '2024-03-01', kelompokTani: 'Berkah Tani' },
  { id: 7, nama: 'Eko Prasetyo', nik: '3501234567890129', provinsi: 'Jawa Timur', kabupaten: 'Surabaya', luas: 1.4, status: 'Pending', tanggalDaftar: '2024-03-05', kelompokTani: 'Mitra Tani' },
  { id: 8, nama: 'Indira Sari', nik: '1271234567890130', provinsi: 'Sumatra Utara', kabupaten: 'Binjai', luas: 1.6, status: 'Aktif', tanggalDaftar: '2024-03-10', kelompokTani: 'Tani Unggul' }
]

export const applications = [
  { id: 'APP001', petani: 'Budi Santoso', luas: 1.5, premi: 450000, tanggalPengajuan: '2024-01-20', status: 'Disetujui', polis: 'POL-2024-001' },
  { id: 'APP002', petani: 'Siti Nurhaliza', luas: 2.0, premi: 600000, tanggalPengajuan: '2024-01-25', status: 'Disetujui', polis: 'POL-2024-002' },
  { id: 'APP003', petani: 'Ahmad Wijaya', luas: 1.8, premi: 540000, tanggalPengajuan: '2024-02-15', status: 'Dalam Review', polis: '-' },
  { id: 'APP004', petani: 'Dewi Lestari', luas: 1.2, premi: 360000, tanggalPengajuan: '2024-02-20', status: 'Disetujui', polis: 'POL-2024-003' },
  { id: 'APP005', petani: 'Fatimah Zahra', luas: 1.9, premi: 570000, tanggalPengajuan: '2024-03-05', status: 'Disetujui', polis: 'POL-2024-004' },
  { id: 'APP006', petani: 'Eko Prasetyo', luas: 1.4, premi: 420000, tanggalPengajuan: '2024-03-10', status: 'Dalam Review', polis: '-' },
  { id: 'APP007', petani: 'Indira Sari', luas: 1.6, premi: 480000, tanggalPengajuan: '2024-03-15', status: 'Ditolak', polis: '-' }
]

export const claims = [
  { id: 'CLM001', petani: 'Budi Santoso', polis: 'POL-2024-001', luasRusak: 1.2, persentaseRusak: 80, kompensasi: 7200000, tanggalKlaim: '2024-05-15', status: 'Disetujui', penyebab: 'Banjir' },
  { id: 'CLM002', petani: 'Siti Nurhaliza', polis: 'POL-2024-002', luasRusak: 1.8, persentaseRusak: 90, kompensasi: 10800000, tanggalKlaim: '2024-06-01', status: 'Dalam Proses', penyebab: 'Kekeringan' },
  { id: 'CLM003', petani: 'Dewi Lestari', polis: 'POL-2024-003', luasRusak: 0.9, persentaseRusak: 75, kompensasi: 5400000, tanggalKlaim: '2024-06-10', status: 'Disetujui', penyebab: 'Hama Tikus' },
  { id: 'CLM004', petani: 'Fatimah Zahra', polis: 'POL-2024-004', luasRusak: 1.5, persentaseRusak: 85, kompensasi: 9000000, tanggalKlaim: '2024-06-20', status: 'Dalam Proses', penyebab: 'Angin Kencang' }
]

export const notifications = [
  { id: 1, type: 'warning', title: 'Peringatan Cuaca Ekstrem', message: 'Cuaca buruk diprediksi di Jawa Barat dalam 3 hari ke depan', time: '2 jam yang lalu', read: false },
  { id: 2, type: 'success', title: 'Klaim Disetujui', message: 'Klaim CLM001 untuk Budi Santoso telah disetujui', time: '4 jam yang lalu', read: false },
  { id: 3, type: 'info', title: 'Pendaftaran Baru', message: '25 petani baru mendaftar hari ini', time: '6 jam yang lalu', read: true },
  { id: 4, type: 'error', title: 'Klaim Ditolak', message: 'Klaim CLM005 ditolak karena tidak memenuhi syarat', time: '1 hari yang lalu', read: true }
]