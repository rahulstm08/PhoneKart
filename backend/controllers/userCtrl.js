import userModels from "../models/userModel.js";

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password === confirmPassword) {
      const oldUser = await userModels.findOne({ email });
      if (oldUser)
        return res.status(400).json({ message: "User already exists" });
      const result = await userModels.create({
        email,
        password,
      });
      res.status(201).json({ result });
    } else {
      res.status(500).json({ message: "password doesn't match" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModels.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists" });
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret
    );
    res.send({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
