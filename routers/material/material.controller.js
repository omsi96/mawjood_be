import { Lecture, Material, Track } from "../../db/models";

// This function deeply filters material by a track
// Material -> Lecture -> Track  -> name == track
export const listMaterialFromTrack = async (req, res, next) => {
  try {
    const { track } = req.params;
    const materials = await Material.findAll({
      include: [
        {
          attributes: [],
          model: Lecture,
          as: "lecture",
          required: true,
          include: {
            model: Track,
            attribute: ["name"],
            as: "track",
            required: true,
            where: {
              name: track,
            },
          },
        },
      ],
    });
    res.json(materials);
  } catch (error) {
    next(error);
  }
};
