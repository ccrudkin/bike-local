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
    <>
      <div className="row">
        <div className="col-md-12">
          <h3 className='trail-conditions-title'>Trail Conditions</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 mb-4 mb-sm-0">
          <div className="display-reports-container">
          {
            displayReports
            ? <RecentCommonSwitch condition={displayReports[toggle.condition]} handleToggle={handleToggle} />
            : <p><span className="loading-placeholder loading-text"></span></p>
          }
          {
            displayReports && displayReports[toggle].condition !== 'nodata' && toggle === 'recent'
            ? <div>
                <div className='condition-phrase'>
                  {displayReports[toggle].condition}
                </div>
                <div className='condition-explanation'>
                  <em>{displayReports[toggle].date.toDateString()}</em>
                </div>
              </div>
              
            : displayReports && displayReports[toggle].condition !== 'nodata' && toggle === 'common'
            ? <div>
                <div className='condition-phrase condition-alt'>
                  {displayReports[toggle].condition}
                </div>
                <div className='condition-explanation condition-alt'>
                  <em>Reported {displayReports[toggle].number} {displayReports[toggle].number === 1 ? 'time' : 'times'} in 30 days</em>
                </div>
              </div>
            : displayReports && displayReports[toggle].condition === 'nodata'
            ? <div>
                <div className='condition-phrase condition-alt'>
                  No recent reports
                </div>
                <div className='condition-explanation condition-alt'>
                  &mdash; &mdash;
                </div>
              </div>
            : <p><span className="loading-placeholder loading-text"></span></p>
          }
          </div>
        </div>
        <div className="col-sm-6">
          <div className="display-reports-container">
            <ReportConditions pageID={localeId} condSubmit={condSubmit} setCondSubmit={setCondSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};