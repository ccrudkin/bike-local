import { useEffect, useState } from 'react';
import ReportConditions from './trail-conditions';
import { processConditions } from './trail-conditions';
import RecentCommonSwitch from './recent-common-switch';

export default function DisplayConditions({ condSubmit, setCondSubmit, condition, localeId }) {
  const [toggle, setToggle] = useState('recent');
  const [displayReports, setDisplayReports] = useState(null);

  useEffect(() => {
    if (condition) {
      setDisplayReports(processConditions(condition));
    }
  }, [condition]);

  const handleToggle = (e) => {
    e.target.checked ? setToggle('common') : setToggle('recent');
  };

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h3>Trail Conditions</h3>
        {
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