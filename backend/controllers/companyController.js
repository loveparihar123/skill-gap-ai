import companyProfile from "../models/CompanyProfile.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await companyProfile.find({}).populate("roleId", "title");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompanyByRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    console.log(roleId);
    const companies = await companyProfile
      .find({
        roleId: req.params.roleId,
      })
      .populate("roleId", "title");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
