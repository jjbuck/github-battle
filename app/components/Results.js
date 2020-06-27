import React, { useReducer } from 'react'
import { battle } from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card'

export default class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    async componentDidMount() {
        const {playerOne, playerTwo} = this.props

        try {
            let players = await battle([playerOne, playerTwo])
            this.setState({
                winner: players[0],
                loser: players[1],
                error: null,
                loading: false
            })
        } catch(err) {
            this.setState({
                error: err,
                loading: false
            })
        }
        
    }
    render() {
        const {winner, loser, error, loading} = this.state;

        if (loading === true) {
            return <p>LOADING</p>
        }
        if (error === true) {
            return (
                <p className='center-text error'>

                </p>
            )
        }
        return (
            <div className='grid space-around container-sm'>

                <Card 
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner.score.toLocaleString()}`}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.name}
                >

                    <ul className='card-list'>
                        <li>
                            <FaUser color='rgb(239,115,115)' size={22} />
                            {winner.profile.name}
                        </li>
                        {winner.profile.location && (
                        <li>
                            <FaCompass color='rgb(144,115,255)' size={22} />
                            {winner.profile.location}
                        </li>
                        )}
                        {winner.profile.company && (
                        <li>
                            <FaBriefcase color='#799548' size={22} />
                            {winner.profile.company}
                        </li>
                        )}
                        <li>
                            <FaUsers color='rgb(129,195,245)' size={22} />
                            {winner.profile.followers.toLocaleString()} followers
                        </li>
                        <li>
                            <FaUserFriends color='rgb(64,183,95)' size={22} />
                            {winner.profile.following.toLocaleString()} followers
                        </li>
                    </ul>
                </Card>

                <Card
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${loser.score.toLocaleString()}`}
                    avatar={loser.profile.avatar_url}
                    name={loser.profile.login}
                    href={loser.profile.html_url}
                >
                    <ul className='card-list'>
                        <li>
                            <FaUser color='rgb(239,115,115)' size={22} />
                            {loser.profile.name}
                        </li>
                        {loser.profile.location && (
                        <li>
                            <FaCompass color='rgb(144,115,255)' size={22} />
                            {loser.profile.location}
                        </li>
                        )}
                        {loser.profile.company && (
                        <li>
                            <FaBriefcase color='#799548' size={22} />
                            {loser.profile.company}
                        </li>
                        )}
                        <li>
                            <FaUsers color='rgb(129,195,245)' size={22} />
                            {loser.profile.followers.toLocaleString()} followers
                        </li>
                        <li>
                            <FaUserFriends color='rgb(64,183,95)' size={22} />
                            {loser.profile.following.toLocaleString()} following
                        </li>
                    </ul>
                </Card>
            </div>
        )
    }
}