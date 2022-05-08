import { ReactSVG } from 'react-svg'
import dashborad from '../../assets/icons/dashboard.svg'
import waitingRoom from '../../assets/icons/waiting-room.svg'
import onService from '../../assets/icons/on-service.svg'
import calendar from '../../assets/icons/calendar.svg'
import newsFeed from '../../assets/icons/news-feed.svg'
import settings from '../../assets/icons/settings.svg'

import './sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='logoContainer'>
          <h2 className='logo'>Nacelle</h2>
        </div>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <ReactSVG src={dashborad} className='sidebarIcon' />
            <Link className='sidebarLink' to='/'>
              <span className='sidebarListItemText'>Dashboard</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <ReactSVG src={waitingRoom} className='sidebarIcon' />
            <Link className='sidebarLink' to='/waiting-room'>
              <span className='sidebarListItemText'>Waiting Room</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <ReactSVG src={onService} className='sidebarIcon' />
            <Link className='sidebarLink' to='/on-service'>
              <span className='sidebarListItemText'>On service</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <ReactSVG src={calendar} className='sidebarIcon' />
            <span className='sidebarListItemText'>Calendar</span>
          </li>
          <li className='sidebarListItem'>
            <ReactSVG src={newsFeed} className='sidebarIcon' />
            <span className='sidebarListItemText'>News Feed</span>
          </li>
        </ul>
        <div className='settingsContainer'>
          <li className='sidebarListItem'>
            <ReactSVG src={settings} className='sidebarIcon' />
            <span className='sidebarListItemText'>Settings</span>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
