import { Task, Lecture } from "../../db/models";

export const getEvents = async (req, res, next) => {
  const { trackId } = req.body;
  try {
    const lecturesDates = await Lecture.findAll({
      where: { trackId },
      attributes: ["title", "date"],
    });
    const tasksDates = await Task.findAll({
      where: { trackId },
      attributes: ["title", ["dueDate", "date"], "type"],
    });
    // injecting type "lecture" to the lectures
    let lecturesJSON = JSON.parse(JSON.stringify(lecturesDates));
    lecturesJSON = lecturesJSON.map((lecture) => ({
      ...lecture,
      type: "Lecture",
    }));
    res.status(200).json([...lecturesJSON, ...tasksDates]);
  } catch (error) {
    next(error);
  }
};
