import {ViewMode} from "./models";

export function saveViewMode(v: ViewMode) {
    localStorage.setItem('viewMode', v.toString());
}

export function readViewMode(): ViewMode {
    const val = localStorage.getItem('viewMode')
    if (val) {
        return Number(val) as ViewMode
    }
    return ViewMode.LIST
}
