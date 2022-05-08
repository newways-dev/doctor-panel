import { ReactSVG } from 'react-svg'
import message from '../../assets/icons/message.svg'
import bell from '../../assets/icons/bell.svg'
import user from '../../assets/icons/user.svg'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import './header.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(removeUser())
    navigate('/login')
  }

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'></div>
      <div className='topbarCenter'>
        <h3 className='topbarLogo'>Nacelle</h3>
      </div>
      <div className='topbarRight'>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <ReactSVG src={message} className='sidebarIcon' />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <ReactSVG src={bell} className='sidebarIcon' />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <ReactSVG src={user} className='sidebarIcon' />
            <button className='logoutButton' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'
            }
            className='topbarImg'
            alt=''
          />
        </Link> */}
      </div>
    </div>
  )
}

export default Header
