# 📚 Shelfie - Your Digital Libraries

A beautiful, intuitive web application for organizing and managing your book collection through photo-based shelf scanning and digital organization.

## ✨ Features

### 🌟 Core Functionality
- **📷 Photo Upload**: Upload photos of individual bookshelf sections
- **🔍 Book Recognition**: Automatic book detection and metadata lookup (planned)
- **📖 Manual Entry**: Add books manually with rich metadata
- **🎨 Beautiful Visualization**: Hand-drawn style book spines with realistic shadows
- **🏗️ Multi-Library Support**: Organize books across multiple libraries (Study, Living Room, etc.)
- **📐 Continuous Shelves**: Treat shelf sections as connected segments of one bookcase

### 🎯 Organization Features
- **🔄 Smart Sorting**: Sort entire collection by title, author, height, color, or genre
- **🖱️ Drag & Drop**: Move books between shelf sections seamlessly
- **📊 Analytics Dashboard**: Comprehensive statistics and insights
- **🎨 Rainbow Theme**: Beautiful muted rainbow color scheme throughout
- **📱 Responsive Design**: Works perfectly on desktop and mobile

### 🚀 Advanced Features
- **💡 Book Recommendations**: Personalized suggestions based on your collection
- **📈 Reading Insights**: Genre distribution, favorite authors, collection diversity
- **🤝 Social Sharing**: Share your libraries with friends (planned)
- **📤 Data Export**: Export your library data in JSON or CSV formats

## 🏗️ Project Structure

```
shelfie/
├── index.html              # Main HTML structure
├── styles.css              # Custom styles and animations
├── app.js                  # Main React application
├── server.js               # Express server (optional)
├── package.json            # Node.js dependencies
├── components/             # Modular React components
│   ├── BookSpine.js        # Individual book spine component
│   ├── ShelfComponent.js   # Shelf section component
│   ├── LibraryNavigation.js # Library selection interface
│   ├── BookControls.js     # Book addition controls
│   ├── OrganizationControls.js # Sorting and organization
│   ├── ShelfDisplay.js     # Main shelf display
│   └── Analytics.js        # Analytics dashboard
├── uploads/                # User-uploaded shelf photos
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: Static Website (No Server)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/shelfie.git
   cd shelfie
   ```

2. **Open in browser**:
   Simply open `index.html` in your web browser. All functionality except photo processing will work.

### Option 2: Full Server Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

## 🎨 Component Architecture

### Core Components

#### `BookSpine.js`
- Renders individual book spines with realistic styling
- Handles hover tooltips with book metadata
- Manages drag events for book movement

#### `ShelfComponent.js`
- Displays a shelf section with books
- Handles drop zones for book organization
- Shows empty state for new shelves

#### `LibraryNavigation.js`
- Library selection and creation interface
- Rainbow-themed gradient buttons
- Book and shelf count display

#### `BookControls.js`
- Photo upload interface
- Manual book addition form
- Shelf creation controls

#### `OrganizationControls.js`
- Sorting buttons for different criteria
- Visual feedback for active sort method
- Help text and instructions

#### `ShelfDisplay.js`
- Main shelf visualization area
- Book recommendations section
- Educational content about shelf sections

#### `Analytics.js`
- Comprehensive statistics dashboard
- Genre and author breakdowns
- Reading insights and collection analysis

## 🎯 How It Works

### 📷 Photo-Based Organization
1. **Upload Photos**: Take photos of individual bookshelf sections
2. **Automatic Processing**: Books are detected and cataloged (feature in development)
3. **Manual Enhancement**: Add or edit book details as needed
4. **Organization**: Use sorting and drag-and-drop to organize your collection

### 🔄 Continuous Shelf Concept
- Each uploaded photo represents a "shelf section"
- Sections are treated as connected segments of one long bookshelf
- Books can be moved between any sections seamlessly
- Sorting algorithms work across the entire collection

### 🎨 Design Philosophy
- **Muted Rainbow Theme**: Soft, professional colors that are easy on the eyes
- **Glassmorphism**: Translucent cards with backdrop blur effects
- **Hand-drawn Aesthetic**: Book spines look realistic and tactile
- **Responsive Layout**: Adapts beautifully to any screen size

## 🔮 Future Features

### 🤖 AI-Powered Features
- **OCR Book Recognition**: Automatic title detection from photos
- **Smart Categorization**: AI-powered genre and metadata detection
- **Reading Analytics**: Advanced insights into reading patterns
- **Book Condition Assessment**: Visual analysis of book wear and condition

### 🌐 Social Features
- **Library Sharing**: Share collections with friends and family
- **Community Recommendations**: Discover books based on similar collections
- **Reading Challenges**: Set and track reading goals
- **Book Trading**: Connect with other readers for book exchanges

### 📊 Advanced Analytics
- **Reading Timeline**: Visualize when books were added to collection
- **Space Optimization**: Suggestions for better shelf organization
- **Collection Insights**: Identify gaps and suggest new additions
- **Value Tracking**: Monitor collection value and rarity

## 🛠️ Technical Details

### Frontend Technologies
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent iconography
- **Vanilla JS**: No complex build process required

### Backend Technologies (Optional)
- **Express.js**: Lightweight web server
- **Multer**: File upload handling
- **Node.js**: Server-side JavaScript runtime

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Test your changes across different browsers
- Update documentation for new features
- Keep components small and focused
- Use semantic HTML and accessible design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Real bookshelf aesthetics and library science
- **Color Palette**: Muted rainbow themes from modern design systems
- **Icon Library**: Lucide React for consistent, beautiful icons
- **Community**: Book lovers and digital organization enthusiasts

---

**Happy Reading! 📚✨**

*Shelfie - Where your books come alive digitally*