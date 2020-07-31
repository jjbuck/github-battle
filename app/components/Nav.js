import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import Switch from "react-switch";

const activeStyle = {
    color: 'red'
}

export default class Popular extends React.Component {

    constructor(props) {
        super(props)
        this.state = { checked: false }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(checked, toggleTheme) {
        this.setState({ checked });
        console.log(this.state)
        toggleTheme()
    }

    render() {
        return (
            <ThemeConsumer>
                {({ theme, toggleTheme }) => (
                    <nav className='row space-between'>
                        <ul className='row nav'>
                            <li>
                                <NavLink
                                    to='/'
                                    exact
                                    activeStyle={activeStyle}
                                    className='nav-link'>
                                    Popular
                            </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/battle'
                                    activeStyle={activeStyle}
                                    className='nav-link'>
                                    Battle
                            </NavLink>
                            </li>
                        </ul>
                        <Switch
                            onChange={(e) => this.handleChange(e, toggleTheme)}
                            checked={this.state.checked}
                            uncheckedIcon='☀️'
                            checkedIcon='🌙'
                            offColor='#aaaaaa'
                            onColor='#CCCC00'
                        />
                    </nav>
                )}
            </ThemeConsumer>
        )
    }
}