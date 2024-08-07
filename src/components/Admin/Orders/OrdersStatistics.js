import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ordersStatsAction } from "../../../redux/slices/orders/orderSlices";


export default function OrdersStats() {
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ordersStatsAction());
  }, []);
  // get data from store
  const { stats, error, loading } = useSelector((state) => state?.orders);
  const obj = stats?.orders;
  const statistics = obj ? Object.values(obj[0]) : [];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* today sales */}
        <div className="relative overflow-hidden rounded-lg bg-indigo-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-gray-500 p-3">
              <svg className="h-6 w-6 text-white" stroke-width="1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Today's Sales
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              {stats?.salesToday?.length <= 0 ? 'IRR 0' : stats?.salesToday[0]?.totalSales}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-indigo-900 px-4 py-4 sm:px-6">
              <div className="text-sm">
              </div>
            </div>
          </dd>
        </div>
        {/* minimum sale(order) */}
        <div className="relative overflow-hidden rounded-lg bg-red-500 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-gray-500 p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Minimum Order
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              IRR {statistics[1]}
            </p>

            <div className="absolute inset-x-0 bottom-0 bg-red-900 px-4 py-4 sm:px-6">
              <div className="text-sm">
              </div>
            </div>
          </dd>
        </div>
        {/* maximum sale(order) */}
        <div className="relative overflow-hidden rounded-lg bg-yellow-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-gray-500 p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Maximum Order
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              IRR {statistics[3]}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-yellow-900 px-4 py-4 sm:px-6">
              <div className="text-sm">
              </div>
            </div>
          </dd>
        </div>
        {/* total income */}
        <div className="relative overflow-hidden rounded-lg bg-green-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-gray-500 p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-100">
              Total Sales
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              IRR {statistics[2]}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-green-900 px-4 py-4 sm:px-6">
              <div className="text-sm">
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
