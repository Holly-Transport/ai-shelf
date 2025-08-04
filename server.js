const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'shelf-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Routes

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes

// Get all libraries (mock database)
let libraries = [];

app.get('/api/libraries', (req, res) => {
    res.json(libraries);
});

// Save libraries
app.post('/api/libraries', (req, res) => {
    libraries = req.body;
    res.json({ success: true, message: 'Libraries saved successfully' });
});

// Upload shelf photos
app.post('/api/upload-shelf', upload.array('shelfPhotos', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const processedShelves = [];
        
        for (const file of req.files) {
            // In a real implementation, this would:
            // 1. Use OCR to detect book titles from the image
            // 2. Use computer vision to detect book spines and colors
            // 3. Estimate book heights from the image
            // 4. Look up book metadata from APIs
            
            // For now, return mock data
            const mockBooks = [
                {
                    id: Date.now() + Math.random(),
                    title: `Book from ${file.originalname}`,
                    author: "Detected Author",
                    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    height: 160 + Math.random() * 80,
                    genre: "Detected",
                    cover: "📚"
                }
            ];
            
            processedShelves.push({
                id: Date.now() + Math.random(),
                name: `Shelf from ${file.originalname}`,
                books: mockBooks,
                originalImage: file.filename
            });
        }
        
        res.json({
            success: true,
            shelves: processedShelves,
            message: `Processed ${req.files.length} shelf images`
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process shelf images' });
    }
});

// Book metadata lookup (mock implementation)
app.get('/api/book-lookup/:title', async (req, res) => {
    try {
        const { title } = req.params;
        
        // In a real implementation, this would query:
        // - Google Books API
        // - Open Library API
        // - ISBN databases
        
        // Mock response
        const mockBookData = {
            title: title,
            author: "Found Author",
            isbn: "978-0000000000",
            genre: "Literature",
            publishedDate: "2023",
            description: "A wonderful book discovered through API lookup.",
            coverUrl: "https://via.placeholder.com/200x300?text=Book+Cover",
            pageCount: 200 + Math.floor(Math.random() * 300)
        };
        
        res.json({
            success: true,
            book: mockBookData
        });
        
    } catch (error) {
        console.error('Book lookup error:', error);
        res.status(500).json({ error: 'Failed to lookup book metadata' });
    }
});

// Export library data
app.get('/api/export/:format', (req, res) => {
    const { format } = req.params;
    
    try {
        switch (format.toLowerCase()) {
            case 'json':
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', 'attachment; filename="shelfie-library.json"');
                res.send(JSON.stringify(libraries, null, 2));
                break;
                
            case 'csv':
                // Convert to CSV format
                const csvData = convertLibrariesToCSV(libraries);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="shelfie-library.csv"');
                res.send(csvData);
                break;
                
            default:
                res.status(400).json({ error: 'Unsupported format' });
        }
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export library data' });
    }
});

// Helper function to convert libraries to CSV
function convertLibrariesToCSV(libraries) {
    const headers = ['Library', 'Shelf', 'Title', 'Author', 'Genre', 'Height', 'Color'];
    const rows = [headers.join(',')];
    
    libraries.forEach(library => {
        library.shelves.forEach(shelf => {
            shelf.books.forEach(book => {
                const row = [
                    `"${library.name}"`,
                    `"${shelf.name}"`,
                    `"${book.title}"`,
                    `"${book.author}"`,
                    `"${book.genre}"`,
                    book.height,
                    `"${book.color}"`
                ];
                rows.push(row.join(','));
            });
        });
    });
    
    return rows.join('\n');
}

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large' });
        }
    }
    
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Shelfie server running on http://localhost:${PORT}`);
    console.log('Features available:');
    console.log('- Static file serving');
    console.log('- Photo upload and processing');
    console.log('- Book metadata lookup');
    console.log('- Library data export');
});