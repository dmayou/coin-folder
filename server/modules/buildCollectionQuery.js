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
        // GET routes aliase collection_items table as ci
        return (`(FALSE
            ${found ? ` OR "ci"."found"=TRUE` : ''}
            ${needed ? ` OR "ci"."found"=FALSE` : ''}
            )`
        );
    }
};

const buildCollectionQuery = (search) => {
    const { startYear, endYear, mintP, mintD, mintS, found, needed } = search;
    return (
        `AND
        ${buildYear(startYear, endYear)}
        AND ${buildMint(mintP, mintD, mintS)}
        AND ${buildFound(found, needed)}
        `
    );
};

module.exports = buildCollectionQuery;