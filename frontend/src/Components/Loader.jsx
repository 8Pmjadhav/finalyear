import ReactLoading from 'react-loading';

export default function Loader() {
    const type = 'spinningBubbles', color = 'gray';  //blank,balls,bars, bubbles,cubes,cylon,spin,spinningBubbles,spokes
    return (
        <div className="flex justify-center items-center h-1/2">
            <ReactLoading type={type} color={color} height={'50px'} width={'50px'} />
        </div>
    )
}