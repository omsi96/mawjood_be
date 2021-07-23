export const injectIdsInBody = async (req, res, next) => {
  try {
    req.body.profileId = req.params.profileId;
    req.body.videoId = req.params.videoId;
    next();
  } catch (error) {
    next(error);
  }
};
