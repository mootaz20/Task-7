exports.logout = async (req, res) => {
  try {
    return res.json({ message: "Logout successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
