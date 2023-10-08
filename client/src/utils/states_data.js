import axios from 'axios';
import Papa from 'papaparse';

const getStateData = async () => {
    const stateNamesResponse = await axios.get('https://gist.githubusercontent.com/espinielli/78185d7b29948d105634beb7bcc0d34b/raw/c78199dfbc3707e4edeaa3f670f5e271fc7c9240/us-state-names-plus.tsv');
    const stateNamesData = Papa.parse(stateNamesResponse.data, { delimiter: '\t', header: true }).data;

    const stateFlagsResponse = await axios.get('https://gist.githubusercontent.com/espinielli/78185d7b29948d105634beb7bcc0d34b/raw/c78199dfbc3707e4edeaa3f670f5e271fc7c9240/us-state-id-flag-urls.tsv');
    const stateFlagsData = Papa.parse(stateFlagsResponse.data, { delimiter: '\t', header: true }).data;

    console.log(stateNamesData);
    console.log(stateFlagsData);

    const states = stateNamesData.map(stateName => {
        const flag = stateFlagsData.find(stateFlag => Number(stateFlag.id) === Number(stateName.id)).url;
        return { ...stateName, flag };
    });

    return states;
};

getStateData();

export { getStateData };