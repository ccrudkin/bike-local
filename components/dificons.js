export default function DifIcon(props) {
    const dif = props.difficulty;
    if (dif === 'green') {
        return <span className="green-circle"><i className="fa-solid fa-circle"></i></span>;        
    } else if (dif === 'blue') {
        return <span className="blue-square"><i className="fa-solid fa-square"></i></span>;        
    } else if (dif === 'blueBlack') {
        return <span><span className="blue-square"><i className="fa-solid fa-square"></i></span><span className="black-diamond"><i className="fa-solid fa-diamond"></i></span></span>;
    } else if (dif === 'black') {
        return <span className="black-diamond"><i className="fa-solid fa-diamond"></i></span>;
    } else if (dif === 'doubleBlack') {
        return <span className="black-diamond"><i className="fa-solid fa-diamond"></i> <i className="fa-solid fa-diamond"></i></span>;
    }
}
