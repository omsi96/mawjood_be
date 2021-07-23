import { User, Track, Student, Profile } from "../../db/models";
export const getTrackFromStudentEmail = async (req, res, next) => {
  try {
    const { email, discordId } = req.body;

    const foundUser = await User.findOne({
      where: { email },
      attributes: ["id"],
      include: [
        {
          model: Profile,
          as: "profile",
          include: [
            {
              model: Student,
              as: "student",
              attributes: ["id"],
              include: [
                {
                  model: Track,
                  as: "track",
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    const foundProfile = foundUser.profile;
    const profile = await Profile.findByPk(foundProfile.id);
    const updatedProfile = await profile.update({ ...foundProfile, discordId });
    if (updatedProfile) {
      res.json({
        profile: updatedProfile,
        track: foundProfile.student.track?.name ?? null,
      });
    } else {
      throw new Error(`Couldn't find user with email ${email}`);
    }
  } catch (error) {
    next(error);
  }
};

export const getAvailableTracks = async (req, res, next) => {
  try {
    res.json(await Track.findAll());
  } catch (error) {
    next(error);
  }
};
