const handleProfileGET = (req, res, db) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("no user found");
      }
    })
    .catch((err) => {
      res.status(400).json("error getting users");
    });
};

module.exports = {
  handleProfileGET: handleProfileGET,
};
