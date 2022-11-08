import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () =>{
        logOut()
        .then(()=>{})
        .catch(err => console.error(err))
    }

    const menuItems = <>
        <li><Link to='/' className='font-semibold'>Home</Link></li>
        {
            user?.uid && <li><Link to='/orders' className='font-semibold'>Orders</Link></li>
        }
        {
            user?.uid ?
                <>
                    <li><button onClick={handleSignOut} className='font-semibold'>Sign Out</button></li>
                </> :
                <>
                    <li><Link to='/login' className='font-semibold'>Login</Link></li>
                    <li><Link to='/signup' className='font-semibold'>Sign Up</Link></li>
                </>
        }
    </>

    return (
        <div className="navbar bg-base-100 h-24 sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/'>
                    <img src={logo} alt="" style={{ maxHeight: '100%' }} />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a href='/' className="btn">Get started</a>
            </div>
        </div>
    );
};

export default Header;