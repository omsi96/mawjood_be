import fetchDataFromAirtable from "../../utils/airtable/fetchData";
import migrateDB from "../../utils/airtable/migrateDB";

const airtableMigrate = async (req, res, next) => {
  try {
    const { courses, lessons, videos } = await fetchDataFromAirtable();
    await migrateDB(courses, lessons, videos);

    res.end();
  } catch (error) {
    next(error);
  }
};

export default airtableMigrate;
