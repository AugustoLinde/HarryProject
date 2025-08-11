import { __assign } from "tslib";
import { filter, map } from 'rxjs';
import { filterOutNonTrackableEvents } from '../helpers';
import { AMPLITUDE_ELEMENT_RAGE_CLICKED_EVENT } from '../constants';
import { DEFAULT_RAGE_CLICK_THRESHOLD, DEFAULT_RAGE_CLICK_WINDOW_MS } from '@amplitude/analytics-core';
var RAGE_CLICK_THRESHOLD = DEFAULT_RAGE_CLICK_THRESHOLD;
var RAGE_CLICK_WINDOW_MS = DEFAULT_RAGE_CLICK_WINDOW_MS;
export function trackRageClicks(_a) {
    var amplitude = _a.amplitude, allObservables = _a.allObservables, shouldTrackRageClick = _a.shouldTrackRageClick;
    var clickObservable = allObservables.clickObservable;
    // Keep track of all clicks within the sliding window
    var clickWindow = [];
    return clickObservable
        .pipe(filter(filterOutNonTrackableEvents), filter(function (click) {
        return shouldTrackRageClick('click', click.closestTrackedAncestor);
    }), map(function (click) {
        var now = click.timestamp;
        // if the current click isn't on the same element as the most recent click,
        // clear the sliding window and start over
        if (clickWindow.length > 0 &&
            clickWindow[clickWindow.length - 1].closestTrackedAncestor !== click.closestTrackedAncestor) {
            clickWindow.splice(0, clickWindow.length);
        }
        // remove past clicks that are outside the sliding window
        var clickPtr = 0;
        for (; clickPtr < clickWindow.length; clickPtr++) {
            if (now - clickWindow[clickPtr].timestamp < RAGE_CLICK_WINDOW_MS) {
                break;
            }
        }
        clickWindow.splice(0, clickPtr);
        // add the current click to the window
        clickWindow.push(click);
        // if there's not enough clicks to be a rage click, return null
        if (clickWindow.length < RAGE_CLICK_THRESHOLD) {
            return null;
        }
        // if we've made it here, we have enough trailing clicks on the same element
        // for it to be a rage click
        var firstClick = clickWindow[0];
        var lastClick = clickWindow[clickWindow.length - 1];
        var rageClickEvent = __assign({ '[Amplitude] Begin Time': new Date(firstClick.timestamp).toISOString(), '[Amplitude] End Time': new Date(lastClick.timestamp).toISOString(), '[Amplitude] Duration': lastClick.timestamp - firstClick.timestamp, '[Amplitude] Clicks': clickWindow.map(function (click) { return ({
                X: click.event.clientX,
                Y: click.event.clientY,
                Time: click.timestamp,
            }); }), '[Amplitude] Click Count': clickWindow.length }, firstClick.targetElementProperties);
        // restart the sliding window
        clickWindow.splice(0, clickWindow.length);
        return { rageClickEvent: rageClickEvent, time: firstClick.timestamp };
    }), filter(function (result) { return result !== null; }))
        .subscribe(function (data) {
        /* istanbul ignore if */
        if (data === null) {
            return;
        }
        amplitude.track(AMPLITUDE_ELEMENT_RAGE_CLICKED_EVENT, data.rageClickEvent, { time: data.time });
    });
}
//# sourceMappingURL=track-rage-click.js.map