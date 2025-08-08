import React from 'react';
import Header from './components/Header';
import RequireContextTest from './components/RequireContextTest';
import './styles/main.css';

function App() {
    return (
        <div className="App">
            <RequireContextTest />
            <Header />
            <main>
                <h1>Welcome to My Portfolio</h1>
                <p>This is a showcase of my work and projects.</p>
            </main>
        </div>
    );
}

export default App;