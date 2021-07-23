import { Comment, Mentor, Profile } from "../../../db/models";
import { Op } from "sequelize";

const queryMentorProfileAttributes = {
  model: Profile,
  as: "profile",
  attributes: ["image", "id", "name"],
};
export const listNotes = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const notes = await Comment.findAll({
      where: {
        studentId,
      },
    });

    let noteJSON = JSON.parse(JSON.stringify(notes));
    const commentersIds = noteJSON.map((note) => note.updatedBy);
    const mentors = await Mentor.findAll({
      attributes: ["id"],
      where: {
        id: {
          [Op.in]: commentersIds,
        },
      },
      include: queryMentorProfileAttributes,
    });

    const mentorsJSON = JSON.parse(JSON.stringify(mentors));
    noteJSON = noteJSON.map((note) => {
      const foundMentor = mentorsJSON.find(
        (mentor) => mentor.id === note.updatedBy
      );
      return { ...note, mentor: foundMentor };
    });
    res.json(noteJSON);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const newNote = await Comment.create(req.body);

    let noteJSON = JSON.parse(JSON.stringify(newNote));
    const commenterId = noteJSON.updatedBy;
    const mentor = await Mentor.findByPk(commenterId, {
      attributes: ["id"],
      include: queryMentorProfileAttributes,
    });

    res.json({ ...noteJSON, mentor });
  } catch (error) {
    next(error);
  }
};
