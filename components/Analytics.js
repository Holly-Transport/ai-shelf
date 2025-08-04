const Analytics = ({ libraries, getAllBooks, getGenreStats }) => {
    const { React } = window;
    const { BookOpen, BarChart3, ArrowUpDown } = lucide;
    
    const gradients = [
        'from-rose-400 to-pink-400',
        'from-orange-400 to-amber-400', 
        'from-yellow-400 to-lime-400',
        'from-green-400 to-emerald-400',
        'from-teal-400 to-cyan-400',
        'from-sky-400 to-blue-400',
        'from-indigo-400 to-violet-400',
        'from-purple-400 to-fuchsia-400'
    ];
    
    const colors = [
        'bg-gradient-to-r from-rose-400 to-pink-400', 
        'bg-gradient-to-r from-orange-400 to-amber-400', 
        'bg-gradient-to-r from-yellow-400 to-lime-400', 
        'bg-gradient-to-r from-green-400 to-emerald-400', 
        'bg-gradient-to-r from-teal-400 to-cyan-400', 
        'bg-gradient-to-r from-sky-400 to-blue-400', 
        'bg-gradient-to-r from-indigo-400 to-violet-400', 
        'bg-gradient-to-r from-purple-400 to-fuchsia-400'
    ];
    
    return React.createElement('div', {
        className: "space-y-6"
    }, [
        // Stats Overview
        React.createElement('div', {
            key: 'stats-overview',
            className: "grid grid-cols-1 md:grid-cols-5 gap-6"
        }, [
            React.createElement('div', {
                key: 'total-books',
                className: "glass-card p-6 rounded-xl shadow-sm border border-rose-200/50"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'content'
                    }, [
                        React.createElement('p', {
                            key: 'label',
                            className: "text-sm font-medium text-gray-600"
                        }, "Total Books"),
                        React.createElement('p', {
                            key: 'value',
                            className: "text-2xl font-bold text-gray-900"
                        }, getAllBooks().length)
                    ]),
                    React.createElement(BookOpen, {
                        key: 'icon',
                        className: "w-8 h-8 text-rose-500"
                    })
                ])
            ),
            
            React.createElement('div', {
                key: 'libraries',
                className: "glass-card p-6 rounded-xl shadow-sm border border-orange-200/50"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'content'
                    }, [
                        React.createElement('p', {
                            key: 'label',
                            className: "text-sm font-medium text-gray-600"
                        }, "Libraries"),
                        React.createElement('p', {
                            key: 'value',
                            className: "text-2xl font-bold text-gray-900"
                        }, libraries.length)
                    ]),
                    React.createElement('div', {
                        key: 'icon',
                        className: "w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg flex items-center justify-center"
                    }, React.createElement(BookOpen, { className: "w-4 h-4 text-white" }))
                ])
            ),
            
            React.createElement('div', {
                key: 'total-shelves',
                className: "glass-card p-6 rounded-xl shadow-sm border border-yellow-200/50"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'content'
                    }, [
                        React.createElement('p', {
                            key: 'label',
                            className: "text-sm font-medium text-gray-600"
                        }, "Total Shelves"),
                        React.createElement('p', {
                            key: 'value',
                            className: "text-2xl font-bold text-gray-900"
                        }, libraries.reduce((sum, lib) => sum + lib.shelves.length, 0))
                    ]),
                    React.createElement('div', {
                        key: 'icon',
                        className: "w-8 h-8 bg-gradient-to-r from-yellow-400 to-lime-400 rounded-lg flex items-center justify-center"
                    }, React.createElement('div', { className: "w-4 h-4 bg-white rounded-sm" }))
                ])
            ),
            
            React.createElement('div', {
                key: 'genres',
                className: "glass-card p-6 rounded-xl shadow-sm border border-green-200/50"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'content'
                    }, [
                        React.createElement('p', {
                            key: 'label',
                            className: "text-sm font-medium text-gray-600"
                        }, "Genres"),
                        React.createElement('p', {
                            key: 'value',
                            className: "text-2xl font-bold text-gray-900"
                        }, getGenreStats().length)
                    ]),
                    React.createElement(BarChart3, {
                        key: 'icon',
                        className: "w-8 h-8 text-green-500"
                    })
                ])
            ),
            
            React.createElement('div', {
                key: 'avg-height',
                className: "glass-card p-6 rounded-xl shadow-sm border border-teal-200/50"
            }, 
                React.createElement('div', {
                    className: "flex items-center justify-between"
                }, [
                    React.createElement('div', {
                        key: 'content'
                    }, [
                        React.createElement('p', {
                            key: 'label',
                            className: "text-sm font-medium text-gray-600"
                        }, "Avg Height"),
                        React.createElement('p', {
                            key: 'value',
                            className: "text-2xl font-bold text-gray-900"
                        }, `${getAllBooks().length > 0 ? Math.round(getAllBooks().reduce((sum, book) => sum + book.height, 0) / getAllBooks().length) : 0}px`)
                    ]),
                    React.createElement(ArrowUpDown, {
                        key: 'icon',
                        className: "w-8 h-8 text-teal-500"
                    })
                ])
            )
        ]),
        
        // Library Distribution
        React.createElement('div', {
            key: 'library-distribution',
            className: "glass-card p-6 rounded-xl shadow-sm border border-cyan-200/50"
        }, [
            React.createElement('h3', {
                key: 'title',
                className: "text-lg font-semibold text-gray-900 mb-4"
            }, "Library Distribution"),
            React.createElement('div', {
                key: 'content',
                className: "space-y-4"
            }, 
                libraries.map((library, index) => {
                    const gradient = gradients[index % gradients.length];
                    const totalBooks = getAllBooks().length;
                    const libraryBooks = library.shelves.reduce((sum, shelf) => sum + shelf.books.length, 0);
                    
                    return React.createElement('div', {
                        key: library.id,
                        className: "border border-gray-200 rounded-lg p-4"
                    }, [
                        React.createElement('div', {
                            key: 'header',
                            className: "flex items-center justify-between mb-2"
                        }, [
                            React.createElement('h4', {
                                key: 'name',
                                className: "font-medium text-gray-800"
                            }, library.name),
                            React.createElement('div', {
                                key: 'stats',
                                className: "text-sm text-gray-600"
                            }, `${libraryBooks} books, ${library.shelves.length} shelves`)
                        ]),
                        React.createElement('div', {
                            key: 'progress',
                            className: "flex items-center mb-2"
                        }, [
                            React.createElement('div', {
                                key: 'bar-container',
                                className: "flex-1 mx-4"
                            }, 
                                React.createElement('div', {
                                    className: "bg-gray-200 rounded-full h-3"
                                }, 
                                    React.createElement('div', {
                                        className: `bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-500`,
                                        style: { width: totalBooks > 0 ? `${(libraryBooks / totalBooks) * 100}%` : '0%' }
                                    })
                                )
                            ),
                            React.createElement('div', {
                                key: 'count',
                                className: "text-sm font-medium text-gray-900"
                            }, `${libraryBooks} books`)
                        ]),
                        React.createElement('div', {
                            key: 'shelf-breakdown',
                            className: "ml-4 space-y-1"
                        }, 
                            library.shelves.map((shelf) =>
                                React.createElement('div', {
                                    key: shelf.id,
                                    className: "flex items-center text-sm"
                                }, [
                                    React.createElement('div', {
                                        key: 'name',
                                        className: "w-24 text-gray-600"
                                    }, shelf.name),
                                    React.createElement('div', {
                                        key: 'bar-container',
                                        className: "flex-1 mx-2"
                                    }, 
                                        React.createElement('div', {
                                            className: "bg-gray-100 rounded-full h-2"
                                        }, 
                                            React.createElement('div', {
                                                className: `bg-gradient-to-r ${gradient} h-2 rounded-full transition-all duration-300 opacity-70`,
                                                style: { width: libraryBooks > 0 ? `${(shelf.books.length / libraryBooks) * 100}%` : '0%' }
                                            })
                                        )
                                    ),
                                    React.createElement('div', {
                                        key: 'count',
                                        className: "text-xs text-gray-500"
                                    }, shelf.books.length)
                                ])
                            )
                        )
                    ]);
                })
            )
        ]),
        
        // Genre Distribution
        React.createElement('div', {
            key: 'genre-distribution',
            className: "glass-card p-6 rounded-xl shadow-sm border border-blue-200/50"
        }, [
            React.createElement('h3', {
                key: 'title',
                className: "text-lg font-semibold text-gray-900 mb-4"
            }, "Genre Distribution Across All Libraries"),
            React.createElement('div', {
                key: 'content',
                className: "space-y-3"
            }, 
                getGenreStats().sort((a, b) => b.count - a.count).map((stat, i) => {
                    const colorClass = colors[i % colors.length];
                    
                    return React.createElement('div', {
                        key: stat.genre,
                        className: "flex items-center"
                    }, [
                        React.createElement('div', {
                            key: 'genre',
                            className: "w-24 text-sm text-gray-600"
                        }, stat.genre),
                        React.createElement('div', {
                            key: 'bar-container',
                            className: "flex-1 mx-4"
                        }, 
                            React.createElement('div', {
                                className: "bg-gray-200 rounded-full h-3"
                            }, 
                                React.createElement('div', {
                                    className: `${colorClass} h-3 rounded-full transition-all duration-500`,
                                    style: { width: `${(stat.count / getAllBooks().length) * 100}%` }
                                })
                            )
                        ),
                        React.createElement('div', {
                            key: 'count',
                            className: "text-sm font-medium text-gray-900"
                        }, `${stat.count} books`)
                    ]);
                })
            )
        ]),
        
        // Reading Insights
        React.createElement('div', {
            key: 'reading-insights',
            className: "glass-card p-6 rounded-xl shadow-sm border border-indigo-200/50"
        }, [
            React.createElement('h3', {
                key: 'title',
                className: "text-lg font-semibold text-gray-900 mb-4"
            }, "Reading Insights"),
            React.createElement('div', {
                key: 'content',
                className: "grid md:grid-cols-3 gap-6"
            }, [
                React.createElement('div', {
                    key: 'top-authors'
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        className: "font-medium text-gray-700 mb-2"
                    }, "Top Authors"),
                    React.createElement('div', {
                        key: 'list',
                        className: "space-y-2"
                    }, 
                        Object.entries(getAllBooks().reduce((acc, book) => {
                            acc[book.author] = (acc[book.author] || 0) + 1;
                            return acc;
                        }, {})).sort(([,a], [,b]) => b - a).slice(0, 5).map(([author, count]) =>
                            React.createElement('div', {
                                key: author,
                                className: "flex justify-between text-sm"
                            }, [
                                React.createElement('span', {
                                    key: 'author',
                                    className: "text-gray-600"
                                }, author),
                                React.createElement('span', {
                                    key: 'count',
                                    className: "font-medium"
                                }, `${count} book${count !== 1 ? 's' : ''}`)
                            ])
                        )
                    )
                ]),
                
                React.createElement('div', {
                    key: 'collection-style'
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        className: "font-medium text-gray-700 mb-2"
                    }, "Collection Style"),
                    React.createElement('div', {
                        key: 'content',
                        className: "space-y-2 text-sm"
                    }, [
                        React.createElement('div', {
                            key: 'favorite-genre'
                        }, [
                            React.createElement('span', {
                                key: 'label',
                                className: "text-gray-600"
                            }, "Favorite Genre:"),
                            React.createElement('span', {
                                key: 'value',
                                className: "ml-2 font-medium"
                            }, getGenreStats().sort((a, b) => b.count - a.count)[0]?.genre || 'N/A')
                        ]),
                        React.createElement('div', {
                            key: 'org-style'
                        }, [
                            React.createElement('span', {
                                key: 'label',
                                className: "text-gray-600"
                            }, "Organization Style:"),
                            React.createElement('span', {
                                key: 'value',
                                className: "ml-2 font-medium"
                            }, "Multi-Library Curator")
                        ]),
                        React.createElement('div', {
                            key: 'diversity'
                        }, [
                            React.createElement('span', {
                                key: 'label',
                                className: "text-gray-600"
                            }, "Diversity Score:"),
                            React.createElement('span', {
                                key: 'value',
                                className: "ml-2 font-medium"
                            }, `${getGenreStats().length}/10 genres`)
                        ])
                    ])
                ]),
                
                React.createElement('div', {
                    key: 'library-stats'
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        className: "font-medium text-gray-700 mb-2"
                    }, "Library Stats"),
                    React.createElement('div', {
                        key: 'content',
                        className: "space-y-2 text-sm"
                    }, 
                        libraries.map(lib =>
                            React.createElement('div', {
                                key: lib.id,
                                className: "flex justify-between"
                            }, [
                                React.createElement('span', {
                                    key: 'name',
                                    className: "text-gray-600"
                                }, `${lib.name}:`),
                                React.createElement('span', {
                                    key: 'count',
                                    className: "font-medium"
                                }, `${lib.shelves.reduce((sum, shelf) => sum + shelf.books.length, 0)} books`)
                            ])
                        )
                    )
                ])
            ])
        ])
    ]);
};