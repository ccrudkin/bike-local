export default function RecentCommonSwitch({ condition, handleToggle }) {
  return ( 
    <div className="recentCommonContainer mt-2 mb-1">
      <div className="recentLabel">Most Recent</div>
      {
        condition !== 'nodata'
        ? <label htmlFor="recentCommonSwitch" className="switch">
            <input type="checkbox" id="recentCommonSwitch" onClick={handleToggle} role="switch" />
            <span className="slider round"></span>
          </label>
        : <label htmlFor="recentCommonSwitch" className="switch switch-disabled">
            <input type="checkbox" id="recentCommonSwitch" role="switch" aria-disabled="true" />
            <span className="slider round"></span>
          </label>
      }
      <div className="commonLabel">Most Common</div>
    </div>
  )
}