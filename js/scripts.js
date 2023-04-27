const districtData = [
    {
        "congressional-district": 10,
        "longitude": 40.73571383143744,
        "latitude": -73.99604725249279
    },
    {
        "congressional-district": 12,
        "longitude": 40.78160550002147,
        "latitude": -73.96668170613462
    },
    {
        "congressional-district": 13,
        "longitude": 40.81600345814587,
        "latitude": -73.93917082586165
    }
]

mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    bounds: [-74.24250, 40.46565, -73.59283, 41.06611]
});
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);



map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
$.getJSON('data/congressional-districts.geojson', function (data) {
    console.log(data);
})
map.on('load', function () {
    map.addSource('congressional-districts', {
        type: 'geojson',
        data: 'data/congressional-districts.geojson'
    });
    map.addLayer({
        id: 'fill-congressional-districts',
        type: 'fill',
        source: 'congressional-districts',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'Total_Votes'],
                0,
                '#b7babd',
                84748,
                '#c7e9ff',
                100709,
                '#35a7f2',
                246105,
                '#014878'
            ],
            'fill-opacity': 0.75
        }
    });
    map.addLayer({
        id: 'line-congressional-districts',
        type: 'line',
        source: 'congressional-districts',
        paint: {
            'line-color': '#011a3b'
        }
    });
    map.on('click', 'congressional-districts', (e) => {
        const description = e.features[0].properties.CongDist;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    })
})