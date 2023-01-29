function isExternal(externals) {
    return (id) => {
        for (const dep of externals) {
            if (id.includes(dep)) return true;
        }
    };
}
module.exports.isExternal = isExternal ;
