import { v4 as uuidv4 } from 'uuid';

const parseDestination = (newDestination) => {
    const { capital, visited, fullAddress, population, languages, averageIncome, surface } = newDestination;

    return {
        capital,
        visited,
        fullAddress,
        country: 'world',
        countryCode: 'FR',
        uid: uuidv4(),
        images: {
            flag: `https://www.countryflags.io/fr/shiny/64.png`,
            url: '',
            alt: 'FR',
        },
        statistics: {
            population,
            languages,
            averageIncome,
            surface,
        },
    };
};

const extractDataFromWikipediaInfoboxes = (data, sectionNames) => {
    const formatedData = {};

    console.log(sectionNames.map((item) => Object.entries(data).filter((section) => section[0] === item)[1]) || 'nan');

    return formatedData;
};

const extractCountryCodeFromWikipediaTemplates = (templates) => templates.filter((template) => template.display === 'title')[0].props.type.split(':')[1];

const parseDestinationFromWikipedia = (article) => {
    const infoboxes = article.infoboxes();
    const templates = article.templates();

    const { data, _type: type } = infoboxes[0];
    if (type !== 'country') throw new Error('Result is not a country');

    const countryCode = extractCountryCodeFromWikipediaTemplates(templates);
    const rawData = extractDataFromWikipediaInfoboxes(data, ['capital', 'common_name', 'population_estimate', 'languages', 'gdp_nominal_per_capita', 'area_km2']);

    const { capital, common_name: country, population_estimate: population, languages, gdp_nominal_per_capita: averageIncome, area_km2: area } = rawData;

    return {
        capital,
        country,
        countryCode,
        uid: uuidv4(),
        visited: false,
        images: {
            flag: `https://www.countryflags.io/${countryCode}/shiny/64.png`,
            url: '',
            alt: country,
        },
        statistics: {
            population,
            languages,
            averageIncome,
            area,
        },
    };
};

export { parseDestination, parseDestinationFromWikipedia };
