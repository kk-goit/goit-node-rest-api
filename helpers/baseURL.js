const getBaseURL = (req) => (`${req.protocol}://${req.get('host')}/`);
export default getBaseURL;
