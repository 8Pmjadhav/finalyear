import ReactLoading from 'react-loading';

export default function Loader() {
    const type = 'spinningBubbles', color = 'blue';  //blank,balls,bars, bubbles,cubes,cylon,spin,spinningBubbles,spokes
    return (
        <div className="flex justify-center items-center h-screen">
            <ReactLoading type={type} color={color} height={'90px'} width={'90px'} />
        </div>
    )
}