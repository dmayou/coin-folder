const buildYear = (startYear, endYear) => {
    if (startYear === 0 || endYear === 0) {
        return 'TRUE'
    } else {
        return (
            `"items"."year" BETWEEN ${startYear} AND ${endYear}`
        );
    }
};

const buildMint = (mintP, mintD, mintS) => {
    return (`(FALSE
        ${mintP ? `OR "items"."mint"='P'` : ''}
        ${mintD ? `OR "items"."mint"='D'` : ''}
        ${mintS ?`OR "items"."mint"='S'` : ''}
    )`);
};

const buildFound = (found, needed) => {
    const searchingForAll = found && needed;
    const searchingForNone = !(found || needed);
    if (searchingForAll) {
        return 'TRUE';
    } else if (searchingForNone) {
        return 'FALSE';
    } else {
        return (`(FALSE
            ${found ? ` OR "collection_items"."found"=TRUE` : ''}
            ${needed ? ` OR "collection_items"."found"=FALSE` : ''}
            )`
        );
    }
};

const buildCollectionQuery = (search) => {
    const { startYear, endYear, mintP, mintD, mintS, found, needed } = search;
    console.log('search object:', search);
    return (
        `AND
        ${buildYear(startYear, endYear)}
        AND ${buildMint(mintP, mintD, mintS)}
        AND ${buildFound(found, needed)}
        `
    );
};

module.exports = buildCollectionQuery;