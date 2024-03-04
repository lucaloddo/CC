import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

  export const fetchApi = async (url, data) => {
    const response = await fetch(`/api${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
  
  export default function InventoryPage() {
    const navigate = useNavigate();
    const [prodotti, setProdotti] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_PRODUCTS_BACKEND_URL;

    useEffect(() => {
      fetchApi(`/${BACKEND_URL}/products`).then((data) => {
        setProdotti(data);
      });
    }, [])


  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white p-4 rounded-sm shadow">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-5 text-gray-800">Prodotti</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate('/create')}
            className="block rounded-md bg-sky-600 opacity-75 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 opacity-75"
          >
            Aggiungi prodotto
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800">
                    Nome
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                    Prezzo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                    Quantità
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                    Categoria 
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                    Fornitore
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prodotti?.map((prodotto, key) => (
                  <tr key={key} onClick={() => navigate('/detail/'+prodotto.id)} className="hover:bg-gray-200 cursor-pointer">
                    <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-800">
                      {prodotto.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prodotto.price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prodotto.stockQuantity}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prodotto.category.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prodotto.supplier.name}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
  