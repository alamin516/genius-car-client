import React, { useContext } from 'react';
import img from '../../../assets/images/login/login.svg'
import { FaFacebookF, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()

                const currentUser = {
                    email: user.email
                }

                console.log(currentUser);

                fetch('https://genius-car-server-rho-six.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('genius-token', data.token)
                        navigate(from, {replace: true})

                    })

            })
            .catch(err => console.error(err))

    }

    return (
        <div className="hero mb-20">
            <div className="hero-content flex-col lg:flex-row justify-start w-full">
                <div className="lg:w-1/2 w-full">
                    <img src={img} alt="" />
                </div>
                <div className="lg:w-1/2 w-full card flex-shrink-0 shadow-2xl bg-base-100 lg:p-9">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-4xl font-semibold text-center mb-12">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Conform Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link to='/' className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className='btn bg-orange-600 border-none' value='Login' />
                        </div>
                    </form>
                    <p className='text-center text-lg'>Or Sign In with</p>
                    <div className='text-center flex mx-auto mt-8 mb-12'>
                        <button><FaFacebookF className='w-8 rounded-full h-8 bg-base-200 p-1 text-blue-400 mr-4'></FaFacebookF></button>
                        <button><FaLinkedin className='w-8 rounded-full h-8 bg-base-200 p-1 text-blue-400 mr-4'></FaLinkedin></button>
                        <button><FaGoogle className='w-8 rounded-full h-8 bg-base-200 p-1 text-blue-400'></FaGoogle></button>
                    </div>
                    <p className='text-center pb-8'>Create a new account? <Link to='/signup' className='text-orange-600'>SignUp</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;