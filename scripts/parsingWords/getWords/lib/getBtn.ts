import $ from 'jquery';

export default (pageN: number) => (
    $('.paginate_button a')
        .filter(function () {
            return $(this)
                .text() === String(pageN);
        })
        .parent()
);
