import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import logo from '../../../public/pwa-real512.png';

interface IPaymentVoucher {
  id: string;
  tipo: string;
  data: Date;
  recebedor: string;
  valor: string;
}
function Welcome() {
  const [data, setData] = useState<IPaymentVoucher[]>([]);

  const getFiles = async () => {
    await axios.get('https://python-contas-pagas.onrender.com/get-files')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateFiles = async () => {
    await axios.get('https://python-contas-pagas.onrender.com/upgrade-files')
      .then((response) => {
        console.log(response)
        getFiles()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  return <>
    <header className="bg-slate-700 flex justify-center items-center py-4">
      <img src={logo} alt="Logo" style={{ width: '2.5rem', height: 'auto' }} />
      <h1 className="text-center text-white p-2 font-bold">
        Contas Pagas
      </h1>
    </header>
    <div className="flex justify-end">
      <button
        onClick={updateFiles}
        className="text-white bg-violet-800 hover:bg-violet-700 active:bg-violet-600 focus:outline-none focus:ring focus:ring-slate-800  shadow-md shadow-slate-700/25 rounded-md py-2 px-4 m-2 font-bold">Atualizar comprovantes</button>
    </div>
    <div className="bg-gray-300 h-screen">
      <p className="p-2 m-2">Meus comprovantes:</p>
      <ul>
        {data.length > 0 && data.map((item) => (
          <li key={item.id} className="bg-slate-700 text-white border-b-4 border-violet-500 p-2 m-2 rounded-md">
            <div className="flex gap-2 text-xl justify-between">
              <p>{item.recebedor}</p>
              <p>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(parseFloat(item.valor))}</p>
            </div>
            <span className="text-sm">{format(item.data, 'dd/MM/yyyy')}</span>
          </li>

        ))}
      </ul>
    </div>
  </>;
}

export default Welcome;
