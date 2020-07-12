import React, { useReducer } from 'react'
import { battle } from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types';
import Loading from './Loading'
import Tooltip from './Tooltip';

function ProfileList( {profile} ) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239,115,115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
            <li>
                <Tooltip text="User's Location">
                    <FaCompass color='rgb(144,115,255)' size={22} />
                    {profile.location}
                </Tooltip>
            </li>
            )}
            {profile.company && (
            <li>
                <Tooltip text="User's Company">
                    <FaBriefcase color='#799548' size={22} />
                    {profile.company}
                </Tooltip>
            </li>
            )}
            <li>
                <FaUsers color='rgb(129,195,245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64,183,95)' size={22} />
                {profile.following.toLocaleString()} followers
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

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
            return <Loading />
        }

        if (error === true) {
            return (
                <p className='center-text error'>

                </p>
            )
        }

        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>

                    <Card 
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.name}
                    >
                        <ProfileList profile={winner.profile}/>
                    </Card>

                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        name={loser.profile.login}
                        href={loser.profile.html_url}
                    >
                        <ProfileList profile={loser.profile}/>
                    </Card>
                </div>
                <button className='btn btn-dark btn-space' onClick={this.props.onReset}>
                    Reset
                </button>
            </React.Fragment>
        )

    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}