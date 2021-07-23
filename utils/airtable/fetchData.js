import Airtable from "airtable";

const fetchDataFromAirtable = async () => {
  const base = new Airtable({ apiKey: "key00kDZwHYxS0D7f" }).base(
    "appNPEN3ADTi5XC1h"
  );
  const coursesResponse = await base("Courses")
    .select({ view: "Grid view" })
    .all();
  const lessonsResponse = await base("Lessons")
    .select({ view: "Grid view" })
    .all();
  const videosResponse = await base("Videos")
    .select({ view: "Grid view" })
    .all();
  const lessons = lessonsResponse.map(cleanLesson);
  const videos = videosResponse.map(cleanVideo);
  const courses = coursesResponse.map((course) => cleanCourse(course, lessons));

  return { courses, lessons, videos };
};
const cleanCourse = (course, lessons) => {
  const { id } = course;
  const { title, description, track, coverImage } = course.fields;
  const courseFields = {
    id,
    title,
    description,
    track,
    coverImage: coverImage?.[0]?.url,
  };

  let courseLessons = course.fields.lessons ?? [];
  courseLessons = courseLessons.map((lesson) =>
    lessons.find((l) => l.id === lesson)
  );
  return {
    ...courseFields,
    lessons: courseLessons,
  };
};

// videos
const cleanVideo = (video) => {
  const lessonId = video.fields.lessonId?.[0];
  if (!lessonId) {
    throw new Error(`video: '${video.fields.title}' should contain a lessonId`);
  }
  return {
    airtableId: video.id ?? null,
    description: video.fields.description ?? null,
    title: video.fields.title ?? null,
    lessonId,
    mdContent: video.fields.mdContent ?? null,
    youtubeId: video.fields.youtubeId ?? null,
  };
};

const cleanLesson = (lesson) => {
  const courseId = lesson.fields.courseId?.[0];
  if (!courseId) {
    throw new Error(
      `lesson: '${lesson.fields.title}' should contain a courseId`
    );
  }
  return {
    id: lesson.id ?? null,
    description: lesson.fields.description ?? null,
    title: lesson.fields.title ?? null,
    id: lesson.id ?? null,
    courseId,
  };
};

export default fetchDataFromAirtable;
