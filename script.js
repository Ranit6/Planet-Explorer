document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'NASA API key'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    const planetsData = [
        { id: 'mercury', name: 'Mercury', image: 'https://solarsystem.nasa.gov/system/feature_items/images/18_mercury_new.png' },
        { id: 'venus', name: 'Venus', image: 'https://solarsystem.nasa.gov/system/feature_items/images/27_venus_jg.png' },
        { id: 'earth', name: 'Earth', image: 'https://solarsystem.nasa.gov/system/feature_items/images/17_earth.png' },
        { id: 'mars', name: 'Mars', image: 'https://solarsystem.nasa.gov/system/feature_items/images/19_mars.png' },
        { id: 'jupiter', name: 'Jupiter', image: 'https://solarsystem.nasa.gov/system/feature_items/images/16_jupiter_new.png' },
        { id: 'saturn', name: 'Saturn', image: 'https://solarsystem.nasa.gov/system/feature_items/images/28_saturn.png' },
        { id: 'uranus', name: 'Uranus', image: 'https://solarsystem.nasa.gov/system/feature_items/images/29_uranus.png' },
        { id: 'neptune', name: 'Neptune', image: 'https://solarsystem.nasa.gov/system/feature_items/images/30_neptune.png' },
    ];

    const planetContainer = document.getElementById('planets');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    function fetchPlanetData(planetId) {
        return fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`)
            .then(response => response.json())
            .then(data => ({
                name: data.englishName,
                image: planetsData.find(planet => planet.id === planetId).image,
                // description: data.discoveredBy ? `Discovered by: ${data.discoveredBy}` : 'No discoverer information',
                gravity: `Gravity: ${data.gravity} m/s²`,
                meanRadius: `Mean radius: ${data.meanRadius} km`,
                mass: data.mass ? `Mass: ${data.mass.massValue} x 10^${data.mass.massExponent} kg` : 'No mass information',
                density: data.density ? `Density: ${data.density} g/cm³` : 'No density information',
                escape: data.escape ? `Escape velocity: ${data.escape} m/s` : 'No escape velocity information',
          
            }));
    }

    function createPlanetElement(planet) {
        const planetElement = document.createElement('div');
        planetElement.classList.add('planet');

        const planetImage = document.createElement('img');
        planetImage.src = planet.image;
        planetImage.alt = planet.name;

        const planetName = document.createElement('h2');
        planetName.textContent = planet.name;

        const planetDescription = document.createElement('p');
        planetDescription.textContent = planet.description;

        const planetGravity = document.createElement('p');
        planetGravity.textContent = planet.gravity;

        const planetMeanRadius = document.createElement('p');
        planetMeanRadius.textContent = planet.meanRadius;

        const planetMass = document.createElement('p');
        planetMass.textContent = planet.mass;

        planetElement.appendChild(planetImage);
        planetElement.appendChild(planetName);
        planetElement.appendChild(planetDescription);
        planetElement.appendChild(planetGravity);
        planetElement.appendChild(planetMeanRadius);
        planetElement.appendChild(planetMass);

        return planetElement;
    }

    planetsData.forEach(planet => {
        fetchPlanetData(planet.id)
            .then(planetData => {
                const planetElement = createPlanetElement(planetData);
                planetContainer.appendChild(planetElement);
            })
            .catch(error => console.error('Error fetching planet data:', error));
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        const filteredPlanets = planetsData.filter(planet => planet.name.toLowerCase().includes(query));

        filteredPlanets.forEach(planet => {
            fetchPlanetData(planet.id)
                .then(planetData => {
                    const resultElement = createPlanetElement(planetData);
                    searchResults.appendChild(resultElement);
                })
                .catch(error => console.error('Error fetching search results:', error));
        });
    });
});
