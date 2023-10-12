import $ from "jquery";

export const getAsyncElement = async (selector: () => JQuery<HTMLElement>, timeout = 200) => {
    const data = await new Promise<JQuery<HTMLElement>>((resolve) => {
        const interval = setInterval(() => {
            const el = selector()
            if (el.length) {
                clearInterval(interval);
                resolve(el);
            }
        }, timeout);
    });
    return data;
};

export const ready = (after: () => void) => {
    return $(document).ready(async () => {
        after();
    });
};
export const oneTimeEvent = (el: JQuery<HTMLElement>, trigger: string, call: () => void) => {
    const onEvent = () => {
        call()
        el.off(trigger, onEvent)
    }
    el.on(trigger, onEvent)
    el.trigger(trigger)
}

