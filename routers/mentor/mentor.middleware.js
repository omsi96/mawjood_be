export const injectTrackId = (req, res, next) => {
  const { user } = req;
  const { trackId } = user.getProfile();
  req.body.trackId = trackId;
  console.log(trackId);
  next();
};
