import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

export function GoBackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            type="button"
            className="bg-black dark:bg-white hover:bg-gray-500 text-white dark:text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
        >
            Go Back
        </button>
    )
}

export function SubmitButton({loading,tb,ta}){
    return (
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            {loading ? (
            <div className='flex space-x-2 text-green-400'>{ta} 
            <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} />
            </div>):tb}
          </button>
    )
}