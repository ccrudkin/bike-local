// import Script from 'next/script';
import { useEffect } from 'react';

export default function Map({ latlong }) {
    // re-ratio based on screen width
    const coords = latlong.split(', ');

    useEffect(() => {
        // could also use a hack to recreate and reload script upon nav, found here: 
        // https://github.com/vercel/next.js/discussions/17919#discussioncomment-3149719
        buildMap();
        return () => {
            window.widgetScriptLoaded = false;
        }
    }, []);

    return (
        <>
            <div className="TrailforksWidgetMap ratio ratio-16x9" 
            data-rid="11974" 
            data-activitytype="1" 
            data-maptype="trailforks" 
            data-trailstyle="difficulty" 
            data-controls="1" 
            data-list="0" 
            data-dml="1" 
            data-layers="labels,poi,polygon,directory,region" 
            data-z="13" 
            data-lat={coords[0]} 
            data-lon={coords[1]} 
            data-hideunsanctioned="0"></div>
        </>
    );
}

// <Script src="https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js" />


function buildMap() {
    var siteURL = 'https://www.trailforks.com';

    function widgetCreateIframe(width, height, source, element, id) {
        element.style.width = width;
    
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", source);
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        iframe.setAttribute("width", width);
        if (height && height != 'null') {
            iframe.setAttribute("height", height);
        }
        iframe.setAttribute("id", id);
        element.appendChild(iframe);
    
        if (typeof iFrameResize != 'undefined') {
            iFrameResize({
                log: false,
                resizedCallback: function(messageData) {
                    if (typeof jQuery !== 'undefined') {
                        jQuery(document).ready(function($) {
                            if (parseInt(messageData.height) > 0) {
                                $('#resizedHeight').val(messageData.height).trigger('change');
                                iframe.setAttribute("height", messageData.height);
                            }
                        });
                    }
                }
            });
            if (width == '100%') {
                // iframe.removeAttribute("height");
            }
        }
    
        // if ('postMessage' in window) {
        //     var scrollListener = function () {
        //         var t = new Date().getTime();
        //         iframe.contentWindow.postMessage("scroll:"+t, '*');
        //     };
        //     window.addEventListener('scroll', scrollListener, false);
        // }
    }
    
    
    function check_widget_map() {

        // ** !!! dig into this and customize for own needs, trim it down !!! **

        for (var eRow = findWidgetsByClass("TrailforksWidgetMap"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
            rid = element.getAttribute("data-rid"),
            width = element.getAttribute("data-w"),
            height = element.getAttribute("data-h"),
            activitytype = element.getAttribute("data-activitytype"),
            maptype = element.getAttribute("data-maptype"),
            trailstyle = element.getAttribute("data-trailstyle"),
            controls = element.getAttribute("data-controls"),
            list = element.getAttribute("data-list"),
            layers = element.getAttribute("data-layers"),
            zoom = element.getAttribute("data-z"),
            lat = element.getAttribute("data-lat"),
            lon = element.getAttribute("data-lon"),
            routeids = element.getAttribute("data-routeids"),
            hideunsanctioned = element.getAttribute("data-hideunsanctioned"),
            source = siteURL+"/widgets/region_map/?rid="+rid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&maptype="+maptype+"&trailstyle="+trailstyle+"&controls="+controls+"&list="+list+"&layers="+layers+"&hideunsanctioned="+hideunsanctioned+"&routeids="+routeids;
            if (typeof zoom != 'undefined' && zoom != null) source = source+'&z='+zoom;
            if (typeof lat != 'undefined' && lat != null) source = source+'&lat='+lat;
            if (typeof lon != 'undefined' && lon != null) source = source+'&lon='+lon;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'map'+a);
        }
    }
    
    /*
    function check_widget_reports() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetReports"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
            rid = element.getAttribute("data-rid"),
            width = element.getAttribute("data-w"),
            height = element.getAttribute("data-h"),
            d = element.getAttribute("data-d"),
            c = element.getAttribute("data-c"),
            cl = element.getAttribute("data-cl"),
            p = element.getAttribute("data-p"),
            active = element.getAttribute("data-active"),
            status = element.getAttribute("data-status"),
            count = element.getAttribute("data-count"),
            workonly = element.getAttribute("data-workonly"),
            officialonly = element.getAttribute("data-officialonly"),
            unsanctioned = element.getAttribute("data-unsanctioned"),
            activitytype = element.getAttribute("data-activitytype"),
            source = siteURL+"/widgets/trailreports/?rid="+rid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&d="+d+"&c="+c+"&cl="+cl+"&p="+p+"&active="+active+"&status="+status+"&count="+count+"&officialonly="+officialonly+"&unsanctioned="+unsanctioned+"&workonly="+workonly;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'reports'+a);
        }
    }
    
    
    function check_widget_reportSubmit() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetReportSubmit"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
            rid = element.getAttribute("data-rid"),
            width = element.getAttribute("data-w"),
            height = element.getAttribute("data-h"),
            work = element.getAttribute("data-work"),
            trailid = element.getAttribute("data-trailid"),
            source = siteURL+"/widgets/reportsubmit/?rid="+rid+"&w="+width+"&h="+height+"&work="+work+"&trailid="+trailid;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'reportsubmit'+a);
        }
    }
    
    
    function check_widget_ridelogs() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetRidelogs"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                userid = element.getAttribute("data-userid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                stats = element.getAttribute("data-stats"),
                map = element.getAttribute("data-map"),
                count = element.getAttribute("data-count"),
                source = siteURL+"/widgets/ridelogs/?userid="+userid+"&w="+width+"&h="+height+"&stats="+stats+"&map="+map+"&count="+count;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'ridelogs'+a);
        }
    }
    
    
    function check_widget_ridelog() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetRidelog"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                id = element.getAttribute("data-id"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                stats = element.getAttribute("data-stats"),
                map = element.getAttribute("data-map"),
                trails = element.getAttribute("data-trails"),
                source = siteURL+"/widgets/ridelog/?id="+id+"&w="+width+"&h="+height+"&stats="+stats+"&map="+map+"&trails="+trails;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'ridelog'+a);
        }
    }
    
    
    function check_widget_trail_list() {
        for (var eRow = findWidgetsByClass("TrailforksTrailList"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                activitytype = element.getAttribute("data-activitytype"),
                season = element.getAttribute("data-season"),
                displaytype = element.getAttribute("data-displaytype"),
                ce = element.getAttribute("data-ce"),
                ci = element.getAttribute("data-ci"),
                unsanctioned = element.getAttribute("data-unsanctioned"),
                query = element.getAttribute("data-query"),
                source = siteURL+"/widgets/trail_list/?rid="+rid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&season="+season+"&displaytype="+displaytype+"&ce="+ce+"&ci="+ci+"&unsanctioned="+unsanctioned+"&query="+query;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'trailist'+a);
        }
    }
    
    
    function check_widget_list() {
        for (var eRow = findWidgetsByClass("TrailforksCustomList"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                id = element.getAttribute("data-id"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                ce = element.getAttribute("data-ce"),
                ci = element.getAttribute("data-ci"),
                query = element.getAttribute("data-query"),
                source = siteURL+"/widgets/list/?id="+id+"&w="+width+"&h="+height+"&ce="+ce+"&ci="+ci+"&query="+query;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'list'+a);
        }
    }
    
    
    function check_widget_trail_supporters() {
        for (var eRow = findWidgetsByClass("TrailforksTrailSupporters"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                year = element.getAttribute("data-year"),
                c = element.getAttribute("data-c"),
                source = siteURL+"/widgets/trail_supporters/?rid="+rid+"&w="+width+"&h="+height+"&year="+year+"&c="+c;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'traisupporters'+a);
        }
    }
    
    
    function check_widget_trails_status() {
        for (var eRow = findWidgetsByClass("TrailforksTrailStatus"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                displaytype = element.getAttribute("data-displaytype"),
                photos = element.getAttribute("data-photos"),
                unsanctioned = element.getAttribute("data-unsanctioned"),
                officialonly = element.getAttribute("data-officialonly"),
                activitytype = element.getAttribute("data-activitytype"),
                condition = element.getAttribute("data-condition"),
                cols = element.getAttribute("data-cols"),
                source = siteURL+"/widgets/trails_status/?rid="+rid+"&w="+width+"&h="+height+"&displaytype="+displaytype+"&unsanctioned="+unsanctioned+"&photos="+photos+"&officialonly="+officialonly+"&cols="+cols+'&activitytype='+activitytype+'&condition='+condition;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'trailstatus'+a);
        }
    }
    
    function check_widget_region_stats() {
        for (var eRow = findWidgetsByClass("TrailforksRegionStats"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                displaytype = element.getAttribute("data-displaytype"),
                activitytype = element.getAttribute("data-activitytype"),
                source = siteURL+"/widgets/region_stats/?rid="+rid+"&w="+width+"&h="+height+"&displaytype="+displaytype+'&activitytype='+activitytype;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'regionstats'+a);
        }
    }
    
    
    function check_widget_region_info() {
        for (var eRow = findWidgetsByClass("TrailforksRegionInfo"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                counts = element.getAttribute("data-counts"),
                stats = element.getAttribute("data-stats"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                title = element.getAttribute("data-title"),
                activitytype = element.getAttribute("data-activitytype"),
                source = siteURL+"/widgets/region_info/?rid="+rid+"&counts="+counts+"&stats="+stats+"&w="+width+"&h="+height+"&title="+title+'&activitytype='+activitytype;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'regioninfo'+a);
        }
    }
    
    
    function check_widget_region_supporters() {
        for (var eRow = findWidgetsByClass("TrailforksRegionSupporters"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                names = element.getAttribute("data-names"),
                years = element.getAttribute("data-years"),
                limit = element.getAttribute("data-limit"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                source = siteURL+"/widgets/region_supporters/?rid="+rid+"&names="+names+"&years="+years+"&w="+width+"&h="+height+"&limit="+limit;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'regionsupporters'+a);
        }
    }
    
    
    function check_widget_trail() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetTrail"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                trailid = element.getAttribute("data-trailid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                activitytype = element.getAttribute("data-activitytype"),
                map = element.getAttribute("data-map"),
                elevation = element.getAttribute("data-elevation"),
                photos = element.getAttribute("data-photos"),
                title = element.getAttribute("data-title"),
                info = element.getAttribute("data-info"),
                version = element.getAttribute('data-v'),
                trail_opacity = element.getAttribute("data-trail_opacity");
            if (! version) version = 1;
            var source = siteURL+"/widgets/trail/?trailid="+trailid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&map="+map+"&elevation="+elevation+"&photos="+photos+"&title="+title+"&info="+info+'&trail_opacity='+trail_opacity+'&v='+version;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'trail'+a);
        }
    }
    
    
    function check_widget_trailstatus() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetTrailStatus"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                trailid = element.getAttribute("data-trailid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                status = element.getAttribute("data-status"),
                st = element.getAttribute("data-st"),
                condition = element.getAttribute("data-condition"),
                ct = element.getAttribute("data-ct"),
                date = element.getAttribute("data-date"),
                source = siteURL+"/widgets/trailstatus/?trailid="+trailid+"&w="+width+"&h="+height+"&status="+status+"&st="+st+"&condition="+condition+"&ct="+ct+"&date="+date;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'trailstatus'+a);
        }
    }
    
    
    function check_widget_region_status() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetRegionStatus"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                activitytype = element.getAttribute("data-activitytype"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                status = element.getAttribute("data-status"),
                st = element.getAttribute("data-st"),
                ct = element.getAttribute("data-ct"),
                date = element.getAttribute("data-date"),
                source = siteURL+"/widgets/region_status/?rid="+rid+"&activitytype="+activitytype+"&w="+width+"&h="+height+"&status="+status+"&st="+st+"&ct="+ct+"&date="+date;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'region_status'+a);
        }
    }
    
    
    function check_widget_route() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetRoute"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                id = element.getAttribute("data-id"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                activitytype = element.getAttribute("data-activitytype"),
                map = element.getAttribute("data-map"),
                elevation = element.getAttribute("data-elevation"),
                trails = element.getAttribute("data-trails"),
                details = element.getAttribute("data-details"),
                section = element.getAttribute("data-section"),
                units = element.getAttribute("data-units"),
                source = siteURL+"/widgets/route/?id="+id+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&map="+map+"&elevation="+elevation+"&trails="+trails+"&details="+details+"&s="+section+"&units="+units;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'route'+a);
        }
    }
    
    
    function check_widget_photos() {
        for (var eRow = findWidgetsByClass("TrailforksPhotos"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                trailid = element.getAttribute("data-trailid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                activitytype = element.getAttribute("data-activitytype"),
                count = element.getAttribute("data-count"),
                title = element.getAttribute("data-title"),
                sort = element.getAttribute("data-sort"),
                cols = element.getAttribute("data-cols"),
                source = siteURL+"/widgets/photos/?rid="+rid+"&trailid="+trailid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&count="+count+"&title="+title+"&sort="+sort+"&cols="+cols;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'photos'+a);
        }
    }
    
    
    function check_widget_videos() {
        for (var eRow = findWidgetsByClass("TrailforksVideos"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                trailid = element.getAttribute("data-trailid"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                activitytype = element.getAttribute("data-activitytype"),
                count = element.getAttribute("data-count"),
                title = element.getAttribute("data-title"),
                sort = element.getAttribute("data-sort"),
                cols = element.getAttribute("data-cols"),
                source = siteURL+"/widgets/videos/?rid="+rid+"&trailid="+trailid+"&w="+width+"&h="+height+"&activitytype="+activitytype+"&count="+count+"&title="+title+"&sort="+sort+"&cols="+cols;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'videos'+a);
        }
    }
    
    
    function check_widget_skillpark() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetSkillpark"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                id = element.getAttribute("data-id"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                map = element.getAttribute("data-map"),
                ttfs = element.getAttribute("data-ttfs"),
                photos = element.getAttribute("data-photos"),
                status = element.getAttribute("data-status"),
                source = siteURL+"/widgets/skillpark/?id="+id+"&w="+width+"&h="+height+"&map="+map+"&ttfs="+ttfs+"&photos="+photos+"&status="+status;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'skillpark'+a);
        }
    }
    
    
    function check_widget_karma_donation() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetKarmaDonation"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                did = element.getAttribute("data-did"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                x = element.getAttribute("data-x"),
                t = element.getAttribute("data-t"),
                photos = element.getAttribute("data-photos"),
                source = siteURL+"/widgets/karma_donate/?rid="+rid+"&did="+did+"&w="+width+"&h="+height+"&x="+x+"&t="+t;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'karmadonate'+a);
        }
    }
    
    
    function check_widget_karma_donations_list() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetKarmaDonationsList"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                rid = element.getAttribute("data-rid"),
                did = element.getAttribute("data-did"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                rows = element.getAttribute("data-rows"),
                source = siteURL+"/widgets/karma_donations/?rid="+rid+"&did="+did+"&w="+width+"&h="+height+"&rows="+rows;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'karmadonationslist'+a);
        }
    }
    
    
    function check_widget_event_list() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetEventList"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                query = element.getAttribute("data-query"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                rows = element.getAttribute("data-rows"),
                source = siteURL+"/widgets/event_list/?"+query+"&rows="+rows+"&w="+width+"&h="+height;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'eventlist'+a);
        }
    }
    
    
    function check_widget_region_list() {
        for (var eRow = findWidgetsByClass("TrailforksWidgetRegionList"), a=0; a < eRow.length; a++) {
            var element = eRow[a],
                query = element.getAttribute("data-query"),
                cols = element.getAttribute("data-cols"),
                width = element.getAttribute("data-w"),
                height = element.getAttribute("data-h"),
                rows = element.getAttribute("data-rows"),
                source = siteURL+"/widgets/region_list/?"+query+"&rows="+rows+"&w="+width+"&h="+height+"&cols="+cols;
            if (typeof style != 'undefined') source = source+'&style='+style;
            widgetCreateIframe(width, height, source, element, 'regionlist'+a);
        }
    }
    */
    
    function findWidgetsByClass(classname) {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(classname);
        } else if (document.querySelectorAll) {
            return document.querySelectorAll('.'+classname);
        } else {
            var retnode = [];
            var elem = document.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                if((' ' + elem[i].className + ' ').indexOf(' ' + classname + ' ') > -1) retnode.push(elem[i]);
            }
            return retnode;
        }
    }
    
    
    (function () {
        var proceed = false;
        if (typeof window.widgetScriptLoaded !== 'undefined' && window.widgetScriptLoaded == false) {
            proceed = true;
        } else if (typeof window.widgetScriptLoaded == 'undefined') {
            proceed = true;
        }
        if (proceed === true) {
            check_widget_map();
            // check_widget_reports();
            // check_widget_reportSubmit();
            // check_widget_ridelogs();
            // check_widget_ridelog();
            // check_widget_trail_list();
            // check_widget_trail_supporters();
            // check_widget_trails_status();
            // check_widget_region_stats();
            // check_widget_trail();
            // check_widget_trailstatus();
            // check_widget_region_info();
            // check_widget_region_supporters();
            // check_widget_region_status();
            // check_widget_region_list();
            // check_widget_photos();
            // check_widget_videos();
            // check_widget_skillpark();
            // check_widget_karma_donation();
            // check_widget_karma_donations_list();
            // check_widget_route();
            // check_widget_event_list();
            // check_widget_list();
    
            window.widgetScriptLoaded = true;
        }
    })();
}