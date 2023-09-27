import $ from 'jquery';

export default () => {
    $('select[name="example_length"]')
        .val('100')[0]
        .dispatchEvent(new Event(
            'change',
            { bubbles: true },
        ));

    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            if ($('tbody tr[role="row"]').length === 100) {
                clearInterval(intervalId);
                resolve(null);
            }
        }, 100);
    });
};
