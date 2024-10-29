import { useEffect, useState, useRef } from 'react';
import countryLookup from '../services/countryLookup';
import signupBrand from '../services/signupBrand';
import { emailRegex, passwordRegex, locationLocalStorageKey, locationLocalStorageExpireTimeMin } from '../utils/constants';
import { getItemLocalStorage, setItemLocalStorage } from '../utils/local';

type locationInfo = {
  city?: string,
  region?: string,
  country?: string,
  postal?: string
} 

type SignupFormData = {
  brandName: string,
  repName: string,
  email: string,
  password: string,
  confirmPassword: string,
  locationInfo?: locationInfo
}

const Signup = () => {
  const locationInfo = useRef<locationInfo>();
  const [signupForm, setSignupForm] = useState<SignupFormData>({
    brandName: '',
    repName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
   
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const callCountryLookup = async () => {
      try {
        const result = await countryLookup(signal);
        const items = {
          city: result?.city,
          region: result?.region,
          country: result?.country,
          postal: result?.postal
        }
        if (items) {
          setItemLocalStorage(locationLocalStorageKey, items, locationLocalStorageExpireTimeMin);
          locationInfo.current = items;
        }
      } catch (err: any) {
      }
    }
    const location = getItemLocalStorage(locationLocalStorageKey);
    if (location) {
      locationInfo.current = {
        city: location?.city,
        region: location?.region,
        country: location?.country,
        postal: location?.postal
      }
    } else {
      callCountryLookup();
    }
    return () => {
      controller.abort();
    }
  }, []);

  const handleInputChange = (event: any) => {
    if (event.target.name === 'email' && !emailRegex.test(event.target.value)) {
      setError('Please enter a valid email address');
    } else if (event.target.name === 'password' && !passwordRegex.test(event.target.value)) {
      setError('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character');
    } else if (event.target.name === 'brandName' && event.target.value.length < 3) {
      setError('Brand name requires atleast 3 characters');
    } else if (event.target.name === 'repName' && event.target.value.length < 3) {
      setError('Please enter your full name');
    } else if (event.target.name === 'confirmPassword' && event.target.value !== signupForm.password) {
      setError('Passwords do not match');
    } else {
      setSignupForm({
        ...signupForm,
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
      if (locationInfo.current) {
        signupForm.locationInfo = locationInfo.current;
      }
      const result = await signupBrand(signupForm, signal);
      setShowSuccess(true);
    } catch (err: any) {
      if (err.message === '401') {
        setError('Your account already exists but is not activated yet');
      } else if (err.message === '409') {
        setError('Your account already exists, please login');
      } else {
        setError('Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  if (showSuccess) {
    return (
      <div>Success</div>
    )
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md">
              
              <div className="flex items-center justify-center mt-6">
                  <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                      sign up
                  </a>
              </div>

              <div className="relative flex items-center mt-8">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                  </span>

                  <input type="text" name="repName" id="repName" onChange={handleInputChange} required={true} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Full Name" />
              </div>

              <div className="relative flex items-center mt-8">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                  </span>

                  <input type="text" name="brandName" id="brandName" onChange={handleInputChange} required={true} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Brand Name" />
              </div>

              <div className="relative flex items-center mt-6">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                  </span>

                  <input type="email" name="email" id="email" onChange={handleInputChange} required={true} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
              </div>

              <div className="relative flex items-center mt-4">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </span>

                  <input type="password" name="password" id="password" onChange={handleInputChange} required={true} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
              </div>

              <div className="relative flex items-center mt-4">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </span>

                  <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleInputChange} required={true} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
              </div>

              <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign Up
                  </button>

                  <div className="mt-6 text-center ">
                      <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                          Already have an account?
                      </a>
                  </div>
              </div>
              {
                error && <p>{error}</p>
              }
          </form>
      </div>
    </section>
  );
}

export default Signup;