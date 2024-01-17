import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TeamList from './components/TeamList/TeamList'
import TeamDetails from './components/TeamDetail/TeamDetails'
import WelcomePage from './components/WelcomePage/WelcomePage'

const App: React.FC = () => {
    return (
        <Router>
            <WelcomePage />
            <Routes>
                <Route path="/" element={<TeamList />} />
                <Route path="/team/:teamId" element={<TeamDetails />} />
            </Routes>
        </Router>
    )
}

export default App
