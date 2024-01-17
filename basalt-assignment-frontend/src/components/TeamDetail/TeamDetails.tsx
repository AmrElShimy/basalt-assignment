import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './TeamDetails.css'

interface UrbanDictionaryDefinition {
    definition: string
    permalink: string
    thumbs_up: number
    author: string
    word: string
    defid: number
    current_vote: string
    written_on: string
    example: string
    thumbs_down: number
}

interface TeamDetailsResponse {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
    urbanDictionaryDefinitions: UrbanDictionaryDefinition[]
}

const TeamDetails: React.FC = () => {
    const { teamId } = useParams()
    const [teamDetails, setTeamDetails] = useState<TeamDetailsResponse | null>(null)
    const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/getTeam?id=${teamId}`)
                const data = await response.json()
                setTeamDetails(data)
                setCurrentDefinitionIndex(0)
            } catch (error) {
                console.error('Error fetching team details:', error)
            }
        }

        fetchTeamDetails()
    }, [teamId])

    const handleNextDefinition = () => {
        setCurrentDefinitionIndex((prevIndex) => (prevIndex < teamDetails!.urbanDictionaryDefinitions.length - 1 ? prevIndex + 1 : prevIndex))
    }

    const handlePrevDefinition = () => {
        setCurrentDefinitionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="container mt-5">
            {teamDetails && (
                <div>
                    {/* Back Button */}
                    <button className="btn btn-secondary mb-4" onClick={handleGoBack}>
                        Back
                    </button>

                    {/* Team Details Card */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="card-title">{teamDetails.full_name}</h5>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Abbreviation:</strong> {teamDetails.abbreviation}
                            </p>
                            <p>
                                <strong>City:</strong> {teamDetails.city}
                            </p>
                            <p>
                                <strong>Conference:</strong> {teamDetails.conference}
                            </p>
                            <p>
                                <strong>Division:</strong> {teamDetails.division}
                            </p>
                        </div>
                    </div>

                    {/* Urban Dictionary Definitions Card */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="card-title">Urban Dictionary Definitions</h5>
                        </div>
                        <div className="card-header">
                            <h6 className="card-subtitle mb-2 text-muted">Author: {teamDetails.urbanDictionaryDefinitions[currentDefinitionIndex].author}</h6>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{teamDetails.urbanDictionaryDefinitions[currentDefinitionIndex].definition}</p>
                            <a href={teamDetails.urbanDictionaryDefinitions[currentDefinitionIndex].permalink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                View on Urban Dictionary
                            </a>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-secondary mr-2" onClick={handlePrevDefinition}>
                                Previous
                            </button>
                            <button className="btn btn-secondary" onClick={handleNextDefinition}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamDetails
