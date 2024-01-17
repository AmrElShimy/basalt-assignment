import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

interface Team {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
}

interface TeamListResponse {
    data: Team[]
    meta: {
        current_page: number
        next_page: number | null
        per_page: number
    }
}

const TeamList: React.FC = () => {
    const [teamList, setTeamList] = useState<TeamListResponse | null>(null)
    const navigate = useNavigate()

    const fetchAllTeams = async (pageNumber: number) => {
        try {
            const response = await fetch(`http://localhost:3000/getAllTeams?page=${pageNumber}`)
            const data = await response.json()
            setTeamList(data)
        } catch (error) {
            console.error('Error fetching teams:', error)
        }
    }

    const handlePageChange = (page: number) => {
        fetchAllTeams(page)
    }

    const handleRowClick = (teamId: number) => {
        navigate(`/team/${teamId}`)
    }

    useEffect(() => {
        fetchAllTeams(1)
    }, [])

    return (
        <div className="container mt-5">
            <h1 className="mb-4">NBA Teams</h1>
            {teamList && (
                <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Full Name</th>
                                <th>City</th>
                                <th>Conference</th>
                                <th>Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamList.data.map((team) => (
                                <tr key={team.id} className="clickable-row" onClick={() => handleRowClick(team.id)}>
                                    <td>{team.name}</td>
                                    <td>{team.full_name}</td>
                                    <td>{team.city}</td>
                                    <td>{team.conference}</td>
                                    <td>{team.division}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <nav>
                        <ul className="pagination">
                            {teamList.meta.current_page > 1 && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(teamList.meta.current_page - 1)}>
                                        Previous
                                    </button>
                                </li>
                            )}
                            {teamList.meta.next_page && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(teamList.meta.next_page as number)}>
                                        Next
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default TeamList
