const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      console.log(`Admin already seeded (${count} record(s) found). Skipping.`);
      return;
    }

    await Admin.create({
      name: 'Clinic Administrator',
      email: 'admin@medislot.ai',
      password: 'medislot',
    });

    console.log('Default admin created: admin@medislot.ai / medislot');
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

module.exports = seedAdmin;
