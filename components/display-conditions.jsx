import { useState } from 'react';
import ReportConditions from './trail-conditions';
import { processConditions } from './trail-conditions';

export default function DisplayConditions({ condSubmit, setCondSubmit, condition, localeId }) {
  // use a toggle to choose 'most recent condition' OR 'most reported condition'
  // JSX to display can be rendered based on the state of the toggle
  // display will get data from displayReports state below
  const [toggle, setToggle] = useState('recent');

  // process conditions and store ready-to-display versions in state
  // i.e., 'most recent condition' + human readable date
  // 'most reported condition' (in the last 30 days) + number of times reported
  // setDisplayReports should run in an effect that monitors changes in 'condition' prop
  const [displayReports, setDisplayReports] = useState(null);

  return(
    <div className="row mt-3">
      <div className="col-md-12">
          <h3>Trail Conditions</h3>      
          { 
              condition && processConditions(condition) !== 'no recent reports' 
              ? <p>Most recent reports say: <span className="trail-detail">{processConditions(condition)}</span></p>
              : condition && processConditions(condition) === 'no recent reports' 
              ? <p><span className="trail-detail">{processConditions(condition)}</span></p>                            
              : <p><span className="loading-placeholder loading-text"></span></p>
          }                        
          <ReportConditions pageID={localeId} condSubmit={condSubmit} setCondSubmit={setCondSubmit} />                            
      </div>
    </div>
  )
}