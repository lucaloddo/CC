import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchApi } from "./IntentoryPage";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { postApi } from "../auth/LoginPage";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_REACT_APP_PRODUCTS_BACKEND_URL;
  const IMAGE_BACKEND_URL = import.meta.env.VITE_REACT_APP_IMAGE_BACKEND_URL;

  useEffect(() => {
    fetchApi(`${BACKEND_URL}/products/${id}`).then((data) => {
      setProduct(data);
    });
    fetchApi(`${BACKEND_URL}/images/${id}`).then((data) => {
      setImages(data);
    });
  }, [id]);


  useEffect(() => {
    fetchApi(`${BACKEND_URL}/categories`).then((data) => {
      setCategories(data);
    });
    fetchApi(`${BACKEND_URL}/suppliers`).then((data) => {
      setSuppliers(data);
    });
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSaveImage = async (e) => {
    setIsUploadingImage(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`/api${IMAGE_BACKEND_URL}/process-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');

        const image = await response.json();

        const body = {
          productId: +id,
          imageName: image.imageName,
          imageLink: image.sharedLink,
        }
        postApi(`${BACKEND_URL}/images`, body).then((data) => {
          fetchApi(`${BACKEND_URL}/images/${id}`).then((data) => {
            setImages(data);
            setIsUploadingImage(false);
          });
        });
        setImage(null);
      } else {
        console.error('Failed to upload image.');
        setIsUploadingImage(false);

      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploadingImage(false);
    }
  };

  return <div className="space-y-10 bg-white p-4 rounded-sm mb-6">
    <form className="space-y-6" onSubmit={() => {}}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Nome prodotto modificato
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            value={product?.name}
            type="text"
            required
            disabled
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
          Prezzo
        </label>
        <div className="mt-2">
          <input
            id="price"
            name="price"
            value={product?.price}
            type="number"
            step={.01}
            required
            disabled
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="stockQuantity" className="block text-sm font-medium leading-6 text-gray-900">
          Quantità di stoccaggio
        </label>
        <div className="mt-2">
          <input
            id="stockQuantity"
            name="stockQuantity"
            value={product?.stockQuantity}
            type="number"
            required
            disabled
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Fornitore
        </label>
        <select
          id="supplierId"
          name="supplierId"
          value={product?.supplier?.id}
          required
          disabled
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
        >
          <option value={''} hidden default>Seleziona fornitore</option>
          {suppliers.map((s, k) => <option key={k} value={s.id} selected={+s.id === +product?.supplier?.id ? 'selected' : undefined}>{s.name}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Categoria
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={product?.category?.id}
          required
          disabled
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
        >
          <option value={''} hidden default>Seleziona categoria</option>
          {categories.map((c, k) => <option key={k} value={c.id} selected={+c.id === +product?.category?.id ? 'selected' : undefined}>{c.name}</option>)}
        </select>
      </div>

      <div>
        {/* <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-sky-600 opacity-75 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 opacity-75"
        >
          Salva
        </button> */}
      </div>
    </form>


    <div className="col-span-full">
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        Immagini
      </label>
      <ul>
        {images.map((image) => <li><a href={image.imageLink}>{image.imageName}</a></li>)}
      </ul>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <input id="file-upload" name="file-upload" type="file" onChange={handleImageChange} />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSaveImage}
        disabled={isUploadingImage}
        className="mt-3 block rounded-md bg-sky-600 opacity-75 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 opacity-75"
        >
        {isUploadingImage ? 'Sto caricando l\'immagine...' : 'Salva'}
      </button>
    </div>
  </div>
}