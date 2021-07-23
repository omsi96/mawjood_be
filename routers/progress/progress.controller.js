import { Progress, Profile } from "../../db/models";

export const getVideoByID = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { videoId } = req.params;
    const videoProgress = await Progress.findOne({
      where: { profileId, videoId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [{ model: Profile, as: "profile", attributes: ["id", "name"] }],
    });

    res.json(videoProgress);
  } catch (error) {
    next(error);
  }
};

export const getProgressByProfileID = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const profileProgress = await Profile.findByPk(profileId, {
      attributes: ["id", "name"],

      include: [
        {
          model: Progress,
          as: "progress",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    res.json(profileProgress);
  } catch (error) {
    next(error);
  }
};
