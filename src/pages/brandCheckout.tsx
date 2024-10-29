import { useState, useEffect } from 'react';
import getCheckoutAds from '../services/getCheckoutAds';
import removeAdCheckout from '../services/removeAdCheckout';
import Loader from '../components/loader';
import BrandHeader from '../components/brandHeader';
import { useAuth } from '../utils/authContext';
import { currencySymbols } from '../utils/constants';
import { formatAmount, formatText } from '../utils/helpers';


const BrandCheckout = () => {
  const authData = useAuth();
  const { user, isAuthenticated } = authData;
  const [loading, setLoading] = useState(false);
  const [removeAd, setRemoveAd] = useState<number>();
  const [fetchList, setFetchList] = useState(true);
  const [checkoutAdList, setCheckoutAdList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (!removeAd) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callRemoveAdCheckout = async () => {
      try {
        const data = await removeAdCheckout(user.id as number, removeAd, signal, authData);
        setRemoveAd(undefined);
        setFetchList(true);
      } catch(error) {
      } finally {
        setLoading(false);
      }
    }
    callRemoveAdCheckout();
    setLoading(true);
    return () => {
      controller.abort();
    }
  }, [removeAd]); 
  
  useEffect(() => {
    if (!isAuthenticated || !user?.id || user?.type !== 'brand') {
      return;
    }
    if (!fetchList) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetCheckoutList = async () => {
      try {
        const data = await getCheckoutAds(user.id as number, signal, authData);
        setCheckoutAdList(data.checkout_ads);
        setTotalAmount(data.total_amount);
      } catch(error) {
      } finally {
        setFetchList(false);
        setLoading(false);
      }
    }
    callGetCheckoutList();
    setLoading(true);
    return () => {
      controller.abort();
    }
  }, [fetchList]); 

  if (loading) {
    return (
      <div>
        <BrandHeader />
        <div className="flex pt-10 pl-10 items-center">
          <p className="text-2xl font-semibold">
            Checkout
          </p>
        </div>
        <div className="flex p-20 justify-center items-center">
         <Loader />
        </div>
      </div>
    )
  }

  return (
    <div>
      <BrandHeader />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Checkout
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {
                  checkoutAdList.map((ad, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="flex flex-row">
                        <div className="flex flex-1 justify-center items-center">
                          <img className="h-full w-2/3 dark:hidden rounded-lg" src={ad.thumbnailKey} alt="thumbnail" />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex flex-1 flex-col justify-center">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {formatText(ad.brandName)}
                            </p>
                          </div>
                          <div className="flex flex-1 flex-col justify-start">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                              {formatText(ad.productName)} | {ad.summary ? (formatText(ad.summary) + " | ") : ""} By {formatText(ad.firstname) + " " + formatText(ad.lastname)}
                            </p>
                          </div>
                          <div className="flex flex-1 flex-col justify-start">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                              Original Dimensions: {ad.width + " ✗ " + ad.height}
                            </p>
                          </div> 
                          <div className="flex flex-1 flex-col justify-center bg-logo-color rounded-lg p-2">
                            <p className="text-xs font-semibold text-white dark:text-white">
                              Perpetual content license for both commercial and non-commercial use
                            </p>
                          </div>                         
                          <div className="flex flex-1 flex-row justify-between items-end">
                            <button type="button" onClick={() => setRemoveAd(ad.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              Remove
                            </button>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currencySymbols['indian_rupee']} {formatAmount(ad.amount, currencySymbols['indian_rupee'])}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                    </dl> */}

                    {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">-$299.00</dd>
                    </dl> */}

                    {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                    </dl> */}
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {currencySymbols['indian_rupee']} {formatAmount(totalAmount, currencySymbols['indian_rupee'])}
                    </dd>
                  </dl>
                </div>

                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Proceed to Payment
                </a>
              </div>

              {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandCheckout;
