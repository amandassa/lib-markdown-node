const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function handleErrors (err) {
    throw new Error(err.message);
}

async function getStatus (links) {
    try {
        const arrayStatus = await Promise.all(links.map(async url => {
            const response = await fetch(url);
            return `${response.status} - ${response.statusText}`;
        }));
        return arrayStatus;
    } catch (error) {
        handleErrors(error);
    }
}

function getURLs (links) {
    return links.map(obj => Object.values(obj).join());
}

/**
 * @param {Array} links - Object array: It is expected to contain objects type { URLname: URL }
 * @returns {Array} An array with objects type { URLname: URL, status: http_status_code }
 */
async function checkURLs (links) {
    const arrayLinks = getURLs(links);
    const statusLinks = await getStatus(arrayLinks);
    const result = links.map((obj, index) => ({ 
        ...obj, 
        status: statusLinks[index] 
    }));
    return result;
}

module.exports = checkURLs;