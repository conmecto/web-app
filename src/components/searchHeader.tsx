import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchHeader = () => {
  const { orientation } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleSubmitSearch = (value: string) => {
    let url = '/ai-videos';
    if (orientation) {
      url += (`/${orientation}`);
    } else {
      url += ('/horizontal');
    }
    value = value.replace(/ /g, '-');
    navigate(url + '/' + value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSubmitSearch(inputValue);
    setInputValue('');
  }

  return (
    <div className="flex flex-col w-screen h-30vh bg-logo-color rounded-b-xl">
      <div className="flex flex-1 flex-col justify-center items-center">
        <p className="text-3xl font-bold text-white">
          The most creative AI Videos for your Products
        </p>
        <p className="text-3xl font-bold text-white">
          made by AI Creators
        </p>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <form onSubmit={handleSubmit} className="flex w-1/3 h-2/5 mx-auto">   
          <div className="relative w-full h-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
            </div>
            <input type="text" id="search" value={inputValue} onChange={handleInputChange} className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your brand..." required />
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 hover:text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchHeader;
