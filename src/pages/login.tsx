import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../services/loginUser';
import { useAuth } from '../utils/authContext';
import { emailRegex, passwordRegex } from '../utils/constants';

type props = {
  creator: boolean
}

type LoginFormData = {
  email: string,
  password: string
}

const Login = ({ creator }: props) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate(); 

  const handleInputChange = (event: any) => {
    if (event.target.name === 'email' && !emailRegex.test(event.target.value)) {
      setError('Please enter a valid email address');
    } else if (event.target.name === 'password' && !passwordRegex.test(event.target.value)) {
      setError('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
      setError(null);
    }
  }
      
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const result = await loginUser(formData, creator, signal);
      setUser({
        id: result.user_id,
        type: result.type
      });
      setAccessToken(result.access_token);
      if (creator) {
        navigate('/creator/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      if (err.message === '400') {
        setError('Incorrect Credentials!');
      } else if (err.message === '401') {
        setError('Your account is not active or verified yet');
      } else if (err.message === '403') {
        setError('Too many login attempts');
      } else if (err.message === '404') {
        setError('No account found with these Credentials');
      } else {
        setError('Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading.........</div>
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </h1>
            <form method="POST" onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" onChange={handleInputChange}  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
              </div>
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
              {
                error && <p>{error}</p>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;