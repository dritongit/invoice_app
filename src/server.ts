import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import contactRoutes from './routes/contactRoutes';
// import invoiceRoutes from './routes/invoiceRoutes';

dotenv.config();

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());





// Use routes
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
// app.use('/api/invoices', authenticateJWT, invoiceRoutes);

// Define basic API route
app.get('/api', (req, res) => {
    res.json({ message: 'API is working' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
