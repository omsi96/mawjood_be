import { Mentor, User, Profile } from "../../db/models";

export const getMentors = async (req, res, next) => {
  const { trackId } = req.body;
  const { all } = req.query;

  const allQuery = () => {
    return all ? {} : { trackId };
  };
  try {
    const mentors = await Mentor.findAll({
      where: allQuery(),
      attributes: ["officeHours", "trackId", "profileId"],
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["image", "name", "gender", "bio"],
          userId: 1,
          include: [
            {
              model: User,
              as: "user",
              attributes: ["email"],
            },
          ],
        },
      ],
    });
    res.status(201).json(mentors);
  } catch (error) {
    next(error);
  }
};
