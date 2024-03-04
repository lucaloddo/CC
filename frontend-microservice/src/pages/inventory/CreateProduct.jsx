import { useEffect, useState } from "react";
import { fetchApi } from "./IntentoryPage";
import { postApi } from "../auth/LoginPage";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_PRODUCTS_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        stockQuantity: 0,
        categoryId: "",
        supplierId: ""
    })

    useEffect(() => {
        fetchApi(`/${BACKEND_URL}/categories`).then((data) => {
          setCategories(data);
        });
        fetchApi(`/${BACKEND_URL}/suppliers`).then((data) => {
            setSuppliers(data);
          });
      }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postApi(`${BACKEND_URL}/products?categoryId=${formData.categoryId}&supplierId=${formData.supplierId}`, formData).then((data) => {
            navigate('/');
        });
    }

    return <div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <h1 className="text-xl text-gray-700 font-bold">Inserimento nuovo prodotto</h1>
                <form className="space-y-6 mt-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800">
                            Nome prodotto 
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-800">
                            Prezzo
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step={.01}
                                required
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="stockQuantity" className="block text-sm font-medium leading-6 text-gray-800">
                            Quantità di stoccaggio
                        </label>
                        <div className="mt-2">
                            <input
                                id="stockQuantity"
                                name="stockQuantity"
                                type="number"
                                required
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-800">
                            Fornitore
                        </label>
                        <select
                            id="supplierId"
                            name="supplierId"
                            required
                            onChange={handleInputChange}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                        >
                            <option value={''} hidden default>Seleziona fornitore</option>
                            {suppliers.map((s, k) => <option key={k} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-800">
                            Categoria
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            required
                            onChange={handleInputChange}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                        >
                            <option value={''} hidden default>Seleziona categoria</option>
                            {categories.map((c, k) => <option key={k} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-600 opacity-75 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 opacity-75"
                        >
                            Salva
                        </button>
                    </div>
                </form>

            </div>

        </div>
    </div>
}