const notFound = (req,res) => {
    return res.status(404).send("Not found");
}

module.exports = notFound;