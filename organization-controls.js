const OrganizationControls = ({ sortBy, onSortBooks }) => {
    const { React } = window;
    const { Shuffle, ArrowUpDown, Palette } = lucide;
    
    const sortOptions = [
        { key: 'default', label: 'Default Order', icon: null, gradient: 'from-gray-400 to-gray-500' },
        { key: 'title', label: 'Title', icon: null, gradient: 'from-rose-400 to-pink-400' },
        { key: 'author', label: 'Author', icon: null, gradient: 'from-orange-400 to-amber-400' },
        { key: 'height', label: 'Height', icon: ArrowUpDown, gradient: 'from-green-400 to-emerald-400' },
        { key: 'color', label: 'Color', icon: Palette, gradient: 'from-cyan-400 to-blue-400' },
        { key: 'genre', label: 'Genre', icon: null, gradient: 'from-violet-400 to-purple-400' }
    ];
    
    return React.createElement('div', {
        className: "glass-card rounded-xl shadow-sm p-4 mb-6 border border-yellow-200/50"
    }, [
        React.createElement('div', {
            key: 'header',
            className: "flex flex-wrap items-center justify-between gap-4 mb-4"
        }, 
            React.createElement('div', {
                className: "flex items-center space-x-2"
            }, [
                React.createElement(Shuffle, {
                    key: 'icon',
                    className: "w-4 h-4 text-gray-600"
                }),
                React.createElement('span', {
                    key: 'text',
                    className: "text-sm font-medium text-gray-700"
                }, "Organize books across all shelves:")
            ])
        ),
        
        React.createElement('div', {
            key: 'buttons',
            className: "flex flex-wrap gap-2"
        }, 
            sortOptions.map(option => 
                React.createElement('button', {
                    key: option.key,
                    onClick: () => onSortBooks(option.key),
                    className: `px-3 py-1.5 rounded-lg text-sm smooth-transition flex items-center space-x-1 focus-ring ${
                        sortBy === option.key 
                            ? `bg-gradient-to-r ${option.gradient} text-white shadow-md transform scale-105` 
                            : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200'
                    }`
                }, [
                    option.icon && React.createElement(option.icon, {
                        key: 'icon',
                        className: "w-3 h-3"
                    }),
                    React.createElement('span', {
                        key: 'label'
                    }, option.label)
                ])
            )
        ),
        
        React.createElement('div', {
            key: 'help',
            className: "mt-3 text-xs text-gray-600"
        }, "📷 Each shelf represents a photo section of your bookcase. Books flow naturally across connected shelves when organized.")
    ]);
};