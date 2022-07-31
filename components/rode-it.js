export default function RodeIt({ rodeSubmit, setRodeSubmit, riders, pageID }) {
    
    const handleClick = () => {
        setRodeSubmit('pending');
        fetch(`/api/rode-it?localeId=${pageID}`,
        {
            method: 'POST'
        })
        .then((response) => {
            // console.log(response.status);
            return response.json();
        })
        .then((response) => {
            // console.log(`Report recorded: ${response.modifiedCount}`);
            if (response.modifiedCount === 1) {
                setRodeSubmit('submitted');
                setTimeout(() => {
                    document.getElementById('submitted-ride-button').style.opacity = '.5';
                }, 500)                  
            } else {
                setRodeSubmit('failed');
            }
        });
    }
    
    return (
        <div className="mt-4 mb-4">
            {
                rodeSubmit === 'not-submitted' && 
                <button className="btn btn-primary btn-rode-it" onClick={handleClick}>I Rode It!</button>
                   
            }
            {
                rodeSubmit === 'pending' && 
                <button className="btn btn-primary btn-rode-it submit-pending"><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                    
            } 
            {
                rodeSubmit === 'submitted' && 
                <button className="btn btn-success btn-rode-it submitted" id="submitted-ride-button">I Rode It! <i className="fa-solid fa-circle-check"></i></button>
                    
            }
            {
                rodeSubmit === 'failed' && 
                <button className="btn btn-danger btn-rode-it failed"><i className="fa-regular fa-circle-xmark"></i></button>                  
            }
            <div className="mt-2"></div>
            {
                riders
                ? <div className="rode-reports-text">
                    <span className="rode-number">{riders}</span> riders in the last 30 days.
                </div>
                : <p><span className="loading-placeholder loading-text"></span></p>
            }                   
        </div>
    )
}