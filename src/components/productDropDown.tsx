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

  const handleSelectProduct = (selectedProduct: string, index: number) => {
    let newCategory = category;
    if (!newCategory) {
      newCategory = brandProductsList[index]?.category?.replace(/ /g, '-');
    }
    let url = `/ai-ads/${orientation}/${brandName}/${newCategory}`;
    selectedProduct = selectedProduct.replace(/ /g, '-');
    handleDropdown();
    navigate(url + '/' + selectedProduct);
  }

  const handleSelectCategory = (selectedCategory: string) => {
    let url = `/ai-ads/${orientation}/${brandName}`;
    selectedCategory = selectedCategory.replace(/ /g, '-');
    handleDropdown();
    navigate(url + '/' + selectedCategory);
  }

  const handleSelectDropdown = (item: string, index: number) => {
    if (showDropdown === 'product') {
      handleSelectProduct(item, index);
    } else if (showDropdown === 'category') {
      handleSelectCategory(item);
    }
  }

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
            <li key={index?.toString()} role="button" onClick={() => handleSelectDropdown(item, index)}>
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