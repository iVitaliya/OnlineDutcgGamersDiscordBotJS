module.exports = {
    /**
     * @param {any[]} array 
     * @param {number} itemsPerPage 
     * @param {number} page */
	pages(array, itemsPerPage, page = 1) {
		const maxPages = Math.ceil(array.length / itemsPerPage);

		if (page < 1 || page > maxPages) return null;
        return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	},
    /** @param {string} title  */
    seekError(title) {
        return (title.includes("[") && title.includes("]"))
            ? title.toUpperCase()
            : `[${title.toUpperCase()}]`;
    }
};
