const BookControls = ({ 
    currentLibrary, 
    newShelfName, 
    setNewShelfName, 
    onAddShelf,
    newBookTitle,
    setNewBookTitle,
    onAddBook,
    fileInputRef
}) => {
    const { React } = window;
    const { Plus, Camera } = lucide;
    
    const handleFileChange = (e) => {
        if (e.target.files?.length > 0) {
            alert(`Selected ${e.target.files.length} shelf photo(s). Photo processing feature coming soon!`);
        }
    };
    
    return React.createElement('div', {
        className: "glass-card rounded-xl shadow-sm p-4 mb-6 border border-orange-200/50"
    }, [
        React.createElement('div', {
            key: 'header',
            className: "flex items-center justify-between mb-4"
        }, [
            React.createElement('h2', {
                key: 'title',
                className: "text-xl font-semibold text-gray-800"
            }, currentLibrary?.name),
            React.createElement('div', {
                key: 'shelf-controls',
                className: "flex items-center space-x-2"
            }, [
                React.createElement('input', {
                    key: 'shelf-input',
                    type: "text",
                    value: newShelfName,
                    onChange: (e) => setNewShelfName(e.target.value),
                    placeholder: "New shelf name...",
                    className: "px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus-ring",
                    onKeyPress: (e) => e.key === 'Enter' && onAddShelf()
                }),
                React.createElement('button', {
                    key: 'shelf-button',
                    onClick: onAddShelf,
                    className: "px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-colors shadow-sm focus-ring"
                }, [
                    React.createElement(Plus, {
                        key: 'icon',
                        className: "w-3 h-3 inline mr-1"
                    }),
                    "Add Shelf"
                ])
            ])
        ]),
        
        React.createElement('div', {
            key: 'content',
            className: "grid md:grid-cols-2 gap-6 mb-4"
        }, [
            // Photo upload section
            React.createElement('div', {
                key: 'photo-section'
            }, [
                React.createElement('label', {
                    key: 'photo-label',
                    className: "block text-sm font-medium text-gray-700 mb-2"
                }, "Upload Shelf Photo"),
                React.createElement('div', {
                    key: 'photo-dropzone',
                    className: "border-2 border-dashed border-orange-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400 hover:bg-orange-50/50 transition-colors",
                    onClick: () => fileInputRef.current?.click()
                }, [
                    React.createElement(Camera, {
                        key: 'camera-icon',
                        className: "w-8 h-8 text-orange-400 mx-auto mb-2"
                    }),
                    React.createElement('p', {
                        key: 'text1',
                        className: "text-gray-700 text-sm"
                    }, "Upload individual shelf photos"),
                    React.createElement('p', {
                        key: 'text2',
                        className: "text-xs text-gray-600 mt-1"
                    }, "Each photo will be processed as a separate shelf")
                ]),
                React.createElement('input', {
                    key: 'file-input',
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "hidden",
                    onChange: handleFileChange
                })
            ]),
            
            // Manual book addition section  
            React.createElement('div', {
                key: 'manual-section'
            }, [
                React.createElement('label', {
                    key: 'book-label',
                    className: "block text-sm font-medium text-gray-700 mb-2"
                }, "Add Book Manually"),
                React.createElement('div', {
                    key: 'book-controls',
                    className: "flex space-x-2"
                }, [
                    React.createElement('input', {
                        key: 'book-input',
                        type: "text",
                        value: newBookTitle,
                        onChange: (e) => setNewBookTitle(e.target.value),
                        placeholder: "Enter book title...",
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus-ring",
                        onKeyPress: (e) => e.key === 'Enter' && onAddBook()
                    }),
                    React.createElement('button', {
                        key: 'book-button',
                        onClick: onAddBook,
                        className: "px-4 py-2 bg-gradient-to-r from-lime-400 to-green-400 text-white rounded-lg hover:from-lime-500 hover:to-green-500 transition-colors shadow-sm focus-ring"
                    }, "Add Book")
                ]),
                React.createElement('p', {
                    key: 'help-text',
                    className: "text-xs text-gray-600 mt-2"
                }, "Books will be added to the first shelf and can be moved between shelves")
            ])
        ])
    ]);
};