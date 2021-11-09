$(document).ready(function () {
    if($('.eco-slider').length) {
        $('.eco-slider').slick({
            swipe: false,
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        swipe: true,
                        dots: true
                    }
                }
            ]
        });
        $('.eco-slider').on('afterChange', function(event, slick, currentSlide){
            let prevSlide = currentSlide-1;
            $('.eco-slide[data-slick-index="'+prevSlide+'"]').addClass('prev-slide');
        });

        $('.eco-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let prevSlide = currentSlide-1;
            $('.eco-slide[data-slick-index="'+prevSlide+'"]').removeClass('prev-slide');
        });
    }

});

ymaps.ready(mapInit);

function mapInit () {
    var myMap = new ymaps.Map('map', {
            center: [56.83, 60.59],
            zoom: 5,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),

        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32
        });

    objectManager.objects.options.set({
        preset: 'islands#yellowDotIcon', 
        iconColor: '#FFB800'
    });
    objectManager.clusters.options.set({
        preset: 'islands#yellowClusterIcons',
        iconColor: '#FFB800'
    });
    myMap.geoObjects.add(objectManager);
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');

    $.ajax({
        url: "/data.json"
    }).done(function(data) {
        objectManager.add(data);
    });

}