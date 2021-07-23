// This should show tasks for cohort_track
export const injectTrackIdInBody = async (req, res, next) => {
  try {
    req.body.trackId = req.params.trackId;
    next();
  } catch (error) {
    next(error);
  }
};
