export class UserDAO {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(id) {
        return await User.findById(id).select("-password");
    }
}
