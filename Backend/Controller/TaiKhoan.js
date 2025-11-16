const TaiKhoanHelper = require('../Helper/TaiKhoan');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await TaiKhoanHelper.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const result = await TaiKhoanHelper.add(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi thêm tài khoản' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userData = req.body;

    // Nếu MatKhau không có trong req.body thì xóa khỏi object
    if (!userData.MatKhau) {
      delete userData.MatKhau;
    }

    // Nếu có file avatar, thêm đường dẫn
    if (req.file) {
      userData.Avatar = `/uploads/${req.file.filename}`;
    }

    const result = await TaiKhoanHelper.update(req.params.id, userData);
    res.json(result);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Lỗi server khi cập nhật tài khoản' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await TaiKhoanHelper.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi xóa tài khoản' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await TaiKhoanHelper.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.getUserById = async (req,res) =>{
  try{
    const user = await TaiKhoanHelper.getById(req.params.id);
    res.json(user);
  }catch(err){
    res.status(err.status||500).json({error:err.message});
  }

};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.body.userId;

    const result = await TaiKhoanHelper.changePassword(userId, currentPassword, newPassword);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

