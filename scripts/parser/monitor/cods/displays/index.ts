import setSettings from "./lib/setSettings";
import $ from 'jquery'
import getMonitors from "./lib/getMonitors";

$(document).ready(async () => {
    await setSettings()
    await getMonitors()
})
