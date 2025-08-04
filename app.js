const Shelfie = () => {
    const { React } = window;
    const { BookOpen, BarChart3, Share2 } = lucide;
    
    // Initial state with sample data
    const [libraries, setLibraries] = React.useState([
        {
            id: 1,
            name: "Study Library",
            shelves: [
                {
                    id: 1,
                    name: "Fiction",
                    books: [
                        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", color: "#2D5A27", height: 180, genre: "Classic", cover: "📚", libraryId: 1, shelfId: 1 },
                        { id: 2, title: "Dune", author: "Frank Herbert", color: "#8B4513", height: 220, genre: "Sci-Fi", cover: "🏜️", libraryId: 1, shelfId: 1 },
                        { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", color: "#228B22", height: 165, genre: "Fantasy", cover: "🧙", libraryId: 1, shelfId: 1 }
                    ]
                },
                {
                    id: 2,
                    name: "Non-Fiction",
                    books: [
                        { id: 4, title: "Sapiens", author: "Yuval Noah Harari", color: "#4682B4", height: 195, genre: "History", cover: "🌍", libraryId: 1, shelfId: 2 },
                        { id: 5, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", color: "#FF6347", height: 210, genre: "Psychology", cover: "🧠", libraryId: 1, shelfId: 2 }
                    ]
                },
                {
                    id: 3,
                    name: "Philosophy",
                    books: [
                        { id: 6, title: "Meditations", author: "Marcus Aurelius", color: "#8B4513", height: 175, genre: "Philosophy", cover: "⚖️", libraryId: 1, shelfId: 3 }
                    ]
                },
                {
                    id: 4,
                    name: "Reference",
                    books: [
                        { id: 7, title: "Dictionary", author: "Merriam-Webster", color: "#4A4A4A", height: 250, genre: "Reference", cover: "📖", libraryId: 1, shelfId: 4 },
                        { id: 8, title: "Atlas", author: "National Geographic", color: "#228B22", height: 280, genre: "Reference", cover: "🗺️", libraryId: 1, shelfId: 4 }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Living Room Collection",
            shelves: [
                {
                    id: 5,
                    name: "Mystery & Thriller",
                    books: [
                        { id: 9, title: "Gone Girl", author: "Gillian Flynn", color: "#B22222", height: 190, genre: "Mystery", cover: "🔍", libraryId: 2, shelfId: 5 },
                        { id: 10, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", color: "#4A4A4A", height: 185, genre: "Thriller", cover: "🐉", libraryId: 2, shelfId: 5 }
                    ]
                },
                {
                    id: 6,
                    name: "Romance",
                    books: [
                        { id: 11, title: "Pride and Prejudice", author: "Jane Austen", color: "#FFB6C1", height: 170, genre: "Romance", cover: "💕", libraryId: 2, shelfId: 6 }
                    ]
                }
            ]
        }
    ]);
    
    // Component state
    const [currentView, setCurrentView] = React.useState('shelf');
    const [activeLibraryId, setActiveLibraryId] = React.useState(1);
    const [sortBy, setSortBy] = React.useState('default');
    const [hoveredBook, setHoveredBook] = React.useState(null);
    const [draggedBook, setDraggedBook] = React.useState(null);
    const [newBookTitle, setNewBookTitle] = React.useState('');
    const [newShelfName, setNewShelfName] = React.useState('');
    const [newLibraryName, setNewLibraryName] = React.useState('');
    const fileInputRef = React.useRef(null);
    
    // Helper functions
    const getCurrentLibrary = () => libraries.find(lib => lib.id === activeLibraryId);
    const getCurrentBooks = () => getCurrentLibrary()?.shelves.flatMap(shelf => shelf.books) || [];
    const getAllBooks = () => libraries.flatMap(lib => lib.shelves.flatMap(shelf => shelf.books));
    
    const getGenreStats = () => {
        const allBooks = getAllBooks();
        const genreCount = allBooks.reduce((acc, book) => {
            acc[book.genre] = (acc[book.genre] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(genreCount).map(([genre, count]) => ({ genre, count }));
    };
    
    // Book management functions
    const sortBooks = (criteria) => {
        const currentLib = getCurrentLibrary();
        if (!currentLib) return;
        
        // Get ALL books from all shelves
        const allBooks = [];
        currentLib.shelves.forEach(shelf => {
            shelf.books.forEach(book => {
                allBooks.push(book);
            });
        });
        
        // Sort ALL books as one unified collection
        const sortedBooks = [...allBooks].sort((a, b) => {
            switch(criteria) {
                case 'title': return a.title.localeCompare(b.title);
                case 'author': return a.author.localeCompare(b.author);
                case 'height': return b.height - a.height;
                case 'color': return a.color.localeCompare(b.color);
                case 'genre': return a.genre.localeCompare(b.genre);
                default: return a.id - b.id;
            }
        });
        
        // Clear all shelves first
        const updatedShelves = currentLib.shelves.map(shelf => ({ ...shelf, books: [] }));
        
        // Calculate distribution
        const totalShelves = updatedShelves.length;
        let booksPerShelf = Math.ceil(sortedBooks.length / totalShelves);
        
        if (sortedBooks.length <= 10) {
            booksPerShelf = sortedBooks.length;
        }
        
        // Place sorted books sequentially across shelves
        sortedBooks.forEach((book, index) => {
            const shelfIndex = Math.floor(index / booksPerShelf);
            const targetShelfIndex = Math.min(shelfIndex, updatedShelves.length - 1);
            
            updatedShelves[targetShelfIndex].books.push({
                ...book,
                shelfId: updatedShelves[targetShelfIndex].id
            });
        });
        
        setLibraries(libraries.map(lib => 
            lib.id === activeLibraryId ? { ...lib, shelves: updatedShelves } : lib
        ));
        setSortBy(criteria);
    };
    
    const addBook = () => {
        if (newBookTitle.trim()) {
            const colors = ['#2D5A27', '#8B4513', '#4A4A4A', '#B22222', '#228B22', '#4682B4', '#8B0000', '#FF6347'];
            const covers = ['📚', '📖', '📕', '📗', '📘', '📙', '📓', '📔'];
            const currentLib = getCurrentLibrary();
            const firstShelfId = currentLib?.shelves[0]?.id;
            
            const newBook = {
                id: Date.now(),
                title: newBookTitle,
                author: "Unknown Author",
                color: colors[Math.floor(Math.random() * colors.length)],
                height: 160 + Math.random() * 60,
                genre: "Unknown",
                cover: covers[Math.floor(Math.random() * covers.length)],
                libraryId: activeLibraryId,
                shelfId: firstShelfId
            };
            
            setLibraries(libraries.map(lib => 
                lib.id === activeLibraryId 
                    ? {
                          ...lib,
                          shelves: lib.shelves.map(shelf =>
                              shelf.id === firstShelfId
                                  ? { ...shelf, books: [...shelf.books, newBook] }
                                  : shelf
                          )
                      }
                    : lib
            ));
            setNewBookTitle('');
        }
    };
    
    const addShelf = () => {
        if (newShelfName.trim()) {
            const newShelf = {
                id: Date.now(),
                name: newShelfName,
                books: []
            };
            
            setLibraries(libraries.map(lib => 
                lib.id === activeLibraryId 
                    ? { ...lib, shelves: [...lib.shelves, newShelf] }
                    : lib
            ));
            setNewShelfName('');
        }
    };
    
    const addLibrary = () => {
        if (newLibraryName.trim()) {
            const newLibrary = {
                id: Date.now(),
                name: newLibraryName,
                shelves: [{
                    id: Date.now() + 1,
                    name: "Main Shelf",
                    books: []
                }]
            };
            
            setLibraries([...libraries, newLibrary]);
            setNewLibraryName('');
            setActiveLibraryId(newLibrary.id);
        }
    };
    
    const deleteShelf = (shelfId) => {
        const currentLib = getCurrentLibrary();
        if (!currentLib || currentLib.shelves.length <= 1) return;
        
        setLibraries(libraries.map(lib => 
            lib.id === activeLibraryId 
                ? { ...lib, shelves: lib.shelves.filter(shelf => shelf.id !== shelfId) }
                : lib
        ));
    };
    
    // Drag and drop handlers
    const handleDragStart = (book) => {
        setDraggedBook(book);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e, targetShelfId) => {
        e.preventDefault();
        if (!draggedBook || draggedBook.shelfId === targetShelfId) return;
        
        setLibraries(libraries.map(lib => 
            lib.id === activeLibraryId 
                ? {
                      ...lib,
                      shelves: lib.shelves.map(shelf => {
                          if (shelf.id === draggedBook.shelfId) {
                              return { ...shelf, books: shelf.books.filter(book => book.id !== draggedBook.id) };
                          }
                          if (shelf.id === targetShelfId) {
                              return { ...shelf, books: [...shelf.books, { ...draggedBook, shelfId: targetShelfId }] };
                          }
                          return shelf;
                      })
                  }
                : lib
        ));
        
        setDraggedBook(null);
    };
    
    // Render main application
    return React.createElement('div', {
        className: "min-h-screen rainbow-bg"
    }, [
        // Header
        React.createElement('div', {
            key: 'header',
            className: "glass-card shadow-sm border-b border-rose-200/50"
        }, 
            React.createElement('div', {
                className: "max-w-7xl mx-auto px-6 py-4"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'title',
                        className: "flex items-center space-x-3"
                    }, [
                        React.createElement(BookOpen, {
                            key: 'icon',
                            className: "w-8 h-8 text-rose-500"
                        }),
                        React.createElement('h1', {
                            key: 'title',
                            className: "text-2xl font-bold text-gray-800"
                        }, "Shelfie"),
                        React.createElement('span', {
                            key: 'subtitle',
                            className: "text-sm text-gray-600"
                        }, "Your Digital Libraries")
                    ]),
                    
                    React.createElement('div', {
                        key: 'nav',
                        className: "flex space-x-2"
                    }, [
                        React.createElement('button', {
                            key: 'shelf-view',
                            onClick: () => setCurrentView('shelf'),
                            className: `px-4 py-2 rounded-lg smooth-transition focus-ring ${
                                currentView === 'shelf' 
                                    ? 'bg-gradient-to-r from-rose-400 to-orange-400 text-white shadow-md' 
                                    : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200'
                            }`
                        }, [
                            React.createElement(BookOpen, {
                                key: 'icon',
                                className: "w-4 h-4 inline mr-2"
                            }),
                            "Library View"
                        ]),
                        React.createElement('button', {
                            key: 'analytics-view',
                            onClick: () => setCurrentView('analytics'),
                            className: `px-4 py-2 rounded-lg smooth-transition focus-ring ${
                                currentView === 'analytics' 
                                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white shadow-md' 
                                    : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200'
                            }`
                        }, [
                            React.createElement(BarChart3, {
                                key: 'icon',
                                className: "w-4 h-4 inline mr-2"
                            }),
                            "Analytics"
                        ]),
                        React.createElement('button', {
                            key: 'share',
                            className: "px-4 py-2 bg-gradient-to-r from-violet-400 to-purple-400 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 smooth-transition shadow-md focus-ring"
                        }, [
                            React.createElement(Share2, {
                                key: 'icon',
                                className: "w-4 h-4 inline mr-2"
                            }),
                            "Share"
                        ])
                    ])
                ])
            )
        ),
        
        // Main content
        React.createElement('div', {
            key: 'content',
            className: "max-w-7xl mx-auto px-6 py-6"
        }, 
            currentView === 'shelf' 
                ? React.createElement('div', {
                    key: 'shelf-content'
                }, [
                    React.createElement(LibraryNavigation, {
                        key: 'library-nav',
                        libraries: libraries,
                        activeLibraryId: activeLibraryId,
                        setActiveLibraryId: setActiveLibraryId,
                        newLibraryName: newLibraryName,
                        setNewLibraryName: setNewLibraryName,
                        onAddLibrary: addLibrary
                    }),
                    React.createElement(BookControls, {
                        key: 'book-controls',
                        currentLibrary: getCurrentLibrary(),
                        newShelfName: newShelfName,
                        setNewShelfName: setNewShelfName,
                        onAddShelf: addShelf,
                        newBookTitle: newBookTitle,
                        setNewBookTitle: setNewBookTitle,
                        onAddBook: addBook,
                        fileInputRef: fileInputRef
                    }),
                    React.createElement(OrganizationControls, {
                        key: 'org-controls',
                        sortBy: sortBy,
                        onSortBooks: sortBooks
                    }),
                    React.createElement(ShelfDisplay, {
                        key: 'shelf-display',
                        currentLibrary: getCurrentLibrary(),
                        hoveredBook: hoveredBook,
                        setHoveredBook: setHoveredBook,
                        onDragStart: handleDragStart,
                        onDragOver: handleDragOver,
                        onDrop: handleDrop,
                        onDeleteShelf: deleteShelf
                    })
                ])
                : React.createElement(Analytics, {
                    key: 'analytics-content',
                    libraries: libraries,
                    getAllBooks: getAllBooks,
                    getGenreStats: getGenreStats
                })
        )
    ]);
};

// Initialize the app
ReactDOM.render(React.createElement(Shelfie), document.getElementById('root'));