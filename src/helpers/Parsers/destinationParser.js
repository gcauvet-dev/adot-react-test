import { v4 as uuidv4 } from 'uuid';

const parseDestinationFromRestCountries = (country) => {
    const { alpha2Code: countryCode, area, capital, flag, languages, name, population } = country;

    return {
        capital,
        country: name,
        countryCode,
        uid: uuidv4(),
        visited: false,
        images: {
            flag,
            url: '',
            alt: country,
        },
        statistics: {
            population,
            languages: languages[0].name,
            area,
        },
    };
};

// const extractDataFromWikipediaInfoboxes = (data, sectionNames) => {
//     const formatedData = {};

//     for (const name of sectionNames) {
//         formatedData[name] = data[name] ? data[name].data.text : 'N/A';
//     }

//     return formatedData;
// };

// const extractCountryCodeFromWikipediaTemplates = (templates) => templates.filter((template) => template.display === 'title')[0].props.type.split(':')[1];

// const extractCountryCodeFromWikipediaTemplates = (templates) => {
//     console.log(templates.filter((template) => template.display === 'title'));
// };

// const parseDestinationFromWikipedia = (article, query) => {
//     const infoboxes = article.infoboxes();
//     const templates = article.templates();

//     console.log(article);

//     const { data, _type: type } = infoboxes[0];
//     if (type !== 'country') throw new Error(`${query} was not detected as a country`);

//     const countryCode = extractCountryCodeFromWikipediaTemplates(templates);
//     const rawData = extractDataFromWikipediaInfoboxes(data, ['capital', 'common_name', 'population_estimate', 'languages', 'gdp_nominal_per_capita', 'area_km2']);

//     const { capital, common_name: country, population_estimate: population, languages, gdp_nominal_per_capita: gini, area_km2: area } = rawData;

//     return {
//         capital,
//         country,
//         countryCode,
//         uid: uuidv4(),
//         visited: false,
//         images: {
//             flag: `https://www.countryflags.io/${countryCode}/shiny/64.png`,
//             url: '',
//             alt: country,
//         },
//         statistics: {
//             population,
//             languages,
//             gini,
//             area,
//         },
//     };
// };

export default parseDestinationFromRestCountries;
