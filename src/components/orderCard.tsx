import { formatText, formatAmount } from "../utils/helpers";
import { currencySymbols } from '../utils/constants';

const OrderCard = ({ index, order, handleAdModal }: any) => {
  const isVertical = order.orientation === 'vertical';

  const handleClick = () => {
    handleAdModal(order);
  };

  return (
    <div key={index} className="flex w-1/2 p-10 ">
      <div className="flex flex-row rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div role="button" onClick={handleClick} className="flex flex-1 justify-center items-center">
          <img className={`dark:hidden rounded-lg ${isVertical ? "h-90per w-1/2" : "h-4/5 w-4/5"}`} src={order.thumbnailKey} alt="thumbnail" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {formatText(order.productName)} | {order.summary ? (formatText(order.summary) + " | ") : ""} By {formatText(order.firstname) + " " + formatText(order.lastname)}
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Original Dimensions: {order.width + " ✗ " + order.height}
          </p>
          <div className="flex flex-1 flex-row justify-between items-end">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currencySymbols['indian_rupee']} {formatAmount(order.amount, currencySymbols['indian_rupee'])}
            </p>
            <button type="button" className="text-white bg-gradient-to-r from-logo-color to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-2 me-2">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OrderCard;