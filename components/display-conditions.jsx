import { useEffect, useState } from 'react';
import ReportConditions from './trail-conditions';
import { processConditions } from './trail-conditions';
import RecentCommonSwitch from './recent-common-switch';

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

  useEffect(() => {
    if (condition) {
      setDisplayReports(processConditions(condition));
    }
  }, [condition]);

  const handleToggle = (e) => {
    e.target.checked
    ? setToggle('common')
    : setToggle('recent')
  };

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h3>Trail Conditions</h3>
        {
          // this switch could probably become a component
          // displayReports && displayReports[toggle].condition !== 'nodata'
          // ? <div className="recentCommonContainer mt-2 mb-3 ms-2">
          //     <div className="recentCommonLabel">Most Recent</div>
          //     <label htmlFor="recentCommonSwitch" className="switch">
          //       <input type="checkbox" id="recentCommonSwitch" onClick={handleToggle} role="switch" />
          //       <span className="slider round"></span>
          //     </label>
          //     <div className="recentCommonLabel">Most Common</div>
          //   </div>
          // : displayReports && displayReports[toggle].condition === 'nodata'
          // ? <div className="recentCommonContainer mt-2 mb-3 ms-2">
          //     <div className="recentCommonLabel">Most Recent</div>
          //     <label htmlFor="recentCommonSwitch" className="switch switch-disabled">
          //       <input type="checkbox" id="recentCommonSwitch" role="switch" aria-disabled="true" />
          //       <span className="slider round"></span>
          //     </label>
          //     <div className="recentCommonLabel">Most Common</div>
          //   </div>
          // : <p><span className="loading-placeholder loading-text"></span></p>
          displayReports
          ? <RecentCommonSwitch condition={displayReports[toggle.condition]} handleToggle={handleToggle} />
          : <p><span className="loading-placeholder loading-text"></span></p>
        }
        {
          displayReports && displayReports[toggle].condition !== 'nodata' && toggle === 'recent'
          ? <p>
              <span className="trail-detail trail-detail-alt">{displayReports[toggle].condition} &ndash; <em>on {displayReports[toggle].date.toDateString()}</em></span>
            </p>
          : displayReports && displayReports[toggle].condition !== 'nodata' && toggle === 'common'
          ? <p>
              <span className="trail-detail">
                {displayReports[toggle].condition} 
                &nbsp;&ndash;&nbsp;
                <em>reported {displayReports[toggle].number} {displayReports[toggle].number === 1 ? 'time' : 'times'} in 30 days</em></span>
            </p>
          : displayReports && displayReports[toggle].condition === 'nodata'
          ? <p>
              <span className="trail-detail">no recent reports</span>
            </p>
          : <p><span className="loading-placeholder loading-text"></span></p>
        }
        <ReportConditions pageID={localeId} condSubmit={condSubmit} setCondSubmit={setCondSubmit} />
      </div>
    </div>
  );
};