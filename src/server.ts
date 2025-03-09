import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import contactRoutes from './routes/contactRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import subinvoiceRoutes from './routes/subinvoiceRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/subinvoices', subinvoiceRoutes);
app.use('/api/payments', paymentRoutes);

// Define basic API route
app.get('/api', (req, res) => {
    res.json({ message: 'API is working' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
