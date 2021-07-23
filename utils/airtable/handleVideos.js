import { Video } from "../../db/models";
import { updateOrCreateVideo } from "./updateOrCreate";

function deepCompareVideoWithDBVideo(video, foundObjectDB) {
  const comparison =
    JSON.stringify({
      title: foundObjectDB.title,
      description: foundObjectDB.description,
      lessonId: foundObjectDB.lessonId,
      youtubeId: foundObjectDB.youtubeId,
      mdContent: foundObjectDB.mdContent,
    }) ==
    JSON.stringify({
      title: video.title,
      description: video.description,
      lessonId: video.lessonId,
      youtubeId: video.youtubeId,
      mdContent: video.mdContent,
    });

  return comparison;
}
const handleVideos = async (videosAirtable) => {
  // getting the videos from the real database
  const videosDB = await Video.findAll();
  await deleteVideos(videosDB, videosAirtable);

  //

  videosAirtable.forEach(async (video) => {
    //   this is the found object with the same airtable id in the real database, if found
    const foundObject = videosDB.find((x) => x.airtableId === video.airtableId);

    let foundObjectDB;
    if (foundObject) {
      foundObjectDB = foundObject.dataValues;
    }
    // ? Guarding foundObjectDB. If not found, create a new instance and leave
    if (!foundObject) {
      await updateOrCreateVideo({
        title: video.title,
        description: video.description,
        lessonId: video.lessonId,
        youtubeId: video.youtubeId,
        mdContent: video.mdContent,
        airtableId: video.airtableId,
      });
    }
    // ** Object is found, we need to update **
    else {
      // checking if the found objects is equal to the one in airtable

      if (deepCompareVideoWithDBVideo(video, foundObjectDB) == false) {
        await updateOrCreateVideo(video);
      }
    }
  });
};

// ? this function deletes a video if it was in the local database but not on airtable
const deleteVideos = async (videosDB, videosAirtable) => {
  // videosToBeDeleted are the videos existing in the database but not on airtable
  const videosToBeDeleted = videosDB.filter(
    ({ airtableId: idOfRealDB }) =>
      !videosAirtable.some(
        ({ airtableId: idOfAirtable }) => idOfAirtable === idOfRealDB
      )
  );

  videosToBeDeleted.forEach(async (video) => {
    await Video.destroy({
      where: { airtableId: video.airtableId },
    });
  });
};

export default handleVideos;
