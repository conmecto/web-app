import { useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { formatText } from "../utils/helpers";

const SelectProductDropDown = ({ showDropdown, brandProductsList, handleDropdown }: any) => {
  const { orientation, brandName, category } = useParams();
  const navigate = useNavigate();
  const dropdownRef = useRef<any>(null);
  const items = brandProductsList.map((item: any) => item[showDropdown === 'product' ? 'product_name' : 'category']);
  
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      handleDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div id="dropdown" ref={dropdownRef} className="absolute top-2/3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        {
          items.map((item: any, index: number) => (
            <li role="button" onClick={() => console.log('item', item)}>
              <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {formatText(item)}
              </p>
            </li>
          ))
        }
      </ul>
  </div>
  );
}

export default SelectProductDropDown;